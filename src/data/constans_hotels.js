const hotels = [
  {
    src: '/hotel_barcelo.webp',
    name: 'Barceló Guadalajara',
    address: 'Av. De las Rosas 2933 Col. Rinconada del Bosque.',
    rate: '$1,950.00 MXN',
    phone: '+52 (33) 3678 0505  ext. 3141,3142',
    email: 'guadalajara.res@barcelo.com',
    code: 'RE+ MEXICO 2025 / ECOMONDO 2025',
    link: '',
    time_walk: '1',
    time_drive: '1',
    whatsapp: ''
  },
  {
    src: '/hotel_westin.webp',
    name: 'The Westin Guadalajara',
    address: 'Av. Las Rosas 2911, colonia Verde valle, C.P. 44530, Guadalajara, Jalisco.',
    rate: '$127.00 USD',
    phone: '+52 (55) 33 3880 2700',
    email: 'reservacionesgdl@westinhotels.com',
    code: 'RE+ MEXICO 2025 / ECOMONDO 2025',
    link: 'https://www.marriott.com/es/event-reservations/reservation-link.mi?id=1736199054483&key=GRP&guestreslink2=true&app=resvlink',
    time_walk: '1',
    time_drive: '1',
    whatsapp: ''
  }, 
  {
    src: '/hotel_fiesta_inn.webp',
    name: 'Fiesta Inn Guadalajara Expo',
    address: 'AV. Mariano Otero 1550 Rinconada del Sol.',
    rate: '$2,088.01 MXN',
    phone: '+52 33 3669 32 00',
    email: 'ventas3figdl@posadas.com',
    code: 'RE+ MEXICO 2025 / ECOMONDO 2025',
    link: 'https://www.corpo-rate.com/login?groupId=G1T4RI@FIG',
    time_walk: '7 ',
    time_drive: '5 ',
    whatsapp: ''
  },
  {
    src: '/onegdl.webp',
    name: 'One Guadalajara Expo',
    address: 'Av. Chapalita 1470, Chapalita, 44510 Guadalajara, Jal.',
    rate: '$1,300.00 MXN (Incluye desayuno)',
    phone: '33 3880 9200',
    email: 'ventas1gdex@posadas.com',
    code: 'RE+ MEXICO 2025 / ECOMONDO 2025',
    link: 'https://www.corpo-rate.com/login?groupId=G1T5ST@OGX',
    time_walk: '19 ',
    time_drive: '5 ',
    whatsapp: ''
  },
  {
    src: '/hotel_presidente.webp',
    name: 'Hotel Presidente InterContinental Guadalajara ',
    address: 'Moctezuma 2515, esquina Av. Adolfo López Mateos, Cd del Sol, Zapopan Jalisco.',
    rate: '$2,050 MXN',
    phone: '+52 (33) 3880 7000',
    email: 'guadalajara@grupopresidente.com',
    code: 'RE+ MEXICO 2025 / ECOMONDO 2025',
    link: '',
    time_walk: '25 ',
    time_drive: '7 ',
    whatsapp: '',
    link: 'https://www.ihg.com/redirect?path=hd&brandCode=6C&localeCode=es&regionCode=1&hotelCode=GDLHA&_PMID=99801505&GPC=RE3&cn=no&viewfullsite=true',
  },
  /*{
    src: '/hotel_marriot.webp',
    name: 'AC Marriot Guadalajara Expo',
    address: 'Av. López Mateos 2375. Ciudad del Sol. C.P. 45050. Guadalajara, Jalisco.',
    rate: '$1,850.00 MXN',
    phone: '+52 (33) 38 80 06 00',
    email: 'ana.maldonado@aimbridge.com',
    code: 'SOLAR - ECOMONDO',
    link: '',
    time_walk: '10 a 15 ',
    time_drive: '5  ',
    whatsapp: '33 18 93 37 90'
  },
  {
    src: '/hotel_rui.webp',
    name: 'RIU Plaza Guadalajara',
    address: 'Av. Av. López Mateos No. 830 Fracc. Chapalita.',
    rate: '$1,990.00 MXN',
    phone: '01 800 225 5748',
    email: 'WhatsApp + 33 3956 2291',
    code: 'SOLAR / ECO 24',
    link: 'https://www.riu.com/consultar-disponibilidad/?corporate',
    time_walk: '30 ',
    time_drive: '8 ',
    whatsapp: '33 3956 2291'
  },
  {
    src: '/hotel_ibis.webp',
    name: 'IBIS Guadalajara Expo',
    address: 'Av. Mariano Otero 1400 Col, Jardines del Bosque, 44520 Guadalajara, Jal.',
    rate: '$1,132.00 MXN',
    phone: '+52 (33) 3880 9600 ',
    email: 'H3355-SL1@accor.com',
    code: 'Solar + Storage // Ecomondo',
    link: '',
    time_walk: '3 ',
    time_drive: '5 ',
    whatsapp: '33 3880 96 00'
  },*/
  
  /*{
    src: '/hotel_real_inn.webp',
    name: 'Real Inn Expo',
    address: 'Av. Mariano Otero N. 1326, Col. Jardines de San Ignacio. C.P 45040.',
    rate: '$1,900.00 MXN',
    phone: '+52 (55) 5263 0536 ext 7338',
    email: 'brenda.martinez@caoreal.com',
    code: ': Ind. Solar + Storage Mexico',
    link: '',
    time_walk: '2 ',
    time_drive: '5 ',
    whatsapp: ''
  },
  
  {
    src: '/hotel_indigo.webp',
    name: 'Hotel INDIGO Guadalajara Expo',
    address: 'Av. López Mateos Sur 1280, Col. Chapalita.',
    rate: '$1,790.00 MXN',
    phone: '+52 (33) 3121 2424',
    email: 'rm@opratium.mx',
    code: 'SSM',
    link: 'https://www.ihg.com/hotelindigo/hotels/us/es/guadalajara/gdlal/hoteldetail?fromRedirect=true&qSrt=sBR&qIta=99801505&icdv=99801505&qSlH=GDLAL&qGrpCd=SSM&setPMCookies=true&qSHBrC=IN&qDest=Av.%20Adolfo%20L%C3%B3pez%20Mateos%20Sur%201280%2C%20Guadalajara%2C%20JAL%2C%20MX&srb_u=1',
    time_walk: '10 ',
    time_drive: '5 ',
    whatsapp: ''
  }*/
]

export { hotels }
