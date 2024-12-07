export interface ICamera {
  id: string; // Or _id if that's what you're using in the API
  name: string;
  health: {
    device: string;
    cloud: string;
  };
  location: string;
  recorder: string | null;
  tasks: string | null;
  status: string;
  current_status: string;
}


// // types/CameraTypes.ts
// export interface ICamera {
//   id: string;
//   name: string;
//   health: string;
//   location: string;
//   recorder?: string;
//   tasks?: string;
//   status: string;
// }

export interface IFilterBarProps {
  locationFilter: string;
  statusFilter: string;
  searchQuery: string;
  setLocationFilter: (filter: string) => void;
  setStatusFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void;
  applyFilters: () => void;
  cameras: ICamera[];
}

export interface ICameraTableProps {
  cameras: ICamera[];
  currentPage: number;
  itemsPerPage: number;
  selectedCameras: string[];
  setSelectedCameras: (selected: string[]) => void;
  updateCameraStatus: (id: string, newStatus: string) => void;
  deleteCamera: (id: string) => void;
}

export interface ICameraRowProps {
  camera: ICamera;
  selectedCameras: string[];
  setSelectedCameras: (selected: string[]) => void;
  updateCameraStatus: (id: string, newStatus: string) => void;
  deleteCamera: (id: string) => void;
}

export interface IPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
}
