import { useMemo } from 'react';
import { IDocument, SortOption } from '../types/IDocument';

interface UseSortedDocumentsProps {
  documents: IDocument[];
  sortBy: SortOption;
  orderAscending: boolean;
}

export function useSortedDocuments({ documents, sortBy, orderAscending }: UseSortedDocumentsProps) {
  return useMemo(() => {
    return [...documents].sort((a, b) => {
      switch (sortBy) {
        case SortOption.Name:
          return orderAscending ? a.Title.localeCompare(b.Title) : b.Title.localeCompare(a.Title);
        case SortOption.Version:
          return orderAscending
            ? a.Version.localeCompare(b.Version, undefined, { numeric: true })
            : b.Version.localeCompare(a.Version, undefined, { numeric: true });

        case SortOption.CreatedAt:
          return orderAscending
            ? new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
            : new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime();

        case SortOption.UpdatedAt:
          return orderAscending
            ? new Date(a.UpdatedAt).getTime() - new Date(b.UpdatedAt).getTime()
            : new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime();
        default:
          return 0;
      }
    });
  }, [documents, sortBy, orderAscending]);
}
