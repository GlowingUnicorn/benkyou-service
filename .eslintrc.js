{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "google",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "new-cap": "off",
        "max-len":"off",
        "indent": "off",
        "@typescript-eslint/indent": ["error", 2] // 2 spaces === 1 tab
    }
}