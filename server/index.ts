import express, { Express } from "express";

import fileUpload from "express-fileupload";

import { Server } from "socket.io";

import dotenv from "dotenv";

import cors from "cors";

import path from "path";

import http from "http";

import { SequelizeInstance } from "./db";

import { routerInstance } from "./routes";

import { User, Users } from "./types";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Express = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",

    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "assets")));

app.use(fileUpload({}));

app.use("/api", routerInstance);

let users: Users = [];

const start = async () => {
  try {
    await SequelizeInstance.authenticate();

    await SequelizeInstance.sync();

    io.on("connection", (socket) => {
      console.log("Connected", socket.id);

      socket.on("join_room", ({ user, room }) => {
        const userWithId: User = {
          ...user,

          room: room,

          id: socket.id,
        };

        const existingUser = users.find(
          (one) => one.email === userWithId?.email
        );

        if (existingUser) {
          return;
        }

        socket.emit("user", userWithId);

        users.push(userWithId);

        socket.join(userWithId.room as string);

        socket.emit("message", {
          user: "Чат бот",

          text: `${userWithId.email}, успішно підключився до чату.`,
        });

        socket.broadcast.to(userWithId.room as string);

        io.to(userWithId.room as string).emit("room", {
          room: userWithId?.room,

          users: users.filter((user) => user.room === room),
        });
      });

      socket.on("send_message", (message) => {
        const user = users.find((one) => one.id == socket.id);

        if (user) {
          io.to(user.room as string).emit("message", {
            user: user.email,
            text: message,
          });
        }
      });

      socket.on("disconnect", () => {
        const user = users.find((one) => one.id == socket.id);

        if (user) {
          io.to(user.room as string).emit("room", {
            room: user.room,

            users: users.filter((one) => one.id !== user.id),
          });

          users = users.filter((one) => one.id !== user.id);
        }
      });
    });

    app.listen(PORT, () => {
      console.log("Server started on PORT: ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

server.listen(5002, () => {
  console.log(`Server listening on ${5002}`);
});

start();
