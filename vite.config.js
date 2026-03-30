import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      hooks: path.resolve(__dirname, "src/hooks"),
      assets: path.resolve(__dirname, "src/assets"),
    },
  },
  build: {
    lib: {
      entry: "src/index.js",
      name: "UniUiFormBuilder",
      fileName: "uni-ui-form-builder",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      // Externalize all peerDependencies — consumers provide these
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "react-dom/client",
        "react-hook-form",
        "antd",
        /^antd\/.*/,
        "antd-phone-input",
        "@ant-design/icons",
        /^@ant-design\/.*/,
        "rc-field-form",
        /^rc-.*/,
      ],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "ReactJsxRuntime",
          "react-dom": "ReactDOM",
          "react-hook-form": "ReactHookForm",
          antd: "antd",
          "antd-phone-input": "AntdPhoneInput",
          "@ant-design/icons": "AntDesignIcons",
        },
      },
    },
  },
});
