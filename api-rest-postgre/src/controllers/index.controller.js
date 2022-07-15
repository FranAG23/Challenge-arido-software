const { Pool } = require('pg');

const pool = new Pool({
    host:'localhost',
    user: 'postgres',
    password: 'hgfsd1234',
    database: 'Challenge',
})

const getUsers = async (req, res)=>{
  const response =  await pool.query('SELECT * FROM user_base');
  res.status(200).json(response.rows);
};

const getUser = async (req, res)=>{
    const { user_name } = req.params;
    const response =  await pool.query('SELECT * FROM user_base WHERE name_u = $1',[user_name]);
    res.status(200).json(response.rows);
  };
  

const getSecurity_group_by_user = async (req, res)=>{
    const { user_name } = req.params;
    const response =  await pool.query('SELECT get_namegroup_by_user_name($1)',[user_name]);
    res.status(200).json(response.rows);
  };

const createUser = async (req, res) => {
    const { name_u, password, fecha, estado, name_g, id_l } = req.body;
    //Parche para el tipo fecha
    const fechanew = req.body.fecha_ing_u;
 const response = await  pool.query('call public.insert_usuario($1,$2,$3,$4,$5,$6)',[name_u, password, fechanew, estado, name_g, id_l]);
    console.log(response);
    res.send('user created');
};

module.exports ={
    getUsers,
    getUser, 
    getSecurity_group_by_user,
    createUser
}