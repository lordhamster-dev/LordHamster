// Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";
// Define a schema for each collection you'd like to validate.
const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    banner: z.string(),
  }),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
};
