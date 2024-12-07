import { ICamera } from "../../types";
import active from "../../assets/active.png";
import inactive from "../../assets/inactive.png";
import cloud from "../../assets/cloud.png";
import server from "../../assets/server.png";
import greenCircle from "../../assets/green-circle.png";
import grayCircle from "../../assets/gray-circle.png";
import orangeCircle from "../../assets/orange-circle.png";
import { MdDeleteOutline } from "react-icons/md";
import { MdDoNotDisturb } from "react-icons/md";

interface CameraTableProps {
  cameras: ICamera[];
  selectedCameras: string[];
  onSelectCamera: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
}

const CameraTable: React.FC<CameraTableProps> = ({
  cameras,
  selectedCameras,
  onSelectCamera,
  onDelete,
  onStatusChange,
}) => {
  const getImageForDeviceHealth = (deviceHealth: string | null | undefined) => {
    if (deviceHealth === "A") {
      return greenCircle;
    } else if (!deviceHealth) {
      return grayCircle;
    } else {
      return orangeCircle;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">
              
            </th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Health</th>
            <th className="py-3 px-6 text-left">Location</th>
            <th className="py-3 px-6 text-left">Recorder</th>
            <th className="py-3 px-6 text-left">Tasks</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {cameras.map((camera) => (
            <tr
              key={camera.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">
                {/* Checkbox for each camera */}
                <input
                  type="checkbox"
                  checked={selectedCameras.includes(camera.id)}
                  onChange={() => onSelectCamera(camera.id)} // Handle individual selection
                />
              </td>
              <td className="py-3 px-6 flex items-center gap-2">
                {camera.status === "Active" ? (
                  <img
                    src={active}
                    alt=""
                    className="rounded-full lg:w-2 lg:h-2"
                  />
                ) : (
                  <img
                    src={inactive}
                    alt=""
                    className="rounded-full lg:w-2 lg:h-2"
                  />
                )}
                <span className="truncate">{camera.name}</span>
              </td>
              <td className="py-3 px-6">
                <div className="flex items-center gap-2">
                  {/* Cloud Icon */}
                  <div className="flex items-center justify-center">
                    <img src={cloud} alt="" />
                  </div>

                  {/* Health Status (Device Status - Letter with border) */}
                  <div className="relative inline-flex items-center justify-center w-6 h-6">
                    {/* Circle Background */}
                    <img
                      src={getImageForDeviceHealth(camera.health.device)}
                      alt={`Device status ${camera.health.cloud}`}
                      className="absolute w-full h-full"
                    />
                    {/* Alphabet */}
                    <span className="text-xs font-normal">
                      {camera.health.device}
                    </span>
                  </div>

                  {/* Server Icon */}
                  <div className="flex items-center justify-center">
                    <img src={server} alt="" />
                  </div>

                  <div className="relative inline-flex items-center justify-center w-6 h-6">
                    <img
                      src={getImageForDeviceHealth(camera.health.device)}
                      alt={`Device status ${camera.health.device}`}
                      className="absolute w-full h-full"
                    />
                    {/* Alphabet */}
                    <span className="text-xs font-normal">
                      {camera.health.device}
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-6">
                <span className="truncate">{camera.location}</span>
              </td>
              <td className="py-3 px-6">
                <span className="truncate">{camera.recorder || "N/A"}</span>
              </td>
              <td className="py-3 px-6">
                <span className="truncate">{camera.tasks || "N/A"}</span>
              </td>
              <td className="py-3 px-6">
                <span
                  className={`py-1 px-3 rounded text-xs ${
                    camera.status === "Active"
                      ? "bg-green-200 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {camera.status}
                </span>
              </td>
              <td className="py-3 px-6 text-center w-full flex justify-around gap-4">
                {/* Show Activate/Deactivate and Delete buttons for selected camera */}
                {selectedCameras.includes(camera.id) ? (
                  <>
                    <button
                      className="text-sm hover:text-red-600"
                      onClick={() => {
                        const newStatus =
                          camera.status === "Active" ? "Inactive" : "Active";
                        onStatusChange(camera.id, newStatus);
                      }}
                    >
                      {camera.status === "Active" ? "Deactivate" : "Activate"}{" "}
                    </button>
                    <button
                      className="text-lg hover:text-red-600"
                      onClick={() => onDelete(camera.id)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </>
                ) : (
                  <button
                    className="text-lg"
                  >
                    <MdDoNotDisturb />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CameraTable;
