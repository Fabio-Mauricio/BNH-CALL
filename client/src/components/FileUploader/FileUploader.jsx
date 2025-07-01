import React, { useRef, useState } from 'react';
import * as C from './FileUploader.style'

const FileUploader = ({myFile, setFile}) => {
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName('Arquivo inválido (somente imagens)');
      setPreviewUrl('');
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <C.FileLabel onClick={triggerFileSelect}>Escolher Imagem</C.FileLabel>
      <C.HiddenFileInput ref={fileInputRef} onChange={handleFileChange} />
      <C.FileName>{fileName}</C.FileName>
      <div className='flex items-center justify-center' >
        {previewUrl && <C.ImagePreview src={previewUrl} alt="Pré-visualização" />}
      </div>
    </>
  );
};

export default FileUploader;
