module.exports = {
  post: {
    tags: ["User CRUD operations"],
    description: "Login user",
    operationId: "userLogin",
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
        description: "User login successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
