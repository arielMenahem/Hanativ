export default function OrderSuccess({ paymentPhone, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" dir="rtl">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
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
              להשלמת הרכישה, אנא העבירו תשלום בביט או פייבוקס למספר:
            </p>
            
            <div 
              className="text-3xl font-bold text-center py-3 px-4 rounded"
              style={{ 
                backgroundColor: '#D4AF37',
                color: '#1a1a1a'
              }}
            >
              {paymentPhone}
            </div>
          </div>

          <p className="text-gray-600 text-sm">
            לאחר ביצוע התשלום, הספר יישלח לכתובתך.
          </p>

          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 border-2 rounded-lg transition-all"
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
