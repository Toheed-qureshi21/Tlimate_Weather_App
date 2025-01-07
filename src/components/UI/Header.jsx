import React, { memo, useContext, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import { OurContext } from "../Context/OurContext";
import CitySearch from "./City-Search";
import { MdClose } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";

const Header = () => {
  const { theme, setTheme } = useContext(OurContext);
  const [isOn, setIsOn] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleThemeButton = () => {
    setIsOn((prev) => !prev);
    setTheme((prev) => !prev);
  };

  return (
    <header
      className={`finalResponsive ${
        theme === false
          ? "bg-zinc-950/90 text-white"
          : "bg-white/30 text-zinc-950"
      } sticky top-0 z-50 w-full border-b backdrop-blur-xl px-[5rem] py-2 flex justify-between  finalResponsive`}
    >
      <div className="flex flex-col items-center">
        <img
          src="/Tlimate_logo2.webp"
          alt="Logo"
          className="aspect-square w-[4rem] object-cover rounded-full "
        />
        <h1 className="text-2xl font-bold tracking-tighter">Tlimate</h1>
      </div>

      <nav
        className={`flex justify-between items-center px-4 py-2 ${
          theme === false ? "text-white" : "bg-white text-black"
        }`}
      >
        {/* Main Navbar Content */}
        <div className="flex justify-between w-full items-center gap-4">
          <div id="btn-search" className="flex gap-6 items-center">
            <button
              className="sm:hidden text-2xl"
              onClick={() => setOpenMenu((prev) => !prev)}
            >{
                openMenu?<MdClose />:  <IoIosMenu />
            }
            
               
            </button>
          </div>

          {/* Search City Button (Visible on large screens) */}
          <div className="hidden sm:block">
            <CitySearch />
          </div>
          <button
              onClick={handleThemeButton}
              className={`transition-transform ease-linear text-2xl ${
                isOn ? "rotate-180" : ""
              } hidden sm:block`}
            >
              {theme === false ? (
                <LuSun className="text-yellow-600" />
              ) : (
                <FaRegMoon className="text-blue-500" />
              )}
            </button>
        </div>

        {/* Mobile Menu (Visible when openMenu is true) */}
        <div
          className={`${
            openMenu ? "block" : "hidden"
          } sm:hidden absolute top-full left-0 right-0 ${theme===false?"bg-zinc-950 text-white":" bg-white backdrop-blur-xl text-black"} p-4`}
        >
          <div id="btn-search" className="flex flex-col gap-6 items-center">
            {/* Search Section (Visible when the menu is opened) */}
            <CitySearch />

            {/* Theme Toggle Button (Visible in the mobile menu) */}
            <button
              onClick={handleThemeButton}
              className={`transition-transform ease-linear text-2xl ${
                isOn ? "rotate-180" : ""
              } w-full flex justify-center`}
            >
              {theme === false ? (
                <LuSun className="text-yellow-600" />
              ) : (
                <FaRegMoon className="text-blue-500" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);
