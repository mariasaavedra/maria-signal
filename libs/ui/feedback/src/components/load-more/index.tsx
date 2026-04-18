'use client';

import { Button } from '@heroui/react';
import { Spinner } from '../spinner';

interface LoadMoreProps {
  hasMore?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
  className?: string;
}

export function LoadMore({ hasMore, isLoading, onLoadMore, className }: LoadMoreProps) {
  if (!hasMore) return null;
  return (
    <div className={`flex justify-center mt-2 ${className ?? ''}`}>
      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        <Button variant="ghost" onPress={onLoadMore}>
          Load more
        </Button>
      )}
    </div>
  );
}
