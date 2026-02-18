import { useState } from "react";
import "./App.css";
import ShippingForm from "./components/ShippingForm";
import OrderSuccess from "./components/OrderSuccess";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentPhone, setPaymentPhone] = useState('');
  const [bookPrice, setBookPrice] = useState('100');

  const handleOrderSuccess = (phone, price) => {
    setPaymentPhone(phone);
    setBookPrice(price);
    setShowForm(false);
    setOrderSuccess(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setOrderSuccess(false);
  };

  return (
    <div className="min-h-screen relative" dir="rtl">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 md:top-8 md:right-12 text-right px-2 sm:px-0">
        <h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
          style={{ color: '#D4AF37', fontFamily: 'serif' }}
        >
          הנתיב לצופן הבורא
        </h1>
        <p 
          className="text-lg sm:text-xl md:text-2xl mt-2"
          style={{ color: '#D4AF37', fontFamily: 'serif' }}
        >
          מאיה אשרף
        </p>
        
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-6 px-6 sm:px-8 py-2 sm:py-3 border-2 rounded-lg transition-all duration-300 hover:bg-opacity-90 text-base sm:text-lg md:text-xl"
          style={{ 
            borderColor: '#D4AF37',
            color: '#D4AF37',
            fontFamily: 'serif',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#D4AF37';
            e.currentTarget.style.color = '#1a1a1a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#D4AF37';
          }}
        >
          קנה את הספר
        </button>
      </div>

      {showForm && (
        <ShippingForm 
          onClose={handleClose}
          onSuccess={handleOrderSuccess}
        />
      )}

      {orderSuccess && (
        <OrderSuccess 
          paymentPhone={paymentPhone}
          bookPrice={bookPrice}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;
