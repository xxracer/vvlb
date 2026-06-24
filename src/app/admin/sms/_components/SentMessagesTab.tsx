'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronDown, ChevronUp, MessageCircle, Phone, Clock, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { SentMessage } from './SmsDashboard';

interface SentMessagesTabProps {
  messages: SentMessage[];
}

function StatusBadge({ sent, failed, total }: { sent: number; failed: number; total: number }) {
  if (failed === 0) {
    return (
      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
        <CheckCircle2 className="mr-1 h-3 w-3" /> {sent}/{total} sent
      </Badge>
    );
  }
  if (sent === 0) {
    return (
      <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
        <AlertCircle className="mr-1 h-3 w-3" /> {failed}/{total} failed
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
      <Send className="mr-1 h-3 w-3" /> {sent} sent, {failed} failed
    </Badge>
  );
}

function RecipientRow({ recipient }: { recipient: SentMessage['recipients'][number] }) {
  return (
    <div className="flex items-start justify-between gap-2 rounded-md bg-white/60 p-2 text-sm">
      <div className="min-w-0">
        <p className="truncate font-medium text-neutral-900">{recipient.firstName || 'Unknown'}</p>
        <p className="truncate text-xs text-muted-foreground">{recipient.phone}</p>
      </div>
      {recipient.success ? (
        <span className="flex-shrink-0 text-xs font-medium text-green-600">Sent</span>
      ) : (
        <span className="flex-shrink-0 text-xs font-medium text-red-600" title={recipient.error}>Failed</span>
      )}
    </div>
  );
}

function MobileCard({ message }: { message: SentMessage }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden border-[#D8006E]/10">
      <CardHeader className="space-y-2 p-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-1.5 text-sm font-semibold">
              <MessageCircle className="h-4 w-4 text-[#D8006E]" />
              <span className="truncate">{format(new Date(message.sentAt), 'MMM d, yyyy • h:mm a')}</span>
            </CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3" /> {message.recipients.length} recipient{message.recipients.length === 1 ? '' : 's'}
            </CardDescription>
          </div>
          <StatusBadge sent={message.sent} failed={message.failed} total={message.total} />
        </div>      </CardHeader>
      <CardContent className="space-y-3 p-3 pt-0">
        <div className="rounded-lg bg-[#ffe5ec]/50 p-2.5">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-800">{message.message}</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded((v) => !v)}
          className="h-8 w-full justify-between text-xs"
        >
          <span className="flex items-center gap-1">
            <Phone className="h-3 w-3" /> {expanded ? 'Hide' : 'Show'} recipients
          </span>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {expanded && (
          <ScrollArea className="h-auto max-h-64 rounded-md border bg-neutral-50/50 p-1">
            <div className="space-y-1">
              {message.recipients.map((r) => (
                <RecipientRow key={r.phone} recipient={r} />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

function DesktopRow({ message }: { message: SentMessage }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <TableRow className="cursor-pointer hover:bg-neutral-50/60" onClick={() => setExpanded((v) => !v)}>
        <TableCell className="max-w-xs truncate text-sm font-medium">
          {format(new Date(message.sentAt), 'MMM d, yyyy • h:mm a')}
        </TableCell>
        <TableCell className="max-w-md">
          <p className="truncate text-sm text-neutral-700">{message.message}</p>
        </TableCell>
        <TableCell className="text-sm">{message.recipients.length}</TableCell>
        <TableCell>
          <StatusBadge sent={message.sent} failed={message.failed} total={message.total} />
        </TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow className="bg-neutral-50/40">
          <TableCell colSpan={5} className="p-0">
            <div className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-3">
              {message.recipients.map((r) => (
                <RecipientRow key={r.phone} recipient={r} />
              ))}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export function SentMessagesTab({ messages }: SentMessagesTabProps) {
  if (messages.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe5ec]">
            <Send className="h-8 w-8 text-[#D8006E]" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">No messages sent yet</h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Once you send your first SMS, it will appear here with the message text and recipients.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="block sm:hidden space-y-3">
        {messages.map((m) => (
          <MobileCard key={m.id} message={m} />
        ))}
      </div>

      <div className="hidden sm:block">
        <Card className="overflow-hidden">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((m) => (
                <DesktopRow key={m.id} message={m} />
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
