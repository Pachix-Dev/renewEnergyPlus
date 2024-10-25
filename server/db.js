import mysql from 'mysql2/promise';


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

  static async create_user_ecomondo ({
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
        'INSERT INTO users (uuid, name, paternSurname, maternSurname, email, phone, typeRegister, genre, nacionality, code_invitation, company, industry, position, area, country, municipality, state, city, address, colonia, postalCode, webPage, phoneCompany, eventKnowledge, productInterest, levelInfluence, wannaBeExhibitor, alreadyVisited, user_ecomondo ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?)',
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
          "si"   
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
  
  static async save_order (user_id, paypal_id_order,paypal_id_transaction, total) {
    const connection = await mysql.createConnection(config)
    try {      
      const [registers] = await connection.query(
        'INSERT INTO users_vip (user_id, paypal_id_order, paypal_id_transaction, total) VALUES (?,?,?,?)',
        [
          user_id,
          paypal_id_order,
          paypal_id_transaction,              
          total
        ]
      )
      return registers
    } finally {
      await connection.end() // Close the connection
    }
  }

  static async get_postal_code ({cp}) {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        'SELECT * FROM postal_code WHERE d_CP = ? OR d_codigo = ?',
        [
          cp,
          cp
        ]
      )
      if (result.length === 0) {
        return {
          status: false,
          message: 'Código postal no encontrado, por favor verifica tu código postal.',    
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
  
	static async get_user_by_email(email, requireNonVip = false) {
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
      if (requireNonVip) {
        const [vipUsers] = await connection.query(
          'SELECT * FROM users_vip WHERE user_id = ?',
          [users[0].id]
        )
        if (vipUsers.length > 0) {
          return {
            status: false,
            error: 'Ya eres usuario VIP',
          }
        }
      }
			return {
        status: true,
				user: users[0],
			}
		} finally {
			await connection.end()
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
        'SELECT * FROM oktoberfest_products'
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

  // create user oktoberfest
  static async save_order_oktoberfest ({      
      name,      
      email,
      phone,
      company,
      hour,
      comments,
      items,
      paypal_id_order, 
      paypal_id_transaction,
      total,
    }) {
      const connection = await mysql.createConnection(config)
      const numero_personas = items.reduce((total, item) => total + item.quantity, 0);

      try {      
        const [result] = await connection.query(
          'INSERT INTO oktoberfest_orders ( name, email, phone, company, hour, numero_personas, items, comments, paypal_id_order, paypal_id_transaction, total ) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
          [                                   
            name,      
            email,
            phone,
            company,
            hour,
            numero_personas,
            JSON.stringify(items),
            comments,          
            paypal_id_order, 
            paypal_id_transaction, 
            total,             
          ]
        )
                                
        return {
          status: true,          
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

  // check sales limit no more than 30 by schedule
  static async check_sales_limit (hour) {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        'SELECT * FROM oktoberfest_orders WHERE hour = ?',
        [hour]
      )      
      if (result.length >= 25) {
        return {
          status: false,
          message: 'Lo sentimos, ya no hay lugares disponibles para esta hora.',
        }
      }
      return {
        status: true,
        message: 'Lugares disponibles.',
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


  // endpoints for scanner
  static async get_info_student (uuid) {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        'SELECT *  FROM users_students WHERE uuid = ?',
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

  static async get_info_user_to_pay (id) {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        "SELECT id, uuid, name, paternSurname, maternSurname, company, position,  phone, email, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at, CASE WHEN created_at > '2024-10-08' THEN CASE WHEN cobrar = 0 THEN 'true' ELSE 'false' END END AS cobrar_status, CASE WHEN user_amof IS NULL THEN 'ITM'  ELSE 'AMOF' END AS event  FROM users WHERE id = ?",
        [id]
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

  static async pagar_gafete (id, cobrar) {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        "UPDATE users SET cobrar = ? WHERE id = ?",
        [cobrar, id ]
      )
      if (result.affectedRows === 0) {
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

  static async get_info_user_vip (uuid) {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        "SELECT users.id, users.uuid, users.name, users.paternSurname, users.maternSurname, users.email, users.phone, users.typeRegister, users.created_at, CASE WHEN users_vip.user_id IS NOT NULL THEN 'true' ELSE 'false' END AS status_vip FROM users LEFT JOIN users_vip ON users.id = users_vip.user_id WHERE users.uuid = ?",
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

  static async pagar_gafete_vip (id) {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        'INSERT INTO users_vip (user_id, paypal_id_order, paypal_id_transaction, total ) VALUES (?,?,?,?)',
        [
          id,
          'compra-en-sitio-proveedor',
          'compra-en-sitio-proveedor',
          '5800'
        ]
      )
      return {
        status: true,
        insertId: result.insertId,
        ...result,
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