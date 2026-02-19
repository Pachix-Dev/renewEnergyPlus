import { useState, useEffect } from "react";

export function EnlightenmentProgram({ language }) {
  const [programData, setProgramData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDayId, setActiveDayId] = useState(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  useEffect(() => {
    fetch("https://dashboard.igeco.mx/api/programa/completo")
      .then((response) => response.json())
      .then((data) => {
        const ecoStage = data?.data?.find((stage) => stage.id === 2); // ID fijo para Enlightenment Area 2026
        // Ordenar días por el campo date (ascendente)
        const sortedDias = (ecoStage?.dias || [])
          .slice()
          .sort((a, b) =>
            String(a.date || "").localeCompare(String(b.date || "")),
          );

        setProgramData(ecoStage ? { ...ecoStage, dias: sortedDias } : null);
        const firstDayWithItems =
          sortedDias.find((d) => (d.conferencias || []).length > 0)?.id ||
          sortedDias[0]?.id ||
          null;
        setActiveDayId(firstDayWithItems);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || "Error desconocido");
        setLoading(false);
      });
  }, []);

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = String(timeString).split(":");
    return `${hours}:${minutes}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("es-MX", options);
  };

  const normalizeType = (type) => {
    const v = (type || "").toLowerCase();
    if (!v) return "otro";
    return v;
  };

  const typeLabel = (type) => {
    const t = normalizeType(type);
    if (t === "panel") return "Panel";
    if (t === "keynote") return "Keynote";
    if (t === "presentation") return "Presentación";
    return "Sesión";
  };

  const typeColor = (type) => {
    const t = normalizeType(type);
    if (t === "panel") return "bg-amber-100 text-amber-800 ring-amber-200";
    if (t === "keynote") return "bg-purple-100 text-purple-800 ring-purple-200";
    if (t === "presentation")
      return "bg-indigo-100 text-indigo-800 ring-indigo-200";
    return "bg-slate-100 text-slate-700 ring-slate-200";
  };

  const speakerAvatar = (photo) => {
    if (!photo) return null;
    return `https://dashboard.igeco.mx/ponentes/${photo}`;
  };

  // Este valor viene del campo company_logo del JSON del programa.
  // Corresponde al logo de la conferencia (no a la semblanza del ponente).
  const companyLogo = (logo) => {
    if (!logo) return null;
    return `https://dashboard.igeco.mx/logos/${logo}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-[#565078]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-center shadow-sm">
        Error al cargar el programa: {error}
      </div>
    );
  }

  if (!programData) {
    return (
      <div className="text-center py-16 text-slate-400">
        No se encontró información del ECO STAGE
      </div>
    );
  }

  const days = (programData.dias || [])
    .slice()
    .sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));
  const activeDay = days.find((d) => d.id === activeDayId) || days[0] || null;
  const sessions = (activeDay?.conferencias || [])
    .slice()
    .sort((a, b) =>
      String(a.start_time || "").localeCompare(String(b.start_time || "")),
    );

  return (
    <div className="py-10">
      {/* Modal de semblanza */}
      {selectedSpeaker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div
            className="relative max-h-[95vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header con imagen grande */}
            <div className="relative bg-gradient-to-br from-[#565078] via-[#766EA6] to-[#565078] px-4 py-6 md:px-8 md:py-12">
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="absolute top-3 right-3 md:top-4 md:right-4 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 md:h-6 md:w-6"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>

              <div className="flex flex-col items-center gap-4 md:gap-6 md:flex-row md:items-start">
                {/* Imagen más grande */}
                <div className="relative">
                  {speakerAvatar(selectedSpeaker.photo) ? (
                    <img
                      src={speakerAvatar(selectedSpeaker.photo)}
                      alt={selectedSpeaker.name}
                      className="h-24 w-24 md:h-40 md:w-40 rounded-2xl object-cover ring-4 ring-white/40 shadow-xl"
                    />
                  ) : (
                    <div className="h-24 w-24 md:h-40 md:w-40 rounded-2xl bg-white/20 text-white flex items-center justify-center text-3xl md:text-5xl font-bold ring-4 ring-white/40 shadow-xl">
                      {(selectedSpeaker.name || "?").slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Info principal */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-2 md:mb-3">
                    {selectedSpeaker.name}
                  </h3>
                  {selectedSpeaker.position && (
                    <p className="text-sm md:text-lg text-purple-100 font-medium mb-2">
                      {selectedSpeaker.position}
                    </p>
                  )}
                  {selectedSpeaker.company && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 md:h-5 md:w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 16.5v-13h-.25a.75.75 0 010-1.5h12.5a.75.75 0 010 1.5H16v13h.25a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v2.5a.75.75 0 01-.75.75h-3.5a.75.75 0 010-1.5H4zm3-11a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM7.5 9a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM11 5.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm.5 3.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">
                        {selectedSpeaker.company}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contenido con semblanza */}
            <div
              className="overflow-y-auto p-8"
              style={{ maxHeight: "calc(95vh - 280px)" }}
            >
              {selectedSpeaker.bio_esp ? (
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#565078] to-[#766EA6]"></div>
                    <h4 className="text-xl font-bold text-slate-800">
                      Semblanza
                    </h4>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <p className="whitespace-pre-line text-base leading-relaxed text-slate-700">
                      {language === "es"
                        ? selectedSpeaker.bio_esp
                        : selectedSpeaker.bio_eng}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-12 text-slate-400">
                  <p>No hay información de semblanza disponible</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Programa principal */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header del programa */}
        <div className="rounded-3xl">
          <div className="flex flex-col gap-4">
            {/* Título y metadatos */}
            {/* <div className="space-y-3">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                                {programData.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                {programData.location && (
                                    <div className="inline-flex items-center gap-2 text-slate-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-[#565078]">
                                            <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-medium">{programData.location}</span>
                                    </div>
                                )}
                                {programData.capacity && (
                                    <div className="inline-flex items-center gap-2 text-slate-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-[#565078]">
                                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                                        </svg>
                                        <span className="font-medium">Capacidad: {programData.capacity}</span>
                                    </div>
                                )}
                            </div>
                        </div> */}

            {/* Filtros de días */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-[#ffffff]"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-semibold text-white">
                  Selecciona el día
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {days.map((d) => {
                  const active = d.id === activeDayId;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setActiveDayId(d.id)}
                      className={
                        "px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all " +
                        (active
                          ? "bg-gradient-to-br from-[#565078] to-[#766EA6] text-white shadow-lg shadow-purple-500/30 scale-105"
                          : "bg-white text-slate-700 border border-slate-200 hover:border-[#565078] hover:shadow-md")
                      }
                    >
                      <span className="capitalize">{d.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info del día seleccionado */}
            {activeDay && (
              <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#565078] to-[#766EA6] flex items-center justify-center shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 text-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 capitalize">
                        {formatDate(activeDay.date)}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Día seleccionado
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-[#565078]"
                    >
                      <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
                      <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z" />
                    </svg>
                    <span className="text-sm font-bold text-slate-900">
                      {sessions.length}
                    </span>
                    <span className="text-xs text-slate-600">sesiones</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lista de conferencias */}
        <div className="mt-8 space-y-6">
          {sessions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 text-center text-slate-500">
              No hay conferencias para los filtros seleccionados
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 md:gap-6">
              {sessions.map((conferencia) => (
                <li
                  key={conferencia.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-gradient-to-b from-[#766EA6] to-[#565078]" />

                  <div className="pl-3 sm:pl-4 md:pl-6 flex flex-col md:flex-row gap-4 md:gap-5">
                    <div className="flex flex-row md:flex-col justify-start items-start gap-2 text-xs text-slate-600 md:min-w-[180px] md:max-w-[180px]">
                      <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 sm:px-3 py-1 font-semibold text-slate-800 shadow-sm text-xs sm:text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#565078] flex-shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 3a1 1 0 011-1h1a1 1 0 010 2v1h4V4a1 1 0 112 0v1h1a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h1V4a1 1 0 011-1zm-1 6v5a1 1 0 001 1h8a1 1 0 001-1V9H5zm3 1a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-mono tracking-tight whitespace-nowrap">
                          {formatTime(conferencia.start_time)} –{" "}
                          {formatTime(conferencia.end_time)}
                        </span>
                      </span>
                      <span
                        className={
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] uppercase tracking-wide font-semibold ring-1 shadow-sm whitespace-nowrap " +
                          typeColor(conferencia.type)
                        }
                      >
                        {typeLabel(conferencia.type)}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-row justify-between gap-4">

                    {/* Información de la conferencia */}
                      <div className="space-y-2">
                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 leading-tight">
                            {language === "es"
                              ? conferencia.title
                              : conferencia.title_en}
                          </h3>
                        </div>
                        <div>
                          {conferencia.description ? (
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                              {language === "es"
                                ? conferencia.description
                                : conferencia.description_en}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          {conferencia.ponentes &&
                            conferencia.ponentes.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                                {conferencia.ponentes.map((p) => (
                                  <button
                                    key={p.id}
                                    onClick={() => setSelectedSpeaker(p)}
                                    className="flex items-center gap-2 rounded-xl bg-slate-50 px-2.5 sm:px-3 py-1 text-xs text-slate-700 border border-slate-100 hover:border-slate-200 transition"
                                    title="Ver semblanza"
                                  >
                                    {speakerAvatar(p.photo) ? (
                                      <img
                                        src={speakerAvatar(p.photo)}
                                        alt={p.name}
                                        className="h-6 w-6 sm:h-14 sm:w-14 rounded-full object-cover flex-shrink-0"
                                      />
                                    ) : (
                                      <div className="h-6 w-6 sm:h-14 sm:w-14 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        {(p.name || "?")
                                          .slice(0, 2)
                                          .toUpperCase()}
                                      </div>
                                    )}
                                    <p className="truncate text-left font-semibold text-slate-900">
                                     <span>{p.name}</span><br />
                                     <span className="italic font-normal">{p.position}</span>
                                    </p>
                                  </button>
                                ))}
                              </div>
                            )}
                        </div>
                      </div>

                      {/* Bloque de información de la conferencia: aquí se muestra el logo de empresa */}
                      <div className="flex items-start justify-between gap-3">
                        {companyLogo(conferencia.company_logo) ? (
                          <img
                            src={companyLogo(conferencia.company_logo)}
                            alt={conferencia.company || "Empresa"}
                            className="h-8 w-16 sm:h-24 sm:w-40 rounded bg-slate-50 object-contain p-1 border border-slate-200"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
