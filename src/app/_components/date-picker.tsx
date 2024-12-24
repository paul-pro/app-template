'use client';

import { CheckCircledIcon, InfoCircledIcon, UpdateIcon } from '@radix-ui/react-icons';
import { Button, Callout, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';

export function DatePicker() {
  const {
    data: currentDate,
    refetch: refetchDate,
    isLoading: isDateLoading,
  } = api.user.getDate.useQuery();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [optimisticDate, setOptimisticDate] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get tomorrow's date for min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Update selected date when currentDate changes
  useEffect(() => {
    if (!currentDate) return;
    try {
      // currentDate is already an ISO string
      const date = new Date(currentDate);
      if (!Number.isNaN(date.getTime())) {
        setSelectedDate(date.toISOString().split('T')[0] ?? '');
      }
    } catch {
      // Invalid date, keep the current selection
    }
  }, [currentDate]);

  const {
    mutate: updateDate,
    isPending: isUpdating,
    error,
  } = api.user.updateDate.useMutation({
    onMutate: () => {
      // Save current date for rollback
      const previousDate = currentDate;
      // Optimistically update the UI
      setOptimisticDate(selectedDate);
      return { previousDate };
    },
    onSuccess: () => {
      void refetchDate();
      setShowSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (err, _, context) => {
      // Rollback on error
      setOptimisticDate(null);
      if (context?.previousDate) {
        const date = new Date(context.previousDate);
        if (!Number.isNaN(date.getTime())) {
          setSelectedDate(date.toISOString().split('T')[0] ?? '');
        }
      }
      console.error('Failed to update date:', err);
    },
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedDate) return;

    try {
      // Create date at noon to avoid timezone issues
      const date = new Date(`${selectedDate}T12:00:00.000Z`);
      if (Number.isNaN(date.getTime())) {
        console.error('Invalid date selected');
        return;
      }

      updateDate({ date });
    } catch (error) {
      console.error('Error submitting date:', error);
    }
  };

  if (isDateLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <UpdateIcon className="h-6 w-6 animate-spin" />
        <Text size="2" color="gray">
          Loading your date...
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            min={minDate}
            onChange={handleDateChange}
            className="rounded-lg border border-gray-300 bg-white p-2 text-black disabled:opacity-50"
            disabled={isUpdating}
          />
          {isUpdating && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
            </div>
          )}
        </div>
        {error && (
          <Callout.Root color="red" role="alert">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              {error.data?.zodError?.fieldErrors.date?.[0] ?? error.message}
            </Callout.Text>
          </Callout.Root>
        )}
        {showSuccess && (
          <Callout.Root color="green">
            <Callout.Icon>
              <CheckCircledIcon />
            </Callout.Icon>
            <Callout.Text>Date updated successfully!</Callout.Text>
          </Callout.Root>
        )}
      </div>
      <Button onClick={handleSubmit} disabled={!selectedDate || isUpdating}>
        {isUpdating ? 'Saving...' : 'Save prediction'}
      </Button>
      {optimisticDate && (
        <Text size="2" color="gray">
          Your date will be set to: {new Date(optimisticDate).toLocaleDateString()}
        </Text>
      )}
    </div>
  );
}
