
import React from 'react';
import { SSC_LOGO_URL } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#051109] p-8 text-center mt-auto border-t border-[#1a3a2a]">
      <div className="flex flex-col items-center gap-4">
        <img src={SSC_LOGO_URL} alt="SSC Logo" className="w-16 h-16 object-contain opacity-80 mb-2" />
        <p className="text-white font-bold text-xl tracking-wider">
          الضمان الاجتماعي © {currentYear}
        </p>
        <div className="flex justify-center gap-4 mt-2">
           <div className="w-8 h-1 bg-green-900 rounded-full opacity-30"></div>
           <div className="w-8 h-1 bg-green-900 rounded-full opacity-30"></div>
           <div className="w-8 h-1 bg-green-900 rounded-full opacity-30"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
