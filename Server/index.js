const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const Message = require("./models/Message");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/Authentication");
app.use("/api/auth", authRoutes);
// MongoDB connection
mongoose.connect("mongodb+srv://ruba:12345@cluster0.jtnvnyv.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("leave_room", (room) => {
    socket.leave(room);
  });

 socket.on("send_message", async (data) => {
  try {
    const savedMessage = await Message.create(data);

    socket.to(data.room).emit("receive_message", savedMessage);
  } catch (err) {
    console.log(err);
  }
});

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/messages/:room", async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room })
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});