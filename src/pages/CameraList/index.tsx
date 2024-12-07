import { useState, useEffect } from "react";
import axios from "axios";
import { ICamera } from "../../types";
import Filters from "../../components/FilterBar";
import Pagination from "../../components/pagination";
import CameraTable from "../../components/CameraTable";
import brandLogo from "../../assets/BrandLogo.png";
import { IoIosSearch } from "react-icons/io";


const CameraList = () => {
  const [cameras, setCameras] = useState<ICamera[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    status: "",
    searchQuery: "",
  });
  const [filteredCameras, setFilteredCameras] = useState<ICamera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCameras, setSelectedCameras] = useState<string[]>([]);
  const apiToken = process.env.REACT_APP_API_TOKEN;

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await axios.get(
          "https://api-app-staging.wobot.ai/app/v1/fetch/cameras",
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
        // console.log(response.data.data);
        setCameras(response.data.data);
        setFilteredCameras(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("error:",error)
        setLoading(false);
        setError("Failed to fetch data");
      }
    };

    fetchCameras();
  }, []);

  // Function to update camera status via API
const updateCameraStatus = async (
  id: string,
  status: string
) => {
  const url = `https://api-app-staging.wobot.ai/app/v1/update/camera/status`;

  try {
    const response = await axios.post(url, {
      id: id,
      status: status,
    });

    console.log("Camera status updated successfully", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error updating camera status:",
        error.response?.data?.message || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

  // Function to handle status change
  const handleStatusChange = async (cameraId: string, newStatus: string) => {
    try {
      await updateCameraStatus(cameraId, newStatus); 

      setCameras((prev) =>
        prev.map((camera) =>
          camera.id === cameraId ? { ...camera, status: newStatus } : camera
        )
      );
      setFilteredCameras((prev) =>
        prev.map((camera) =>
          camera.id === cameraId ? { ...camera, status: newStatus } : camera
        )
      );
    } catch (error) {
      setError("Failed to update status");
    }
  };

  useEffect(() => {
    const filtered = cameras.filter((camera) => {
      const matchesLocation =
        !selectedFilters.location ||
        camera.location === selectedFilters.location;
      const matchesStatus =
        !selectedFilters.status || camera.status === selectedFilters.status;
      const matchesSearchQuery =
        !selectedFilters.searchQuery ||
        Object.values(camera).some((value) =>
          value
            ?.toString()
            .toLowerCase()
            .includes(selectedFilters.searchQuery.toLowerCase())
        );

      return matchesLocation && matchesStatus && matchesSearchQuery;
    });
    setFilteredCameras(filtered);
    setCurrentPage(1); 
  }, [selectedFilters, cameras]);

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSelectCamera = (id: string) => {
    setSelectedCameras((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((cameraId) => cameraId !== id)
        : [...prevSelected, id]
    );
  };


const handleDelete = () => {
  // Check if there are any selected cameras
  if (selectedCameras.length === 0) {
    alert("Please select cameras to delete.");
    return;
  }

  // Confirm the deletion action
  if (window.confirm("Are you sure you want to delete the selected cameras?")) {
    // Delete selected cameras from both cameras and filteredCameras
    setCameras((prev) =>
      prev.filter((camera) => !selectedCameras.includes(camera.id))
    );
    setFilteredCameras((prev) =>
      prev.filter((camera) => !selectedCameras.includes(camera.id))
    );
    // Optionally, clear the selected cameras after deletion
    setSelectedCameras([]);
  }
};


  const indexOfLastCamera = currentPage * itemsPerPage;
  const indexOfFirstCamera = indexOfLastCamera - itemsPerPage;
  const currentCameras = filteredCameras.slice(
    indexOfFirstCamera,
    indexOfLastCamera
  );

  const totalPages = Math.ceil(filteredCameras.length / itemsPerPage);

  if (loading) return <p className="text-center text-gray_500">Loading...</p>;
  if (error) return <p className="text-center text-red_500">{error}</p>;

  return (
    <div className="p-4 lg:p-6 bg-gray-100 min-h-screen">
      <div className="">
        <div className="w-full flex justify-center items-center mb-6">
          <img src={brandLogo} alt="" />
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-gray_800">Cameras</h1>
            <p className="text-gray-600 ">Manage your cameras here.</p>
          </div>

          {/* Search bar */}
          <div className="relative  lg:block">
              <input
                type="text"
                value={selectedFilters.searchQuery}
                onChange={(e) =>
                  handleFilterChange("searchQuery", e.target.value)
                }
                placeholder="Search"
                className="px-4 py-2 pl-4 pr-10 border rounded outline-none w-full"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray_500">
                <IoIosSearch />
              </span>
            </div>
        </div>

        <Filters
          location={selectedFilters.location}
          status={selectedFilters.status}
          locations={[...new Set(cameras.map((camera) => camera.location))]}
          onFilterChange={handleFilterChange}
        />

        <CameraTable
          cameras={currentCameras}
          selectedCameras={selectedCameras}
          onSelectCamera={handleSelectCamera}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange} 
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredCameras.length}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default CameraList;
