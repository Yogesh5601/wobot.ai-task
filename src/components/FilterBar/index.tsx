import React from "react";
import { IoWifiOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

interface FiltersProps {
  location: string;
  status: string;
  locations: string[];
  onFilterChange: (key: string, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  location,
  status,
  locations,
  onFilterChange,
}) => {
  return (
    <div className="mb-4 flex flex-col lg:flex-row gap-4">
      <div className="relative">
        <select
          value={location}
          onChange={(e) => onFilterChange("location", e.target.value)}
          className="px-4 py-2 border rounded pl-8 outline-none w-full"
        >
          <option value="">Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
        <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />{" "}
      </div>

    
      <div className="relative">
        <select
          value={status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="px-4 py-2 border rounded pl-8 outline-none w-full">
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <IoWifiOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600  rotate-45" />
      </div>
    </div>
  );
};

export default Filters;

// import React from "react";
// import { IoWifiOutline } from "react-icons/io5";
// import { CiLocationOn } from "react-icons/ci";

// interface FiltersProps {
//   location: string;
//   status: string;
//   locations: string[];
//   onFilterChange: (key: string, value: string) => void;
// }

// const Filters: React.FC<FiltersProps> = ({
//   location,
//   status,
//   locations,
//   onFilterChange,
// }) => {
//   return (
//     <div className="mb-4 flex gap-4">
//       {/* Location Filter */}
//       <select
//         value={location}
//         onChange={(e) => onFilterChange("location", e.target.value)}
//         className="px-4 py-2 border rounded"
//       >
//         <option value="" className="">Location</option>
//         {locations.map((location, index) => (
//           <option key={index} value={location}>
//             {location}
//           </option>
//         ))}
//       </select>

//       {/* Status Filter */}
//       <select
//         value={status}
//         onChange={(e) => onFilterChange("status", e.target.value)}
//         className="px-4 py-2 border rounded"
//       >
//         <option value=""> Status</option>
//         <option value="Active">Active</option>
//         <option value="Inactive">Inactive</option>
//       </select>
//     </div>
//   );
// };

// export default Filters;
