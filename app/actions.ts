'use server'

import { prisma } from "@/lib/prisma";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

export async function generateShortUrl(url: string) {

    if (!url) throw new Error ("Invalid URL")

    const shortCode = nanoid()

    try {
        const data = await prisma.url.create({
            data: {
                originalUrl: url,
                shortCode,
            },
        })
        return { success: true, shortCode }

    } catch (error) {
        throw new Error ("Something went wrong")
    }
}