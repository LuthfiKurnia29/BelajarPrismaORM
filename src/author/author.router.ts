import { db } from "../utils/db.server";
import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as AuthorService from "./author.services";

export const authorRouter = express.Router();

// GET List Of Authors
authorRouter.get('/',async (request: Request, response: Response) => {
    try {
        const authors = await AuthorService.listAuthors();
        return response.status(200).json(authors)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// GET By Id Authors
authorRouter.get('/:id',async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const author = await AuthorService.getAuthors(id);
        if(author)
        {
            return response.status(200).json(author)
        }
        response.status(400).json("Author could not be found")
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// POST: Create a Author
// Params: firstName, lastName
authorRouter.post("/", body("firstName").isString(), body("lastName").isString(), async (request:Request, response: Response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty())
    {
        return response.status(400).json({errors: errors.array()})
    }

    try {
        const author = request.body;
        const newAuthor = await AuthorService.createAuthor(author);
        return response.status(201).json(newAuthor)
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})
