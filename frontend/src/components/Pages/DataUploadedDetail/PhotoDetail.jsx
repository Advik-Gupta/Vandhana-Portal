import React, { useEffect } from "react";
import PhotoPoint from "./PhotoPoint";

const PhotoDetail = ({ cycleData }) => {
  const postUrls = Object.values(cycleData.post).flat();
  const preUrls = Object.values(cycleData.pre).flat();

  const allUrls = [...postUrls, ...preUrls];
  const filteredUrls = allUrls.filter((url) => url.startsWith("https://"));

  useEffect(() => {
    console.log("Filtered photo URLs:", filteredUrls);
  }, [filteredUrls]);

  return (
    <main className="mt-10 mb-20 max-md:px-5 max-md:pt-15">
      <section className="flex flex-col items-start pt-6 pb-14 pl-8 w-full rounded-3xl bg-amber-500 max-md:px-5 max-md:max-w-full">
        <header className="flex max-w-full w-[354px]">
          <h1 className="gap-2.5 self-stretch px-2.5 py-1 text-4xl font-bold text-white whitespace-nowrap min-h-[49px]">
            Photos
          </h1>
        </header>

        <div className="mt-7 ml-3.5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUrls.map((url, index) => (
            <PhotoPoint
              key={index}
              pointNumber={index + 1}
              className="w-full max-md:w-[300px]"
              photoUrl={url}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default PhotoDetail;
