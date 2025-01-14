import React, { memo, useContext, useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { useLocationSearchQuery } from '../hooks/use-weatherQuery';
import { OurContext } from '../Context/OurContext';
import { useNavigate } from "react-router-dom";

const CitySearch = ({setOpenMenu}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { theme } = useContext(OurContext);
    const { data: locationData } = useLocationSearchQuery(search);
    const navigate = useNavigate();

   

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSearch("");
        
    };

    const handleSelection = (city) => {
        const [lat, lon, name, country] = city.split("|");
        setIsDialogOpen(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
        setOpenMenu(false)
        setSearch("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && selectedIndex >= 0) {
            const city = `${locationData[selectedIndex].lat}|${locationData[selectedIndex].lon}|${locationData[selectedIndex].name}|${locationData[selectedIndex].country}`;
            handleSelection(city);
        } else if (e.key === "ArrowDown") {
            setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, locationData.length - 1));
        } else if (e.key === "ArrowUp") {
            setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    };

    return (
        <>
            <div className="relative" onClick={openDialog}>
                <button
                    className={`border rounded-md px-8 py-1 hover:cursor-pointer ${theme === false
                        ? "bg-zinc-950 text-white"
                        : "bg-white text-zinc-950"
                        } focus:outline-none`}
                >
                    Search City...
                    <span className="absolute bottom-2 left-1">
                        <CiSearch className="text-xl text-gray-500" />
                    </span>
                </button>
            </div>

            {/* Dialog Box */}
            {isDialogOpen && (
                <div
                    className={`fixed inset-0 h-lvh bg-gray-800  flex items-start sm:items-center bg-opacity-25 justify-center z-50 ${theme===false?"max-sm:top-[7.5rem]":""}`}
                    onClick={closeDialog}
                >
                    <div
                        className={`bg-white relative max-sm:top-[8rem] rounded-md shadow-lg w-[30rem] transform transition-all duration-300 ease-in-out ${theme === false ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"} max-sm:mx-2`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-full text-center relative ">
                            <input
                                onKeyDown={handleKeyDown}
                                className={`border w-full rounded-lg h-[3rem] px-8 ${theme === false ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"}`}
                                value={search}
                                autoFocus
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search city"
                            />
                            <span className="absolute bottom-3 left-1">
                                <CiSearch className="text-xl text-gray-500" />
                            </span>
                            <button className="absolute right-2 bottom-3 text-xl" onClick={closeDialog}>
                                <MdClose />
                            </button>
                        </div>

                        {locationData && locationData.length > 0 && (
                            <ul className='px-2'>
                                <li className='px-2 pt-4 mb-2 text-gray-400 text-sm'>Suggestions</li>
                                {locationData?.map((currLocation, index) => (
                                    <li
                                        tabIndex={0}
                                        value={`${currLocation.lat}|${currLocation.lon}|${currLocation.name}|${currLocation.country}`}
                                        onClick={() => handleSelection(`${currLocation.lat}|${currLocation.lon}|${currLocation.name}|${currLocation.country}`)}
                                        key={index}
                                        className={`cursor-pointer rounded-md px-2 py-2 text-small text-lg w-full hover:rounded-lg flex gap-6 items-center ${theme === false ? "hover:bg-zinc-700 hover:text-white" : "hover:bg-slate-200 text-zinc-950"} ${selectedIndex === index ? 
                                           theme===false ?"bg-zinc-700":"bg-zinc-200" : ""}`}
                                    >
                                        <span>
                                            <CiSearch className='text-xl font-bold' />
                                        </span>
                                        <div className='flex gap-2 items-center'>
                                            <p> {currLocation.name} </p>
                                            {currLocation?.local_names?.hi && (<p className='text-sm'> ({currLocation?.local_names?.hi})</p>)}
                                            <p>{", "}{currLocation.state}</p>
                                            <p>{", "}{currLocation.country}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(CitySearch);
