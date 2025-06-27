import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const PhotoDetail = ({ cycleData }) => {
  const fields = Object.keys(cycleData?.pre || {});

  const extractFileName = (url) => {
    try {
      return decodeURIComponent(url.split("/").pop());
    } catch {
      return url;
    }
  };

  const getExtension = (mimeType) => {
    if (mimeType.includes("jpeg")) return ".jpg";
    if (mimeType.includes("png")) return ".png";
    if (mimeType.includes("webp")) return ".webp";
    if (mimeType.includes("gif")) return ".gif";
    return ".img"; // fallback
  };

  const handleDownload = async () => {
    const zip = new JSZip();

    for (const field of fields) {
      const preUrls = cycleData.pre?.[field] || [];
      const postUrls = cycleData.post?.[field] || [];

      const preFolder = zip.folder(field)?.folder("pre");
      const postFolder = zip.folder(field)?.folder("post");

      // Handle PRE images
      if (field === "miniprof") {
        preFolder?.file("ban_file.txt", "Miniprof ban file present");
      } else {
        for (let i = 0; i < preUrls.length; i++) {
          const url = preUrls[i];
          try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Bad response");
            const blob = await res.blob();
            preFolder?.file(`image_${i + 1}${getExtension(blob.type)}`, blob);
          } catch (err) {
            console.warn("Failed to fetch PRE image:", url, err);
          }
        }
        if (preUrls.length === 0) preFolder?.file(".empty", "");
      }

      // Handle POST images
      if (field === "miniprof") {
        postFolder?.file("ban_file.txt", "Miniprof ban file present");
      } else {
        for (let i = 0; i < postUrls.length; i++) {
          const url = postUrls[i];
          try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Bad response");
            const blob = await res.blob();
            postFolder?.file(`image_${i + 1}${getExtension(blob.type)}`, blob);
          } catch (err) {
            console.warn("Failed to fetch POST image:", url, err);
          }
        }
        if (postUrls.length === 0) postFolder?.file(".empty", "");
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "Point_Photos.zip");
  };

  return (
    <main className="mt-10 mb-20 max-md:px-5 max-md:pt-15">
      <div className="flex justify-end mb-4 w-full px-6">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow"
        >
          Download Data for test point
        </button>
      </div>
      <section className="flex flex-col items-start pt-6 pb-14 px-6 w-full rounded-3xl bg-amber-500 max-md:max-w-full">
        <header className="w-full max-w-full">
          <h1 className="text-4xl font-bold text-white mb-6">Photos</h1>
        </header>

        {fields.map((fieldKey) => {
          const preUrls = cycleData.pre?.[fieldKey] || [];
          const postUrls = cycleData.post?.[fieldKey] || [];
          const isEmpty = preUrls.length === 0 && postUrls.length === 0;
          if (isEmpty) return null;

          const formattedField = fieldKey
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase());

          return (
            <div
              key={fieldKey}
              className="w-full bg-white rounded-2xl shadow-xl p-6 mb-10"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                {formattedField} Images
              </h2>

              {/* PRE Section */}
              {preUrls.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-amber-700 mb-3">
                    PRE:
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {preUrls.map((url, index) => (
                      <div
                        key={`pre-${index}`}
                        className="space-y-2 text-center"
                      >
                        <p className="text-sm text-gray-600 break-all">
                          {extractFileName(url)}
                        </p>
                        {fieldKey === "miniprof" ? (
                          <div className="w-full max-w-[400px] h-[200px] flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl bg-gray-100 text-gray-700 font-medium mx-auto">
                            Ban file here
                          </div>
                        ) : (
                          <img
                            src={url}
                            alt={`PRE image ${index + 1}`}
                            className="rounded-xl border-2 border-gray-300 shadow-sm w-full max-w-[400px] max-h-[350px] object-contain mx-auto"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* POST Section */}
              {postUrls.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-amber-700 mb-3">
                    POST:
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {postUrls.map((url, index) => (
                      <div
                        key={`post-${index}`}
                        className="space-y-2 text-center"
                      >
                        <p className="text-sm text-gray-600 break-all">
                          {extractFileName(url)}
                        </p>
                        {fieldKey === "miniprof" ? (
                          <div className="w-full max-w-[400px] h-[200px] flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl bg-gray-100 text-gray-700 font-medium mx-auto">
                            Ban file here
                          </div>
                        ) : (
                          <img
                            src={url}
                            alt={`POST image ${index + 1}`}
                            className="rounded-xl border-2 border-gray-300 shadow-sm w-full max-w-[400px] max-h-[350px] object-contain mx-auto"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default PhotoDetail;
