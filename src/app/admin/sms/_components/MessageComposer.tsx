'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, Send, User } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
    <div className="space-y-3 rounded-lg border bg-white p-3 shadow-sm sm:space-y-4 sm:p-4">
      <div className="space-y-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Label htmlFor="sms-message" className="text-sm">Message</Label>
          <Button type="button" variant="outline" size="sm" onClick={insertFirstName} className="w-full sm:w-auto">
            <User className="mr-1 h-3 w-3" />
            Insert {'{{firstName}}'}
          </Button>
        </div>
        <Textarea
          id="sms-message"
          placeholder="Hi {{firstName}}, it's Vanessa from Viva La Beauty. Reply STOP to opt out."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          rows={4}
          className="min-h-[80px] resize-none text-base sm:text-sm"
          maxLength={2000}
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

      <Alert variant="default" className="bg-amber-50 py-2 text-xs sm:py-3 sm:text-sm">
        <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
        <AlertTitle>TCPA</AlertTitle>
        <AlertDescription className="text-xs sm:text-sm">
          Only send to opted-in contacts. Include opt-out instructions.
        </AlertDescription>
      </Alert>

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
