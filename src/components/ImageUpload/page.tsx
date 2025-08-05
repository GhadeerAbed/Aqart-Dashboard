"use client"
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { CloudIcon } from '@/lib/@heroicons/page';

const ImageUpload = ({ onImagesChange,existingImages }:{ onImagesChange:any,existingImages?:any}) => {
  const [images, setImages] = useState(existingImages || []);

  const onDrop = (acceptedFiles:any) => {
    const newImages = acceptedFiles.map((file:any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages([...images, ...newImages]);
  };

  const removeImage = (file:any) => {
    setImages(images.filter((image:any) => image !== file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 15,
  });

  useEffect(() => {
    onImagesChange(images);
  }, [images, onImagesChange]);
  
  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-500 rounded-md px-4 py-12 flex justify-center items-center cursor-pointer "
      >
        <input {...getInputProps()} />
        <div className="flex flex-col justify-center items-center text-gray-500">
          <CloudIcon className='w-10 h-10'/>
          <p className="mt-1  ">Select Images OR Drag Here</p>
        </div>
      </div>
      <p className='text-darkSecondary  mt-6'>Uploaded Images</p>
      <div className="mt-3 grid grid-cols-4 gap-4">
        {images.map((file :any, index : number) => (
          <div key={index} className="relative">
            <Image
              src={file.preview}
              alt="Preview"
              width={150}
              height={150}
              className="rounded-md w-[150px] h-[150px]"
            />
            <button
              onClick={() => removeImage(file)}
              className="absolute top-2 right-2 bg-white text-fontColor1 rounded-full w-[27px] h-[27px]"
            >
              X
            </button>
          </div>
        ))}
        {images.length < 15 && (
          <div className="flex justify-center items-center border-2 border-dashed border-gray-500 rounded-md w-36 h-36">
            <p className="text-2xl text-gray-400">+</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
