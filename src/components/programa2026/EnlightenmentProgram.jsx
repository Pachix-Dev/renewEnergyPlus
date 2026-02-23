import { ConferenceProgramBase } from "./ConferenceProgramBase";

const enlightenmentTheme = {
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

export function EnlightenmentProgram({ language }) {
  return (
    <ConferenceProgramBase
      language={language}
      stageId={2}
      theme={enlightenmentTheme}
      showCompanyLogo={true}
    />
  );
}
