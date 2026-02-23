import { ConferenceProgramBase } from "./ConferenceProgramBase";

const installerTheme = {
  spinnerTopClass: "border-t-[#BC0100]",
  modalHeaderGradient: "from-[#BC0100] via-[#D76901] to-[#BC0100]",
  modalPositionTextClass: "text-orange-100",
  modalAccentGradient: "from-[#BC0100] to-[#D76901]",
  dayButtonActiveClass:
    "bg-gradient-to-br from-[#BC0100] to-[#D76901] text-white shadow-lg shadow-red-500/30 scale-105",
  dayButtonInactiveClass:
    "bg-white text-slate-700 border border-slate-200 hover:border-[#BC0100] hover:shadow-md",
  selectedDayCardClass:
    "rounded-2xl bg-gradient-to-br from-[#D76901] to-[#BC0100]/50 border border-[#BC0100] p-4 sm:p-5 text-white shadow-md",
  selectedDayIconClass: "bg-gradient-to-br from-[#BC0100] to-[#D76901]",
  selectedDayDateClass: "text-sm font-bold text-white capitalize",
  selectedDaySubClass: "text-xs text-white mt-0.5",
  selectedDaySessionsBadgeClass:
    "flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm",
  selectedDaySessionsCountClass: "text-sm font-bold text-slate-900",
  selectedDaySessionsLabelClass: "text-xs text-slate-600",
  selectedDaySessionsIconClass: "text-[#BC0100]",
  cardAccentGradient: "from-[#D76901] to-[#BC0100]",
  timeIconClass: "text-[#BC0100]",
  speakerArrowHoverClass:
    "group-hover:text-[#BC0100] group-hover:border-[#BC0100]",
};

export function InstallerInnovationProgram({ language }) {
  return (
    <ConferenceProgramBase
      language={language}
      stageId={4}
      theme={installerTheme}
      showCompanyLogo={false}
    />
  );
}
