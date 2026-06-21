'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AcuityContact } from '@/lib/acuity-contacts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ContactsTable } from './ContactsTable';
import { MessageComposer } from './MessageComposer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, Users, LogOut } from 'lucide-react';

interface SendResult {
  total: number;
  sent: number;
  failed: number;
  results?: { phone: string; success: boolean; error?: string }[];
}

export function SmsDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<AcuityContact[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [daysBack, setDaysBack] = useState(90);
  const [sendResult, setSendResult] = useState<SendResult | null>(null);
  const [filterMode, setFilterMode] = useState<'days' | 'month'>('days');

  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);

  const fetchContacts = async () => {
    setLoading(true);
    setSendResult(null);
    try {
      let url = '/api/admin/contacts?';
      if (filterMode === 'month') {
        url += `year=${selectedYear}&month=${selectedMonth}`;
      } else {
        url += `daysBack=${daysBack}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load contacts');
      }

      setContacts(data);
      setSelectedIds(new Set());
      toast({
        title: 'Contacts loaded',
        description: `${data.length} contact${data.length === 1 ? '' : 's'} found.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: 'Error loading contacts',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(contacts.map((c) => c.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const selectedContacts = useMemo(
    () => contacts.filter((c) => selectedIds.has(c.id) && c.phone),
    [contacts, selectedIds]
  );

  const selectedFirstNames = useMemo(
    () => selectedContacts.map((c) => c.firstName).filter(Boolean),
    [selectedContacts]
  );

  const personalizeMessage = (template: string, firstName: string): string => {
    return template.replace(/\{\{firstName\}\}/gi, firstName.trim() || 'there');
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.refresh();
    } catch {
      toast({ title: 'Logout failed', variant: 'destructive' });
    }
  };

  const handleSend = async () => {
    if (selectedContacts.length === 0) {
      toast({
        title: 'No recipients',
        description: 'Select at least one contact with a phone number.',
        variant: 'destructive',
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: 'Message is empty',
        description: 'Write a message before sending.',
        variant: 'destructive',
      });
      return;
    }

    const confirmed = window.confirm(
      `Send personalized SMS to ${selectedContacts.length} recipient${selectedContacts.length === 1 ? '' : 's'}?`
    );
    if (!confirmed) return;

    setSending(true);
    setSendResult(null);

    try {
      const items = selectedContacts.map((contact) => ({
        phone: contact.phone,
        message: personalizeMessage(message.trim(), contact.firstName),
      }));

      const response = await fetch('/api/admin/sms/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send SMS');
      }

      setSendResult(data);
      toast({
        title: 'SMS sent',
        description: `${data.sent} sent, ${data.failed} failed out of ${data.total}.`,
        variant: data.failed > 0 ? 'destructive' : 'default',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: 'Error sending SMS',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-3 py-4 sm:px-4 sm:py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">SMS Admin</h1>
          <p className="text-sm text-muted-foreground sm:text-base">Send SMS messages to Acuity Scheduling contacts.</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-end">
          <Select value={filterMode} onValueChange={(v) => setFilterMode(v as 'days' | 'month')}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="days">Last N days</SelectItem>
              <SelectItem value="month">By month</SelectItem>
            </SelectContent>
          </Select>

          {filterMode === 'days' ? (
            <div className="space-y-1">
              <Label htmlFor="days-back" className="text-xs sm:text-sm">Days back</Label>
              <Input
                id="days-back"
                type="number"
                min={1}
                max={365}
                value={daysBack}
                onChange={(e) => setDaysBack(parseInt(e.target.value || '90', 10))}
                className="w-full sm:w-28"
              />
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <Label htmlFor="year-select" className="text-xs sm:text-sm">Year</Label>
                <Select value={String(selectedYear)} onValueChange={(v) => setSelectedYear(parseInt(v, 10))}>
                  <SelectTrigger id="year-select" className="w-full sm:w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 7 }, (_, i) => currentDate.getFullYear() - 6 + i).map((year) => (
                      <SelectItem key={year} value={String(year)}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="month-select" className="text-xs sm:text-sm">Month</Label>
                <Select value={String(selectedMonth)} onValueChange={(v) => setSelectedMonth(parseInt(v, 10))}>
                  <SelectTrigger id="month-select" className="w-full sm:w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: 1, label: 'January' },
                      { value: 2, label: 'February' },
                      { value: 3, label: 'March' },
                      { value: 4, label: 'April' },
                      { value: 5, label: 'May' },
                      { value: 6, label: 'June' },
                      { value: 7, label: 'July' },
                      { value: 8, label: 'August' },
                      { value: 9, label: 'September' },
                      { value: 10, label: 'October' },
                      { value: 11, label: 'November' },
                      { value: 12, label: 'December' },
                    ].map((m) => (
                      <SelectItem key={m.value} value={String(m.value)}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
        <Button onClick={fetchContacts} disabled={loading} variant="default" className="w-full sm:w-auto">
          <Filter className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Filter
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_minmax(320px,_380px)]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Contacts
            </CardTitle>
            <CardDescription>
              {contacts.length} contact{contacts.length === 1 ? '' : 's'} loaded from Acuity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactsTable
              contacts={contacts}
              selectedIds={selectedIds}
              loading={loading}
              onToggle={handleToggle}
              onToggleAll={handleToggleAll}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <MessageComposer
            message={message}
            selectedCount={selectedContacts.length}
            sending={sending}
            previewNames={selectedFirstNames}
            onMessageChange={setMessage}
            onSend={handleSend}
          />

          {sendResult && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Send summary</CardTitle>
                <CardDescription>
                  {sendResult.sent} sent, {sendResult.failed} failed, {sendResult.total} total
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-64 overflow-auto">
                <ul className="space-y-1 text-sm">
                  {sendResult.results?.map((r) => (
                    <li
                      key={r.phone}
                      className={`flex items-center justify-between rounded px-2 py-1 ${
                        r.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                      }`}
                    >
                      <span>{r.phone}</span>
                      <span>{r.success ? 'Sent' : r.error || 'Failed'}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
