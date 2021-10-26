'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define(
        'user',
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            salt: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            is_active:{
                type: DataTypes.BOOLEAN, 
                defaultValue: true,
            }
        },
        {
            timestamps: true
        }
    );
    user.generateSalt = async function () {
        return await bcrypt.genSalt()
    };
    user.hashPassword = async function (pass,salt) {
        return await bcrypt.hash(pass, salt)
    };
    user.verifyPassword = async function (pass, hash, salt) {
        const hashPassword = await bcrypt.hash(pass, salt)
        if(hashPassword == hash) return true;
        else return false;
    };
    user.generateAuthToken = function (data) {
        return jwt.sign(
            {
                ...data
            },
            "secret",
            {expiresIn: '1d'}
        )
    };
    return user;
    }