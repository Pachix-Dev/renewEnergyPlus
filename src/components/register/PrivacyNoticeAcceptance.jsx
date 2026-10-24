const PRIVACY_NOTICE_URL = "https://igeco.mx/aviso-de-privacidad/";

export function PrivacyNoticeAcceptance({
  register,
  errors,
  translates,
  currentLanguage,
}) {
  const isEnglish = currentLanguage === "en";
  const privacyLabel =
    translates?.privacy_policy ||
    (isEnglish ? "Privacy Policy" : "Aviso de privacidad");
  const requiredMessage = isEnglish
    ? "You must accept the privacy policy to complete your registration"
    : "Debe aceptar el aviso de privacidad para completar su registro";
  const informationRequiredMessage = isEnglish
    ? "You must agree to receive personalized information to complete your registration"
    : "Debe aceptar recibir información personalizada para completar su registro";

  return (
    <div className="rounded-lg shadow-lg border border-gray-800/20 p-8 mt-10">
      <div className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m8.36 12.166l2.475 2.475l5.305-5.305M8.422 19.21l3.354 1.677a.5.5 0 0 0 .448 0l3.354-1.677A8 8 0 0 0 20 12.056V6.693a1 1 0 0 0-.649-.936l-7-2.625a1 1 0 0 0-.702 0l-7 2.625A1 1 0 0 0 4 6.693v5.363a8 8 0 0 0 4.422 7.155"
          />
        </svg>
        <p className="text-lg font-semibold text-black uppercase">
          {privacyLabel}
        </p>
      </div>
      <hr className="my-4 border-t border-gray-200" />

      <label
        htmlFor="privacyNoticeAccepted"
        className="flex items-start gap-3 text-sm text-black"
      >
        <input
          id="privacyNoticeAccepted"
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-blue-700 focus:ring-blue-700"
          aria-invalid={errors.privacyNoticeAccepted ? "true" : "false"}
          aria-describedby={
            errors.privacyNoticeAccepted
              ? "privacyNoticeAccepted-error"
              : undefined
          }
          {...register("privacyNoticeAccepted", {
            required: requiredMessage,
          })}
        />
        <span>
          {isEnglish ? "I have read and accept the " : "He leido y acepto el "}
          <a
            href={PRIVACY_NOTICE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-green-700 underline"
          >
            {privacyLabel}
          </a>
          .
        </span>
      </label>

      {errors.privacyNoticeAccepted && (
        <p
          id="privacyNoticeAccepted-error"
          className="mt-3 text-red-600 font-light"
        >
          {errors.privacyNoticeAccepted.message}
        </p>
      )}

      <label
        htmlFor="personalizedInformationAccepted"
        className="mt-5 flex items-start gap-3 text-sm text-black"
      >
        <input
          id="personalizedInformationAccepted"
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-blue-700 focus:ring-blue-700"
          aria-invalid={errors.personalizedInformationAccepted ? "true" : "false"}
          aria-describedby={
            errors.personalizedInformationAccepted
              ? "personalizedInformationAccepted-error"
              : undefined
          }
          {...register("personalizedInformationAccepted", {
            required: informationRequiredMessage,
          })}
        />
        <span>
          {translates.privacy_information_consent} 
          <a
            href="mailto:social.media@igeco.mx"
            className="font-semibold text-green-700 underline"
          >
            {isEnglish ? " here " : " aquí "}
          </a>
          .
        </span>
      </label>

      {errors.personalizedInformationAccepted && (
        <p
          id="personalizedInformationAccepted-error"
          className="mt-3 text-red-600 font-light"
        >
          {errors.personalizedInformationAccepted.message}
        </p>
      )}
    </div>
  );
}
