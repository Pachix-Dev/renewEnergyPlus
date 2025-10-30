
const email_template_eng_student = async ({ name, paternSurname, maternSurname=''}) => {          
    
    return (
   `<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 680px;">
    <tbody>
        <tr>
          <td colspan="2" align="center">
            <img src="https://re-plus-mexico.com.mx/header_replus_2026.png" alt="logo" width="550">               
          </td>
        </tr>        
        <tr>
          <td colspan="2">
            <h2 style="text-align: center;margin:0;font-weight:bold;text-transform: uppercase;margin-top: 20px;">
              WELCOME STUDENT, ${name} ${paternSurname} ${maternSurname}.<BR /> YOUR REGISTRATION WAS SUCCESSFUL.
            </h2>
            <h2 style='text-align: center;'>
              THANK YOU FOR BEING PART OF <span style="color:#E94568;font-weight:bold;">RE+ MEXICO 2026, </span>THE FAIR OF MEXICO'S ENERGY FUTURE.
            </h2>
            <div style="text-align: justify;font-size:22px;">
              Discover the latest trends, innovations, knowledge and technologies in Solar Components and Equipment, Energy Storage, Thermal Technology, Inverters and Grid Infrastructure, which will be needed to accelerate the global renewable energy transition.                  
            </div>
            <div style="text-align:center;padding:20px;margin-top:25px;">
              <p style="background: #4E549F;padding:20px;border-radius:20px;margin:20px;width:fit-content;margin:auto;">
                <a style="text-decoration:none; color: white;font-weight:bold;" href="https://re-plus-mexico.com.mx/programa-premium/" target='_blank'>                 
                  SEE THE PROGRAM OF RE+ MEXICO
                </a>
              <p>
              <p style="margin-top:40px;margin-bottom: 40px;">
                We look forward to seeing you at the sixth edition of <strong>RE+ MEXICO April 16 from 15:00 hrs - 17:00 hrs, Expo Guadalajara, Jalisco.</strong>
              </p>
              <div style="background: #4E549F;color:white;width:fit-content;border-radius: 20px;padding:20px;margin:auto;position:relative;">               
               <p><strong>SCHEDULES:</strong></p>               
               <p>Thursday 16 from 15:00 hrs - 17:00 hrs</p>
              </div>
            </div>               
            
            <p style="font-size:15px;line-height:21px;margin:16px 0px;font-weight:bold">
              INSTRUCTIONS FOR YOUR VISIT:
            </p>
            <ul>
              <li>
                <strong>IMPORTANT:</strong> It is essential to bring your pre-registration printed or in digital format to speed up your access to the event.
              </li>
              <li>
                Remember to bring your official company or business credentials to verify your data.
              </li>
              <li>
                Your access is unique and non-transferable and must be visible throughout your visit.
              </li>                                
            </ul>                                                          
          </td>      
        </tr>               
        <tr>
          <td style="padding:20px;" align="center">
            <p style="background: #4E549F;width:fit-content;border-radius: 20px;padding:20px;margin:auto;">
              <a style="text-decoration:none;color:white;" href="https://igeco.mx/" target="_blank">
                FIND OUT ABOUT ALL OUR EVENTS
              </a>
            </p>          
          </td>
          <td style="padding:20px;" align="center">
            <p style="background: #4E549F;width:fit-content;border-radius: 20px;padding:20px;margin:auto;">
              <a style="text-decoration:none;color:white;" href="https://re-plus-mexico.com.mx/plano-re-plus-mexico-2026/" target="_blank">
                2026 FLOOR PLAN 
              </a>
            </p>         
          </td>
        </tr> 
        <tr>
          <td style="padding:20px;" align="center">
           <p style="background: #4E549F;width:fit-content;border-radius: 20px;padding:20px;margin:auto;">
            <a style="text-decoration:none;color:white;" href="https://re-plus-mexico.com.mx/hoteles/" target="_blank">
              BOOK HERE YOUR LODGING<br /> WITH PREFERENTIAL RATES
            </a>
           </p>           
          </td>
          <td style="padding:20px;" align="center">
            <p style="background: #4E549F;width:fit-content;border-radius: 20px;padding:20px;margin:auto;">
              <a style="text-decoration:none;color:white;" href="https://re-plus-mexico.com.mx/registro/" target="_blank">
                INVITE A COLLEAGUE
              </a>          
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
  
  export {email_template_eng_student}
  