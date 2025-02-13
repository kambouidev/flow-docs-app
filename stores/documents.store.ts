import { atom, useAtom } from 'jotai';
import { IDocument } from '../types/IDocument';
import { useGetDocuments } from '../hooks/useGetDocuments';
import { useEffect } from 'react';

const documentsAtom = atom<IDocument[]>([]);
export function useDocumentsStore() {
  const [documents, setDocuments] = useAtom(documentsAtom);
  const { data, error: errorGettingDocuments, isLoading: isLoadingDocuments, refetch: refetchDocuments } = useGetDocuments();

  useEffect(() => {
    if (data) setDocuments(data);
  }, [data, setDocuments]);

  return { documents, errorGettingDocuments, isLoadingDocuments, refetchDocuments };
}
