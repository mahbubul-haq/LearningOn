module.exports = {
    root: true,

    env: {
        browser: true,
        node: true,
        es2021: true
    },

    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },

    plugins: ["react", "react-hooks"],

    extends: ["eslint:recommended"],

    rules: {
        "no-undef": "error",
        "no-unused-vars": "warn",

        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off"
    },

    overrides: [
        {
            files: ["Frontend/**/*.{js,jsx}"],
            env: { browser: true }
        },
        {
            files: ["Backend/**/*.{js}"],
            env: { node: true }
        }
    ]
};