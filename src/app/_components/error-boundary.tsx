'use client';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button, Card, Heading, Text } from '@radix-ui/themes';
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error): void {
    // Log error to an error reporting service
    console.error('Error caught by boundary:', error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Card className="p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
            <Heading size="4">Something went wrong</Heading>
            <Text color="gray" size="2">
              {this.state.error?.message ?? 'An unexpected error occurred'}
            </Text>
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              Try again
            </Button>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}
