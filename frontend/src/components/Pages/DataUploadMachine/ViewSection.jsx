import React, { useId } from "react";

function ViewSection({
  title,
  className = "",
  prePhoto,
  postPhoto,
  onPreChange,
  onPostChange,
  isMiniprof = false,
  dataType,
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

  const preButtonColor = prePhoto ? "bg-green-600" : "bg-black";
  const postButtonColor = postPhoto ? "bg-green-600" : "bg-black";

  if (isMiniprof) {
    return (
      <section
        className={`flex flex-wrap gap-5 justify-between px-10 py-4 w-full font-semibold bg-[#E9E9E9] rounded-xl max-w-[1307px] max-md:px-5 max-md:max-w-full ${className}`}
      >
        <h3 className="self-start text-3xl text-black">
          {title} {`${dataType === "post" ? "Post" : "Pre"}`}
        </h3>
        <div className="flex gap-8 text-xl text-white max-md:max-w-full">
          <input type="file" id={preId} onChange={handlePreFileSelect} hidden />
          <div>
            <label htmlFor={preId}>
              <div
                className={`flex flex-col justify-center items-start px-8 py-2 rounded-3xl cursor-pointer ${preButtonColor} max-md:px-5 transition-colors duration-200`}
              >
                Ban File +
              </div>
            </label>
            {prePhoto && (
              <p className="text-black mt-1">Selected: {prePhoto.name}</p>
            )}
          </div>

          <input
            type="file"
            id={postId}
            onChange={handlePostFileSelect}
            hidden
          />
          <div>
            <label htmlFor={postId}>
              <div
                className={`flex flex-col justify-center items-start px-8 py-2 rounded-3xl cursor-pointer ${postButtonColor} max-md:px-5 transition-colors duration-200`}
              >
                "W" File +
              </div>
            </label>
            {postPhoto && (
              <p className="text-black mt-1">Selected: {postPhoto.name}</p>
            )}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section
        className={`flex flex-wrap gap-5 justify-between px-10 py-4 w-full font-semibold bg-[#E9E9E9] rounded-xl max-w-[1307px] max-md:px-5 max-md:max-w-full ${className}`}
      >
        <h3 className="self-start text-3xl text-black">{title}</h3>
        <div className="flex gap-8 text-xl text-white max-md:max-w-full">
          <div className={`${dataType === "post" ? "hidden" : ""}`}>
            <input
              type="file"
              id={preId}
              onChange={handlePreFileSelect}
              hidden
            />
            <div>
              <label htmlFor={preId}>
                <div
                  className={`flex flex-col justify-center items-start px-8 py-2 rounded-3xl cursor-pointer ${preButtonColor} max-md:px-5 transition-colors duration-200`}
                >
                  Pre Photo +
                </div>
              </label>
              {prePhoto && (
                <p className="text-black mt-1">Selected: {prePhoto.name}</p>
              )}
            </div>
          </div>

          <div className={`${dataType === "pre" ? "hidden" : ""}`}>
            <input
              type="file"
              id={postId}
              onChange={handlePostFileSelect}
              hidden
            />
            <div>
              <label htmlFor={postId}>
                <div
                  className={`flex flex-col justify-center items-start px-8 py-2 rounded-3xl cursor-pointer ${postButtonColor} max-md:px-5 transition-colors duration-200`}
                >
                  Post Photo +
                </div>
              </label>
              {postPhoto && (
                <p className="text-black mt-1">Selected: {postPhoto.name}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ViewSection;
