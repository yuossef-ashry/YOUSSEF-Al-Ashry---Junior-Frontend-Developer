import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: "yre6gmbc", dataset: "production" },
  deployment: { autoUpdates: true, appId: "ue3wtp5msfnc9akrfdga8gnl" },
  studioHost: "youssef-ashry-portfolio-cms",
  // Keep the build light enough for small machines.
  vite: (config) => ({
    ...config,
    build: { ...config.build, sourcemap: false, minify: false, reportCompressedSize: false, rollupOptions: { ...config.build?.rollupOptions, maxParallelFileOps: 1 } },
  }),
});
