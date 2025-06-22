'use client'; // 重要：App Router で hooks を使うときに必要

import { useRouter } from 'next/navigation';
import React from 'react';

const RegistrationComplete = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/auth/signin');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <h1 className="text-xl font-semibold mb-4">登録が完了しました</h1>
      <p className="text-gray-600 mb-6">以下のボタンをクリックしてログインしてください。</p>
      <button
        onClick={handleLoginClick}
        className="px-5 py-2 border border-gray-500 rounded hover:bg-gray-100 transition"
      >
        ログイン
      </button>
    </div>
  );
};

export default RegistrationComplete;
