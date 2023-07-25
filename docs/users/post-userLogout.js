module.exports = {
  post: {
    tags: ["User CRUD operations"],
    description: "User logout",
    operationId: "userLogout",
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
        description: "User logout successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
