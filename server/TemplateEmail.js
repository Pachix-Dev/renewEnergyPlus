
const email_template = async ({ name, paternSurname, maternSurname}) => {          
    
    return (
   `<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 680px;">
    <tbody>
        <tr>
          <td colspan="2" align="center">
            <img src="https://industrialtransformation.mx/header-ITM-register.jpg" alt="logo" width="550">         
          </td>
        </tr>        
        <tr>
          <td colspan="2" >
            <h2 style="text-align: center;margin:0;font-weight:bold;text-transform: uppercase;margin-top: 20px;">
              BIENVENIDO, ${name} ${paternSurname} ${maternSurname}. <BR /> TU REGISTRO SE HA REALIZADO CON ÉXITO.
            </h2>
            <h2 style='text-align: center;'>
              GRACIAS POR FORMAR PARTE DE <span style="color:#E42128;font-weight:bold;">INDUSTRIAL TRANSFORMATION MEXICO 2024, </span>PRODUCTOS Y SOLUCIONES PARA LA FÁBRICA INTELIGENTE.
            </h2>
            <div style="text-align: justify;font-size:22px;">
              Descubre las últimas tendencias, innovaciones, conocimientos, herramientas y tecnologías que traen para ti los líderes globales en <strong>Automatización, Fábrica Inteligente y Soluciones de Logística Digital,</strong> y que están transformando el futuro de la industria.                    
            </div>
            <div style="text-align:center;padding:20px;margin-top:25px;">
              <div style="background: #E42128;padding:20px;border-radius:20px;">
                <a style="text-decoration:none; color: white;font-weight:bold;" href="https://industrialtransformation.mx/programa" target='_blank'>                 
                  CONSULTA EL PROGRAMA DE EVENTOS PARALELOS A ITM 2024
                </a>
              </div>
              <p style="margin-top:40px;margin-bottom: 40px;">
                Te esperamos en la sexta edición de <strong>INDUSTRIAL TRANSFORMATION MEXICO del 9 al 11 de octubre, Poliforum, León, Guanajuato.</strong>
              </p>
              <div style="background: #E42128;color:white;border-radius: 20px;padding:20px;">               
               <p><strong>HORARIOS:</strong></p>
               <p>miércoles 9 y jueves 10 de  11:00 am - 7:00 pm hrs</p>
               <p>viernes 11 de 11:00 am - 5:00 pm hrs</p>
              </div>
            </div>               
            <p style="font-weight:bold;font-size:20px;text-align: center;">AÑADIR AL CALENDARIO</p>
            <div style="text-align:center;padding:20px;margin: 20px;">
              <a style="background: rgb(18,172,255);background: linear-gradient(90deg, rgba(18,172,255,1) 0%, rgba(10,61,255,1) 100%);color:white;padding:20px;border-radius:20px;margin:20px;text-decoration:none;" href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20241009T170000Z%2F20241012T010000Z&details=Industrial%20Transformation%20Mexico%20es%20un%20evento%20interesante%20e%20inclusivo%20en%20el%20que%20los%20actores%20clave%20y%20los%20grupos%20objetivo%20se%20re%C3%BAnen%20para%20crear%20redes%20y%20oportunidades%20de%20intercambio%20de%20conocimientos%20para%20el%20%C3%A9xito%20empresarial.%0A&location=Poliforum%2C%20Le%C3%B3n&text=INDUSTRIAL%20TRANSFORMATION%20MEXICO%202024"
              target="_blank">                        
                Google
              </a>
            </div>
            <div style="text-align:center;padding:20px;margin: 20px;">              
              <a style="background: rgb(18,172,255);background: linear-gradient(90deg, rgba(18,172,255,1) 0%, rgba(10,61,255,1) 100%);color:white;padding:20px;border-radius:20px;text-decoration:none;" href="https://outlook.live.com/calendar/0/action/compose?allday=false&body=Industrial%20Transformation%20Mexico%20es%20un%20evento%20interesante%20e%20inclusivo%20en%20el%20que%20los%20actores%20clave%20y%20los%20grupos%20objetivo%20se%20re%C3%BAnen%20para%20crear%20redes%20y%20oportunidades%20de%20intercambio%20de%20conocimientos%20para%20el%20%C3%A9xito%20empresarial.%0A&enddt=2024-10-11T19%3A00%3A00&location=Poliforum%2C%20Le%C3%B3n&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2024-10-09T11%3A00%3A00&subject=INDUSTRIAL%20TRANSFORMATION%20MEXICO%202024"
              target="_blank">                       
                Outlook
              </a>
            </div>                   
            <div style="text-align:center;padding:20px;margin: 20px;">
              <a style="background: rgb(18,172,255);background: linear-gradient(90deg, rgba(18,172,255,1) 0%, rgba(10,61,255,1) 100%);color:white;padding:20px;border-radius:20px;margin:20px;text-decoration:none;" href="https://calendar.yahoo.com/?desc=Industrial%2520Transformation%2520Mexico%2520es%2520un%2520evento%2520interesante%2520e%2520inclusivo%2520en%2520el%2520que%2520los%2520actores%2520clave%2520y%2520los%2520grupos%2520objetivo%2520se%2520re%25C3%25BAnen%2520para%2520crear%2520redes%2520y%2520oportunidades%2520de%2520intercambio%2520de%2520conocimientos%2520para%2520el%2520%25C3%25A9xito%2520empresarial.%250A&dur=false&et=20241012T010000Z&in_loc=Poliforum%2C+Le%C3%B3n&st=20241009T170000Z&title=INDUSTRIAL%2520TRANSFORMATION%2520MEXICO%25202024&v=60"
              target="_blank">
                
              <i>Y!</i> Yahoo!
              </a>
            </div>
            <div style="text-align:center;padding:20px;margin: 20px;">                            
              <a style="background: rgb(18,172,255);background: linear-gradient(90deg, rgba(18,172,255,1) 0%, rgba(10,61,255,1) 100%);color:white;padding:20px;border-radius:20px;text-decoration:none;" href="https://industrialtransformation.mx/icalendar.ics" donwload target="_blank">  
                iCalendar
              </a>
            </div>
            <p style="font-size:15px;line-height:21px;margin:16px 0px;font-weight:bold">
              INSTRUCCIONES PARA TU VISITA:
            </p>
            <ul>
              <li>
                <strong>IMPORTANTE:</strong> Es indispensable llevar tu pre-registro impreso o en formato digital para agilizar tu acceso al evento.
              </li>
              <li>
                Recuerda llevar tu credencial oficial de empresa o negocio para verificar tus datos.
              </li>
              <li>
                Tu acceso es único e intransferible y debe estar visible durante toda tu visita.
              </li>
              <li>
                En caso de perder tu gafete, no habrá reimpresiones en el piso expositor. Por lo cual, se tendrá que generar una compra de boleto para su ingreso con un costo de $300 MXN.
              </li>                  
            </ul>                                                          
          </td>      
        </tr>               
        <tr>
          <td style="padding:20px;" align="center">
            <div style="background: #E42128;border-radius: 20px;padding:20px;margin:auto;">
              <a style="text-decoration:none;color:white;" href="https://igeco.mx/" target="_blank">
                ENTÉRATE DE TODOS NUESTROS EVENTOS
              </a>
            </div>          
          </td>
          <td style="padding:20px;" align="center">
            <div style="background: #E42128;border-radius: 20px;padding:20px;margin:auto;">
              <a style="text-decoration:none;color:white;" href="https://industrialtransformation.mx/files/Floorplan_ITM_2024_31.05.2023.pdf" target="_blank">
                PLANO ITM 2024
              </a>
            </div>         
          </td>
        </tr> 
        <tr>
          <td style="padding:20px;" align="center">
           <div style="background: #E42128;width:fit-content;border-radius: 20px;padding:20px;margin:auto;">
            <a style="text-decoration:none;color:white;" href="https://industrialtransformation.mx/hotels" target="_blank">
              RESERVA AQUÍ TU HOSPEDAJE <br />CON TARIFA PREFERENCIAL
            </a>
           </div>           
          </td>
          <td style="padding:20px;" align="center">
            <div style="background: #E42128;width:fit-content;border-radius: 20px;padding:20px;margin:auto;">
              <a style="text-decoration:none;color:white;" href="https://industrialtransformation.mx" target="_blank">
                INVITA A UN COLEGA
              </a>
            </div>        
          </td>
        </tr>       
        <tr>
          <td colspan="2">
          <hr style="width:100%;border-top:1px solid rgb(214,216,219);border-right:none rgb(214,216,219);border-bottom:none rgb(214,216,219);border-left:none rgb(214,216,219);margin:30px 0px">
            <p style="font-size:12px;line-height:15px;margin:4px 0px;color:rgb(145,153,161);text-align:center">
              <strong>IGECO</strong>, Blvrd Francisco Villa 102-piso 14, Oriental, 37510 León, Guanajuato México.
            </p>
          </td>   
        </tr>     
      </tbody>
    </table>`
    )
  }
  
  export {email_template}
  