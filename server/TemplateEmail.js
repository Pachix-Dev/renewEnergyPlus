
const email_template = async ({ name, paternSurname, maternSurname=''}) => {          
    
    return (
   `<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 680px;">
    <tbody>
        <tr>
          <td colspan="2" align="center">
            <img src="https://re-plus-mexico.com.mx/header_replus_2026.png" alt="re+ mexico" width="550">         
          </td>
        </tr>        
        <tr>
          <td colspan="2" >
            <h2 style="text-align: center;margin:0;font-weight:bold;text-transform: uppercase;margin-top: 20px;">
              BIENVENIDO, ${name} ${paternSurname} ${maternSurname}. <BR /> TU REGISTRO SE HA REALIZADO CON ÉXITO.
            </h2>
            <h2 style='text-align: center;'>
              GRACIAS POR FORMAR PARTE DE <span style="color:#4E549F;font-weight:bold;">RE+ MEXICO 2026, </span>LA FERIA LÍDER EN ENERGÍAS RENOVABLES.
            </h2>
            <div style="text-align: justify;font-size:22px;">
              Descubre las últimas tendencias, innovaciones, conocimientos y tecnologías en Componentes y Equipo Solar, Almacenamiento de Energía, Tecnología Térmica, Inversores e Infraestructura de Red, que serán necesarias para emprender aceleradamente la transición energética renovable global.                   
            </div>
            <div style="text-align:center;padding:20px;margin-top:25px;">
              <div style="background: #4E549F;padding:20px;border-radius:20px;">
                <a style="text-decoration:none; color: white;font-weight:bold;" href="https://re-plus-mexico.com.mx/programa-premium/" target='_blank'>                 
                  CONSULTA EL PROGRAMA DE RE+ MEXICO
                </a>
              </div>
              <p style="margin-top:40px;margin-bottom: 40px;">
                Te esperamos en la sexta edición de <strong>RE+ MEXICO del 14 al 16 de abril, Expo, Guadalajara, Jalisco.</strong>
              </p>
              <div style="background: #4E549F;color:white;border-radius: 20px;padding:20px;">               
               <p><strong>HORARIOS:</strong></p>
               <p>Martes 14 y Miercoles 15, 11:00 am – 6:00 pm </p>              
               <p>Jueves 16, 11:00 am – 5:00 pm </p>
              </div>
            </div>               
            <p style="font-weight:bold;font-size:20px;text-align: center;">AÑADIR AL CALENDARIO</p>
            <div style="text-align:center;padding:20px;margin: 20px;">
              <a style="background: #1E293B;color:white;padding:20px;border-radius:20px;margin:20px;text-decoration:none;" href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20260414T214500Z%2F20260416T214500Z&details=Descubre%20las%20%C3%BAltimas%20tendencias%2C%20innovaciones%2C%20conocimientos%20y%20tecnolog%C3%ADas%20en%20Componentes%20y%20Equipo%20Solar%2C%20Almacenamiento%20de%20Energ%C3%ADa%2C%20Tecnolog%C3%ADa%20T%C3%A9rmica%2C%20Inversores%20e%20Infraestructura%20de%20Red%2C%20que%20ser%C3%A1n%20necesarias%20para%20emprender%20aceleradamente%20la%20transici%C3%B3n%20energ%C3%A9tica%20renovable%20global.&location=Expo%2C%20Guadalajara%2C%20Jalisco&text=RE%2B%20MEXICO"
              target="_blank">                        
                Google
              </a>
              <a style="background: #1E293B;color:white;padding:20px;border-radius:20px;text-decoration:none;" href="https://outlook.live.com/calendar/0/action/compose?allday=false&body=Descubre%20las%20%C3%BAltimas%20tendencias%2C%20innovaciones%2C%20conocimientos%20y%20tecnolog%C3%ADas%20en%20Componentes%20y%20Equipo%20Solar%2C%20Almacenamiento%20de%20Energ%C3%ADa%2C%20Tecnolog%C3%ADa%20T%C3%A9rmica%2C%20Inversores%20e%20Infraestructura%20de%20Red%2C%20que%20ser%C3%A1n%20necesarias%20para%20emprender%20aceleradamente%20la%20transici%C3%B3n%20energ%C3%A9tica%20renovable%20global.&enddt=2026-04-16T15%3A45%3A00&location=Expo%2C%20Guadalajara%2C%20Jalisco&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2026-04-14T15%3A45%3A00&subject=RE%2B%20MEXICO"
              target="_blank">                       
                Outlook
              </a>
            </div>                            
            <div style="text-align:center;padding:20px;margin: 20px;">
              <a style="background: #1E293B;color:white;padding:20px;border-radius:20px;margin:20px;text-decoration:none;" href="https://calendar.yahoo.com/?desc=Descubre%2520las%2520%25C3%25BAltimas%2520tendencias%252C%2520innovaciones%252C%2520conocimientos%2520y%2520tecnolog%25C3%25ADas%2520en%2520Componentes%2520y%2520Equipo%2520Solar%252C%2520Almacenamiento%2520de%2520Energ%25C3%25ADa%252C%2520Tecnolog%25C3%25ADa%2520T%25C3%25A9rmica%252C%2520Inversores%2520e%2520Infraestructura%2520de%2520Red%252C%2520que%2520ser%25C3%25A1n%2520necesarias%2520para%2520emprender%2520aceleradamente%2520la%2520transici%25C3%25B3n%2520energ%25C3%25A9tica%2520renovable%2520global.&dur=false&et=20260416T214500Z&in_loc=Expo%2C+Guadalajara%2C+Jalisco&st=20260414T214500Z&title=RE%252B%2520MEXICO&v=60"
              target="_blank">                
                <i>Y!</i> Yahoo!
              </a>
              <a style="background: #1E293B;color:white;padding:20px;border-radius:20px;text-decoration:none;" href="https://re-plus-mexico.com.mx/calendar-replusmexico-2026.ics" donwload target="_blank">  
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
                               
            </ul>                                                          
          </td>      
        </tr>               
        <tr>
          <td style="padding:20px;" align="center">
            <div style="background: #4E549F;border-radius: 20px;padding:20px;margin:auto;">
              <a style="text-decoration:none;color:white;" href="https://igeco.mx/" target="_blank">
                ENTÉRATE DE TODOS NUESTROS EVENTOS
              </a>
            </div>          
          </td>
          <td style="padding:20px;" align="center">
            <div style="background: #4E549F;border-radius: 20px;padding:20px;margin:auto;">
              <a style="text-decoration:none;color:white;" href="https://re-plus-mexico.com.mx/plano-re-plus-mexico-2026/" target="_blank">
                PLANO DEL EVENTO
              </a>
            </div>         
          </td>
        </tr> 
        <tr>
          <td style="padding:20px;" align="center">
           <div style="background: #4E549F;width:fit-content;border-radius: 20px;padding:20px;margin:auto;">
            <a style="text-decoration:none;color:white;" href="https://re-plus-mexico.com.mx/hoteles/" target="_blank">
              RESERVA AQUÍ TU HOSPEDAJE <br />CON TARIFA PREFERENCIAL
            </a>
           </div>           
          </td>
          <td style="padding:20px;" align="center">
            <div style="background: #4E549F;width:fit-content;border-radius: 20px;padding:20px;margin:auto;">
              <a style="text-decoration:none;color:white;" href="https://re-plus-mexico.com.mx/registro/" target="_blank">
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
  