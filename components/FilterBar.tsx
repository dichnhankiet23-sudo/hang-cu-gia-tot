
import React from 'react';
import { ProductCategory } from '../types';

interface FilterBarProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
  onSortChange: (sortKey: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeCategory, onCategoryChange, onSortChange }) => {
  const categories = Object.values(ProductCategory);
  
  const sortOptions = [
    { key: 'newest', label: 'Mới nhất' },
    { key: 'price-desc', label: 'Giá cao - thấp' },
    { key: 'price-asc', label: 'Giá thấp - cao' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Hàng cũ giá tốt</h1>
        <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Sắp xếp theo:</span>
            <select
                onChange={(e) => onSortChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                {sortOptions.map(option => (
                    <option key={option.key} value={option.key}>{option.label}</option>
                ))}
            </select>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
              activeCategory === category
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
