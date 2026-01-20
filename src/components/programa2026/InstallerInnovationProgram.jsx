import { useState, useEffect } from 'react';

export function InstallerInnovationProgram( { language } ) {

    const [programData, setProgramData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeDayId, setActiveDayId] = useState(null);
    const [typeFilter, setTypeFilter] = useState('todos');
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    
    useEffect(() => {
        fetch('https://dashboard.igeco.mx/api/programa/completo')
            .then((response) => response.json())
            .then((data) => {
                const ecoPitch = data?.data?.find((stage) => stage.id === 4); // ID fijo para Installer & Innovation Area 2026
                // Ordenar días por el campo date (ascendente)
                const sortedDias = (ecoPitch?.dias || [])
                    .slice()
                    .sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')));

                setProgramData(ecoPitch ? { ...ecoPitch, dias: sortedDias } : null);
                const firstDayWithItems = sortedDias.find((d) => (d.conferencias || []).length > 0)?.id || sortedDias[0]?.id || null;
                setActiveDayId(firstDayWithItems);
                setLoading(false);
            })
            .catch((err) => {
                setError(err?.message || 'Error desconocido');
                setLoading(false);
            });
    }, []);

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = String(timeString).split(':');
        return `${hours}:${minutes}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-MX', options);
    };

    const normalizeType = (type) => {
        const v = (type || '').toLowerCase();
        if (!v) return 'otro';
        return v;
    };

    const typeLabel = (type) => {
        const t = normalizeType(type);
        if (t === 'panel') return 'Panel';
        if (t === 'keynote') return 'Keynote';
        if (t === 'presentation') return 'Presentación';
        return 'Sesión';
    };

    const typeColor = (type) => {
        const t = normalizeType(type);
        if (t === 'panel') return 'bg-amber-100 text-amber-800 ring-amber-200';
        if (t === 'keynote') return 'bg-indigo-100 text-indigo-800 ring-indigo-200';
        if (t === 'presentation') return 'bg-emerald-100 text-emerald-800 ring-emerald-200';
        return 'bg-slate-100 text-slate-700 ring-slate-200';
    };

    const speakerAvatar = (photo) => {
        if (!photo) return null;
        return `https://dashboard.igeco.mx/ponentes/${photo}`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-16">
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-3xl rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                Error al cargar el programa: {error}
            </div>
        );
    }

    if (!programData) {
        return <div className="text-center py-12">No se encontró información del ECO PITCH 2026</div>;
    }

    const days = (programData.dias || []).slice().sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')));
    const activeDay = days.find((d) => d.id === activeDayId) || days[0] || null;
    const sessions = (activeDay?.conferencias || [])
        .slice()
        .sort((a, b) => String(a.start_time || '').localeCompare(String(b.start_time || '')))
        .filter((c) => (typeFilter === 'todos' ? true : normalizeType(c.type) === typeFilter));

    const availableTypes = Array.from(
        new Set((activeDay?.conferencias || []).map((c) => normalizeType(c.type)))
    ).filter(Boolean);

    return (
        <>
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
                        <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 px-4 py-6 md:px-8 md:py-12">
                            <button
                                onClick={() => setSelectedSpeaker(null)}
                                className="absolute top-3 right-3 md:top-4 md:right-4 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 hover:scale-110"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 md:h-6 md:w-6">
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
                                            {(selectedSpeaker.name || '?').slice(0, 2).toUpperCase()}
                                        </div>
                                    )}
                                    {/* {selectedSpeaker.role && (
                                        <div className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 md:px-4 md:py-1.5 text-xs font-bold text-emerald-700 shadow-lg ring-2 ring-emerald-200">
                                            {selectedSpeaker.role}
                                        </div>
                                    )} */}
                                </div>

                                {/* Info principal */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-2 md:mb-3">
                                        {selectedSpeaker.name}
                                    </h3>
                                    {selectedSpeaker.position && (
                                        <p className="text-sm md:text-lg text-emerald-50 font-medium mb-2">
                                            {selectedSpeaker.position}
                                        </p>
                                    )}
                                    {selectedSpeaker.company && (
                                        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 md:h-5 md:w-5">
                                                <path fillRule="evenodd" d="M4 16.5v-13h-.25a.75.75 0 010-1.5h12.5a.75.75 0 010 1.5H16v13h.25a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v2.5a.75.75 0 01-.75.75h-3.5a.75.75 0 010-1.5H4zm3-11a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM7.5 9a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM11 5.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm.5 3.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-medium">{selectedSpeaker.company}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contenido con semblanza */}
                        <div className="overflow-y-auto p-8" style={{ maxHeight: 'calc(95vh - 280px)' }}>
                            {selectedSpeaker.bio_esp ? (
                                <div>
                                    <div className="mb-4 flex items-center gap-2">
                                        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                                        <h4 className="text-xl font-bold text-slate-800">Semblanza</h4>
                                    </div>
                                    <div className="prose prose-slate max-w-none">
                                        <p className="whitespace-pre-line text-base leading-relaxed text-slate-700">
                                            {language === "es" ? selectedSpeaker.bio_esp : selectedSpeaker.bio_eng}
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
            {/* <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 md:p-8">
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-200/30 blur-2xl" />
                <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-emerald-300/20 blur-3xl" />
                <div className="relative">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                        {programData.name}
                    </h1>
                    {programData.description && (
                        <p className="mt-3 max-w-3xl text-slate-700 text-base md:text-lg">{programData.description}</p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-emerald-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-emerald-600"><path d="M11.47 3.84a.75.75 0 0 1 1.06 0l7.53 7.53a.75.75 0 0 1-1.06 1.06L12 5.56 4.99 12.43a.75.75 0 1 1-1.02-1.1l7.5-7.5z"/><path d="M12 7.75a.75.75 0 0 1 .75.75v11.25h2.25a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5h2.25V8.5a.75.75 0 0 1 .75-.75z"/></svg>
                            {programData.location || 'Ubicación por confirmar'}
                        </span>
                        {programData.capacity ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-emerald-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-emerald-600"><path d="M7.5 7.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"/><path d="M3 20.25a8.25 8.25 0 1 1 16.5 0 .75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75z"/></svg>
                                Capacidad: {programData.capacity}
                            </span>
                        ) : null}       
                    </div>
                </div>
            </div> */}

        {/* Program content */}
            <div className="mt-8 space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {days.map((d) => {
                            const count = (d.conferencias || []).length;
                            const active = d.id === activeDayId;
                            return (
                                <button
                                    key={d.id}
                                    onClick={() => setActiveDayId(d.id)}
                                    className={
                                        'relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ring-1 transition ' +
                                        (active
                                            ? 'bg-emerald-600 text-white ring-emerald-600 shadow-sm'
                                            : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50')
                                    }
                                >
                                    <span className="uppercase">{d.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-slate-600 mr-1">Tipo:</span>
                        <button
                            onClick={() => setTypeFilter('todos')}
                            className={
                                'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 transition ' +
                                (typeFilter === 'todos'
                                    ? 'bg-slate-900 text-white ring-slate-900'
                                    : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50')
                            }
                        >
                            Todos
                        </button>
                        {availableTypes.map((t) => (
                            <button
                                key={t}
                                onClick={() => setTypeFilter(t)}
                                className={
                                    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 transition ' +
                                    (typeFilter === t ? 'bg-emerald-600 text-white ring-emerald-600' : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50')
                                }
                            >
                                {typeLabel(t)}
                            </button>
                        ))}
                    </div> */}
                </div>
                <div className="relative">
                    <div className="sticky top-16 z-10 -mx-4 mb-4 bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-white md:rounded-md md:mx-0">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold capitalize">{formatDate(activeDay?.date)}</div>
                            <div className="text-xs text-emerald-100">{sessions.length} sesiones</div>
                        </div>
                    </div>

                    {sessions.length === 0 ? (
                        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600">No hay conferencias para los filtros seleccionados</div>
                    ) : (
                        <ul className="grid grid-cols-1 gap-4 md:gap-6">
                            {sessions.map((conferencia) => (
                                <li key={conferencia.id} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-md md:p-6">
                                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600" />
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                                        <div className="flex w-full items-center gap-2 md:w-40 md:flex-col md:items-start md:gap-1">
                                            <div className="inline-flex items-center gap-2 rounded-md bg-slate-50 px-2.5 py-1 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-emerald-600"><path d="M6.75 3A.75.75 0 0 0 6 3.75v.75H4.5A2.25 2.25 0 0 0 2.25 6.75v11.25A2.25 2.25 0 0 0 4.5 20.25h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5H18v-.75a.75.75 0 0 0-1.5 0v.75h-9v-.75A.75.75 0 0 0 6.75 3z"/><path d="M20.25 9H3.75v9a.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75V9z"/></svg>
                                                <span>
                                                    {formatTime(conferencia.start_time)}
                                                    <span className="mx-1 opacity-70">–</span>
                                                    {formatTime(conferencia.end_time)}
                                                </span>
                                            </div>
                                            <span className={
                                                'inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ' +
                                                typeColor(conferencia.type)
                                            }>
                                                {typeLabel(conferencia.type)}
                                            </span>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-lg md:text-xl font-bold text-slate-900"> {language === "es" ? conferencia.title : conferencia.title_en}  </h3>
                                            {conferencia.description ? (
                                                <p className="mt-3 text-slate-700"> {language === "es" ? conferencia.description : conferencia.description_en} </p>
                                            ) : null}

                                            {conferencia.ponentes && conferencia.ponentes.length > 0 ? (
                                                <div className="mt-4">
                                                    <div className="mb-2 text-sm font-semibold text-slate-900">Ponentes</div>
                                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                                                        {conferencia.ponentes.map((p) => (
                                                            <div
                                                                key={p.id}
                                                                className="ml-2 flex flex-col rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200 hover:bg-slate-100 transition-all"
                                                            >
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    {speakerAvatar(p.photo) ? (
                                                                        <img src={speakerAvatar(p.photo)} alt={p.name} className="h-10 w-10 rounded-full object-cover" />
                                                                    ) : (
                                                                        <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                                                                            {(p.name || '?').slice(0, 2).toUpperCase()}
                                                                        </div>
                                                                    )}
                                                                    <div className="min-w-0 flex flex-row items-center gap-2">
                                                                        <div className="truncate text-sm font-semibold text-slate-900">
                                                                            {p.name}
                                                                        </div>
                                                                        {p.role && (
                                                                            <span className="inline-block rounded bg-slate-200 px-1.5 py-0.5 text-xs text-slate-700 mt-0.5"> {p.role} </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {p.position && (
                                                                    <div className="truncate text-xs text-slate-600 mb-1">{p.position}</div>
                                                                )}
                                                                {p.company && (
                                                                    <div className="truncate text-xs text-slate-500 mb-2">{p.company}</div>
                                                                )}
                                                                {p.bio_esp && (
                                                                    <button
                                                                        onClick={() => setSelectedSpeaker(p)}
                                                                        className="mt-auto w-[150px] rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 transition-colors"
                                                                    >
                                                                        Ver semblanza
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
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
        </>
    );
}