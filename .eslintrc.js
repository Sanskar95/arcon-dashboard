module.exports = {
  rules: {
    // enable additional rules
   
    semi: ["error", "always"],
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
  },
};
