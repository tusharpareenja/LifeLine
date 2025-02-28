"use server"
import prisma from "../db/db"

export const Register = async ({
    email,
    password,
    name,
    role
}) => {
    try {
        const res = await prisma.users.create({
            data: {
                email,
                password,
                username: name,
                role
                create : {
                    pfp : ""
                }
            }
        })
        return {
            success : true,
            data : res
        }
    } catch (error) {
        console.log(error)
        return {
            success : false,
            error : error
        }
    }
}

export const Login = async ({
    email,
    password
}) => {
    try {
        const res = await prisma.users.findFirst({
            where : {
                email,
                password
            }
        })
        return {
            success : true,
            data : res
        }
    } catch (error) {
        console.log(error)
        return {
            success : false,
            error : error
        }
    }
}