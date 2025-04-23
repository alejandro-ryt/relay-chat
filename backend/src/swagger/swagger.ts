import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Relay-Chat Swagger",
      version: "1.0.0",
      description:
        "This is a Real-Time Chat application with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["src/routes/**/*.ts", "src/controllers/**/*.ts"],
};

let swaggerSpec: swaggerJsdoc.Options | undefined;
try {
  swaggerSpec = swaggerJsdoc(options);
} catch (error) {
  console.error("Error generating Swagger spec:", error);
}

export function setupSwagger(app: Express): void {
  if (swaggerSpec) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  } else {
    console.error("Swagger spec is not available. Check the error logs.");
  }
}
