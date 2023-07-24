module.exports = {
  delete: {
    tags: ["Transaction CRUD operations"],
    description: "Delete a transaction of the owner",
    operationId: "deleteTransaction",
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
        description: "Transactions deleted successfully",
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
