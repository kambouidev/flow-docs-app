import { useState } from 'react';

interface DocumentFormProps {
  onAddDocument: (name: string, version: string, files: string[]) => void;
  selectedFiles: { uri: string; name: string }[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<{ uri: string; name: string }[]>>;
}

export function useDocumentForm({ onAddDocument, selectedFiles, setSelectedFiles }: DocumentFormProps) {
  const [name, setName] = useState('');
  const [version, setVersion] = useState('');

  const isFormValid = name.trim() !== '' && version.trim() !== '' && selectedFiles.length > 0;

  const handleSubmit = () => {
    onAddDocument(
      name.trim(),
      version.trim(),
      selectedFiles.map((file) => file.uri)
    );
  };

  const resetForm = () => {
    setName('');
    setVersion('');
    setSelectedFiles([]);
  };

  return {
    name,
    version,
    setName,
    setVersion,
    isFormValid,
    handleSubmit,
    resetForm,
  };
}
