import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// fetching ALL users
app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// fetching specific user
app.post("/user", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findFirstOrThrow({
            where: { email, password }
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// creating a new user
app.post("/users", async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: { email, password },
        });

        if (newUser) {
            res.status(201).json(newUser);
        } else {
            res.status(404).json({ error: "User could not be created" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

});

app.listen(3001, () => {
    console.log("Server running on https://localhost:3001");
});