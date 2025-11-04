import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "bphvqs9o",
  dataset: "production",
  apiVersion: "2024-07-19",
  useCdn: true,
});
