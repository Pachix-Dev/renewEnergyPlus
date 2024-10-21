
const email_template_oktoberfest = async ({ name, hour, email, phone, items }) => {          
    
    return (
   `<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 680px;">
    <tbody>
        <tr>
          <td colspan="2" align="center">
            <img src="https://industrialtransformation.mx/header-oktoberfest.jpg" alt="logo" width="550">         
          </td>
        </tr>        
        <tr>
          <td colspan="2" >
            <h2 style="text-align: center;margin:0;font-weight:bold;text-transform: uppercase;margin-top: 20px;">
              BIENVENIDO, ${name}. <BR /> MUCHAS GRACIAS POR TU COMPRA.
            </h2>
            <h2 style='text-align: center;'>
              GRACIAS POR FORMAR PARTE DE <span style="color:#E42128;font-weight:bold;"> <br />OKTOBERFEST LEÓN 2024. </span>
            </h2>
            <div style="text-align: justify;font-size:22px;">
              ¡Celebra con nosotros la tradicional fiesta alemana! Disfruta de la música, la comida y la cerveza en un ambiente festivo y lleno de diversión.                   
            </div>
            <p style="font-size:22px;"><strong>Nombre: ${name} </strong></p>
            <p style="font-size:22px;"><strong>Email: ${email} </strong></p>
            <p style="font-size:22px;"><strong>Teléfono: ${phone} </strong></p>
            <p style="font-size:22px;"><strong>Orden: </strong></p>
            ${items?.map((item) => {
              return (
                `<p style="font-size:22px;margin-left:10px;"><strong> - ${item.name}  x${item.quantity}</strong></p>`                
              )
            }).join('')}            
            <p style="font-size:22px;"><strong>Reservación confirmada - ${hour} </strong></p>
            <p style="font-size:22px;"><strong>* Mesa para 10 personas máximo </strong></p>
            <p style="font-weight:bold;font-size:20px;text-align: center;">AÑADIR AL CALENDARIO</p>
            <div style="text-align:center;padding:20px;margin: 20px;">
              <a style="background: rgb(18,172,255);background: linear-gradient(90deg, rgba(18,172,255,1) 0%, rgba(10,61,255,1) 100%);color:white;padding:20px;border-radius:20px;margin:20px;text-decoration:none;" href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20241009T190000Z%2F20241012T030000Z&details=%C2%A1Celebra%20con%20nosotros%20la%20tradicional%20fiesta%20alemana%21%20Disfruta%20de%20la%20m%C3%BAsica%2C%20la%20comida%20y%20la%20cerveza%20en%20un%20ambiente%20festivo%20y%20lleno%20de%20diversi%C3%B3n.&location=Poliforum%20Le%C3%B3n%2C%20GTO&text=Oktoberfest"
              target="_blank">                        
                Google
              </a>
              <a style="background: rgb(18,172,255);background: linear-gradient(90deg, rgba(18,172,255,1) 0%, rgba(10,61,255,1) 100%);color:white;padding:20px;border-radius:20px;text-decoration:none;" href="https://outlook.live.com/calendar/0/action/compose?allday=false&body=%C2%A1Celebra%20con%20nosotros%20la%20tradicional%20fiesta%20alemana%21%20Disfruta%20de%20la%20m%C3%BAsica%2C%20la%20comida%20y%20la%20cerveza%20en%20un%20ambiente%20festivo%20y%20lleno%20de%20diversi%C3%B3n.&enddt=2024-10-11T21%3A00%3A00&location=Poliforum%20Le%C3%B3n%2C%20GTO&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2024-10-09T13%3A00%3A00&subject=Oktoberfest"
              target="_blank">                       
                Outlook
              </a>
            </div>          
            <div style="text-align:center;padding:20px;margin: 20px;">
              <a style="background: rgb(18,172,255);background: linear-gradient(90deg, rgba(18,172,255,1) 0%, rgba(10,61,255,1) 100%);color:white;padding:20px;border-radius:20px;margin:20px;text-decoration:none;" href="https://calendar.yahoo.com/?desc=%25C2%25A1Celebra%2520con%2520nosotros%2520la%2520tradicional%2520fiesta%2520alemana%21%2520Disfruta%2520de%2520la%2520m%25C3%25BAsica%252C%2520la%2520comida%2520y%2520la%2520cerveza%2520en%2520un%2520ambiente%2520festivo%2520y%2520lleno%2520de%2520diversi%25C3%25B3n.&dur=false&et=20241012T030000Z&in_loc=Poliforum+Le%C3%B3n%2C+GTO&st=20241009T190000Z&title=Oktoberfest&v=60"
              target="_blank">
              <i>Y!</i> Yahoo!
              </a>
              <a style="background: rgb(18,172,255);background: linear-gradient(90deg, rgba(18,172,255,1) 0%, rgba(10,61,255,1) 100%);color:white;padding:20px;border-radius:20px;text-decoration:none;" href="https://industrialtransformation.mx/icalendarOktoberfest.ics" donwload target="_blank">  
                iCalendar
              </a>
            </div>
            <p style="font-size:15px;line-height:21px;margin:16px 0px;font-weight:bold">
              INSTRUCCIONES PARA TU VISITA:
            </p>
            <ul>
              <li>
                <strong>IMPORTANTE:</strong> Es indispensable llevar este comprobante de pago que viene adjunto en el correo impreso o en formato digital para canjear tu pedido.
              </li>
               <li>
                No se aceptan cambios ni devoluciones.
              </li>  
              <li>
                Recuerda que deberás presentar una identificación oficial.
              </li>
              <li>
                Si deseas factura envie un correo a emmanuel.heredia@igeco.mx <br /> FAVOR DE ADJUNTAR LOS SIGUIENTES DOCUMENTOS: <br /> - CONSTANCIA SITUACIÓN FISCAL <br /> - FOTO DEL RECIBO DE COMPRA <br /> - INDICAR EL MÉTODO DE PAGO (TARJETA DE CREDITO O DEBITO)<br /> - USO DE CFDI
              </li> 
              <li>
                Fecha máxima de facturación 25 de octubre de 2024
              </li>
              <li>
                Propina NO incluida
              </li>                                         
            </ul>                                                          
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
  
  export {email_template_oktoberfest}
  