import React from 'react';
import { Product } from '../types';

interface ComparisonModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (productId: number) => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ products, isOpen, onClose, onRemove }) => {
  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex justify-center items-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col relative">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 p-2"
            aria-label="Close comparison"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">So sánh sản phẩm</h2>
            
            {products.length === 0 ? (
                <p className="text-center text-gray-500">Chưa có sản phẩm nào để so sánh.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed border-collapse">
                        <thead>
                            <tr>
                                <th className="w-1/4 p-2"></th>
                                {products.map(product => (
                                    <th key={product.id} className="w-1/3 p-2 align-top pb-4 border-b">
                                        <div className="relative flex flex-col items-center">
                                            <img 
                                                src={product.imageUrl} 
                                                alt={product.name} 
                                                className="h-40 w-auto object-contain mb-2 rounded" 
                                            />
                                            <h3 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[2.5rem] text-center mb-2">
                                                {product.name}
                                            </h3>
                                            <button 
                                                onClick={() => onRemove(product.id)}
                                                className="text-xs text-red-500 hover:underline font-medium bg-red-50 px-2 py-1 rounded"
                                            >
                                                Bỏ so sánh
                                            </button>
                                        </div>
                                    </th>
                                ))}
                                {products.length === 1 && (
                                    <th className="w-1/3 p-2 align-middle text-center text-gray-400 border-b border-dashed bg-gray-50 rounded-lg">
                                        <div className="py-10 italic">Chọn thêm sản phẩm để so sánh</div>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="bg-gray-50">
                                <td className="p-3 font-semibold text-gray-600">Giá bán</td>
                                {products.map(product => (
                                    <td key={product.id} className="p-3 text-center text-red-600 font-bold text-lg">
                                        {formatPrice(product.price)}
                                    </td>
                                ))}
                                {products.length === 1 && <td></td>}
                            </tr>
                            <tr>
                                <td className="p-3 font-semibold text-gray-600">Giá gốc</td>
                                {products.map(product => (
                                    <td key={product.id} className="p-3 text-center text-gray-500 line-through">
                                        {product.originalPrice ? formatPrice(product.originalPrice) : '-'}
                                    </td>
                                ))}
                                {products.length === 1 && <td></td>}
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="p-3 font-semibold text-gray-600">Tình trạng</td>
                                {products.map(product => (
                                    <td key={product.id} className="p-3 text-center">
                                        <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold">
                                            {product.condition}
                                        </span>
                                    </td>
                                ))}
                                {products.length === 1 && <td></td>}
                            </tr>
                            <tr>
                                <td className="p-3 font-semibold text-gray-600">Thương hiệu</td>
                                {products.map(product => (
                                    <td key={product.id} className="p-3 text-center font-medium">
                                        {product.brand}
                                    </td>
                                ))}
                                {products.length === 1 && <td></td>}
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="p-3 font-semibold text-gray-600">Danh mục</td>
                                {products.map(product => (
                                    <td key={product.id} className="p-3 text-center">
                                        {product.category}
                                    </td>
                                ))}
                                {products.length === 1 && <td></td>}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;