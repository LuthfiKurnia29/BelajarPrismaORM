import {db} from "../src/utils/db.server";

interface IAuthor{
    firstName: string;
    lastName: string;
};

interface IBook{
    title: string;
    isFiction: boolean;
    datePublished: Date;
};

async function seed() {
    // Authors
    await Promise.all(
        getAuthors().map((author) => {
            return db.author.create({ data: author})
        })
    );
    const author = await db.author.findFirst({
        where: {
            firstName: "Yuval Noah"
        }
    })

    // Books
    await Promise.all(
        getBooks().map((book) => {
            const { title, isFiction, datePublished } = book;
            return db.book.create({
                data: {
                    title,
                    isFiction,
                    datePublished,
                    authorId: author?.id
                },
            });
        })
    )

}

seed();

function getAuthors() : Array<IAuthor> {
    return [
        {
            firstName: "John",
            lastName: "Doe"
        },
        {
            firstName: "William",
            lastName: "Shakespeare"
        },
        {
            firstName: "Yuval Noah",
            lastName: "Harari"
        },
    ]
}

function getBooks() : Array<IBook>{
    return[
        {
            title: "Sapiens",
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: "Homo Deus",
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: "The Ugly Ducking",
            isFiction: false,
            datePublished: new Date(),
        },
        
    ]
}