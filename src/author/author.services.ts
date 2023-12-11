import { Author } from "@prisma/client";
import {db} from "../utils/db.server";

interface IAuthorResponse{
    id: number;
    firstName: string;
    lastName: string;
}

export const listAuthors =async () : Promise<IAuthorResponse[]> => {
    return db.author.findMany({
        select:{
            id: true,
            firstName: true,
            lastName: true
        }
    });
}

export const getAuthors =async (id: number): Promise<IAuthorResponse | null> => {
    return db.author.findUnique({
        where:{
            id,
        },
        select:{
            id: true,
            firstName: true,
            lastName: true
        }
    })
}

export const createAuthor =async (author:Omit<Author, "id">) : Promise<IAuthorResponse> => {
    const {firstName, lastName} = author;
    return db.author.create({
        data: {
            firstName,
            lastName
        }, 
        select:{
            id: true,
            firstName: true,
            lastName: true
        }
    })
}

export const updateAuthor =async (author:Omit<Author, "id">, id: number) : Promise<IAuthorResponse> => {
    const {firstName, lastName} = author;
    return db.author.update({
        where: {
            id
        },
        data:{
            firstName,
            lastName
        },
        select:{
            id: true,
            firstName: true,
            lastName: true
        }
    })
}

export const deleteAuthor =async (id: number) : Promise<void> => {
    await db.author.delete({
        where:{
            id
        }
    })
}