// src/components/ImageUploadModal.jsx
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Dialog } from '@headlessui/react';

const ImageUploadModal = ({ isOpen, onClose, onUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map(file => URL.createObjectURL(file));
      onUpload(newImages);
      onClose();
    }
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
          <div className="bg-white p-6">
            <div {...getRootProps({ className: 'dropzone border-2 border-dashed p-4 text-center' })}>
              <input {...getInputProps()} />
              <p>Drag & drop images here, or click to select images</p>
            </div>
            <button onClick={onClose} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded">Close</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageUploadModal;
