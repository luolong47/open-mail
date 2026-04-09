import { defineConfig } from "eslint/config";
import next from "eslint-config-next";

export default defineConfig([
    ...next,
    {
        rules: {
            "max-lines": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
            "complexity": ["warn", { max: 20 }],
        },
    },
]);
