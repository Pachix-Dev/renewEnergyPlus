export function SegmentCard({ imgSrc, imgAlt, percent, label, hoverText, delay = 0 }) {
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="2000"
      data-aos-delay={delay}
      className="group relative w-full overflow-hidden rounded-xl shadow-lg outline-none transition-all duration-300 cursor-pointer min-h-[6.75rem] sm:min-h-[8.5rem] hover:-translate-y-1 hover:shadow-2xl focus-visible:-translate-y-1 focus-visible:shadow-2xl focus-visible:ring-2 focus-visible:ring-[#3333ff]/20"
    >
      <div className="absolute inset-0 flex items-center justify-center gap-2 p-3 text-left transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-full group-focus-visible:opacity-0 group-focus-visible:-translate-y-full sm:gap-4">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="h-auto w-11 flex-shrink-0 sm:w-[100px]"
        />
        <p className="text-[10px] font-semibold uppercase sm:text-sm">{label}</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-white sm:p-3 text-center text-[#222] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
        <p className="flex flex-col items-center justify-center gap-1 text-xs sm:gap-2 sm:text-base">
          <span className="text-2xl font-extrabold text-[#3333ff] sm:text-4xl">
            {percent}
          </span>
          <span className="leading-tight">{hoverText}</span>
        </p>
      </div>
    </div>
  );
}