import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // Add your login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <h2 className="text-center text-xl font-semibold">ログイン</h2>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">メールアドレス</label>
          <input
            type="email"
            name="email"
            placeholder="メールアドレスを入力"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1">パスワード</label>
          <input
            type="password"
            name="password"
            placeholder="パスワードを入力"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full border border-gray-500 rounded px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
          >
            ログイン
          </button>
        </div>

        {/* Links */}
        <div className="text-center text-sm space-y-1">
          <a
            href="/auth/forgot-password"
            className="text-gray-600 hover:underline block"
          >
            パスワードをお忘れの方はこちら
          </a>
          <a
            href="/auth/signup"
            className="text-gray-600 hover:underline block"
          >
            新規会員登録の方はこちら
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
