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
        default:
          return 0;
      }
    });
  }, [documents, sortBy, orderAscending]);
}
