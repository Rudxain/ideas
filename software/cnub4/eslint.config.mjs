import globals from "globals";
import js from "@eslint/js";
import tsesl from "typescript-eslint";

// aliases
const E = "error",
	W = "warn",
	O = "off";

/** `RegExp` */
const UNUSED_ID = "^_";

export default tsesl.config(
	{ ignores: ["dist"] },
	{
		extends: [
			js.configs.recommended,
			...tsesl.configs.strictTypeChecked,
			...tsesl.configs.stylisticTypeChecked,
		],
		files: ["**/*.ts", "eslint.config.mjs"],
		languageOptions: {
			ecmaVersion: 2023,
			globals: globals.browser,
			parserOptions: {
				projectService: true,
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
			},
		},
		//eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		rules: {
			"no-unused-vars": O,
			"@typescript-eslint/no-unused-vars": [
				E,
				{
					varsIgnorePattern: UNUSED_ID,
					argsIgnorePattern: UNUSED_ID,
				},
			],
			// Rust
			"prefer-const": E,
			// https://github.com/Fishrock123/proposal-const-function-arguments
			"no-param-reassign": E,
			"no-var": E,
			"no-loop-func": O,
			"@typescript-eslint/no-loop-func": E,
			"no-lone-blocks": E,
			"no-self-compare": E,
			"no-unmodified-loop-condition": E,
			"no-unreachable-loop": E,
			"no-extra-label": E,
			// prefer guard-clauses
			"no-else-return": [W, { allowElseIf: false }],
			"no-useless-return": E,
			"no-unneeded-ternary": [E, { defaultAssignment: false }],
			"no-useless-computed-key": E,
			"no-useless-concat": E,
			"no-useless-rename": E,
			"object-shorthand": [E, "properties"],
			"require-atomic-updates": E,
			"no-eval": E,
			"no-script-url": E,
			// https://github.com/typescript-eslint/typescript-eslint/issues/10526
			"no-with": O,
			"no-sequences": W,
			"max-params": O,
			// prefer "Object/option bags"
			"@typescript-eslint/max-params": [E, { max: 4 }],
			"max-depth": W,
			"max-nested-callbacks": [E, 3],
			"no-template-curly-in-string": W,
			"no-warning-comments": [
				W,
				{ terms: ["TODO", "to-do", "hacer", "pendiente"] },
			],
			"@typescript-eslint/require-array-sort-compare": E,
		},
	},
);
