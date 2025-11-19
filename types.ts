
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  condition: ProductCondition;
  category: ProductCategory;
  brand: string;
}

export enum ProductCategory {
    ALL = 'Tất cả',
    PHONE = 'Điện thoại',
    TABLET = 'Máy tính bảng',
    LAPTOP = 'Laptop',
    WATCH = 'Đồng hồ',
    PC = 'PC',
    ACCESSORIES = 'Phụ kiện'
}

export enum ProductCondition {
    LIKE_NEW = 'Cũ đẹp',
    SCRATCHED = 'Trầy xước',
    DENTED = 'Xước cấn',
}