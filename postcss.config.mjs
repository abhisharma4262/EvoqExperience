/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    "@tailwindcss/postcss",
    {
      postcssPlugin: "strip-utf8-bom",
      Once(root) {
        // Tailwind preserves a leading BOM from source into the AST stringification.
        if (root.raws?.before?.charCodeAt?.(0) === 0xfeff) {
          root.raws.before = root.raws.before.slice(1);
        }
        const first = root.first;
        if (first?.type === "comment" && first.text?.charCodeAt?.(0) === 0xfeff) {
          first.text = first.text.slice(1);
        }
      },
    },
  ],
};

export default config;
