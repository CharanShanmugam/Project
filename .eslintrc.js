module.exports = {
    "extends": "airbnb",
    "plugins":[
    	"react",
    	"jsx-a11y",
    	"import"
    ],
    "rules": {
		"linebreak-style": 0,
		"max-len": [1, 180, 4],
		"one-var-declaration-per-line": ["error", "initializations"],
		"one-var": ["error", { var: "never", let: "always", const: "never" }],
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/no-extraneous-dependencies": ["error", {devDependencies: true}],
        "arrow-body-style": ["off"],
        "prefer-arrow-callback": [ "error", { "allowNamedFunctions": true }],
        "jsx-a11y/anchor-is-valid": [ "error", {
            "aspects": [ "invalidHref" ]
          }],
        'jsx-a11y/no-static-element-interactions': ["off"],
        'jsx-a11y/no-noninteractive-tabindex': ["off"],
        "prefer-arrow-callback": 0,
        "func-names": 0,
		}
};