import { Share } from 'react-native';
import { IDocument } from '@/types/IDocument';
import { formatDate, generateLink } from '@services/utils';

export function useShareDocument() {
  const shareDocument = async (document: IDocument) => {
    try {
      const message = `
      🔗 Link: ${generateLink()}
      📄 ${document.Title} (v${document.Version})
      📅 CreatedAt: ${formatDate(document.CreatedAt)}
      📝 Contributors: ${document.Contributors.map((c) => c.Name).join(', ')}
      📎 Attachments: ${document.Attachments.join(', ')}
        `;

      await Share.share({ message });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return { shareDocument };
}
