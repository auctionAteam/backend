const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.1",
      title: "Auction API",
      description: `<h3>온라인 경매 사이트</h3>`,
    },
    servers: [
      {
        url: "http://localhost:5000", // 요청 URL
      },
    ],
  },
  apis: ["./swagger/*.swagger.js"],
};
const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };
