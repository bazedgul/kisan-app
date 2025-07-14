import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaLock } from 'react-icons/fa';

const Register = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('/auth/register', {
        name: form.name,
        phone: form.phone,
        password: form.password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || t('registerFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-4">
      <motion.div
        className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 w-full max-w-md space-y-6 border border-green-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-center text-green-700">
          {t('registerTitle')}
        </h2>

        {error && (
          <div className="text-red-600 bg-red-100 px-3 py-2 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm flex items-center gap-2 font-medium text-gray-600">
            <FaUser /> {t('name')}
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400 outline-none"
            placeholder={t('name')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm flex items-center gap-2 font-medium text-gray-600">
            <FaPhone /> {t('phone')}
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="+923001234567"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm flex items-center gap-2 font-medium text-gray-600">
            <FaLock /> {t('password')}
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm flex items-center gap-2 font-medium text-gray-600">
            <FaLock /> {t('confirmPassword')}
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="••••••••"
          />
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <button
            className="text-green-700 hover:underline"
            onClick={() => navigate('/login')}
          >
            {t('alreadyAccount')}
          </button>

          <select
            className="text-sm border px-2 py-1 rounded-xl"
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            defaultValue={i18n.language}
          >
            <option value="en">🇬🇧 EN</option>
            <option value="ur">🇵🇰 اردو</option>
            <option value="sd">🇵🇰 سنڌي</option>
          </select>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl mt-4"
        >
          {loading ? t('loading') : t('register')}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Register;
