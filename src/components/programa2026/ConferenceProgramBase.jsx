import { useEffect, useMemo, useState } from "react";

const defaultTheme = {
  spinnerTopClass: "border-t-[#565078]",
  modalHeaderGradient: "from-[#565078] via-[#766EA6] to-[#565078]",
  modalPositionTextClass: "text-purple-100",
  modalAccentGradient: "from-[#565078] to-[#766EA6]",
  dayButtonActiveClass:
    "bg-gradient-to-br from-[#565078] to-[#766EA6] text-white shadow-lg shadow-purple-500/30 scale-105",
  dayButtonInactiveClass:
    "bg-white text-slate-700 border border-slate-200 hover:border-[#565078] hover:shadow-md",
  selectedDayCardClass:
    "rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 p-4 sm:p-5",
  selectedDayIconClass: "bg-gradient-to-br from-[#565078] to-[#766EA6]",
  selectedDayDateClass: "text-sm font-bold text-slate-900 capitalize",
  selectedDaySubClass: "text-xs text-slate-500 mt-0.5",
  selectedDaySessionsBadgeClass:
    "flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm",
  selectedDaySessionsCountClass: "text-sm font-bold text-slate-900",
  selectedDaySessionsLabelClass: "text-xs text-slate-600",
  selectedDaySessionsIconClass: "text-[#565078]",
  cardAccentGradient: "from-[#766EA6] to-[#565078]",
  timeIconClass: "text-[#565078]",
  speakerArrowHoverClass:
    "group-hover:text-[#565078] group-hover:border-[#565078]",
};

