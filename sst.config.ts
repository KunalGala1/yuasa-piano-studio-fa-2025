/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "yuasapianostudio2",
      home: "aws",
      removal: input?.stage === "production" ? "retain" : "remove",
      providers: {
        cloudflare: {
          version: "5.39.0",
          apiToken: "QAQqMYagisM3TRWV8X2P2lBucyXqOkkojLkXHJH7",
        },
      },
    };
  },
  async run() {
    const stage = process.env.SST_STAGE || "dev";
    new sst.aws.Nextjs("YuasaPianoStudioWeb2", {
      domain:
        stage === "kg"
          ? {
              name: "yuasapianostudio.com",
              redirects: ["www.yuasapianostudio.com"],
              dns: sst.cloudflare.dns({
                zone: "5372fbee6183cf2fba158a9de9d556ff",
              }),
            }
          : undefined,
    });
  },
});
