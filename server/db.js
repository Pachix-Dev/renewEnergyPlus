import mysql from 'mysql2/promise';
import 'dotenv/config';
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

const hableError = (error) => {

  if (error?.sqlState === '23000') {
    return {
      status: false,
      message: 'Ya estas registrado con este correo electrónico...',
    }
  }


  return {
    status: false,
    message: 'Error al guardar tus datos, por favor intenta de nuevo.',
  }
}

export class RegisterModel {

  static async create_suscriber ({               
      name,        
      email,      
    }) {
      const connection = await mysql.createConnection(config)
      try {      
        const [result] = await connection.query(
          'INSERT INTO boletin ( name, email ) VALUES (?,?)',
          [                      
            name,              
            email,             
          ]
        )
                                
        return {
          status: true,
          insertId: result.insertId,
          ...result,
        }
      }catch (error) {
        console.log(error)
        return hableError(error)          
      }
      finally {
        await connection.end()
      }
  }

  static async create_suscriber_ecomondo ({               
    name,        
    email,      
  }) {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        'INSERT INTO boletin_ecomondo ( name, email ) VALUES (?,?)',
        [                      
          name,              
          email,             
        ]
      )
                              
      return {
        status: true,
        insertId: result.insertId,
        ...result,
      }
    }catch (error) {
      console.log(error)
      return hableError(error)          
    }
    finally {
      await connection.end()
    }
  }
  
  static async create_user ({
      uuid,             
      name,
      paternSurname,
      maternSurname,
      email,
      phone,
      typeRegister,
      genre,
      nacionality,
      code_invitation,
      company,
      industry,
      position,
      area,
      country,
      municipality,
      state,
      city,
      address,
      colonia,
      postalCode,
      webPage,
      phoneCompany,
      eventKnowledge,
      productInterest,
      levelInfluence,
      wannaBeExhibitor,
      alreadyVisited,
    }) {
      const connection = await mysql.createConnection(config)
      try {      
        const [result] = await connection.query(
          'INSERT INTO users (uuid, name, paternSurname, maternSurname, email, phone, typeRegister, genre, nacionality, code_invitation, company, industry, position, area, country, municipality, state, city, address, colonia, postalCode, webPage, phoneCompany, eventKnowledge, productInterest, levelInfluence, wannaBeExhibitor, alreadyVisited ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [
            uuid,             
            name,
            paternSurname,
            maternSurname,
            email,
            phone,
            typeRegister,
            genre,
            nacionality,
            code_invitation,    
            company,
            industry,
            position,
            area,
            country,
            municipality,
            state,
            city,
            address,
            colonia,
            postalCode,
            webPage,
            phoneCompany,
            eventKnowledge,
            productInterest,
            levelInfluence,
            wannaBeExhibitor,
            alreadyVisited,   
          ]
        )
                                
        return {
          status: true,
          insertId: result.insertId,
          ...result,
        }
      }catch (error) {
        console.log(error)
        return hableError(error)          
      }
      finally {
        await connection.end()
      }
  }
  
  static async save_order (user_id,items,paypal_id_order,paypal_id_transaction,total) {
    const connection = await mysql.createConnection(config)
    try {      
      // Crear placeholders dinámicos para cada item
      const placeholders = items.map(() => '(?, ?, ?, ?, ?)').join(',');

      // Crear un arreglo con los valores para cada item
      const values = items.flatMap(id_item => [
        user_id,
        id_item,
        total,
        paypal_id_order,
        paypal_id_transaction,       
      ]);
      
      const query = `
        INSERT INTO users_replus_vip (user_id, id_item, total, paypal_id_order, paypal_id_transaction) 
        VALUES ${placeholders}
      `;

      const [registers] = await connection.query(query, values);

      return registers;
    } catch (error) {
      console.log(error)
      return hableError(error)
    }
    finally {
      await connection.end() // Close the connection
    }
  }

  // checar si el usuario ya cuenta con el pase completo y esta registrado
	static async get_user_by_email(email) {
		const connection = await mysql.createConnection(config)
		try {
      
			const [users] = await connection.query(
				'SELECT * FROM users WHERE email = ?',
				[email]
			)

			if (users.length === 0) {
				return {
          status: false,
				  error: 'No se encontró el usuario',
				}
			}
      
      const [vipUsers] = await connection.query(
        'SELECT * FROM users_replus_vip WHERE user_id = ?',
        [users[0].id]
      )
      
      if (vipUsers.length > 0 && vipUsers.some(user => user.id_item.includes("1"))) {
        return {
          status: false,
          error: 'Ya cuentas con el pase completo para el evento',
        }
      }else{
        return {
          status: true,
          ...users[0],
        }
      }
      
		} finally {
			await connection.end()
		}
	}

  //checar que no compres el mismo producto
  static async check_buy_products (user_id, id_items) {
    const connection = await mysql.createConnection(config)
    try {      
      
      const placeholders = id_items.map(() => '?').join(','); // Crea placeholders dinámicos según la cantidad de id_items
           
      const query = `
        SELECT * FROM users_replus_vip 
        WHERE user_id = ? AND id_item IN (${placeholders})
      `;

      const values = [user_id, ...id_items];      

      const [result] = await connection.query(query, values);
           
      if (result.length === 0) {
        return {
          status: true,
        }
      }else{
        return {
          status: false,
          message: 'Ya cuentas con este producto',
        }
      }
    } finally {
      await connection.end() // Close the connection
    }
  }

  // check code cortesia
  static async check_code_cortesia (code_cortesia) {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        'SELECT * FROM codigos_cortesia WHERE code = ? AND already_used = "" ',
        [
          code_cortesia,          
        ]
      )
      if (result.length === 0) {
        return {
          status: false,
          message: 'Código invalido',    
        }
      }else{
        return {
          status: true,
          result
        }                
      }
    } finally {
      await connection.end() // Close the connection
    }
  }

  // use code cortesia
  static async use_code_cortesia (code_cortesia) {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        'UPDATE codigos_cortesia SET already_used="si" WHERE code = ?',        
        [
          code_cortesia,          
        ]
      )
      if (result.length === 0) {
        return {
          status: false,
          message: 'Código invalido',    
        }
      }else{
        return {
          status: true,
          result
        }                
      }
    } finally {
      await connection.end() // Close the connection
    }
  }

  // get product to calculate total
  static async get_products () {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        'SELECT * FROM products'
      )
      return {
        status: true,
        result
      }
    }catch (error) {
      console.log(error)
      return {
        status: false,        
      }   
    }
     finally {
      await connection.end() // Close the connection
    }
  }
  
  static async get_info_user (uuid) {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        'SELECT id, uuid, name, paternSurname, maternSurname, company, position,  phone, email, country city, municipality, CASE WHEN user_amof IS NULL THEN "ITM"  ELSE "AMOF"  END AS event  FROM users WHERE uuid = ?',
        [uuid]
      )
      if (result.length === 0) {
        return {
          status: false,
          message: 'No se encontró el usuario',
        }
      }
      return {
        status: true,
        result
      }
    }catch (error) {
      console.log(error)
      return {
        status: false,        
      }   
    }
     finally {
      await connection.end() // Close the connection
    }
  }



}