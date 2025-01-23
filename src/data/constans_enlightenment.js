import { title } from "process";

export const conferences = {
    day_1: [
        {
            id: 1,            
            hour: '12:00 – 12:30',
            name: 'HITACHI',
            status: 'VENDIDO', 
            duracion:'30 min.' ,
            logos:''      
        },
        {
            id: 2,
            hour: '12:45 – 13:15',
            name: 'METERING',
            status: 'VENDIDO',
             duracion:'30 min.',
             logos:'',
            title: 'Equipos y métodos de prueba para Sistemas Fotovoltaicos',
            title_en: 'Equipment and test methods for Photovoltaic Systems',
            resume: 'Diagnóstico y evaluación de eficiencia de Sistemas Fotovoltaicos por medio de Equipos Trazadores de Curvas IV, de acuerdo con las normativas y requerimientos para la instalación y mantenimiento preventivo de paneles solares.',
            resume_en: 'Diagnosis and evaluation of efficiency of Photovoltaic Systems through IV Curve Tracer Equipment, according to the regulations and requirements for the installation and preventive maintenance of solar panels.',    
            speakers: [
                {       
                    id: 1,  
                    imagenes:'/img/5mar-JoelRobinson-Metering.jpg',              
                    name: 'Joel Robinson',
                    bio: 'Profesional con amplia experiencia en el campo de generación de energía con sistemas fotovoltáicos. Contribuye actualmente y de manera clave al lanzamiento de varias iniciativas y soluciones técnicas en equipos de medición y evaluación de eficiencia en Paneles Fotovoltáicos. Actualmente trabaja en el desarrollo comercial de la línea de productos renovables de SEAWARD para el mercado norteamericano. ',
                    bio_en: 'Professional with extensive experience in the field of power generation with photovoltaic systems. He is currently a key contributor to the launching of several initiatives and technical solutions in measurement equipment and evaluation of efficiency in Photovoltaic Panels. He is currently working on the commercial development of SEAWARD´s renewable product line for the North American market. ',
                    position: 'Business Development Manager, SEAWARD Solar Products Norteamérica',
                    email: 'jademiguel@metering.com.mx',
                    phone: '55 45 69 41 39',
                   
                },                
            ],            
              
        },
        {
            id: 3,
            hour: '13:30 – 14:00',
            name: 'BATTERY DEPOT',
            status: 'VENDIDO',
             duracion:'30 min.',
             logos:''
        },
        {
            id: 4,
            hour: '14:00 – 15:00',
            name: 'BREAK',
            status: '',
             duracion:'60 min.',
             logos:''
        },
        {
            id: 5,
            hour: '15:00 – 15:30',
            name: 'AP SYSTEMS',
            status: 'VENDIDO',
             duracion:'30 min.',
             logos:'',
            title:'Tendencias en el mercado Latinoaméricano para tecnología de conversión energética',
            title_en:'Latin American Market Trends for Energy Conversion Technology',
            resume:'APsystems presenta las nuevas tendencias en tecnología MLPE y almacenamiento de energía. Año con año la tecnología APsystems desarrolla nuevas soluciones creadas especialmente para el mercado de México y Latinoamérica. Conoce el nuevo microinversor DS3-LV y una solución más potente para el Power Conversion Systems de APstorage.',
            resume_en:'APsystems presents new trends in MLPE technology and energy storage. Year after year APsystems technology develops new solutions created especially for the Mexican and Latin American market. Meet the new DS3-LV microinverter and a more powerful solution for APstorage Power Conversion Systems.',
            speakers: [
                {       
                    id: 1,                
                    name: 'José Cataño',
                    bio: 'El Ing. Cataño ha tenido una carrera técnica desde pequeño durante su preparatoria, posteriormente se graduó como Ingeniero en Mantenimiento Industrial en la Universidad Tecnológica de Jalisco. En 2019 comenzó en el área de sistemas con la empresa Gen-t para Herbalife Nutrition, después apoyó como consultor externo para el ERP Oracle. Ha tenido experiencia en apps de negocio, administración de negocios, base de datos y administración de base de datos usando Power BI.',
                    bio_en: 'Mr. Cataño has had a technical career since childhood during his high school, later graduated as an Engineer in Industrial Maintenance from the Technological University of Jalisco. In 2019 he started in the area of systems with the company Gen-t for Herbalife Nutrition, then supported as an external consultant for the ERP Oracle. She has had experience in business apps, business management, database and database management using Power BI.',
                    position: 'Technical Support Specialist',
                    email: 'jose.catano@apsystems.com',
                    phone: '52 33 26179699',
                    imagenes:'/img/5mar-JoséCataño-APSystem.png',
                },                
            ],  
        },
        {
            id: 6,
            hour: '15:45 – 16:15',
            name: 'EXEL SOLAR',
            status: 'RESERVADO',
             duracion:'30 min.',
             logos:''
        },
        {
            id: 7,
            hour: '16:30 – 17:00',
            name: 'LIVOLTEK',
            status: 'RESERVADO',
             duracion:'30 min.',
             logos:''
        },
        {
            id: 8,
            hour: '17:15 – 18:00',
            name: 'DISPONIBLE',
            status: '$1,500 USD',
             duracion:'45 min.',
             logos:''
        }
    ],
    day_2: [
        {
            id: 1,            
            hour: '12:00 – 12:30',
            name: 'LONGI',
            status: 'VENDIDO',
            duracion:'30 min'        
        },
        {
            id: 2,
            hour: '12:45 – 13:15',
            name: 'SOLARMAX',
            status: 'VENDIDO',
            duracion:'30 min'
        },
        {
            id: 3,
            hour: '13:30 – 14:00',
            name: 'S-5!',
            status: 'RESERVADO',
            duracion:'30 min'
        },
        {
            id: 4,
            hour: '14:00 – 15:00',
            name: 'BREAK',
            status: '',
            duracion:'60 minutos',
        },
        {
            id: 5,
            hour: '15:00 – 15:30',
            name: 'EXEL SOLAR',
            status: 'VENDIDO',
            duracion:'30 min'
        },
        {
            id: 6,
            hour: '15:45 – 16:15',
            name: 'SOLAREVER',
            status: 'VENDIDO',
            duracion:'30 min'
        },
        {
            id: 7,
            hour: '16:30 – 17:00',
            name: 'ORKA',
            status: 'VENDIDO',
            duracion:'30 min',
            title: 'Reducción de costos a través de la utilización de baterías y sistemas de manejo de energía. / Cost reduction through the use of batteries and energy management systems.',
            title_en: 'Cost reduction through the use of batteries and energy management systems. / Cost reduction through the use of batteries and energy management systems.',
            resume: ' En esta sesión presentaremos la extensa funcionalidad que otorgan los nuevos sistemas de almacenamiento y de manejo de energía para reducir costos en empresas manufactureras así como en sitios comerciales y oficinas. Adicionalmente presentaremos opciones disponibles para implementar estos sistemas sin inversión inicial y el aprovechamiento de créditos fiscales.',
            resume_en: 'In this session we will present the extensive functionality that new energy storage and energy management systems provide to reduce costs in manufacturing companies as well as in commercial sites and offices. Additionally, we will present options available to implement these systems without initial investment and the use of tax credits.',    
            speakers: [
                {       
                    id: 1,                
                    name: 'Daniel Roig',
                    bio: 'Daniel Roig es Ingeniero en Electrónica y Comunicaciones del Tecnológico de Monterrey y graduado de la escuela de negocios de Harvard donde obtuvo su Maestría en Administración. Consta adicionalmente con estudios en energía sustentable del Massachussets Instituto of Technology MITx. En la actualidad es Director General de Orka Energía Renovable, la cual se especializa en ofrecer soluciones de punta en energía renovable, especialmente en las áreas de almacenamiento y sistemas de manejo de energía. / Daniel Roig is an Electronics and Communications Engineer from the Tecnológico de Monterrey and a graduate of the Harvard Business School where he obtained his MBA. He also has studies in sustainable energy from the Massachusetts Institute of Technology MITx. He is currently CEO of Orka Energía Renovable, which specializes in offering cutting-edge solutions in renewable energy, especially in the areas of energy storage and energy management systems. ',
                    bio_en: 'Daniel Roig is an Electronic and Communications Engineer from Tecnológico de Monterrey and a graduate of Harvard Business School where he obtained his Master’s Degree in Management. It also consists of studies in sustainable energy of the Massachusetts Institute of Technology MITx. He is currently Managing Director of Orka Energía Renewable, which specializes in offering cutting-edge solutions in renewable energy, especially in the areas of storage and energy management systems',
                    position: 'Director General / CEO',
                    email: 'daniel@orka.ventures',
                    phone: '52-55-5432-5258',
                    imagenes:'/img/6mar-DanielRoig-Orka.jpg',
                },                
            ],  
        },
        {
            id: 8,
            hour: '17:15 – 18:00',
            name: 'DISPONIBLE',
            status: '$1,500 USD',
            duracion:'45 min'
        }
    ],
    day_3: [
        {
            id: 1,            
            hour: '12:00 – 12:30',
            name: 'BATTERY DEPOT',
            status: 'RESERVADO', 
            duracion:'30 min.', 
            logos:'',
            title: '',
            title_en: '',
            resume: ' ',
            resume_en: '',    
            speakers: [
                {       
                    id: 1,                
                    name: '',
                    bio: ' ',
                    bio_en: '',
                    position: '',
                    email: '',
                    phone: '',
                    imagenes:'',
                },                
            ],            
        },
        {
            id: 2,
            hour: '12:45 – 13:15',
            name: 'SOLAREVER',
            status: 'VENDIDO',
             duracion:'30 min.',
             logos:''
        },
        {
            id: 3,
            hour: '13:30 – 14:00',
            name: 'DISPONIBLE',
            status: '$1,500 USD',
             duracion:'30 min.',
             logos:''
        },
        {
            id: 4,
            hour: '14:15 – 14:45',
            name: 'DISPONIBLE',
            status: '$1,500 USD',
             duracion:'30 min.',
             logos:''
        },
        {
            id: 5,
            hour: '15:00 – 15:30',
            name: 'DISPONIBLE',
            status: '$1,500 USD',
             duracion:'30 min.',
             logos:''
        },
    ]
}