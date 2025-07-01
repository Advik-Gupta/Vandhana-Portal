function UpdatesSection({ updates }) {
  const parseFeedbackMessage = (message) => {
    const regex =
      /Feedback for (.+?) cycle of (.+?) - (.+?) - (.+?) : (.+?) BY (.+?) - (.+?) \((.+?)\)/;
    const match = message.match(regex);

    if (!match) return null;

    const [
      ,
      cycleName,
      machineName,
      testSiteNumber,
      pointNo,
      feedback,
      role,
      name,
      id,
    ] = match;

    return {
      cycleName,
      machineName,
      testSiteNumber,
      pointNo,
      feedback,
      role,
      name,
      id,
    };
  };

  return (
    <section className="flex flex-col items-start pt-6 pr-16 pb-11 pl-6 mx-auto mt-10 w-full text-xs font-light text-black bg-gray-200 rounded-3xl max-md:px-5 max-md:mt-10">
      <h2 className="gap-2.5 self-stretch p-2.5 text-2xl font-semibold">
        Latest updates
      </h2>

      {updates.map((update, index) => {
        const parsed = parseFeedbackMessage(update.message);

        if (parsed) {
          return (
            <div
              key={index}
              className="mt-4 p-4 ml-2.5 border border-blue-400 bg-white rounded-xl shadow-md"
            >
              <div className="text-sm font-medium text-blue-800 mb-1">
                Feedback for <strong>{parsed.cycleName}</strong> cycle of{" "}
                <strong>{parsed.machineName}</strong>
              </div>
              <div className="text-gray-700 text-sm">
                <div>
                  <span className="font-semibold">Test Site:</span>{" "}
                  {parsed.testSiteNumber}
                </div>
                <div>
                  <span className="font-semibold">Point:</span> {parsed.pointNo}
                </div>
                <div>
                  <span className="font-semibold">Feedback:</span>{" "}
                  {parsed.feedback}
                </div>
                <div className="mt-1 text-gray-600 text-xs">
                  BY <strong>{parsed.role}</strong> - {parsed.name} ({parsed.id}
                  )
                </div>
              </div>
            </div>
          );
        }

        return (
          <div key={index} className="mt-3 ml-2.5 first:mt-3">
            <div className="flex items-center gap-2">
              <div className="h-[9px] w-[9px] rounded-full bg-neutral-400" />
              <p className="basis-auto">{update.message}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default UpdatesSection;
