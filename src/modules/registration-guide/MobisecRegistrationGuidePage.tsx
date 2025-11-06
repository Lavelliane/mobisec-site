'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CURRENT_YEAR } from '@/constants/config';
import { Globe2 } from 'lucide-react';

const RegistrationPage = () => {
  // URL bisa kamu ganti ke yang real
  const REG_LOCAL_URL = 'https://kiisc.or.kr/payment/pay'; // base
  const REG_FOREIGN_URL = '/payment'; // misal halaman kamu sendiri

  // buka tab baru
  const goMobiLocal = () => {
    window.open(`${REG_LOCAL_URL}/302`, '_blank', 'noopener,noreferrer');
  };

  const goMobiForeign = () => {
    window.open(`${REG_FOREIGN_URL}?conf=MOBISEC&type=foreign`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="min-h-screen flex flex-col">
      <div className="max-w-5xl mx-auto w-full px-4 py-12 flex-1">
        {/* heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-slate-800 tracking-tight mb-3">
            Conference Registration
          </h1>
          <p className="text-slate-500 text-base">
            Proceed with the registration by selecting one of the options below
          </p>
        </div>

        {/* MobiSec 2024 Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">MobiSec {`${CURRENT_YEAR}`}</h2>
            <div className="h-1 w-20 bg-black/30 rounded-full"></div>
          </div>
          
          {/* MobiSec cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* 1. MobiSec Korea (LOCAL - biru) */}
            <Card className="bg-white border-0 shadow-md rounded-2xl flex flex-col justify-between">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-xl">
                  🇰🇷
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    MobiSec {`${CURRENT_YEAR}`}
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    Residing in Korea
                  </p>
                </div>
              </div>
              <p className="text-slate-700 text-base font-medium mb-6 leading-relaxed">
                For authors and participants who are residing in Korea
              </p>
              <Button
                onClick={goMobiLocal}
                className="mt-auto bg-[#2175ef] hover:bg-[#1744d1] text-white rounded-md h-11"
              >
                MobiSec — Local Registration
              </Button>
            </CardContent>
          </Card>

          {/* 2. MobiSec outside Korea (FOREIGN - kuning) */}
          <Card className="bg-white border-0 shadow-md rounded-2xl flex flex-col justify-between">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Globe2 className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    MobiSec {`${CURRENT_YEAR}`}
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    Outside Korea
                  </p>
                </div>
              </div>
              <p className="text-slate-700 text-base font-medium mb-6 leading-relaxed">
                For authors and participants who are outside Korea
              </p>
              <Button
                onClick={goMobiForeign}
                className="mt-auto bg-[#facc15] hover:bg-[#eab308] text-slate-900 rounded-md h-11"
              >
                MobiSec — Foreign Registration
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>

        {/* notes */}
        <div className="max-w-3xl mx-auto mb-10">
          <ul className="space-y-2 text-slate-600 text-sm">
            <li className="flex gap-2 items-start">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500 inline-block" />
              <span>The registration deadline is December 13, 2025 (KST/JST)</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500 inline-block" />
              <span>Registration for the conference cannot be canceled</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500 inline-block" />
              <span>There is no refund of registration fees</span>
            </li>
          </ul>
        </div>

        {/* contact */}
        <div className="text-center mb-6">
          <p className="text-slate-500 mb-3 text-sm">For inquiries, please contact</p>
          <a
            href="mailto:cyberchair.mobisec@gmail.com"
            className="inline-flex px-6 py-3 bg-black text-white rounded-md text-sm font-medium tracking-wide hover:bg-slate-800 transition-colors"
          >
            cyberchair.mobisec@gmail.com
          </a>
        </div>

        {/* footer */}
        <div className="text-center text-xs text-slate-400 mt-6">
          Copyright © 2025 MobiSec &amp; EBISION. All Rights Reserved
        </div>
      </div>
    </section>
  );
};

export default RegistrationPage;
