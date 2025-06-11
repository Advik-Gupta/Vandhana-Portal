import * as React from "react";
import TypeIndicator from "./TypeIndicator";
import DataCard from "./DataCard";
import SidebarSection from "./SidebarSection";
import UpdatesSection from "./UpdatesSection";

function HomePageAdmin() {
  const sidebarItems = [
    { title: "Machines overview", navigate: "/admin/machines" },
    { title: "Employee Directory", navigate: "/admin/employees" },
  ];

  const updates = [
    { text: "Data approved for Test site no T00", isRejected: false },
    { text: "Data approved for Test site no T10", isRejected: false },
    { text: "Data rejected for Test site no T05", isRejected: true },
  ];
  const dataCards = [
    {
      type: "repainting",
      title: "RGI-96-01 NR",
      subtitle: "Test site No T01 > Point Name > Grind Cycle 1",
      uploadedBy: "Uploaded by Person A",
      date: "01/01/01",
    },
    {
      type: "grinding",
      title: "RGI-96-01 NR",
      subtitle: "Test site No T01",
      uploadedBy: "Uploaded by Person B",
      date: "01/01/01",
    },
    {
      type: "grinding",
      title: "RGI-96-01 NR",
      subtitle: "Test site No T01",
      uploadedBy: "Reuploaded by Person C",
      date: "01/01/01",
    },
  ];

  return (
    <main className="flex overflow-hidden flex-col px-11 pt-7 pb-44 bg-white max-md:px-5 max-md:pb-24">
      <header className="gap-2.5 self-start p-2.5 text-5xl font-bold text-black whitespace-nowrap max-md:text-4xl">
        Dashboard
      </header>

      <section className="mt-16 ml-2.5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[71%] max-md:ml-0 max-md:w-full">
            <div className="self-stretch my-auto w-full max-md:mt-10 max-md:max-w-full">
              <TypeIndicator
                color="bg-[#FF9822]"
                label="Repainting"
                className="w-[114px]"
              />
              <TypeIndicator
                color="bg-[#58EEFF]"
                label="Grinding"
                className="flex-1 mb-3"
              />

              {dataCards.map((card, index) => (
                <DataCard
                  key={index}
                  backgroundColor={
                    card.type === "grinding" ? "bg-[#58EEFF]" : "bg-[#FF9822]"
                  }
                  title={card.title}
                  subtitle={card.subtitle}
                  uploadedBy={card.uploadedBy}
                  date={card.date}
                  className={index !== 0 ? "mt-9" : "mt-2"}
                />
              ))}
            </div>
          </div>

          <aside className="ml-5 w-[29%] flex flex-col gap-6 max-md:ml-0 max-md:w-full">
            <SidebarSection items={sidebarItems} />
            <UpdatesSection updates={updates} />
          </aside>
        </div>
      </section>
    </main>
  );
}

export default HomePageAdmin;
