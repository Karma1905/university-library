"use server"

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

export const createBook = async (prams: BookPrams) => {
    try {
        const newBook = await db.insert(books).values({
            ...prams,
            availableCopies: prams.totalCopies,
        }).returning();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newBook[0]))
        }

    } catch (error) {
        console.log(error)

        return {
            success: false,
            message: "An error occured while creating the book",
        }
    }
}