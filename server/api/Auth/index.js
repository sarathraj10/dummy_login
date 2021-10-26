const express = require('express');

const router = express.Router();

const db = require('../../models');

router.post('/register', async (req,res)=>{
    try{
        const { email, password, firstName, lastName } = req.body
        if (!email) {
            return res.json({data : null,success : false,message : 'Email required',statusCode: 401})
        }
        if (!password) {
            return res.json({data : null,success : false,message : 'password required',statusCode: 401})
        }
        if (!firstName) {
            return res.json({data : null,success : false,message : 'firstName required',statusCode: 401})
        }
        if (!lastName) {
            return res.json({data : null,success : false,message : 'lastName required',statusCode: 401})
        }

        const isEmail = await db.user.findOne({
            where: { email}
        })

        if (isEmail) {
            return res.json({data : null,success : false,message : 'Email already exists',statusCode: 401})
        }

        const salt = await db.user.generateSalt();
        const validPassword = await db.user.hashPassword(password, salt)

        const userDetails = await db.user.create({
            email,
            firstName,
            lastName,
            password: validPassword,
            salt
        })

        return res.json({data : userDetails,success : true,message : 'Registration successfull',statusCode: 201})

    }catch(e){
        return res.status(500).json({
            success: false,
            message: err.toString(),
            data: {}
        })
    }

});

router.post('/login', async (req,res)=>{
    try{
        const { email, password } = req.body
        if (!email) {
            return res.json({data : null,success : false,message : 'Email required',statusCode: 401})
        }
        if (!password) {
            return res.json({data : null,success : false,message : 'password required',statusCode: 401})
        }
        const userData = await db.user.findOne({
            where: { email, is_active: true },
        });
        if (!userData) {
            return res.json({data : null,success : false,message : 'Invalid email or password',statusCode: 401})
        }
        const validPassword = await db.user.verifyPassword(password, userData.password, userData.salt)

        if (!validPassword) {
            return res.json({data : null,success : false,message : 'Invalid email or password',statusCode: 401})
        }
        const accessToken = db.user.generateAuthToken({ id: userData.id, email: userData.email});

        return res.json({data : accessToken,success : true,message : 'Login successfull',statusCode: 200})
    }catch(e){
        return res.status(500).json({
            success: false,
            message: err.toString(),
            data: {}
        })
    }
});

module.exports = router;