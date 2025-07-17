import { z } from "zod/v4";

const serverEnvSchema = z.object({
  SANITY_PROJECT_ID: z.string(),
  SANITY_DATASET: z.string(),
  SANITY_TOKEN: z.string(),
  SANITY_WEBHOOK_SECRET: z.string(),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
  NEXT_PUBLIC_SANITY_DATASET: z.string(),
});

const serverConfigProject = serverEnvSchema.safeParse({
  SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  SANITY_DATASET: process.env.SANITY_DATASET,
  SANITY_TOKEN: process.env.SANITY_TOKEN,
  SANITY_WEBHOOK_SECRET: process.env.SANITY_WEBHOOK_SECRET,
});

const clientConfigProject = clientEnvSchema.safeParse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
});

if (!serverConfigProject.success) {
  console.error(serverConfigProject.error.message);
  throw new Error("Invalid server environment variables");
}

if (!clientConfigProject.success) {
  console.error(clientConfigProject.error.message);
  throw new Error("Invalid client environment variables");
}

const serverEnvConfig = serverConfigProject.data;

const clientEnvConfig = clientConfigProject.data;

const envConfig = {
  ...serverEnvConfig,
  ...clientEnvConfig,
};

export default envConfig;
