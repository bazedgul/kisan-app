import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaLock, FaKey, FaPhone, FaGlobe } from "react-icons/fa";

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ phone: "", password: "", otp: "" });
  const [method, setMethod] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      localStorage.setItem('token', 'demo-token-123');

      if (method === "password") {
        // const res = await axios.post("/auth/login", {
        //   phone: form.phone,
        //   password: form.password,
        // });

        localStorage.setItem('token', 'demo-token');
        navigate('/dashboard');
      } else {
        await axios.post("/auth/send-otp", { phone: form.phone });
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/auth/verify-otp", {
        phone: form.phone,
        otp: form.otp,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 w-full max-w-md space-y-6 border border-green-200"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
      >
        <h2 className="text-3xl font-bold text-center text-green-700">
          {t("loginTitle")}
        </h2>

        {error && (
          <div className="text-red-600 bg-red-100 px-3 py-2 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm flex items-center gap-2 font-medium text-gray-600">
            <FaPhone /> {t("phone")}
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

        {method === "password" && (
          <div className="space-y-2">
            <label className="text-sm flex items-center gap-2 font-medium text-gray-600">
              <FaLock /> {t("password")}
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
        )}

        {method === "otp" && step === 2 && (
          <div className="space-y-2">
            <label className="text-sm flex items-center gap-2 font-medium text-gray-600">
              <FaKey /> {t("otp")}
            </label>
            <input
              type="text"
              name="otp"
              value={form.otp}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter OTP"
            />
          </div>
        )}

        <div className="flex justify-between items-center text-sm mt-2 text-gray-600">
          <button
            className="flex items-center gap-1 hover:underline"
            onClick={() =>
              setMethod(method === "password" ? "otp" : "password")
            }
          >
            {method === "password" ? t("useOtp") : t("usePassword")}
          </button>

          <select
            className="text-sm border px-2 py-1 rounded-xl"
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            defaultValue={i18n.language}
          >
            <option value="en">🇬🇧 English</option>
            <option value="ur">🇵🇰 اردو</option>
            <option value="sd">🇵🇰 سنڌي</option>
          </select>
        </div>

        <button
          onClick={
            method === "otp" && step === 2 ? handleVerifyOTP : handleLogin
          }
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl mt-4 transition"
        >
          {loading
            ? t("loading")
            : method === "otp" && step === 2
            ? t("verifyOtp")
            : t("login")}
        </button>

        <div className="text-center text-sm text-gray-500 mt-2">
          <span>{t("noAccount")}</span>{" "}
          <button
            className="text-green-700 hover:underline font-medium"
            onClick={() => navigate("/register")}
          >
            {t("signup")}
          </button>
        </div>
        <div className="text-center text-sm text-blue-600 mt-2">
          <button
            onClick={() => navigate("/forgot-password")}
            className="hover:underline"
          >
            {t("forgot-Password")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
