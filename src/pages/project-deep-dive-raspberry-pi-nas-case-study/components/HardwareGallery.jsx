import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HardwareGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images?.length) % images?.length);
  };

  const openModal = (index) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Main Image Display */}
        <div className="relative">
          <div className="aspect-video relative max-w-3xl mx-auto">
            <Image
              src={images?.[selectedImage]?.src}
              alt={images?.[selectedImage]?.alt}
              className="w-full h-full object-contain cursor-pointer"
              onClick={() => openModal(selectedImage)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <h3 className="text-white font-semibold text-lg mb-1">
                {images?.[selectedImage]?.title}
              </h3>
              <p className="text-white/80 text-sm">
                {images?.[selectedImage]?.description}
              </p>
            </div>
            
            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === index
                  ? 'border-brand-primary shadow-brand'
                  : 'border-border hover:border-brand-secondary'
              }`}
            >
              <Image
                src={image?.src}
                alt={image?.alt}
                className="w-full h-full object-cover"
              />
              {selectedImage === index && (
                <div className="absolute inset-0 bg-brand-primary/20 flex items-center justify-center">
                  <Icon name="Eye" size={20} color="white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:bg-white/10 w-10 h-10"
            >
              <Icon name="X" size={20} />
            </Button>
            <Image
              src={images?.[selectedImage]?.src}
              alt={images?.[selectedImage]?.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white font-semibold text-xl mb-2">
                {images?.[selectedImage]?.title}
              </h3>
              <p className="text-white/90">
                {images?.[selectedImage]?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HardwareGallery;