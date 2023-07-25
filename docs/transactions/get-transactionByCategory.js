module.exports = {
  get: {
    tags: ["Transaction CRUD operations"],
    description: "Get all transactions by category",
    operationId: "getTransactionsByCategory",
    parameters: [
      //   {
      //     name: "id", //id of the user
      //     in: "path",
      //     schema: {
      //       $ref: "#/components/schemas/id",
      //     },
      //     required: true,
      //     description: "Id of user, owner of transaction",
      //   },
      {
        name: "category",
        in: "path",
        type: "string",
        required: true,
        description: "category of the transaction",
      },
    ],

    responses: {
      200: {
        description: "All transactions obtained successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Transaction",
            },
          },
        },
      },
      404: {
        description: "Transaction is not found",
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
