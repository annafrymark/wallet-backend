module.exports = {
  put: {
    tags: ["Transaction CRUD operations"],
    description: "Update transaction of owner",
    operationId: "updateTransaction",
    parameters: [
      {
        name: "id",
        in: "path",
        type: "string",
        required: true,
        description: "id of the transaction",
      },
    ],

    responses: {
      200: {
        description: "Transactions updated successfully",
      },
      404: {
        description: "Transaction is not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
