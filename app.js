const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
app.listen(process.env.PORT);

const cors = require("cors");

const { StatusCodes } = require("http-status-codes");

app.use(cors());
app.use(express.json());

const usersRouter = require("./routes/users");
const itemRouter = require("./routes/item");
const auctionRouter = require("./routes/auction");
const searchRouter = require("./routes/search");

app.use("/users", usersRouter);
app.use("/items", itemRouter);
app.use("/auction", auctionRouter);
app.use("/search", searchRouter);


const { swaggerUi, specs } = require("./swagger/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(function (req, res) {
    res.status(StatusCodes.NOT_FOUND).end();
});
