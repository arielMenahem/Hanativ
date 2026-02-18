import QRCode from "react-qr-code";

export default function OrderSuccess({ paymentPhone, bookPrice, onClose }) {
  // Create Bit payment link
  const bitPaymentUrl = `bit://pay?phone=${encodeURIComponent(paymentPhone)}&amount=${bookPrice}&description=${encodeURIComponent('ספר הנתיב לצופן הבורא')}`;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50" dir="rtl">
      <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 max-w-md w-full relative max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 sm:top-4 sm:left-4 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl"
          type="button"
        >
          ×
        </button>

        <div className="text-center">
          <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🎉</div>
          
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4\" style={{ color: '#D4AF37' }}>
            הזמנתך נרשמה בהצלחה!
          </h2>

          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-3 sm:mb-4 text-right">
            <p className="text-sm sm:text-base text-gray-700 mb-3">
              להשלמת הרכישה, אנא העבירו תשלום:
            </p>
            
            <div 
              className="text-2xl font-bold text-center py-3 px-4 rounded mb-3"
              style={{ 
                backgroundColor: '#D4AF37',
                color: '#1a1a1a'
              }}
            >
              ₪{bookPrice}
            </div>

            <p className="text-gray-600 text-sm mb-3">
              למספר טלפון: <span className="font-bold">{paymentPhone}</span>
            </p>

            {/* Bit Payment Button */}
            <a
              href={bitPaymentUrl}
              className="block w-full py-2 sm:py-3 px-3 sm:px-4 mb-3 rounded-lg font-bold text-base sm:text-lg transition-all"
              style={{ 
                backgroundColor: '#00A3E0',
                color: 'white'
              }}
            >
              💳 שלם עם Bit
            </a>

            {/* QR Code */}
            <div className="bg-white p-3 sm:p-4 rounded-lg inline-block">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">סרוק לתשלום</p>
              <div className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px]">
                <QRCode 
                  value={bitPaymentUrl}
                  size={180}
                  level="M"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-2 sm:mt-3">
              או שלח ידנית בביט/פייבוקס למספר לעיל
            </p>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            לאחר ביצוע התשלום, הספר יישלח לכתובתך.
          </p>

          <button
            onClick={onClose}
            className="px-6 py-2 border-2 rounded-lg transition-all"
            style={{ 
              borderColor: '#D4AF37',
              color: '#D4AF37'
            }}
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}
