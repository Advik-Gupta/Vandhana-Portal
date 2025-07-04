import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import StatusHeader from "./StatusHeader";
import ActionButton from "./ActionButton";
import DataTable from "./DataTable";
import Button from "../../ui/Button";
import PhotoDetail from "./PhotoDetail";
import { UserContext } from "../../../contexts/user.context";

import { updatePointStatus } from "../../api/machine";

function DataUploadedDetail() {
  const [feedback, setFeedback] = useState("");
  const { machineID } = useParams();
  const location = useLocation();
  const { machine, cycleName, testSiteNumber, pointNo, cycleData } =
    location.state || {};
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    console.log("Cycle data:", cycleData);
  }, []);

  const handleFeedback = (e) => {
    setFeedback(e.target.value);
  };

  const onApproveButton = () => {
    updatePointStatus(
      machineID,
      testSiteNumber,
      pointNo,
      "approved",
      cycleName,
      cycleData._id
    )
      .then(async (response) => {
        console.log("Point approved:", response);
        const notify = await axios.post(
          `http://localhost:8080/api/v1/notifications/send`,
          {
            message: `Feedback for ${cycleName} cycle of ${machine?.name} - ${testSiteNumber} - ${pointNo} : Data approved`,
            userId: cycleData.uploadBy,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const notifyAdmin = await axios.post(
          `http://localhost:8080/api/v1/notifications/send?to=admin`,
          {
            message: `Feedback for ${cycleName} cycle of ${machine?.name} - ${testSiteNumber} - ${pointNo} : Data approved BY ${currentUser.role} - ${currentUser.name} (${currentUser._id})`,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (
          notify &&
          notifyAdmin &&
          notify.status === 201 &&
          notifyAdmin.status === 201
        ) {
          console.log("Notification sent successfully");
        }
      })
      .catch((error) => {
        console.error("Error approving point:", error);
      });
  };

  const onRequestReupload = () => {
    updatePointStatus(
      machineID,
      testSiteNumber,
      pointNo,
      "issues",
      cycleName,
      cycleData._id,
      feedback
    )
      .then(async (response) => {
        console.log("Point re-upload requested:", response);
        const notify = await axios.post(
          `http://localhost:8080/api/v1/notifications/send`,
          {
            message: `Feedback for ${cycleName} cycle of ${machine?.name} - ${testSiteNumber} - ${pointNo} : ${feedback}`,
            userId: cycleData.uploadBy,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const notifyAdmin = await axios.post(
          `http://localhost:8080/api/v1/notifications/send?to=admin`,
          {
            message: `Feedback for ${cycleName} cycle of ${machine?.name} - ${testSiteNumber} - ${pointNo} : ${feedback} BY ${currentUser.role} - ${currentUser.name} (${currentUser._id})`,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const notifyMachineAndFleetManager = await axios.post(
          `http://localhost:8080/api/v1/notifications/mailNotification`,
          {
            message: `Supervisor: ${currentUser.name} (${currentUser._id}) has problems with your data for
${cycleName} cycle of ${machine?.name} - ${testSiteNumber} - ${pointNo}

This is the issue:
${feedback}`,
            userIds: [
              machine?.assignedMachineManager,
              machine?.assignedFleetManager,
            ],
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (
          notify &&
          notifyAdmin &&
          notify.status === 201 &&
          notifyAdmin.status === 201 &&
          notifyMachineAndFleetManager.status === 201
        ) {
          console.log("Notification sent successfully");
        }
      })
      .catch((error) => {
        console.error("Error requesting re-upload:", error);
      });
  };

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-2 text-6xl font-bold text-black md:text-6xl">
          {machine?.name} - {testSiteNumber} - {pointNo}
        </div>
        <div className="mb-4 text-lg text-black md:text-2xl">
          Data for {cycleName} | Uploaded by : User(
          {cycleData["uploadBy"]})
        </div>
        <Button
          text="Return to Site"
          href={`/admin/machine/${machineID}/${testSiteNumber}`}
          dataToPass={{
            machine: machine,
            testSitePoints: machine?.testSites?.find(
              (site) => site.testSiteNumber === testSiteNumber
            )?.points,
          }}
          className="mb-6 w-full rounded-xl text-lg md:w-[200px] md:text-xl"
        />
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-2/3">
            <DataTable />
          </div>
          {cycleData?.status !== "approved" ? (
            <section className="flex flex-col items-start self-end px-10 pt-8 pb-16 max-w-full text-lg font-semibold bg-black rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[403px] max-md:px-5">
              <StatusHeader />
              <div>
                <section className="w-full">
                  <h2 className="mt-10 text-white">Remarks / Feedback :</h2>
                  <input
                    type="text"
                    value={feedback}
                    onChange={handleFeedback}
                    className="mt-2 w-full px-4 py-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your feedback..."
                  />
                </section>
              </div>
              <ActionButton
                onApprove={onApproveButton}
                onReupload={onRequestReupload}
              />
            </section>
          ) : (
            <section className="flex flex-col items-start px-10 pt-8 pb-16 max-w-full text-lg font-semibold bg-black rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[403px] max-md:px-5">
              <div className="text-white">
                This data has been approved by an admin.
              </div>
            </section>
          )}
        </div>
        <PhotoDetail cycleData={cycleData} />
      </div>
    </div>
  );
}

export default DataUploadedDetail;
