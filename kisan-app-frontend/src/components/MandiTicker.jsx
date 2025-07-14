// src/components/MandiTicker.jsx

const MandiTicker = () => {
  const demoRates = [
    { commodity: 'گندم', price: 4200, location: 'Tando Bago' },
    { commodity: 'چاول', price: 5500, location: 'Badin' },
    { commodity: 'کپاس', price: 7800, location: 'Hyderabad' },
    { commodity: 'گنا', price: 250, location: 'Sanghar' },
  ];

  return (
    <div className="bg-green-200 overflow-hidden py-2 px-4 shadow-inner whitespace-nowrap">
      <div className="inline-block animate-marquee space-x-10 text-sm font-medium text-gray-800">
        {demoRates.map((rate, idx) => (
          <span key={idx}>
            📍 {rate.location} — {rate.commodity}: Rs {rate.price}/40kg
          </span>
        ))}
      </div>
    </div>
  );
};

export default MandiTicker;
