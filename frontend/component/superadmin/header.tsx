'use client';

import React, { useState } from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';

type Status = 'すべて' | '下書き' | '請求済' | '入金済';
type DateType = '請求日' | '期限日';

const statuses: Status[] = ['すべて', '下書き', '請求済', '入金済'];

export default function SuperadminHeader() {
  const [status, setStatus] = useState<Status>('すべて');
  const [dateType, setDateType] = useState<DateType>('請求日');

  return (
    <div className="space-y-4 p-4 bg-white text-sm shadow-sm w-full">
      {/* Row 1: Keyword + Amount + Date Type + Dates */}
      superadmin
      <div className="flex flex-col lg:flex-row flex-wrap gap-3 lg:items-center">
        <Input
          placeholder="取引先名・請求書番号を入力"
          className="w-full lg:w-128"
        />

        <div className="flex items-center gap-1">
          <Input type="number" placeholder="金額" className="w-20" />
          <span>円 ～</span>
          <Input type="number" placeholder="金額" className="w-20" />
          <span>円</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-24 text-left">
              {dateType}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setDateType('請求日')}>
              請求日
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateType('期限日')}>
              期限日
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-1">
          <Input type="date" className="w-32" />
          <span>～</span>
          <Input type="date" className="w-32" />
        </div>
      </div>

      {/* Row 2: Status + Search */}
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <span>ステータス：</span>
          {statuses.map((s) => (
            <Button
              key={s}
              variant={status === s ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatus(s)}
            >
              {s}
            </Button>
          ))}
        </div>

        <div className="flex gap-2 mt-2 md:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            検索する
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-500">
            クリアする
          </Button>
        </div>
      </div>

      {/* Row 3: Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <span>1件選択した請求書を</span>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="default">
            送付する
          </Button>
          <Button size="sm" variant="destructive">
            削除する
          </Button>
          <Button size="sm" variant="outline">
            印刷する
          </Button>
        </div>
      </div>

      {/* Row 4: Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-2">
        <select className="border rounded px-2 py-1 text-sm">
          <option value="10">10件</option>
          <option value="20">20件</option>
        </select>

        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost">
            <ChevronLeft />
          </Button>
          <div className="px-2">1-10 / 45</div>
          <Button size="icon" variant="ghost">
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
