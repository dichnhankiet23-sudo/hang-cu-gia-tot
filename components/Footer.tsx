
import React from 'react';

interface FooterProps {
    onAdminToggle?: () => void;
    isAdmin?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onAdminToggle, isAdmin }) => {
  const sections = {
    'Thông tin và chính sách': [
      'Mua hàng và thanh toán Online',
      'Chính sách giao hàng',
      'Thông tin bảo hành',
      'Chính sách bảo hành',
      'Câu hỏi thường gặp',
    ],
    // Section 'Dịch vụ và thông tin khác' removed as requested
    'Tổng đài hỗ trợ': [
      'Gọi mua hàng: 0972.529.845 (7h30 - 22h00)',
    ]
  };

  return (
    <footer className="bg-white pt-10 pb-5 border-t mt-auto">
      <div className="container mx-auto px-4">
        {/* Changed grid-cols-4 to grid-cols-3 since one section was removed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-gray-800 mb-4">{sections['Thông tin và chính sách'][0]}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {sections['Thông tin và chính sách'].slice(1).map(item => <li key={item}><a href="#" className="hover:text-red-600">{item}</a></li>)}
            </ul>
          </div>
          
           <div>
            <h3 className="font-bold text-gray-800 mb-4">{sections['Tổng đài hỗ trợ'][0]}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {sections['Tổng đài hỗ trợ'].slice(1).map(item => <li key={item}><a href="#" className="hover:text-red-600">{item}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Phương thức thanh toán</h3>
            <div className="flex flex-wrap gap-2">
              <img src="https://placehold.co/58x32/white/black?text=VNPAY" alt="VNPAY" className="h-8"/>
              <img src="https://placehold.co/58x32/white/black?text=ZaloPay" alt="ZaloPay" className="h-8"/>
              <img src="https://placehold.co/58x32/white/black?text=Moca" alt="Moca" className="h-8"/>
              <img src="https://placehold.co/58x32/white/black?text=SamsungPay" alt="Samsung Pay" className="h-8"/>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-5 border-t text-xs text-gray-500 text-center">
          <p className="mb-2 italic font-medium">Cảm ơn quý khách đã tin tưởng và ủng hộ ThanhVan Designer!</p>
          
          {onAdminToggle && (
            <button 
                onClick={onAdminToggle} 
                className={`mt-2 px-3 py-1 rounded border text-[10px] ${isAdmin ? 'bg-red-100 text-red-600 border-red-200' : 'bg-gray-100 text-gray-400 border-gray-200 hover:text-gray-600'}`}
            >
                {isAdmin ? 'Đăng xuất Quản trị viên' : 'Quản trị viên'}
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;