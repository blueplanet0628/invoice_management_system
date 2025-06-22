import React, { useState } from "react";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending password reset to:", email);
    // Add your logic to send a password reset email
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md text-center space-y-6">
        {/* Title */}
        <h2 className="text-xl font-semibold">パスワードを忘れた場合</h2>

        {/* Description */}
        <p className="text-sm text-gray-600">
          登録したアカウントのメールアドレスに再設定したパスワードをお送りいたします。
        </p>

        {/* Email input */}
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレスを入力"
          className="w-full border border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full border border-gray-500 rounded px-4 py-2 text-sm hover:bg-gray-100 transition"
        >
          送信する
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
