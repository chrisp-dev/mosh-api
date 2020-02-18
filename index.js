const express = require("express");
const cors = require("cors");
const session = require("express-session");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", socket => {
  console.log("new connection", socket.id);

  socket.on("join", ({ senderName, receiverName }, callback) => {
    console.log("sender:", senderName);
    console.log("receiver:", receiverName);
  });

  socket.on("disconnect", () => console.log("disconnected"));
});

const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);
// app.use(cors({
//     origin:["https://*OUR APP NAME HERE*.herokuapp.com"]
// }));
app.use(session({ secret: "something secret here", resave: true, saveUninitialized: true, cookie: { maxAge: 7200000 } }));

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./routes");

app.use("/api", routes);

db.sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, console.log(`server is listening on http://localhost:${PORT}`));
});
