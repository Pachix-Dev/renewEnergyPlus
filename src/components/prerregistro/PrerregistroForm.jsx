import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePreregisterForm } from "../../store/preregister-form";

export function PrerregistroForm({ translates, currentLanguage }) {
  const { name, email, typeRegister, setName, setEmail, clear } =
    usePreregisterForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const urlbase = import.meta.env.DEV
    ? "http://localhost:3010/"
    : "https://re-plus-mexico.com.mx/server/";

  const handlePreregister = async () => {
    setProcessing(true);
    setMessage("");

    try {
      const response = await fetch(urlbase + "preregister-replus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          typeRegister
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.status) {
        clear();
        currentLanguage === "es"
          ? (window.location.href = "/prerregistro-exitoso")
          : (window.location.href = "/en/prerregistro-exitoso");
        return;
      }

      setMessage(data?.message || translates.submitError);
    } catch (error) {
      setMessage(translates.submitError);
    }

    setProcessing(false);
    setTimeout(() => {
      setMessage("");
    }, 8000);
  };

  return (
    <div className="w-full max-w-[480px] rounded-2xl bg-white px-5 py-6 text-left text-slate-950 shadow-[0_22px_65px_rgba(0,0,0,0.35)] sm:rounded-[24px] sm:px-8 sm:py-8 lg:px-9 lg:py-9">

      <h2 className="text-xl sm:text-2xl font-black text-black w-full text-center">
        {translates.title}
      </h2>

      <p className="mt-2 w-full text-sm leading-6 text-slate-700 text-center">
        {translates.description}
      </p>

      <form
        className="mt-5 space-y-4 sm:mt-6 sm:space-y-5"
        onSubmit={handleSubmit(handlePreregister)}
      >
        
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-slate-950"
          >
            {translates.nameLabel}
          </label>
          <input
            type="text"
            id="nombre"
            {...register("name", {
              required: translates.nameRequired,
              onChange: (e) => setName(e.target.value),
            })}
            placeholder={translates.namePlaceholder}
            defaultValue={name}
            className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
          {errors.name && (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-950"
          >
            {translates.emailLabel}
          </label>
          <div className="relative mt-2">
            <input
              type="email"
              id="email"
              {...register("email", {
                required: translates.emailRequired,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: translates.emailInvalid,
                },
                onChange: (e) => setEmail(e.target.value.trim()),
              })}
              placeholder={translates.emailPlaceholder}
              defaultValue={email}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            {errors.email && (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="privacyAccepted"
              {...register("privacyAccepted", {
                required: translates.privacyRequired,
              })}
              className="mt-1"
            />
            <label htmlFor="privacyAccepted" className="text-sm text-slate-700">
              {translates.privacyAcceptText}{" "}
              <a
                href={
                  currentLanguage === "es"
                    ? "/aviso-de-privacidad"
                    : "/en/aviso-de-privacidad"
                }
                className="text-slate-700 underline"
              >
                {translates.privacy}
              </a>
            </label>
          </div>
          {errors.privacyAccepted && (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.privacyAccepted.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="mt-1 h-11 w-full rounded-lg bg-blue-500 px-5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(59,130,246,0.35)] transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:opacity-70 disabled:shadow-none"
        >
          {processing ? translates.buttonProcessing : translates.button}
        </button>
      </form>

      {message && (
        <div className="mt-4 rounded-lg bg-red-100 p-4 text-sm font-medium text-red-700">
          {message}
        </div>
      )}
    </div>
  );
}
