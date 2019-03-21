// code away!
const server = require("./server.js");
require("dotenv").config();

const port = process.env.PORT;
const hello = process.env.HELLO;
server.listen(port, () => {
  console.log(`\n*** ${hello} Server Running on http://localhost:4000 ***\n`);
});
