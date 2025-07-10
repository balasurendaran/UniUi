import * as React from "react";
const ArrowUp = (props) => (
  <svg
    className="w-[27px] h-[27px] text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v13m0-13 4 4m-4-4-4 4"
    />
  </svg>
);
export default ArrowUp;
