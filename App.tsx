import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import AdminLoginModal from './components/AdminLoginModal';
import ComparisonModal from './components/ComparisonModal';
import { Product, ProductCategory } from './types';
import { MOCK_PRODUCTS, PRODUCTS_PER_PAGE } from './constants';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(ProductCategory.ALL);
  const [sortKey, setSortKey] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  
  // Comparison states
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  
  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const [bannerUrl, setBannerUrl] = useState('https://images.unsplash.com/photo-1592899677977-9c10ca582bbd?q=80&w=1200&h=300&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  
  const bannerInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Simulate fetching data
    setProducts(MOCK_PRODUCTS);
  }, []);

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const handleSaveProduct = (savedProduct: Product) => {
    if (productToEdit) { // Update existing product
      setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
      setCompareList(prev => prev.map(p => p.id === savedProduct.id ? savedProduct : p)); // Update in compare list if present
    } else { // Add new product
      const newProductWithId = { ...savedProduct, id: Date.now() }; // Use timestamp for unique ID
      setProducts([newProductWithId, ...products]);
    }
    handleCloseModal();
  };
  
  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này không?')) {
        setProducts(products.filter(p => p.id !== productId));
        setCompareList(prev => prev.filter(p => p.id !== productId)); // Remove from compare list if present
    }
  };

  const handleEditBannerClick = () => {
    bannerInputRef.current?.click();
  };

  const handleBannerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerUrl(reader.result as string);
      };
      reader.onerror = () => {
        alert('Đã có lỗi xảy ra khi đọc file ảnh.');
      }
      reader.readAsDataURL(file);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset pagination when searching
  };

  // Comparison Logic
  const handleToggleCompare = (product: Product) => {
    setCompareList(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 2) {
          alert('Bạn chỉ có thể so sánh tối đa 2 sản phẩm. Vui lòng bỏ chọn sản phẩm khác trước.');
          return prev;
        }
        const newList = [...prev, product];
        // Automatically open modal when 2 products are selected
        if (newList.length === 2) {
            setIsCompareModalOpen(true);
        }
        return newList;
      }
    });
  };

  const handleRemoveFromCompare = (productId: number) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (activeCategory !== ProductCategory.ALL) {
      filtered = products.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(lowerQuery));
    }

    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
        default:
          return b.id - a.id;
      }
    });
  }, [products, activeCategory, sortKey, searchQuery]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage]);

  const handleCategoryChange = (category: ProductCategory) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (key: string) => {
    setSortKey(key);
    setCurrentPage(1); // Reset to first page on sort change
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  // Logic click footer button
  const handleAdminToggle = () => {
    if (isAdmin) {
        setIsAdmin(false);
        alert("Đã đăng xuất khỏi chế độ quản trị.");
    } else {
        // Open Custom Login Modal instead of prompt
        setIsAdminLoginOpen(true);
    }
  };

  // Logic verify password from modal
  const handleAdminLogin = (password: string) => {
    if (password === 'thanhvan23') {
        setIsAdmin(true);
        setIsAdminLoginOpen(false);
        alert("Đã kích hoạt chế độ quản trị. Bạn có thể thêm/sửa/xóa sản phẩm.");
    } else {
        alert("Mật khẩu không đúng!");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
        onCategoryClick={handleCategoryChange}
      />
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="relative mb-4 group">
            <img 
                src={bannerUrl} 
                alt="Modern smartphones banner" 
                className="w-full rounded-lg object-cover h-[300px]"
                onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1200';
                }}
            />
            <input 
                type="file" 
                ref={bannerInputRef} 
                onChange={handleBannerImageChange}
                className="hidden"
                accept="image/*"
            />
            {isAdmin && (
                <button 
                    onClick={handleEditBannerClick}
                    className="absolute top-4 right-4 bg-white bg-opacity-75 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-md hover:bg-opacity-100 transition-all"
                    aria-label="Sửa ảnh bìa"
                >
                    Sửa ảnh bìa
                </button>
            )}
        </div>
        <FilterBar 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
        />
        
        {/* Add Product Button - Only visible to Admin */}
        {isAdmin && (
            <div className="my-4 text-right">
                <button
                    onClick={handleOpenAddModal}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md"
                >
                    + Thêm sản phẩm
                </button>
            </div>
        )}

        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {paginatedProducts.map(product => (
              <ProductCard 
                  key={product.id} 
                  product={product}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteProduct}
                  isAdmin={isAdmin}
                  isComparing={compareList.some(p => p.id === product.id)}
                  onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            Không tìm thấy sản phẩm nào phù hợp.
          </div>
        )}
        {totalPages > 1 && (
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        )}
      </main>
      <Footer onAdminToggle={handleAdminToggle} isAdmin={isAdmin} />
      
      {/* Modals */}
      {isModalOpen && (
        <ProductModal
            productToEdit={productToEdit}
            onSave={handleSaveProduct}
            onClose={handleCloseModal}
        />
      )}
      
      <AdminLoginModal 
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLogin={handleAdminLogin}
      />

      <ComparisonModal 
        isOpen={isCompareModalOpen}
        products={compareList}
        onClose={() => setIsCompareModalOpen(false)}
        onRemove={handleRemoveFromCompare}
      />
    </div>
  );
};

export default App;