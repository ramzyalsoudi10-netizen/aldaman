
import React from 'react';
import { COMMENTS_DATA } from '../constants';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

const CommentsSection: React.FC = () => {
  return (
    <div className="mt-6 bg-white w-full border-t border-gray-200">
      {/* قسم التفاعلات */}
      <div className="flex justify-between items-center py-3 text-sm text-[#65676b] px-4">
        <div className="flex items-center gap-1">
           <div className="flex -space-x-1">
              <span className="w-4 h-4 bg-[#1877f2] rounded-full flex items-center justify-center text-[8px] text-white border border-white">👍</span>
              <span className="w-4 h-4 bg-[#f02849] rounded-full flex items-center justify-center text-[8px] text-white border border-white">❤️</span>
           </div>
           <span className="mr-1 hover:underline cursor-pointer">38.4 ألف</span>
        </div>
        <div className="flex gap-2">
          <span className="hover:underline cursor-pointer">12 ألف تعليق</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">1.4 ألف مشاركة</span>
        </div>
      </div>

      {/* أزرار الإجراءات */}
      <div className="flex justify-around py-1 border-t border-b border-gray-200 text-[#65676b] text-[15px] font-semibold mx-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-1.5 hover:bg-gray-100 rounded-md transition-colors">
          <ThumbsUp size={20} />
          <span>أعجبني</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-1.5 hover:bg-gray-100 rounded-md transition-colors">
          <MessageSquare size={20} />
          <span>تعليق</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-1.5 hover:bg-gray-100 rounded-md transition-colors">
          <Share2 size={20} />
          <span>مشاركة</span>
        </button>
      </div>

      {/* قائمة التعليقات */}
      <div className="space-y-3 p-4">
        {COMMENTS_DATA.map((comment) => (
          <div key={comment.id} className="flex gap-2">
            <img 
              src={comment.avatar} 
              alt={comment.name} 
              className="w-9 h-9 rounded-full object-cover shadow-sm cursor-pointer hover:opacity-90" 
            />
            <div className="flex flex-col">
              <div className="bg-[#f0f2f5] px-3 py-2 rounded-[18px]">
                <p className="font-bold text-[13px] text-[#050505] hover:underline cursor-pointer mb-0.5">
                  {comment.name}
                </p>
                <p className="text-[15px] text-[#050505] leading-snug">
                  {comment.text}
                </p>
              </div>
              <div className="flex gap-3 mt-1 px-3 text-[12px] text-[#65676b] font-bold">
                <span className="hover:underline cursor-pointer font-normal">{comment.time}</span>
                <button className="hover:underline">أعجبني</button>
                <button className="hover:underline">رد</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* صندوق كتابة تعليق */}
      <div className="p-4 border-t border-gray-100">
         <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-1 bg-[#f0f2f5] rounded-full px-4 py-2 text-[15px] text-[#65676b] cursor-text">
               اكتب تعليقاً...
            </div>
         </div>
      </div>
    </div>
  );
};

export default CommentsSection;
