"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/app/components/Sidebar/SidebarItem";
import ClickOutside from "@/app/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Icon } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    menuItems: [
      {
        icon: (
          <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 14H14V21H21V14Z" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 14H3V21H10V14Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 3H14V10H21V3Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 3H3V10H10V3Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        ),
        label: "Dashboard",
        route: "/dashboard"
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#3676e0" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18.75V8.0625C3 6.71984 3.53337 5.43217 4.48277 4.48277C5.43217 3.53337 6.71984 3 8.0625 3H15.9375C16.6023 3 17.2606 3.13095 17.8748 3.38536C18.489 3.63977 19.0471 4.01268 19.5172 4.48277C19.9873 4.95287 20.3602 5.51095 20.6146 6.12517C20.8691 6.73938 21 7.39768 21 8.0625V15.9375C21 16.6023 20.8691 17.2606 20.6146 17.8748C20.3602 18.489 19.9873 19.0471 19.5172 19.5172C19.0471 19.9873 18.489 20.3602 17.8748 20.6146C17.2606 20.8691 16.6023 21 15.9375 21H5.25C4.65326 21 4.08097 20.7629 3.65901 20.341C3.23705 19.919 3 19.3467 3 18.75V18.75Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.98438 11.7407H11.9219C12.5186 11.7407 13.0909 11.9778 13.5129 12.3997C13.9348 12.8217 14.1719 13.394 14.1719 13.9907C14.1719 14.5875 13.9348 15.1598 13.5129 15.5817C13.0909 16.0037 12.5186 16.2407 11.9219 16.2407H7.98438V8.36572C7.98437 8.06735 8.1029 7.78121 8.31388 7.57023C8.52486 7.35925 8.81101 7.24072 9.10937 7.24072H10.7969C11.3936 7.24072 11.9659 7.47778 12.3879 7.89973C12.8098 8.32169 13.0469 8.89399 13.0469 9.49072C13.0469 10.0875 12.8098 10.6598 12.3879 11.0817C11.9659 11.5037 11.3936 11.7407 10.7969 11.7407H9.10937M16.9844 16.2407H16.9956" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        ),
        label: "Revenue Data",
        route: "/revenue"
      },
      {
        label: "Car Wash Data",
        route: "",
        icon: (
            <svg className="fill-current" fill="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 212 260" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M210,210c0,26.5-46.6,48-104,48S2,236.5,2,210v-23c6.3,6.1,14.5,11.6,24.6,16.3c21.4,9.9,49.6,15.3,79.4,15.3 s58-5.5,79.4-15.3c10.1-4.7,18.3-10.1,24.6-16.2L210,210z M185.4,150c-21.4,9.9-49.6,15.3-79.4,15.3c-29.8,0-58-5.5-79.4-15.3 C16.5,145.3,8.2,139.8,2,133.7v23.6h0c0.8,26.2,47,47.3,104,47.3c57.4,0,104-21.5,104-48l0-22.9C203.7,139.8,195.5,145.3,185.4,150z M106,2C48.6,2,2,23.5,2,50s46.6,48,104,48s104-21.5,104-48S163.4,2,106,2z M185.4,96.7C164,106.5,135.8,112,106,112 s-58-5.5-79.4-15.3C16.5,92,8.2,86.5,2,80.4v23c0,26.5,46.6,48,104,48s104-21.5,104-48l0-22.9C203.7,86.5,195.5,92,185.4,96.7z"></path> </g></svg>
        ),
        children: [
          {
            icon: (
              <svg className="fill-current" fill="#fff" width="24px" height="24px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M51.99414,39.99512v176a12,12,0,0,1-24,0v-176a12,12,0,0,1,24,0ZM68,100V64A20.02292,20.02292,0,0,1,88,44h88a20.02292,20.02292,0,0,1,20,20v36a20.02292,20.02292,0,0,1-20,20H88A20.02292,20.02292,0,0,1,68,100Zm24-4h80V68H92Zm144,60v36a20.02292,20.02292,0,0,1-20,20H88a20.02292,20.02292,0,0,1-20-20V156a20.02292,20.02292,0,0,1,20-20H216A20.02292,20.02292,0,0,1,236,156Zm-24,4H92v28H212Z"></path> </g></svg>
            ),
            label: "List Progress",
            route: "/listData",
          },
          {
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#3676e0" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.8379 2.8125H6.48789C6.00056 2.8125 5.53318 3.00609 5.18858 3.35069C4.84398 3.69529 4.65039 4.16266 4.65039 4.65V19.35C4.65039 19.8373 4.84398 20.3047 5.18858 20.6493C5.53318 20.9939 6.00056 21.1875 6.48789 21.1875H17.5129C18.0002 21.1875 18.4676 20.9939 18.8122 20.6493C19.1568 20.3047 19.3504 19.8373 19.3504 19.35V8.325L13.8379 2.8125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15.6752 16.5938H8.3252" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15.6752 12.9187H8.3252" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.1627 9.24377H9.24395H8.3252" stroke="#3676e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.8379 2.8125V8.325H19.3504" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            ),
            label: "Master Data",
            route: "/master",
          },
        ],
      },
       {
        label: "Car Wash Report",
        route: "",
        icon: (
          <svg className="fill-current" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.37 14.35L14.15 16.57C13.61 17.11 12.91 17.37 12.21 17.37C11.51 17.37 10.8 17.1 10.27 16.57C9.75 16.05 9.46 15.36 9.46 14.63C9.46 13.9 9.75 13.2 10.27 12.69L11.68 11.28C11.97 10.99 12.45 10.99 12.74 11.28C13.03 11.57 13.03 12.05 12.74 12.34L11.33 13.75C11.09 13.99 10.96 14.3 10.96 14.63C10.96 14.96 11.09 15.28 11.33 15.51C11.82 16 12.61 16 13.1 15.51L15.32 13.29C16.59 12.02 16.59 9.96 15.32 8.69C14.05 7.42 11.99 7.42 10.72 8.69L8.3 11.11C7.79 11.62 7.51 12.29 7.51 13C7.51 13.71 7.79 14.39 8.3 14.89C8.59 15.18 8.59 15.66 8.3 15.95C8.01 16.24 7.53 16.24 7.24 15.95C6.44 15.18 6 14.13 6 13.01C6 11.89 6.43 10.84 7.22 10.05L9.64 7.63C11.49 5.78 14.51 5.78 16.36 7.63C18.22 9.48 18.22 12.5 16.37 14.35Z" fill=""></path> </g>
            </svg>
        ),
        children: [
          {
            Icon: (
              <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.772 9.156L19.404 5.051C19.2056 4.45348 18.8238 3.9337 18.3131 3.56551C17.8024 3.19732 17.1886 2.99944 16.559 3H7.441C6.81139 2.99944 6.19761 3.19732 5.68688 3.56551C5.17615 3.9337 4.79445 4.45348 4.596 5.051L3.228 9.156C2.86461 9.30848 2.55428 9.56476 2.33584 9.89277C2.11741 10.2208 2.00059 10.6059 2 11V16C2 16.753 2.423 17.402 3.039 17.743C3.026 17.809 3 17.869 3 17.938V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H5C5.26522 21 5.51957 20.8946 5.70711 20.7071C5.89464 20.5196 6 20.2652 6 20V18H18V20C18 20.2652 18.1054 20.5196 18.2929 20.7071C18.4804 20.8946 18.7348 21 19 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V17.938C21 17.869 20.974 17.808 20.961 17.743C21.2744 17.5721 21.5362 17.3202 21.7189 17.0136C21.9017 16.707 21.9988 16.357 22 16V11C22 10.171 21.492 9.459 20.772 9.156ZM4 16V11H20L20.002 16H4ZM7.441 5H16.558C16.989 5 17.371 5.274 17.507 5.684L18.613 9H5.387L6.492 5.684C6.55835 5.4848 6.68572 5.31153 6.85605 5.18876C7.02638 5.06599 7.23104 4.99995 7.441 5Z" fill="white"/>
              <path d="M6.5 16C7.32843 16 8 15.3284 8 14.5C8 13.6716 7.32843 13 6.5 13C5.67157 13 5 13.6716 5 14.5C5 15.3284 5.67157 16 6.5 16Z" fill="white"/>
              <path d="M17.5 16C18.3284 16 19 15.3284 19 14.5C19 13.6716 18.3284 13 17.5 13C16.6716 13 16 13.6716 16 14.5C16 15.3284 16.6716 16 17.5 16Z" fill="white"/>
              </svg>
            ),
            label: "Car Report",
            route: "/list",
          },
          {
            label: "Transaction Report",
            route: "/master",
          },
        ],
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-64 flex-col overflow-y-hidden border-r border-stroke bg-[#3676e0] dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0 duration-300 ease-linear"
            : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="mx-auto mt-6 mb-8 py-5.5 xl:px-5 xl:py-3">
          <Link href="/dashboard">
            <Image
              width={100}
              height={100}
              src={"/images/logo/logo-white.png"}
              alt="Logo"
              priority
              className="dark:hidden"
              style={{ width: "auto", height: "auto" }}
            />
            <Image
              width={100}
              height={100}
              src={"/images/logo/logo-white.png"}
              alt="Logo"
              priority
              className="hidden dark:block"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="px-4 lg:px-4">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>

                <ul className="mb-6 flex flex-col gap-4">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
