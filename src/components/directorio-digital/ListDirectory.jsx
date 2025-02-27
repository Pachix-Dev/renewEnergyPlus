import React, { useState } from "react";
import data from "../../data/digital-directory.js";

const ListDirectory = ({ currentLanguage }) => {
    const [directorioDigital, setDirectorioDigital] = useState(data)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const maxSize = 20

    const [pagesSize, setPagesSize] = useState(Math.ceil(directorioDigital.length / maxSize))

    const phoneFormat = (itemPhone) => {
        let phones = itemPhone.split("\n");
        let out = "";
        phones.map((phone, index) => {
            let phoneOut = phone.replace(/\D/g, "").toString();

            out +=
                phone.length >= 11
                    ? `${index >= 1 ? `\n` : ''}+${phoneOut.slice(0, 2)} ${phoneOut.slice(2, 5)} ${phoneOut.slice(5, 8)} ${phoneOut.slice(8, phone.length)} `
                    : `${index >= 1 ? `\n` : ''}+${phoneOut.slice(0, 3)} ${phoneOut.slice(3, 6)} ${phoneOut.slice(6, phone.length)} `;
        });

        return out;
    };

    const addLineBreak = (str) => {
        let newString = str.split('\n')

        return newString.map((subStr, index) => {
            return (
                <React.Fragment key={index}>
                    {subStr}
                    <br />
                </React.Fragment>
            )
        })
    }

    const handleFilter = (e) => {
        setFilter(e.target.value)
        filter !== "" ?
            setDirectorioDigital(data.filter((item) =>
                item.nombreComercial.toLowerCase().includes(filter.toLowerCase()) ||
                item.nombreContacto.toLowerCase().includes(filter.toLowerCase()) ||
                item.Puesto.toLowerCase().includes(filter.toLowerCase()) ||
                item.Correo.toLowerCase().includes(filter.toLowerCase()) ||
                item.paginaWeb.toLowerCase().includes(filter.toLowerCase()) ||
                item.stand.toLowerCase().includes(filter.toLowerCase()) ||
                item.descripcion_es.toLowerCase().includes(filter.toLowerCase()) ||
                item.descripcion_en.toLowerCase().includes(filter.toLowerCase())
            ))
            : setDirectorioDigital(data)
    }

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const createpageButtons = () => {
        let pages = []
        for (let i = 1; i <= pagesSize; i++) {
            pages.push(i)
        }
        return pages.map((page, index) => {
            return (
                <button
                    key={index}
                    onClick={() => handleChangePage(page)}
                    className={`inline-flex items-center px-4 py-2 text-sm font-semibold hover:bg-gray-400 focus:z-20 focus:outline-offset-0 ${currentPage === page ? "bg-gradient-to-r from-[#bc0100] to-[#d86a03] text-white " : "bg-gray-200 text-gray-700"}`}
                >
                    {page}
                </button>
            )
        })
    }

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const nextPage = () => {
        if (currentPage < pagesSize) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full my-2">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                    Search
                </label>
                <div className="relative md:mx-20">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-0 focus:border-[#bc0100]"
                        placeholder={currentLanguage === "en" ? "Search exhibitor" : "Buscar expositor"}
                        value={filter}
                        onChange={handleFilter}
                    />
                    <button
                        type="submit"
                        className="absolute end-2.5 bottom-2.5 bg-gradient-to-r from-[#bc0100] to-[#d86a03] text-white hover:brightness-[105%] focus:ring-2 focus:outline-none focus:ring-[#d86a03] font-medium rounded-lg text-sm px-4 py-2"
                    >
                        {currentLanguage === "en" ? "Search" : "Buscar"}
                    </button>
                </div>
            </div>

            <div className="w-full md:h-32">
                <a href="https://mx.ecoflow.com/" target="_blank" className="bg-slate-950">
                    <img className="h-full mx-auto" src="/img/banners/ecoflow_banner_directorio.webp" alt="EcoFlow Banner" />
                </a>
            </div>

            {/* Pagination handlers */}
            <div className="flex flex-col align-middle items-center gap-2">
                <div className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                    <button
                        type="button"
                        className="bg-gradient-to-l from-[#bc0100] to-[#d86a03] text-white relative inline-flex items-center rounded-l-md px-2 py-2 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        onClick={() => previousPage()}
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {createpageButtons()}
                    <button
                        type="button"
                        className="bg-gradient-to-r from-[#d86a03] to-[#bc0100] text-white relative inline-flex items-center rounded-r-md px-2 py-2 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        onClick={nextPage}
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="size-5  rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {directorioDigital.length > 0 ?
                directorioDigital.slice((currentPage - 1) * maxSize, currentPage * maxSize).map((item, index) => {
                    return (
                        <div className="bg-gray-500 text-white flex flex-col md:flex-row align-middle items-center gap-4 mx-auto rounded-lg p-2 w-full md:w-11/12" key={index}>
                            <div className="rounded-xl z-10 bg-gray-300 w-3/5 md:w-1/4 border-2 border-slate-400 p-2">
                                <img
                                    src={item.imagen.src}
                                    alt={item.nombreComercial}
                                    className="w-40 h-32 md:w-64 md:h-64 object-contain m-auto rounded-md"
                                />
                            </div>
                            <div className="mx-4 md:ml-0 md:w-3/4 z-10">
                                <span className="ms-[-10px] font-bold">Stand: {item.stand}</span>
                                <h2 className="text-2xl font-bold">{item.nombreComercial}</h2>
                                <p className="text-lg mt-2 text-justify">{currentLanguage === "en" ? item.descripcion_en : item.descripcion_es}</p>
                                <div className="mt-2 text-lg flex flex-row items-center gap-2">
                                    {item.direccion ? <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                                />
                                            </>
                                        </svg>
                                    </span> : ''}
                                    {item.direccion !== "" ? item.direccion + ", " : ''}
                                    {item.cp !== "" ? item.cp + '. ' : ' '}
                                    {item.Ciudad !== "" ? item.Ciudad + ', ' : ' '}
                                    {item.Estado !== "" ? item.Estado + '. ' : ' '}
                                    {item.País !== "" ? item.País : ' '}
                                </div>
                            </div>
                        </div>
                    );
                })
                :
                //"Sin resultados"
                <h1 className="p-4 rounded-lg card-program-light my-8 text-black text-2xl font-bold ">
                    No hay resultados
                </h1>
            }



            {/* Pagination handlers */}
            <div className="flex flex-col align-middle items-center gap-2 mb-8">
                <div className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                    <button
                        type="button"
                        className="bg-gradient-to-l from-[#bc0100] to-[#d86a03] text-white relative inline-flex items-center rounded-l-md px-2 py-2 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        onClick={() => previousPage()}
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {createpageButtons()}
                    <button
                        type="button"
                        className="bg-gradient-to-r from-[#d86a03] to-[#bc0100] text-white relative inline-flex items-center rounded-r-md px-2 py-2 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        onClick={nextPage}
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="size-5  rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListDirectory;