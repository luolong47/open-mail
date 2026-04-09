import { defineConfig } from "eslint/config";
import next from "eslint-config-next";

export default defineConfig([
    ...next,
    {
        rules: {
            "max-lines": ["error", { max: 500, skipBlankLines: true, skipComments: true }],
            "complexity": ["error", { max: 20 }],
        },
    },
]);
