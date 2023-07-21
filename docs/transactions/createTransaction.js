module.exports = {
  post: {
    tags: ["Transaction CRUD operations"],
    description: "Create transaction",
    operationId: "createTransaction",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/transaction",
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
