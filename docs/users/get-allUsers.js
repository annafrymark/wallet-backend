module.exports = {
  get: {
    tags: ["User CRUD operations"],
    description: "Get all users",
    operationId: "getallUsers",
    parameters: [],

    responses: {
      200: {
        description: "All users obtained successfully",
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
