import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { PrismaClient } from "./generated/prisma/index.js";

const app = express();
const prisma = new PrismaClient();
const saltRounds = 10;

app.use(express.json());
app.use(cors());

// ! MANUALLY ACCESS DATABASE: npx prisma studio

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
        const user = await prisma.user.findUnique({ where: { email } });

        if (user && await bcrypt.compare(password, user.password)) {
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
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword },
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
    console.log("Server running on http://localhost:3001");
});