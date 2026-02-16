
import React from 'react';
import { JORDAN_FLAG_URL, SSC_LOGO_URL } from '../constants';

const Header: React.FC = () => {
  // الحصول على التاريخ الحالي بتنسيق عربي
  const currentDate = new Intl.DateTimeFormat('ar-JO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="bg-[#051109] p-4 flex justify-between items-center shadow-lg border-b border-[#1a3a2a]">
      <div className="flex items-center gap-3">
        <img src={JORDAN_FLAG_URL} alt="Flag" className="h-6 w-10 rounded shadow-sm opacity-90" />
      </div>
      
      <div className="flex flex-col items-center">
        <h1 className="text-white font-bold text-lg md:text-xl tracking-wide">اعانة رمضان</h1>
        <p className="text-green-400 text-[10px] font-bold">{currentDate}</p>
      </div>

      <div className="h-12 w-12 bg-[#1a3a2a]/20 rounded-xl flex items-center justify-center border border-[#1a3a2a]/50 overflow-hidden">
         <img src={SSC_LOGO_URL} alt="SSC Logo" className="w-10 h-10 object-contain" />
      </div>
    </header>
  );
};

export default Header;
