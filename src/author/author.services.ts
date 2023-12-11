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