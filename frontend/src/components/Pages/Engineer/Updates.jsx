function parseFeedbackMessage(message) {
  const regex = /^Feedback for (.+?) cycle of (.+?) - (.+?) - (.+?) : (.+)$/;
  const match = message.match(regex);

  if (!match) return null;

  const [, cycleName, machineName, testSiteNumber, pointNo, feedback] = match;
  return { cycleName, machineName, testSiteNumber, pointNo, feedback };
}

function UpdatesSection({ updates }) {
  return (
    <section className="flex flex-col items-start pt-6 pb-11 px-6 mt-10 w-full text-xs font-light text-black bg-gray-200 rounded-3xl max-md:px-5 max-md:mt-10">
      <h2 className="w-full p-2.5 text-2xl font-semibold">Latest updates</h2>

      {updates.map((update, index) => {
        const parsed = parseFeedbackMessage(update.message);

        return (
          <div key={index} className="mt-3 first:mt-3">
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-white shadow-sm text-sm">
              {parsed ? (
                <>
                  <div className="text-black font-medium">
                    🔧 Feedback for{" "}
                    <span className="font-semibold text-blue-600">
                      {parsed.cycleName}
                    </span>{" "}
                    cycle
                  </div>
                  <div className="text-gray-700">
                    • Machine:{" "}
                    <span className="font-semibold">{parsed.machineName}</span>
                  </div>
                  <div className="text-gray-700">
                    • Test Site:{" "}
                    <span className="font-semibold">
                      {parsed.testSiteNumber}
                    </span>
                  </div>
                  <div className="text-gray-700">
                    • Point No:{" "}
                    <span className="font-semibold">{parsed.pointNo}</span>
                  </div>
                  <div className="mt-2 text-gray-900">
                    📝 <span className="italic">{parsed.feedback}</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="h-[9px] w-[9px] rounded-full bg-neutral-400" />
                  <p className="basis-auto">{update.message}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default UpdatesSection;
