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

            <div className="w-full h-32">
                <a href="https://mx.ecoflow.com/" target="_blank" className="bg-slate-950">
                    <img className="h-full mx-auto" src="/img/banners/ecoflow_banner_directorio.webp" alt="EcoFlow Banner" srcset="" />
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
                            <div className="mx-4 md:ml-0 md:w-1/2 z-10">
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
                            <div className="bg-gradient-to-r from-[#bc0100] to-[#d86a03] text-white z-10 relative w-11/12 md:w-1/3 p-2 rounded-md *:break-words">
                                <h3>{currentLanguage === "en" ? "Contact" : "Contacto"}</h3>
                                <p className="font-bold text-lg" >
                                    {
                                        addLineBreak(item.nombreContacto)
                                    }
                                </p>
                                <p className="italic text-ellipsis overflow-hidden whitespace-nowrap" set:html={item.Puesto.replace("\n", "<br/>")}>
                                    {
                                        addLineBreak(item.Puesto)
                                    }
                                </p>
                                {
                                    item.telefono ?
                                        <p className="text-lg flex flex-row items-center align-middle gap-2">
                                            <span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    width="20"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                                                    />
                                                </svg>
                                            </span>
                                            {
                                                addLineBreak(phoneFormat(item.telefono).toString())
                                            }
                                        </p> : ''
                                }

                                {
                                    item.Correo.split("\n").map((mail, index) => {
                                        return (
                                            <a href={`mailto:${mail}`} className="text-lg flex items-center gap-2 hover:text-[#f7f7f7] w-full break-words" key={index} >
                                                <span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        width="20"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                                        />
                                                    </svg>
                                                </span>
                                                {mail}
                                            </a>
                                        )
                                    }
                                    )}

                                {/* Redes sociales */}
                                <a href={`${item.paginaWeb.includes("http") ? item.paginaWeb : `https://${item.paginaWeb}`}`} className="text-lg flex items-center gap-2 hover:text-[#f7f7f7]" target="_blank" >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                                            />
                                        </svg>
                                    </span>
                                    {item.paginaWeb.replace("https://", "").replace("http://", "")}
                                </a>
                                <div className="my-4 flex flex-row justify-center gap-5">
                                    {item.Facebook.includes(".com") ?
                                        <a
                                            href={item.Facebook ?? "#"}
                                            className="text-lg flex items-center gap-2 *:hover:fill-[#f7f7f7]"
                                        >
                                            <svg
                                                role="img"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 fill-white"
                                            >
                                                <title>Facebook</title>
                                                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                                            </svg>
                                        </a>
                                        : ''
                                    }

                                    {item.Instagram.includes(".com") ?
                                        <a href={item.Instagram ?? "#"} className="text-lg flex items-center gap-2 *:hover:fill-[#f7f7f7]">
                                            <svg
                                                role="img"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 fill-white"
                                            >
                                                <title>Instagram</title>
                                                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                                            </svg>
                                        </a>
                                        : ''
                                    }
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