
import React, { useState, useEffect } from 'react';
import { Product, ProductCategory, ProductCondition } from '../types';

interface ProductModalProps {
  productToEdit: Product | null;
  onSave: (product: Product) => void;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ productToEdit, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'discount'>>({
    name: '',
    price: 0,
    originalPrice: 0,
    imageUrl: '',
    condition: ProductCondition.LIKE_NEW,
    category: ProductCategory.PHONE,
    brand: '',
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      // Reset form for new product
      setFormData({
        name: '',
        price: 0,
        originalPrice: 0,
        imageUrl: '',
        condition: ProductCondition.LIKE_NEW,
        category: ProductCategory.PHONE,
        brand: '',
      });
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: name === 'price' || name === 'originalPrice' ? (value === '' ? 0 : Number(value)) : value 
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
        alert("Vui lòng chọn hình ảnh sản phẩm.");
        return;
    }
    onSave({ ...formData, id: productToEdit?.id ?? 0 });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{productToEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá bán (VND)</label>
                    <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500" required min="0" />
                </div>
                <div>
                    <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Giá gốc (VND)</label>
                    <input type="number" name="originalPrice" id="originalPrice" value={formData.originalPrice || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500" min="0" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh sản phẩm</label>
                <div className="flex items-center space-x-4 p-3 border border-gray-300 rounded-md border-dashed bg-gray-50">
                   {formData.imageUrl ? (
                     <div className="relative group">
                        <img src={formData.imageUrl} alt="Preview" className="h-24 w-24 object-cover rounded-md border border-gray-200" />
                         <button 
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 hidden group-hover:block"
                            title="Xóa ảnh"
                         >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                         </button>
                     </div>
                   ) : (
                     <div className="h-24 w-24 flex items-center justify-center bg-gray-200 rounded-md text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                     </div>
                   )}
                   
                   <div className="flex-1 pl-2">
                     <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 transition-colors">
                        <span>{formData.imageUrl ? 'Thay đổi ảnh' : 'Tải ảnh lên'}</span>
                        <input 
                            type="file" 
                            className="sr-only" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                     </label>
                     <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF (Tối đa 5MB)</p>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Thương hiệu</label>
                  <input type="text" name="brand" id="brand" value={formData.brand} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500" required />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Danh mục</label>
                  <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500">
                    {Object.values(ProductCategory).filter(c => c !== ProductCategory.ALL).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Tình trạng</label>
                <select name="condition" id="condition" value={formData.condition} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500">
                  {Object.values(ProductCondition).map(cond => <option key={cond} value={cond}>{cond}</option>)}
                </select>
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                  Huỷ
                </button>
                <button type="submit" className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                  Lưu
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
