module.exports = {
  post: {
    tags: ["User CRUD operations"],
    description: "Register user",
    operationId: "userRegister",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
          },
        },
      },
    },
    responses: {
      201: {
        description: "User created successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
