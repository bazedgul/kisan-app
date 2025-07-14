import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = phone, 2 = otp, 3 = new password
  const [form, setForm] = useState({
    phone: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('/auth/send-otp', { phone: form.phone });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/auth/verify-otp', {
        phone: form.phone,
        otp: form.otp,
      });
      setToken(res.data.token); // temporary access
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (form.newPassword !== form.confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    setLoading(true);
    setError('');
    try {
      await axios.post(
        '/auth/reset-password',
        {
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">
          {t('forgotPassword')}
        </h2>

        {error && (
          <div className="text-red-600 bg-red-100 px-3 py-2 rounded-xl text-sm">
            {error}
          </div>
        )}

        {step === 1 && (
          <>
            <label className="text-sm">{t('phone')}</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 mt-1"
              placeholder="+923001234567"
            />

            <button
              onClick={sendOTP}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
            >
              {loading ? t('loading') : t('sendOtp')}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="text-sm">{t('otp')}</label>
            <input
              type="text"
              name="otp"
              value={form.otp}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 mt-1"
              placeholder="123456"
            />

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
            >
              {loading ? t('loading') : t('verifyOtp')}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <label className="text-sm">{t('newPassword')}</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 mt-1"
              placeholder="••••••••"
            />

            <label className="text-sm mt-2">{t('confirmPassword')}</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 mt-1"
              placeholder="••••••••"
            />

            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl mt-4"
            >
              {loading ? t('loading') : t('resetPassword')}
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;
