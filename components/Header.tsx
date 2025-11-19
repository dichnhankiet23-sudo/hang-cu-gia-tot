
import React from 'react';
import SearchIcon from './icons/SearchIcon';
import PhoneIcon from './icons/PhoneIcon';
import LocationIcon from './icons/LocationIcon';
import UserIcon from './icons/UserIcon';
import CartIcon from './icons/CartIcon';
import { ProductCategory } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCategoryClick: (category: ProductCategory) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onCategoryClick }) => {
  const navItems = [
    'Điện thoại', 'Laptop', 'Tablet', 'Apple', 'PC', 'Phụ kiện'
  ];

  const handleNavClick = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    switch(item) {
        case 'Điện thoại': 
            onCategoryClick(ProductCategory.PHONE); 
            onSearchChange('');
            break;
        case 'Laptop': 
            onCategoryClick(ProductCategory.LAPTOP); 
            onSearchChange('');
            break;
        case 'Tablet': 
            onCategoryClick(ProductCategory.TABLET); 
            onSearchChange('');
            break;
        case 'PC': 
            onCategoryClick(ProductCategory.PC); 
            onSearchChange('');
            break;
        case 'Phụ kiện': 
            onCategoryClick(ProductCategory.ACCESSORIES); 
            onSearchChange('');
            break;
        case 'Apple':
            onCategoryClick(ProductCategory.ALL);
            onSearchChange('Apple');
            break;
        default: 
            break;
    }
  };

  return (
    <header className="bg-[#d70018] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-6">
            <a href="/" className="text-2xl font-bold">ThanhVan Designer</a>
            <div className="hidden lg:flex items-center bg-white rounded-md px-2 py-1 w-72">
              <SearchIcon className="h-5 w-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Bạn cần tìm gì?" 
                className="bg-transparent text-black text-sm outline-none ml-2 w-full"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-2 text-sm">
              <PhoneIcon className="h-5 w-5" />
              <span>Gọi mua hàng<br/>0972.529.845</span>
            </a>
            <a 
              href="https://maps.app.goo.gl/5q23xMP4JVRy9Ex29" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm"
            >
              <LocationIcon className="h-5 w-5" />
              <span>Cửa hàng<br/>gần bạn</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-sm">
              <CartIcon className="h-5 w-5" />
              <span>Giỏ hàng</span>
            </a>
          </div>
          <div className="lg:hidden flex items-center space-x-4">
             <SearchIcon className="h-6 w-6" />
             <CartIcon className="h-6 w-6" />
          </div>
        </div>

        {/* Bottom bar - Navigation */}
        <nav className="hidden lg:flex items-center justify-center py-1">
          <ul className="flex items-center space-x-8">
            {navItems.map(item => (
              <li key={item}>
                <a 
                    href="#" 
                    onClick={(e) => handleNavClick(e, item)}
                    className="text-sm uppercase font-semibold hover:text-yellow-300 transition-colors"
                >
                    {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
