
const email_template_student = async ({ name, paternSurname, maternSurname=''}) => {          
    
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
              BIENVENIDO ESTUDIANTE, ${name} ${paternSurname} ${maternSurname}. <BR /> TU REGISTRO SE HA REALIZADO CON ÉXITO.
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
                Te esperamos en la sexta edición de <strong>RE+ MEXICO del 16 de abril de 3:00 pm - 5:00 pm, Expo, Guadalajara, Jalisco.</strong>
              </p>
              <div style="background: #4E549F;color:white;border-radius: 20px;padding:20px;">               
               <p><strong>HORARIOS:</strong></p>                           
               <p>Jueves 16, 3:00 pm – 5:00 pm </p>
              </div>
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
  
  export {email_template_student}
  