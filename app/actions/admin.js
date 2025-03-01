"use server"
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const getHospitalRequests = async () => {
    try {
        const res = await db.hospital.findMany({
            include : {
                user : true
            }
        });
        console.log(res);
        return res
    } catch (error) {
        console.error(error);
        return []
    }
}
export const approveHospital = async (id) => {
    try {
        const res = await db.hospital.update({
            where : {
                id
            },
            data : {
                approved : true,
                pending : false
            }
        });
        console.log(res);
        return res
    } catch (error) {
        console.error(error);
        return []
    }
}
export const rejectHospital = async (id) => {
    try {
        const res = await db.hospital.update({
            where : {
                id
            },
            data : {
                approved : false,
                pending : false
            }
        });
        console.log(res);
        return res
    } catch (error) {
        console.error(error);
        return []
    }
}
export const getHospitalDetails = async (id) => {
    try {
        const res = await db.hospital.findUnique({
            where : {
                id
            }
        })
        console.log(res);
        return res
    } catch (error) {
        console.error(error);
        return []
    }
}
