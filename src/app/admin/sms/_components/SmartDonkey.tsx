'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, AlertCircle, UserCircle } from 'lucide-react';

export type SmartDonkeyMode = 'no-contact' | 'missing-firstname' | 'filter-first' | null;

interface SmartDonkeyProps {
  mode: SmartDonkeyMode;
  highlightInsertButton?: boolean;
  highlightFilterButton?: boolean;
  onClose?: () => void;
}

const MESSAGES: Record<NonNullable<SmartDonkeyMode>, string> = {
  'no-contact': "Hi, I'm SmartDonkey! I'm here to help. Please select a contact first.",
  'missing-firstname':
    "Hey, remember to select this button so you can personalize the message for your clients.",
  'filter-first':
    "Hi, I'm SmartDonkey! Choose your filters and tap the Filter button to load your contacts before sending.",
};

export function SmartDonkey({ mode, highlightInsertButton, highlightFilterButton, onClose }: SmartDonkeyProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!mode || dismissed) return null;

  const handleClose = () => {
    setDismissed(true);
    onClose?.();
  };

  const isNoContact = mode === 'no-contact';
  const isFilterFirst = mode === 'filter-first';

  return (
    <div
      className="animate-in slide-in-from-bottom-3 fade-in duration-300 flex items-start gap-2 rounded-xl border bg-white p-2 shadow-md sm:items-end sm:gap-3 sm:rounded-2xl sm:p-3 sm:shadow-lg"
      role="status"
      aria-live="polite"
    >
      <div className="relative h-12 w-12 flex-shrink-0 sm:h-16 sm:w-16">
        <Image
          src="https://static.wixstatic.com/media/c5947c_cfc87c9598f342019a9158da7e0aa57d~mv2.png"
          alt="SmartDonkey assistant"
          fill
          sizes="(max-width: 640px) 56px, 64px"
          className="object-contain"
          priority={false}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex-shrink-0">
            {isNoContact || isFilterFirst ? (
              <UserCircle className="h-4 w-4 text-amber-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-[#D8006E]" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-neutral-900 sm:text-sm">
              {isFilterFirst ? 'SmartDonkey' : isNoContact ? 'SmartDonkey' : 'Wait a minute!'}
            </p>
            <p className="break-words text-xs leading-snug text-neutral-700 sm:text-sm">{MESSAGES[mode]}</p>
          </div>
        </div>

        {highlightInsertButton && (
          <div className="mt-1.5 rounded-md bg-[#D8006E]/10 px-2 py-1 text-xs font-semibold text-[#D8006E]">
            <span className="sm:hidden">Tap <strong>Insert Name</strong> above ↑</span>
            <span className="hidden sm:inline">Click the <strong>Insert {'{{firstName}}'}</strong> button above to personalize.</span>
          </div>
        )}

        {highlightFilterButton && (
          <div className="mt-1.5 rounded-md bg-[#D8006E]/10 px-2 py-1 text-xs font-semibold text-[#D8006E]">
            <span className="sm:hidden">Tap the <strong>Filter</strong> button below ↓</span>
            <span className="hidden sm:inline">Click the <strong>Filter</strong> button to load contacts.</span>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleClose}
        className="flex-shrink-0 self-start rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
        aria-label="Dismiss SmartDonkey"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
