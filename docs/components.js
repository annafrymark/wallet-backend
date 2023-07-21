module.exports = {
  components: {
    schemas: {
      //transaction model
      Transaction: {
        type: "object",
        properties: {
          date: {
            type: "date",
            description: "Date of transaction",
            example: "06.05.2023",
          },
          type: {
            type: "string",
            description: "Type of transaction - income or expense",
            example: "expense",
          },
          category: {
            type: "string",
            description: "Category of transaction",
            example: "Products",
          },
          comment: {
            type: "string",
            description: "Comment on transaction",
            example: "Paints and brushes",
          },
          sum: {
            type: "number",
            description: "Sum of transaction",
            example: "200",
          },
          owner: {
            type: "string",
            description: "Owner of transaction",
            example: "Anna",
          },
        },
      },

      //transaction input model
      TransactionInput: {
        type: "object",
        properties: {
          date: {
            type: "date",
            description: "Date of transaction",
            example: "06.05.2023",
          },
          type: {
            type: "string",
            description: "Type of transaction - income or expense",
            example: "expense",
          },
          category: {
            type: "string",
            description: "Category of transaction",
            example: "Products",
          },
          comment: {
            type: "string",
            description: "Comment on transaction",
            example: "Paints and brushes",
          },
          sum: {
            type: "number",
            description: "Sum of transaction",
            example: "200",
          },
          owner: {
            type: "string",
            description: "Owner of transaction",
            example: "Anna",
          },
        },
      },

      //error model
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Error message",
            example: "Not found",
          },
          internal_code: {
            type: "string",
            description: "Error internal code",
            example: "Invalid parameters",
          },
        },
      },
    },
  },
};



