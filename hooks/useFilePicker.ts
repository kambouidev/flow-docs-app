import * as DocumentPicker from 'expo-document-picker';

interface FilePickerProps {
  setSelectedFiles: React.Dispatch<React.SetStateAction<{ uri: string; name: string }[]>>;
}

export function useFilePicker({ setSelectedFiles }: FilePickerProps) {
  const pickFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newFiles = result.assets.map((asset) => ({
          uri: asset.uri,
          name: asset.name || 'Unnamed file',
        }));
        setSelectedFiles((prev) => [...prev, ...newFiles]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return { pickFiles, removeFile };
}
