import { env } from '$env/dynamic/private';
import { createClient } from 'microcms-js-sdk'
export const client = createClient({
  serviceDomain: "shamokit",
  apiKey: env.CMS_API_KEY,
});
