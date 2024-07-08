import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

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

    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
            <div className="bg-white p-6">
              <div {...getRootProps({ className: 'dropzone border-2 border-dashed p-4 text-center' })}>
                <input {...getInputProps()} />
                <p>Drag & drop images here, or click to select images</p>
              </div>
            </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageUploadModal;
