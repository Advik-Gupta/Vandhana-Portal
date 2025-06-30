function UpdatesSection({ updates }) {
  return (
    <section className="flex flex-col items-start pt-6 pr-16 pb-11 pl-6 mx-auto mt-10 w-full text-xs font-light text-black bg-gray-200 rounded-3xl max-md:px-5 max-md:mt-10">
      <h2 className="gap-2.5 self-stretch p-2.5 text-2xl font-semibold">
        Latest updates
      </h2>

      {updates.map((update, index) => (
        <div key={index} className="mt-3 ml-2.5 first:mt-3">
          <div className="flex items-center gap-2">
            <div className="h-[9px] w-[9px] rounded-full bg-neutral-400" />
            <p className="basis-auto">{update.message}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default UpdatesSection;
