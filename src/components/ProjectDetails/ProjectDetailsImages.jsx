// src/components/ProjectDetails/ProjectDetailsImages.jsx
import React, { useState } from 'react';
import CardLoader from '../CardLoader';
import ImageUploadModal from '../ImageUploadModal'; // Ensure this path is correct

console.log(ImageUploadModal);

const ProjectDetailsImages = ({ images, setImages, isLoading, thumbnail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = (newImages) => {
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  return (
    <div className="w-full xl:w-1/2">
      <div className="mb-5">
        <label htmlFor="">Thumbnail Image: </label>
        <img className='w-[200px]' src={thumbnail} alt="Thumbnail Image" />
      </div>

      <label className='mb-3'>Images:</label>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        <div 
          className="relative border-2 border-dashed border-gray-300 flex justify-center items-center cursor-pointer h-[200px]"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl">+</span>
            <span>Upload Image</span>
          </div>
        </div>
        {isLoading ? (
          <>
            <CardLoader key='1' />
            <CardLoader key='2' />
            <CardLoader key='3' />
            <CardLoader key='4' />
            <CardLoader key='5' />
            <CardLoader key='6' />
          </>
        ) : (
          images.map((image, index) => (
            <img key={index} src={image} alt={`Project Image ${index}`} />
          ))
        )}
      </div>

      <ImageUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onUpload={handleImageUpload} 
      />
    </div>
  );
};

export default ProjectDetailsImages;
