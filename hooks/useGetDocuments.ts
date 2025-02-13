import { useQuery } from '@tanstack/react-query';
import { get } from '../services/api';
import { IDocument } from '../types/IDocument';
import { ApiRoutesEnum } from '../types/ApiRoutes';

const fetchDocuments = async (): Promise<IDocument[]> => {
  return await get<IDocument[]>(ApiRoutesEnum.DOCUMENTS);
};

export const useGetDocuments = () => {
  return useQuery({
    queryFn: fetchDocuments,
    queryKey: [ApiRoutesEnum.DOCUMENTS],
  });
};
