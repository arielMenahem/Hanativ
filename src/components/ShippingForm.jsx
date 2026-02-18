import { useState } from 'react';

export default function ShippingForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip_code: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const data = await response.json();
      onSuccess(data.paymentPhone, data.bookPrice);
    } catch (err) {
      setError('אירעה שגיאה, אנא נסה שנית.');
      setLoading(false);
    }
  };

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

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6" style={{ color: '#D4AF37' }}>
          טופס הזמנה
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-right mb-1 font-medium text-gray-700">
              שם מלא <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-opacity-50"
              style={{ focusRingColor: '#D4AF37' }}
            />
          </div>

          <div>
            <label className="block text-right mb-1 font-medium text-gray-700">
              אימייל <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-right mb-1 font-medium text-gray-700">
              טלפון <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-right mb-1 font-medium text-gray-700">
              כתובת למשלוח <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-right mb-1 font-medium text-gray-700">
              עיר <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-right mb-1 font-medium text-gray-700">
              מיקוד
            </label>
            <input
              type="text"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-opacity-50"
            />
          </div>

          {error && (
            <div className="text-red-500 text-center text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: '#D4AF37',
              color: '#1a1a1a'
            }}
          >
            {loading ? 'שולח...' : 'שלח הזמנה'}
          </button>
        </form>
      </div>
    </div>
  );
}
