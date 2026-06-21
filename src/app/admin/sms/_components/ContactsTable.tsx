'use client';

import { AcuityContact } from '@/lib/acuity-contacts';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

interface ContactsTableProps {
  contacts: AcuityContact[];
  selectedIds: Set<string>;
  loading: boolean;
  onToggle: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
}

export function ContactsTable({
  contacts,
  selectedIds,
  loading,
  onToggle,
  onToggleAll,
}: ContactsTableProps) {
  const allSelected = contacts.length > 0 && contacts.every((c) => selectedIds.has(c.id));
  const someSelected = selectedIds.size > 0 && !allSelected;

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        No contacts with phone numbers found in the selected date range.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Mobile card view */}
      <div className="block sm:hidden">
        <div className="mb-2 flex items-center justify-between rounded-lg border bg-white p-2 shadow-sm">
          <span className="text-xs text-muted-foreground">{contacts.length} contacts</span>
          <div className="flex items-center gap-2">
            <span className="text-xs">Select all</span>
            <Checkbox
              checked={allSelected ? true : someSelected ? 'indeterminate' : false}
              onCheckedChange={(checked) => onToggleAll(checked === true)}
              aria-label="Select all contacts"
            />
          </div>
        </div>
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            className={`cursor-pointer transition-colors ${
              selectedIds.has(contact.id) ? 'border-primary bg-primary/5' : 'border'
            }`}
            onClick={() => onToggle(contact.id)}
          >
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <div className="pt-0.5" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedIds.has(contact.id)}
                    onCheckedChange={() => onToggle(contact.id)}
                    aria-label={`Select ${contact.firstName} ${contact.lastName}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {contact.firstName} {contact.lastName}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">{contact.phone || 'No phone'}</p>
                  {contact.email && (
                    <p className="truncate text-xs text-muted-foreground">{contact.email}</p>
                  )}
                  {contact.lastAppointmentType && (
                    <p className="truncate text-xs text-muted-foreground">{contact.lastAppointmentType}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Last: {contact.lastAppointmentDate || '-'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden rounded-lg border bg-white shadow-sm sm:block">
        <div className="overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 px-4">
                  <Checkbox
                    checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                    onCheckedChange={(checked) => onToggleAll(checked === true)}
                    aria-label="Select all contacts"
                  />
                </TableHead>
                <TableHead className="px-4">Name</TableHead>
                <TableHead className="px-4">Phone</TableHead>
                <TableHead className="hidden px-4 lg:table-cell">Email</TableHead>
                <TableHead className="hidden px-4 xl:table-cell">Service Type</TableHead>
                <TableHead className="px-4 text-right">Last Appt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="px-4">
                    <Checkbox
                      checked={selectedIds.has(contact.id)}
                      onCheckedChange={() => onToggle(contact.id)}
                      aria-label={`Select ${contact.firstName} ${contact.lastName}`}
                    />
                  </TableCell>
                  <TableCell className="px-4 font-medium">
                    {contact.firstName} {contact.lastName}
                  </TableCell>
                  <TableCell className="px-4">{contact.phone || '-'}</TableCell>
                  <TableCell className="hidden px-4 text-muted-foreground lg:table-cell">
                    {contact.email || '-'}
                  </TableCell>
                  <TableCell className="hidden max-w-xs truncate px-4 text-muted-foreground xl:table-cell">
                    {contact.lastAppointmentType || '-'}
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    {contact.lastAppointmentDate || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