export function ConferenceProgramBase({
  language,
  stageId,
  theme,
  showCompanyLogo = false,
}) {
  const ui = useMemo(() => ({ ...defaultTheme, ...(theme || {}) }), [theme]);

  const [programData, setProgramData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDayId, setActiveDayId] = useState(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  useEffect(() => {
    if (!selectedSpeaker) return undefined;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [selectedSpeaker]);

  useEffect(() => {
    fetch("https://dashboard.igeco.mx/api/programa/completo")
      .then((response) => response.json())
      .then((data) => {
        const ecoStage = data?.data?.find((stage) => stage.id === stageId);
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
  }, [stageId]);

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
    const value = (type || "").toLowerCase();
    if (!value) return "otro";
    return value;
  };

  const typeLabel = (type) => {
    const typeValue = normalizeType(type);
    if (typeValue === "panel") return "Panel";
    if (typeValue === "keynote") return "Keynote";
    if (typeValue === "presentation") return "Presentación";
    return "Sesión";
  };

  const typeColor = (type) => {
    const typeValue = normalizeType(type);
    if (typeValue === "panel") return "bg-amber-100 text-amber-800 ring-amber-200";
    if (typeValue === "keynote")
      return "bg-purple-100 text-purple-800 ring-purple-200";
    if (typeValue === "presentation")
      return "bg-indigo-100 text-indigo-800 ring-indigo-200";
    return "bg-slate-100 text-slate-700 ring-slate-200";
  };

  const speakerAvatar = (photo) => {
    if (!photo) return null;
    return `https://dashboard.igeco.mx/ponentes/${photo}`;
  };

  const companyLogo = (logo) => {
    if (!logo) return null;
    return `https://dashboard.igeco.mx/logos/${logo}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div
          className={`h-10 w-10 animate-spin rounded-full border-2 border-slate-200 ${ui.spinnerTopClass}`}
        />
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
      {selectedSpeaker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div
            className="relative max-h-[95vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className={`relative bg-gradient-to-br ${ui.modalHeaderGradient} px-4 py-6 md:px-8 md:py-12`}
            >
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

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-2 md:mb-3">
                    {selectedSpeaker.name}
                  </h3>
                  {selectedSpeaker.position && (
                    <p className={`text-sm md:text-lg font-medium mb-2 ${ui.modalPositionTextClass}`}>
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
                      <span className="font-medium">{selectedSpeaker.company}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-y-auto p-8" style={{ maxHeight: "calc(95vh - 280px)" }}>
              {selectedSpeaker.bio_esp ? (
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${ui.modalAccentGradient}`} />
                    <h4 className="text-xl font-bold text-slate-800">Semblanza</h4>
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

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl">
          <div className="flex flex-col gap-4">
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
                <span className="text-sm font-semibold text-white">Selecciona el día</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {days.map((day) => {
                  const active = day.id === activeDayId;
                  return (
                    <button
                      key={day.id}
                      onClick={() => setActiveDayId(day.id)}
                      className={
                        "px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all " +
                        (active ? ui.dayButtonActiveClass : ui.dayButtonInactiveClass)
                      }
                    >
                      <span className="capitalize">{day.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {activeDay && (
              <div className={ui.selectedDayCardClass}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl ${ui.selectedDayIconClass} flex items-center justify-center shadow-md`}
                    >
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
                      <div className={ui.selectedDayDateClass}>{formatDate(activeDay.date)}</div>
                      <div className={ui.selectedDaySubClass}>Día seleccionado</div>
                    </div>
                  </div>
                  <div className={ui.selectedDaySessionsBadgeClass}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`h-5 w-5 ${ui.selectedDaySessionsIconClass}`}
                    >
                      <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
                      <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z" />
                    </svg>
                    <span className={ui.selectedDaySessionsCountClass}>{sessions.length}</span>
                    <span className={ui.selectedDaySessionsLabelClass}>sesiones</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

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
                  <div
                    className={`absolute inset-y-3 left-0 w-[3px] rounded-full bg-gradient-to-b ${ui.cardAccentGradient}`}
                  />

                  <div className="pl-3 sm:pl-4 md:pl-6 flex flex-col md:flex-row gap-4 md:gap-5">
                    <div className="flex flex-row md:flex-col justify-start items-start gap-2 text-xs text-slate-600 md:min-w-[180px] md:max-w-[180px]">
                      <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 sm:px-3 py-1 font-semibold text-slate-800 shadow-sm text-xs sm:text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${ui.timeIconClass} flex-shrink-0`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 3a1 1 0 011-1h1a1 1 0 010 2v1h4V4a1 1 0 112 0v1h1a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h1V4a1 1 0 011-1zm-1 6v5a1 1 0 001 1h8a1 1 0 001-1V9H5zm3 1a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-mono tracking-tight whitespace-nowrap">
                          {formatTime(conferencia.start_time)} – {formatTime(conferencia.end_time)}
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

                    <div className="flex flex-col gap-4 md:flex-row md:items-start justify-between">
                      <div className="space-y-2 flex-1 min-w-0">
                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 leading-tight">
                            {language === "es" ? conferencia.title : conferencia.title_en}
                          </h3>
                        </div>
                        <div>
                          {conferencia.description ? (
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                              {language === "es"
                                ? conferencia.description
                                : conferencia.description_en}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          {conferencia.ponentes && conferencia.ponentes.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                              {conferencia.ponentes.map((speaker) => (
                                <button
                                  key={speaker.id}
                                  onClick={() => setSelectedSpeaker(speaker)}
                                  className="group flex items-center gap-2 rounded-xl bg-slate-50 px-2.5 sm:px-3 py-1 text-xs text-slate-700 border border-slate-100 hover:border-slate-200 transition"
                                  title="Ver semblanza"
                                >
                                  {speakerAvatar(speaker.photo) ? (
                                    <img
                                      src={speakerAvatar(speaker.photo)}
                                      alt={speaker.name}
                                      className="h-6 w-6 sm:h-14 sm:w-14 rounded-full object-cover flex-shrink-0"
                                    />
                                  ) : (
                                    <div className="h-6 w-6 sm:h-14 sm:w-14 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                      {(speaker.name || "?").slice(0, 2).toUpperCase()}
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    <p className="text-left font-semibold text-slate-900">
                                      <span>{speaker.name}</span>
                                      <br />
                                      <span className="italic font-normal">{speaker.position}</span>
                                    </p>
                                  </div>
                                  <span
                                    className={`ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 ${ui.speakerArrowHoverClass} transition`}
                                  >
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9 6L15 12L9 18"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {showCompanyLogo ? (
                        <div className="flex w-full items-start justify-start md:w-auto md:justify-end">
                          {companyLogo(conferencia.company_logo) ? (
                            <div className="flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                              <span className="text-xs sm:text-sm font-medium text-black whitespace-nowrap">
                               Powered by
                              </span>
                              <img
                                src={companyLogo(conferencia.company_logo)}
                                alt={conferencia.company || "Empresa"}
                                className="h-12 w-28 sm:h-16 sm:w-36 md:h-20 md:w-40 rounded-lg bg-white object-contain p-2 border border-slate-200 shadow-sm"
                              />
                            </div>
                          ) : null}
                        </div>
                      ) : null}
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
