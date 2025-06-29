'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store'; // adjust path as needed
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  children?: { label: string; href: string }[];
};

// Menu definitions for each role
const userMenu: MenuItem[] = [
  {
    label: '制作物一覧',
    icon: <DocumentIcon className="w-5 h-5" />,
    children: [
      { label: '請求書', href: '/invoice' },
      { label: 'DM', href: '/dm' },
      { label: 'チラシ', href: '/flyer' },
      { label: 'クーポン', href: '/coupon' },
    ],
  },
  {
    label: '新規作成',
    icon: <PlusCircleIcon className="w-5 h-5" />,
    children: [
      { label: '請求書', href: '/add-invoice' },
      { label: 'DM', href: '/add-dm' },
      { label: 'チラシ', href: '/add-flyer' },
      { label: 'クーポン', href: '/add-coupon' },
    ],
  },
  { label: '取引先管理', icon: <UsersIcon className="w-5 h-5" /> },
  { label: '各種設定', icon: <Cog6ToothIcon className="w-5 h-5" /> },
];

const adminMenu: MenuItem[] = [
  { label: '制作物一覧', icon: <DocumentIcon className="w-5 h-5" /> },
  { label: '完了済み作業履歴', icon: <PlusCircleIcon className="w-5 h-5" /> },
  { label: '作業マニュアル', icon: <UsersIcon className="w-5 h-5" /> },
  { label: '各種設定', icon: <Cog6ToothIcon className="w-5 h-5" /> },
];

const superadminMenu: MenuItem[] = [
  { label: 'ユーザー管理', icon: <DocumentIcon className="w-5 h-5" /> },
  { label: '完了済み作業履歴', icon: <PlusCircleIcon className="w-5 h-5" /> },
  { label: 'NPO法人管理', icon: <UsersIcon className="w-5 h-5" /> },
  { label: '各種設定', icon: <Cog6ToothIcon className="w-5 h-5" /> },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState<string | null>('制作物一覧');
  const role = useSelector((state: RootState) => state.auth.role);

  // Choose menu based on role
  let menu: MenuItem[] = [];
  if (role === 'superadmin') {
    menu = superadminMenu;
  } else if (role === 'admin') {
    menu = adminMenu;
  } else if (role === 'user') {
    menu = userMenu;
  }

  const toggleExpand = (label: string) => {
    setExpanded(expanded === label ? null : label);
  };

  if (!role) return null; // or show loading/guest view

  return (
    <div className="w-64 border-r border-gray-300 h-screen p-4 bg-white">
      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.label}>
            <button
              className="flex items-center justify-between w-full text-left hover:bg-gray-100 p-2 rounded-md"
              onClick={() => item.children ? toggleExpand(item.label) : null}
            >
              <div className="flex items-center space-x-2">
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
              {item.children &&
                (expanded === item.label ? (
                  <ChevronDownIcon className="w-4 h-4" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4" />
                ))}
            </button>
            {item.children && expanded === item.label && (
              <ul className="ml-8 mt-1 space-y-1">
                {item.children.map((child) => (
                  <li key={child.label}>
                    <Link href={child.href}>
                      <span className="block text-sm text-gray-700 hover:text-black hover:underline cursor-pointer">
                        {child.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
