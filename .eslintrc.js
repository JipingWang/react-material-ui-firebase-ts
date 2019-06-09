module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        //"eslint:recommended",
        'plugin:@typescript-eslint/recommended',
    ],
    "globals": {
        // "clsx": "readonly",
        // "React": "readonly",
        // "ReactDOM": "readonly",
        // "MaterialUI": "readonly",
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "project": "./tsconfig.json",
        "tsconfigRootDir": ".",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "react-hooks",
    ],
    "rules": {
        "indent": "off",
        
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/type-annotation-spacing": "off",
        "@typescript-eslint/member-delimiter-style": "off",

        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    }
};