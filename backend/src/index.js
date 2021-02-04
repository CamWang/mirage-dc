const Server = require("./server");
const DataBase = require("./db");

const server = new Server();
const db = new DataBase();

console.log("Server: http://localhost:3000");