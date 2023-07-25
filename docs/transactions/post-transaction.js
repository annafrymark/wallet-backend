module.exports = {
  post: {
    tags: ["Transaction CRUD operations"],
    description: "Create transaction",
    operationId: "postTransaction",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Transaction",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Transaction created successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
