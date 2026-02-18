import QRCode from "react-qr-code";

export default function OrderSuccess({ paymentPhone, bookPrice, onClose }) {
  // Create Bit payment link
  const bitPaymentUrl = `bit://pay?phone=${encodeURIComponent(paymentPhone)}&amount=${bookPrice}&description=${encodeURIComponent('ספר הנתיב לצופן הבורא')}`;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" dir="rtl">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl"
          type="button"
        >
          ×
        </button>

        <div className="text-center">
          <div className="text-5xl mb-4">🎉</div>
          
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#D4AF37' }}>
            הזמנתך נרשמה בהצלחה!
          </h2>

          <div className="bg-gray-50 p-6 rounded-lg mb-4 text-right">
            <p className="text-gray-700 mb-3">
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
              className="block w-full py-3 px-4 mb-3 rounded-lg font-bold text-lg transition-all"
              style={{ 
                backgroundColor: '#00A3E0',
                color: 'white'
              }}
            >
              💳 שלם עם Bit
            </a>

            {/* QR Code */}
            <div className="bg-white p-4 rounded-lg inline-block">
              <p className="text-sm text-gray-600 mb-2">סרוק לתשלום</p>
              <QRCode 
                value={bitPaymentUrl}
                size={180}
                level="M"
              />
            </div>

            <p className="text-xs text-gray-500 mt-3">
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
