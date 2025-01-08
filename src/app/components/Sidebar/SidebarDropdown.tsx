import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();

  return (
    <>
      <ul className="my-2 flex flex-col gap-1.5 pl-9">
        {item.map((item: any, index: number) => (
          <li key={index}>
            <Link
              href={item.route}
              className={`relative flex rounded-[7px] gap-2 px-3.5 py-2 font-medium duration-300 ease-in-out ${
                pathname === item.route
                  ? "bg-white text-[#3676e0] dark:bg-white/10 dark:text-white"
                  : "text-white hover:bg-gray-2 hover:text-[#3676e0] dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarDropdown;
