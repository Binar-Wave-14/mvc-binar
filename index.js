// import dotenv
require('dotenv').config()

// import express
const express = require('express')
const path = require('path')

// import user router
const user = require('./routers/users.router')
const dashboard = require('./routers/dashboards.router')

// buat app dari express
const app = express()

// gunakan middleware express.json dan express.urlencoded
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// configure template engine using ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// gunakan user router sebagai middleware
app.use(user)

// gunakan dasshboard router sebagai middleware
app.use(dashboard)

// error handling
app.use((err, req, res, next) => {
    console.log(err);
    const {message, code = 500, error ="internal server error"} = err;

    return res.status(code).json({
        message,
        code,
        error
    });
})

// app listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server load with port: ${PORT}`)
})