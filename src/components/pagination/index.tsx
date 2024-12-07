import React from "react";
import { PiLessThanLight } from "react-icons/pi";
import { PiGreaterThanLight } from "react-icons/pi";
import { PiCaretDoubleLeftThin } from "react-icons/pi";
import { PiCaretDoubleRightThin } from "react-icons/pi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  onItemsPerPageChange,
}) => {
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="w-full flex justify-between items-center mt-6">
      <div className="w-full flex gap-4 lg:justify-end items-center text-gray_500">
        <select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className="px-4 py-2 border rounded outline-none"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        {indexOfFirstItem} - {indexOfLastItem} of {totalItems}
        <div>
          <button
            onClick={() => onPageChange(Math.max(currentPage - 2, 1))}
            disabled={currentPage === 1}
            className="px-1 py-2"
          >
            <PiCaretDoubleLeftThin />
          </button>
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-1 py-2"
          >
            <PiLessThanLight />
          </button>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-1 py-2"
          >
            <PiGreaterThanLight />
          </button>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 2, totalPages))}
            disabled={currentPage === totalPages}
            className="px-1 py-2"
          >
            <PiCaretDoubleRightThin />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
