export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Job Board",
    version: "1.0.0",
    description: "Job Board API documentation",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  paths: {
    "/api/jobs": {
      get: {
        summary: "Get all jobs",
        tags: ["Jobs"],
        responses: {
          "200": {
            description: "List of jobs",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      title: { type: "string" },
                      description: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};
