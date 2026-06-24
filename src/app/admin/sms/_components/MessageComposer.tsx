'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, User } from 'lucide-react';
import { SmartDonkey, SmartDonkeyMode } from './SmartDonkey';

interface MessageComposerProps {
  message: string;
  selectedCount: number;
  sending: boolean;
  previewNames?: string[];
  onMessageChange: (value: string) => void;
  onSend: () => void;
}

function countSegments(text: string): number {
  if (text.length === 0) return 0;
  if (text.length <= 160) return 1;
  return Math.ceil(text.length / 153);
}

function personalizeMessage(template: string, firstName: string): string {
  return template.replace(/\{\{firstName\}\}/gi, firstName.trim() || 'there');
}

const LONG_MESSAGE_THRESHOLD = 6;

export function MessageComposer({
  message,
  selectedCount,
  sending,
  previewNames = [],
  onMessageChange,
  onSend,
}: MessageComposerProps) {
  const segments = countSegments(message);
  const canSend = message.trim().length > 0 && selectedCount > 0 && !sending;

  // Detect any case-insensitive variant of {{firstName}}.
  const hasFirstNameVariable = /\{\{firstName\}\}/i.test(message);

  const previewSamples = previewNames.slice(0, 2).filter(Boolean);
  const remainingPreviews = Math.max(0, previewNames.length - previewSamples.length);

  const [smartDonkeyMode, setSmartDonkeyMode] = useState<SmartDonkeyMode>(null);
  const [dismissed, setDismissed] = useState(false);

  // Decide which SmartDonkey hint (if any) should be shown.
  useEffect(() => {
    const trimmed = message.trim();
    let nextMode: SmartDonkeyMode = null;

    if (trimmed.length > 0 && selectedCount === 0) {
      nextMode = 'no-contact';
    } else if (trimmed.length >= LONG_MESSAGE_THRESHOLD && !hasFirstNameVariable && selectedCount > 0) {
      nextMode = 'missing-firstname';
    }

    setSmartDonkeyMode(nextMode);
    if (nextMode) {
      // Show again whenever the blocking condition (re)appears.
      setDismissed(false);
    }
  }, [message, selectedCount, hasFirstNameVariable]);

  const insertFirstName = () => {
    const textarea = document.getElementById('sms-message') as HTMLTextAreaElement | null;
    const start = textarea?.selectionStart ?? message.length;
    const end = textarea?.selectionEnd ?? message.length;
    const before = message.slice(0, start);
    const after = message.slice(end);
    const newMessage = `${before}{{firstName}}${after}`;
    onMessageChange(newMessage);

    setTimeout(() => {
      if (textarea) {
        const newCursor = start + 12; // length of "{{firstName}}"
        textarea.focus();
        textarea.setSelectionRange(newCursor, newCursor);
      }
    }, 0);
  };

  return (
    <div className="space-y-2 rounded-lg border bg-white p-2 shadow-sm sm:space-y-3 sm:p-4">
        <div className="space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Label htmlFor="sms-message" className="text-sm">Message</Label>
            <Button
              id="insert-firstname-button"
              type="button"
              variant="outline"
              size="sm"
              onClick={insertFirstName}
              className={`w-full touch-manipulation overflow-hidden text-ellipsis whitespace-nowrap sm:w-auto ${
                smartDonkeyMode === 'missing-firstname'
                  ? 'animate-pulse ring-2 ring-[#D8006E] ring-offset-1'
                  : ''
              }`}
            >
              <User className="mr-1 h-3 w-3 flex-shrink-0" />
              <span className="hidden sm:inline">Insert {'{{firstName}}'}</span>
              <span className="sm:hidden">Insert Name</span>
            </Button>
          </div>
          <Textarea
            id="sms-message"
            placeholder="Hi {{firstName}}, it's Vanessa from Viva La Beauty."
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            rows={3}
            className="min-h-[72px] resize-none text-sm"
            maxLength={1600}
          />
          <div className="flex justify-between text-xs text-muted-foreground sm:text-sm">
            <span>{message.length} chars</span>
            <span>
              {segments} segment{segments === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {hasFirstNameVariable && previewSamples.length > 0 && (
          <div className="rounded-md bg-blue-50 p-2 text-xs sm:p-3 sm:text-sm">
            <p className="font-medium text-blue-900">Preview{previewSamples.length > 1 ? 's' : ''}:</p>
            <ul className="mt-1 space-y-1">
              {previewSamples.map((name, index) => {
                const personalized = personalizeMessage(message, name);
                return (
                  <li key={index} className="text-blue-800">
                    <span className="font-medium">{name}:</span> {personalized}
                  </li>
                );
              })}
            </ul>
            {remainingPreviews > 0 && (
              <p className="mt-1 text-[10px] text-blue-600 sm:text-xs">
                +{remainingPreviews} more will get personalized messages.
              </p>
            )}
          </div>
        )}

        {hasFirstNameVariable && previewSamples.length === 0 && (
          <p className="text-xs text-amber-600 sm:text-sm">Select a contact to preview.</p>
        )}

        {!hasFirstNameVariable && message.trim().length > 0 && (
          <p className="text-xs text-muted-foreground">
            Tip: Use <code className="rounded bg-muted px-1">{'{{firstName}}'}</code> to personalize.
          </p>
        )}

        <SmartDonkey
          mode={dismissed ? null : smartDonkeyMode}
          highlightInsertButton={smartDonkeyMode === 'missing-firstname'}
          onClose={() => setDismissed(true)}
        />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-muted-foreground sm:text-sm">
            {selectedCount} selected
          </span>
          <Button onClick={onSend} disabled={!canSend} className="w-full sm:w-auto">
            <Send className="mr-2 h-4 w-4" />
            {sending ? 'Sending...' : 'Send SMS'}
          </Button>
        </div>
      </div>
  );
}
