import React, { useEffect, useContext, useState } from "react";
import TypeIndicator from "./TypeIndicator";
import DataCard from "./DataCard";
import SidebarSection from "./SidebarSection";
import UpdatesSection from "./UpdatesSection";

import { UserContext } from "../../../contexts/user.context";

function HomePageSupervisor() {
  const { currentUser } = useContext(UserContext);
  const [dataUpdates, setDataUpdates] = useState(null);
  const [otherUpdates, setOtherUpdates] = useState(null);

  const sidebarItems = [
    { title: "Machines overview", navigate: "/supervisor/machines" },
  ];

  function formatNotification(notification) {
    const { createdAt, message, type } = notification;

    // Main message match (handles the required 7 fields)
    const mainMatch = message.match(
      /Data for (\w+) cycle (\d+) of - ([^{,]+) \{([^}]+)\}, ([^,]+), (\d+) has been updated by (\w+)/
    );

    if (!mainMatch) {
      console.warn("Unrecognized notification message:", message);
      return null;
    }

    const [
      _,
      cycleType,
      cycleNumber,
      title,
      machineID,
      testSite,
      pointNumber,
      uploaderId,
    ] = mainMatch;

    // Split the message by "+" to extract extra remarks, if any
    const parts = message.split(" + ");
    const extraInfo = parts[1]?.trim(); // May be undefined

    let missingImages = null;
    let userRemarks = null;

    if (extraInfo) {
      const splitParts = extraInfo.split("\n\n");
      missingImages = splitParts[0]?.trim() || null;
      userRemarks = splitParts.slice(1).join("\n\n").trim() || null;
    }

    const pointName = `${testSite}.${pointNumber}`;

    const dateObj = new Date(createdAt);
    const formattedDate = dateObj
      .toLocaleDateString("en-GB")
      .split("/")
      .map((part, i) => (i === 2 ? part.slice(-2) : part))
      .join("/");

    return {
      type: cycleType === "Grind" ? "grinding" : "repainting",
      title: title.trim(),
      subtitle: `Test site No ${testSite} > ${pointName} > ${cycleType} Cycle ${cycleNumber}`,
      uploadedBy: `${uploaderId}`,
      date: formattedDate,
      url: `/admin/upload-data/${machineID}/${testSite}/${pointNumber}`,
      missingImages,
      userRemarks,
    };
  }

  useEffect(() => {
    currentUser?.notifications?.reverse().map((notification) => {
      if (notification.type === "info" || notification.type === "warning") {
        if (otherUpdates && otherUpdates.length >= 10) {
          setOtherUpdates((prev) => {
            const newUpdates = [...(prev || [])];
            newUpdates.shift();
            return [...newUpdates, notification];
          });
        } else {
          setOtherUpdates((prev) => [...(prev || []), notification]);
        }
      } else {
        setDataUpdates((prev) => [
          ...(prev || []),
          formatNotification(notification),
        ]);
      }
    });
  }, [currentUser]);

  return (
    <main className="flex overflow-hidden flex-col px-11 pt-7 pb-44 bg-white max-md:px-5 max-md:pb-24">
      <header className="gap-2.5 self-start p-2.5 text-5xl font-bold text-black whitespace-nowrap max-md:text-4xl">
        Dashboard
      </header>

      <section className="ml-2.5 max-md:mt-10 max-md:max-w-full">
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

              {dataUpdates ? (
                <div className="flex flex-col gap-5 mb-5">
                  {dataUpdates.map((card, index) => (
                    <DataCard
                      key={index}
                      backgroundColor={
                        card.type === "grinding"
                          ? "bg-[#58EEFF]"
                          : "bg-[#FF9822]"
                      }
                      title={card.title}
                      subtitle={card.subtitle}
                      uploadedBy={card.uploadedBy}
                      date={card.date}
                      className={index !== 0 ? "mt-3" : "mt-2"}
                      missingImages={card.missingImages}
                      userRemarks={card.userRemarks}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center mt-5">
                  No data updates available.
                </div>
              )}
            </div>
          </div>

          <aside className="ml-5 w-[29%] flex flex-col gap-6 max-md:ml-0 max-md:w-full">
            <SidebarSection items={sidebarItems} />
            {otherUpdates && otherUpdates.length > 0 ? (
              <UpdatesSection updates={otherUpdates} />
            ) : (
              <div className="text-gray-500 text-center mt-5">
                No updates available.
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

export default HomePageSupervisor;
