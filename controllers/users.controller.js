// buat controller untuk load UI register
const User = require("../models/users.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_TOKEN } = process.env

const createToken = (id) => {
    return jwt.sign({ id }, JWT_TOKEN, { expiresIn: "7 days" });
}

exports.viewRegister = async (req, res, next) => {
    // render tampilan UI register
    return res.render('register')
}

exports.register = async (req, res, next) => {
    try {
        // ambil email, fullName, password dari body
        const { fullName, email, password } = req.body;

        // cek apakah user sudah terbuat sebelumnya
        const isExist = await User.findOne({
            where: {
                email
            },
            attributes: ['id']
        });

        // jika sudah maka akan kirim respon error 'user already registered'
        if(isExist){
            throw{
                message: `user already registered`,
                code: 400,
                error: `bad request`
            }
        }

        // hash password menggunakan bcrypt
        const passwordHash = await bcrypt.hash(password, 12);

        // masukan email, fullName, hashedPassword ke db
        const user = await User.create({
            email,
            fullName,
            password: passwordHash,
        })

        // generate token using jsonwebtoken (payload id: userId)
        const token = await createToken (user.id);

        // kirim response json berupa token
        return res.status(200).json({
            message: 'success register user',
            code: 200,
            data: {
                token
            }
        })
    } catch (error) {
        next(error)
    }
}