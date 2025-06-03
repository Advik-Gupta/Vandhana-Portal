import React, { useState, useId } from "react";

function ViewSection({
  title,
  className = "",
  prePhoto,
  postPhoto,
  onPreChange,
  onPostChange,
}) {
  const uniqueId = useId(); 
  const handlePreFileSelect = (e) => {
    const selectedFile = e.target.files[0]; 
    onPreChange(title, selectedFile); 
  };

  const handlePostFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    onPostChange(title, selectedFile); 
  };
  const preId = `prephoto-${uniqueId}`;
  const postId = `postphoto-${uniqueId}`;
  return (
    <section
      className={`flex flex-wrap gap-5 justify-between px-10 py-4 w-full font-semibold bg-[#E9E9E9] rounded-xl max-w-[1307px] max-md:px-5 max-md:max-w-full ${className}`}
    >
      <h3 className="self-start text-3xl text-black">{title}</h3>
      <div className="flex gap-8 text-xl text-white max-md:max-w-full">
        <input type="file" id={preId} onChange={handlePreFileSelect} hidden />
        <div>
          <label htmlFor={preId}>
            <div
              className={`flex flex-col justify-center items-start px-8 py-2 bg-black rounded-3xl max-md:px-5`}
            >
              Pre Photo +
            </div>
          </label>
          {prePhoto && (
            <p className="text-black mt-1">Selected: {prePhoto.name}</p>
          )}
        </div>

        <input type="file" id={postId} onChange={handlePostFileSelect} hidden />
        <div>
          <label htmlFor={postId}>
            <div
              className={`flex flex-col justify-center items-start px-8 py-2 bg-black rounded-3xl max-md:px-5`}
            >
              Post Photo +
            </div>
          </label>
          {postPhoto && (
            <p className="text-black mt-1">Selected: {postPhoto.name}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ViewSection;
