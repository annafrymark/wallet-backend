module.exports = {
  patch: {
    tags: ["User CRUD operations"],
    description: "Update user details",
    operationId: "updateUser",
    parameters: [
      {
        name: "id",
        in: "path",
        type: "string",
        required: true,
        description: "id of the user",
      },
    ],

    responses: {
      200: {
        description: "User updated successfully",
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
