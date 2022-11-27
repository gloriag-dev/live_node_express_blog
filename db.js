import mysql from 'mysql'


export const db = mysql.createConnection({
    host: 'sql7.freesqldatabase.com',
    user:'sql7581002',
    password: 'iUSTvZ3DTP',
    database: 'sql7581002'
})