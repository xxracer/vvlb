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
import { SentMessagesTab } from './SentMessagesTab';
import { SmartDonkey } from './SmartDonkey';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Filter, Users, LogOut, MessageSquare, History, Sparkles, Scissors } from 'lucide-react';

interface SendResult {
  total: number;
  sent: number;
  failed: number;
  results?: { phone: string; success: boolean; error?: string }[];
}

export interface SentMessage {
  id: string;
  sentAt: string;
  message: string;
  total: number;
  sent: number;
  failed: number;
  recipients: {
    phone: string;
    firstName: string;
    success: boolean;
    error?: string;
  }[];
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
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('send');
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [services, setServices] = useState<{ id: number; name: string; category?: string }[]>([]);

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
      if (selectedServiceId) {
        url += `&appointmentTypeID=${selectedServiceId}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load contacts');
      }

      setContacts(data);
      setHasLoaded(true);
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
    let cancelled = false;
    const loadServices = async () => {
      try {
        const response = await fetch('/api/admin/services');
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to load services');
        if (!cancelled) setServices(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        toast({ title: 'Error loading services', description: message, variant: 'destructive' });
      }
    };
    loadServices();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [serviceFilter]);

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
      setSelectedIds(new Set(displayedContacts.map((c) => c.id)));
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

  const selectedServiceId = useMemo(
    () => services.find((s) => s.name === serviceFilter)?.id,
    [services, serviceFilter]
  );

  const serviceOptions = useMemo(() => {
    return services.map((s) => s.name).sort();
  }, [services]);

  const displayedContacts = useMemo(() => {
    if (serviceFilter === 'all') return contacts;
    return contacts.filter((c) =>
      c.lastAppointmentType?.toLowerCase().trim() === serviceFilter.toLowerCase()
    );
  }, [contacts, serviceFilter]);

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
      const historyEntry: SentMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        sentAt: new Date().toISOString(),
        message: message.trim(),
        total: data.total,
        sent: data.sent,
        failed: data.failed,
        recipients: selectedContacts.map((c, index) => ({
          phone: c.phone,
          firstName: c.firstName,
          success: data.results?.[index]?.success ?? true,
          error: data.results?.[index]?.error,
        })),
      };
      setSentMessages((prev) => [historyEntry, ...prev]);
      setActiveTab('history');
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
    <div className="container mx-auto max-w-6xl px-2 py-3 sm:px-4 sm:py-8">
      <div className="mb-4 flex items-start justify-between gap-3 sm:mb-6">
        <div className="min-w-0">
          <h1 className="text-lg font-bold sm:text-xl lg:text-2xl">SMS Admin</h1>
          <p className="text-xs text-muted-foreground sm:text-sm">Send SMS messages to Acuity contacts.</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="flex-shrink-0">
          <LogOut className="mr-1.5 h-4 w-4" /> <span className="hidden sm:inline">Sign out</span><span className="sm:hidden">Out</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2 sm:mb-6 sm:w-auto sm:grid-cols-none sm:bg-muted">
          <TabsTrigger value="send" className="gap-1.5 text-xs sm:text-sm">
            <MessageSquare className="h-4 w-4" />
            <span>Send SMS</span>
            {selectedContacts.length > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#D8006E] px-1.5 text-[10px] font-bold text-white">
                {selectedContacts.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-1.5 text-xs sm:text-sm">
            <History className="h-4 w-4" />
            <span>Sent Messages</span>
            {sentMessages.length > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#7400D8] px-1.5 text-[10px] font-bold text-white">
                {sentMessages.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="mt-0 space-y-4 sm:space-y-6">
          {/* Filters */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-end">
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

              {serviceOptions.length > 0 && (
                <div className="space-y-1">
                  <Label htmlFor="service-filter" className="text-xs sm:text-sm flex items-center gap-1">
                    <Scissors className="h-3 w-3" /> Service
                  </Label>
                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger id="service-filter" className="w-full sm:w-48">
                      <SelectValue placeholder="All services" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All services</SelectItem>
                      {serviceOptions.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <Button
              id="filter-contacts-btn"
              onClick={fetchContacts}
              disabled={loading}
              variant="default"
              className={cn(
                'w-full sm:w-auto',
                !hasLoaded && 'animate-pulse ring-2 ring-[#D8006E] ring-offset-2'
              )}
            >
              <Filter className={cn('mr-2 h-4 w-4', loading && 'animate-spin')} />
              Filter
            </Button>
          </div>

          <SmartDonkey
            mode={!hasLoaded ? 'filter-first' : null}
            highlightFilterButton={!hasLoaded}
          />

          {serviceFilter !== 'all' && (
            <div className="flex items-center gap-2 rounded-md bg-[#ffe5ec]/70 px-3 py-2 text-xs text-[#D8006E]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                Showing <strong>{displayedContacts.length}</strong> contacts with <strong>{serviceFilter}</strong>
              </span>
            </div>
          )}

          <div className="grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-[1fr_minmax(320px,_380px)]">
            <Card className="order-2 min-w-0 lg:order-1">
              <CardHeader className="space-y-1 pb-2 pt-4 sm:space-y-1.5 sm:pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Users className="h-5 w-5" />
                  Contacts
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {displayedContacts.length} of {contacts.length} contact{contacts.length === 1 ? '' : 's'} loaded from Acuity.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <ContactsTable
                  contacts={displayedContacts}
                  selectedIds={selectedIds}
                  loading={loading}
                  onToggle={handleToggle}
                  onToggleAll={handleToggleAll}
                />
              </CardContent>
            </Card>

            <div className="order-1 min-w-0 space-y-4 sm:space-y-6 lg:order-2">
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
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <SentMessagesTab messages={sentMessages} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
