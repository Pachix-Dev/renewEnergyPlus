import _Marquee from 'react-fast-marquee'
const Marquee = _Marquee?.default ?? _Marquee

export function KeynoteSpeakersCarousel({ language }) {
  const speakers = [
    {
      name: "Andrea Hurtado",
      roleEs: "Directora General de Políticas Climáticas",
      roleEn: "Climate Policy Director",
      orgEs: "Secretaría de Medio Ambiente y Recursos Naturales",
      orgEn: "Secretariat of Environment and Natural Resources",
      date: "14 ABR 26",
      image: "/img/andrea_hurtado_ed.webp",
      focus: "50% 18%",
    },
    {
      name: "Manuel Herrera",
      roleEs: "Secretario de Desarrollo Energético Sustentable",
      roleEn: "Sustainable Energy Development Secretary",
      orgEs: "Gobierno del Estado de Jalisco",
      orgEn: "Jalisco State Government",
      date: "14 ABR 26",
      image: "/img/manuel_herrera.webp",
      focus: "50% 15%",
    },
    {
      name: "Jorge Villareal",
      roleEs: "Director de Política Climática",
      roleEn: "Climate Policy Director",
      orgEs: "Iniciativa Climática de México",
      orgEn: "Climate Initiative of Mexico",
      date: "15 ABR 26",
      image: "/img/jorge_villarreal.webp",
      focus: "50% 14%",
    },
    {
      name: "Ximena Cantú",
      roleEs: "Directora",
      roleEn: "Director",
      orgEs: "Rafiqui",
      orgEn: "Rafiqui",
      date: "15 ABR 26",
      image: "/img/xmena_cantu.webp",
      focus: "50% 20%",
    },
    {
      name: "Adriana Rivera",
      roleEs: "Directora Ejecutiva",
      roleEn: "Executive Director",
      orgEs: "Asociación Mexicana de Data Centers",
      orgEn: "Mexican Data Centers Association",
      date: "16 ABR 26",
      image: "/img/adriana_rivera.webp",
      focus: "50% 20%",
    },
    {
      name: "Claudia Esteves",
      roleEs: "Directora General",
      roleEn: "General Director",
      orgEs: "Asociación Mexicana de Parques Industriales Privados",
      orgEn: "Mexican Association of Private Industrial Parks",
      date: "16 ABR 26",
      image: "/img/claudia_esteves.webp",
      focus: "50% 22%",
    },
    {
      name: "David Rangel",
      roleEs: "Director Comercial",
      roleEn: "Commercial Director",
      orgEs: "Ecotrends",
      orgEn: "Ecotrends",
      date: "16 ABR 26",
      image: "/img/david_rangel.webp",
      focus: "50% 20%",
    },
    {
      name: "Elisa Márquez ",
      roleEs: "Gerente General",
      roleEn: "Manager",
      orgEs: "Dobotica",
      orgEn: "Dobotica",
      date: "16 ABR 26 ",
      image: "/img/elisa_marquez.webp",
      focus: "50% 20%",
    },
    {
      name: "Jorge Luis Fernández ",
      roleEs: "Fundador",
      roleEn: "Founder",
      orgEs: "Solarfix",
      orgEn: "Solarfix",
      date: "16 ABR 26",
      image: "/img/jorge_fernandez.webp",
      focus: "50% 20%",
    },
     {
      name: "Óscar Hernández ",
      roleEs: "Director General",
      roleEn: "Manager",
      orgEs: "Profesionales en Supervision Eléctrica",
      orgEn: "Profesionales en Supervision Eléctrica",
      date: "16 ABR 26",
      image: "/img/oscar_hernadez.webp",
      focus: "50% 20%",
    }
  ];

  return (
    <div className="w-full py-12 flex flex-col items-center">
      <h2 className="mb-5 text-center text-2xl font-black uppercase tracking-[0.12em] text-white sm:mb-7 sm:text-4xl">
        KEYNOTE SPEAKERS
      </h2>

      <Marquee gradient={false} speed={40} pauseOnHover={true} className="mx-[-16px] sm:mx-[-32px]">
        {speakers.map((speaker, index) => (
          <article
            key={index}
            className="group relative mx-2 flex h-[405px] w-[205px] shrink-0 flex-col overflow-hidden rounded-[22px] border border-cyan-300/35 bg-gradient-to-b from-cyan-300/25 to-blue-800/95 sm:h-[465px] sm:w-[230px] lg:h-[500px] lg:w-[240px]"
          >
            <div className="relative h-[235px] shrink-0 overflow-hidden sm:h-[275px] lg:h-[290px]">
              <div className="absolute inset-x-[10%] top-2 h-[88%] rounded-t-[28px] bg-gradient-to-b from-cyan-300/35 to-cyan-100/10" />
              <img
                src={speaker.image}
                alt={speaker.name}
                className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ objectPosition: speaker.focus }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a11a8] via-[#0a11a8]/25 to-transparent" />
            </div>

            <div className="relative z-10 flex-1 p-4 text-white sm:p-5 lg:px-5 lg:py-5">
              <h3 className="text-[20px] font-black uppercase leading-[0.9] tracking-tight sm:text-[24px] lg:text-[26px]">
                {speaker.name.split(" ")[0]}
                <br />
                <span className="text-cyan-400">
                  {speaker.name.split(" ").slice(1).join(" ")}
                </span>
              </h3>

              <p className="mt-3 text-[11px] leading-tight text-cyan-50/95 sm:text-[14px] lg:text-[15px]">
                {language === "es" ? speaker.roleEs : speaker.roleEn}
              </p>
              <p className="mt-1 text-[11px] font-semibold leading-tight text-white/95 sm:text-[14px] lg:text-[15px]">
                {language === "es" ? speaker.orgEs : speaker.orgEn}
              </p>
            </div>
          </article>
        ))}
      </Marquee>
    </div>
  );
}