module.exports = {
  get: {
    tags: ["Transaction CRUD operations"],
    description: "Get all transaction of owner",
    operationId: "getAllTransactions",
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
    ],

    responses: {
      200: {
        description: "All transaction obtained successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Transactions",
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
