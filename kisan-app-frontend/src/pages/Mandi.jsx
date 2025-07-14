// src/pages/MandiPage.jsx

import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

const MandiPage = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get('/mandi');
        setRates(res.data.rates || []);
      } catch (err) {
        console.error('Failed to fetch mandi data');
      }
    };
    fetchRates();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Mandi Rate Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-xl bg-white shadow">
          <thead className="bg-green-200 text-gray-700">
            <tr>
              <th className="p-2 text-left">Commodity</th>
              <th className="p-2 text-left">Price (Rs)</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((r) => (
              <tr key={r._id} className="border-b hover:bg-green-50">
                <td className="p-2">{r.commodity}</td>
                <td className="p-2">{r.price}</td>
                <td className="p-2">{r.location}</td>
                <td className="p-2">{new Date(r.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MandiPage;
