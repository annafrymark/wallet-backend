module.exports = {
  get: {
    tags: ["User CRUD operations"],
    description: "Get current user",
    operationId: "getCurrentUser",
    parameters: [
      {
        name: "current",
        in: "path",
        type: "string",
        required: true,
        description: "current user",
      },
    ],

    responses: {
      200: {
        description: "User is obtained successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      404: {
        description: "User is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
    },
  },
};
