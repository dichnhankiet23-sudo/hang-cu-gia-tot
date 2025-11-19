import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
  isAdmin: boolean;
  isComparing: boolean;
  onToggleCompare: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete, isAdmin, isComparing, onToggleCompare }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const handleBuyNowClick = () => {
    alert('Vui lòng nhắn tin qua zalo: 0972529845. Xin cảm ơn quý khách');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <span className="absolute top-2 left-2 bg-yellow-400 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
          Hàng cũ
        </span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 mb-2 flex-grow min-h-[40px]">{product.name}</h3>
        <div className="mt-auto">
          <div className="flex items-baseline mb-1">
            <p className="text-lg font-bold text-red-600">{formatPrice(product.price)}</p>
          </div>
          {product.originalPrice && (
            <p className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</p>
          )}
          <div className="bg-gray-100 text-gray-700 text-xs rounded px-2 py-1 mt-2 inline-block">
            {product.condition}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" 
                checked={isComparing}
                onChange={() => onToggleCompare(product)}
              />
              <span>So sánh</span>
            </label>
            <button
              onClick={handleBuyNowClick}
              className="bg-red-600 text-white text-sm font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
              Mua ngay
            </button>
          </div>
          {isAdmin && (
            <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-end space-x-2">
                <button
                onClick={() => onEdit(product)}
                className="text-xs font-medium text-blue-600 hover:underline"
                aria-label={`Edit ${product.name}`}
                >
                Sửa
                </button>
                <button
                onClick={() => onDelete(product.id)}
                className="text-xs font-medium text-red-600 hover:underline"
                aria-label={`Delete ${product.name}`}
                >
                Xoá
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;