const express = require("express");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const task = require("./jobs");
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

// (async () => {
//   await prisma.tenant
//     .create({
//       data: {
//         name: "John Doe",
//         email: "john.doe@example.com",
//         unitName: "Apartment 123",
//         rentAmount: 100000,
//         waivedMonth: null,
//         rentalDiscount: null,
//         expenses: null,
//       },
//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });
// })();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(cors());
app.use(compression());
app.use(morgan(":method | :url | :status | :response-time ms | :date[web]"));

// Routes
app.use("/api/v1", require("./routes"));
app.get("*", (_, res) => {
  res.redirect("/api/v1");
});

task.invoiceJob().start();

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port http://127.0.0.1:${PORT}`);
});
