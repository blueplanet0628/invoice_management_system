'use client';

import React, { useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

const RegistrationForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    representative: "",
    company: "",
    department: "",
    postalCode: "",
    address: "",
    building: "",
    email: "",
    phone: "",
    password: "",
    repassword: "",
    agree: false,
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checkbox.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.password != formData.repassword) {
      alert("パスワードを確認してください")
    } else{
      if (!formData.agree) {
        alert("プライバシーポリシーへの同意が必要です。");
        return;
      } else {
        const res = axios.post('http://localhost:9000/users', formData)
        .then((res) => {
          router.push('/auth/signup-success');
          console.log(res.data);
          setFormData({
            representative: "",
            company: "",
            department: "",
            postalCode: "",
            address: "",
            building: "",
            email: "",
            phone: "",
            password: "",
            repassword: "",
            agree: false,
          });
        })
        .catch((err) => {
          console.error(err);
        });
        
      }
    }
    // Submit logic here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <h2 className="text-center text-xl font-semibold mb-6">
        新規会員登録を行います
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              代表者名 <span className="text-red-500">必須</span>
            </label>
            <input
              name="representative"
              value={formData.representative}
              onChange={handleChange}
              placeholder="代表者名を入力"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              会社名 <span className="text-red-500">必須</span>
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="会社名を入力"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              郵便番号 <span className="text-red-500">必須</span>
            </label>
            <input
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="郵便番号を入力"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              都道府県・市区町村・番地 <span className="text-red-500">必須</span>
            </label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="都道府県・市区町村・番地を入力"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">建物・部屋番号</label>
            <input
              name="building"
              value={formData.building}
              onChange={handleChange}
              placeholder="建物・部屋番号を入力"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              メールアドレス <span className="text-red-500">必須</span>
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="メールアドレスを入力"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              電話番号 <span className="text-red-500">必須</span>
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="080-1111-1111"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              部署名 <span className="text-red-500">必須</span>
            </label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="部署名を入力"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              パスワード <span className="text-red-500">必須</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="パスワードを入力"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

        <div>
    <label className="block text-sm font-medium text-gray-700">
      パスワードを認証 <span className="text-red-500">必須</span>
    </label>
    <input
      type="password"
      name="repassword"
      value={formData.repassword}
      onChange={handleChange}
      placeholder="パスワードを認証を入力"
      className="w-full border border-gray-300 p-2 rounded"
      required
    />
  </div>
</div>

      </div>

      {/* Agreement + Submit */}
      <div className="mt-6 text-sm">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mr-2"
          />
          利用規約、プライバシーポリシーに同意します。
        </label>
      </div>

      <div className="mt-4 text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          登録する
        </button>
      </div>

      <a
        href="/auth/signin"
        className="block mt-4 text-center text-sm text-gray-600 hover:underline"
      >
        すでに会員登録されている方はこちら
      </a>
    </form>
  );
};

export default RegistrationForm;
