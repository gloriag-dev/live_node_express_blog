import { db } from "../db.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = (req, res, next) => {

//CHECK FOR EXISTING USER
const searchQuery = 'SELECT * FROM users WHERE email = ? OR username = ?'
db.query( searchQuery, [req.body.email, req.body.username], (data, err) => {
if(err) return res.json(err)
if(data.length) return res.status(409).json("user already exists")
})

//HASH PW to create user
let salt = bcrypt.genSaltSync(10)
let hash = bcrypt.hashSync(req.body.password, salt)

const insertQuery = "INSERT INTO users('username, 'email', 'password') VALUES (?)"
const values = [
    req.body.username,
    req.body.email,
    hash
]
db.query(insertQuery, [values], (data, err) => {
    if(err) return res.json(err)
    return res.status(200).json("user created")
} )

}

export const login = (req, res) => {
    //CHECK USER
    const checkQuery = "SELECT * FROM users WHERE username = ?"
    db.query(checkQuery, [req.body.username], (err, data) => {
        if(err) return res.json(err)
        if(data.length === 0) return res.status(404).json("user not found")
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        if(!isPasswordCorrect)return res.status(400).json("Wrong username or password")

        const token = jwt.sign({id: data[0].id}, "jwtkey")
        const {password, ...other} = data[0]
        res.cookie('access-token', token, {
            httpOnly: true
        }).status(200).json(other)
    })  
}   

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json('user has been logged out')
    
}