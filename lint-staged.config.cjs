module.exports = {
  "client/**/*.{js,jsx,ts,tsx}": ["prettier  --write", "eslint  --fix"],
  "client/**/*.{css,sss,less,scss,saas}": ["stylelint --fix"]
};
