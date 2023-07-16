import { env } from '$env/dynamic/private';
import { createClient, type GetRequest as GetRequestOriginal, type MicroCMSListContent as MicroCMSListContentOriginal } from 'microcms-js-sdk'
export type GetRequest = GetRequestOriginal
export type MicroCMSListContent = MicroCMSListContentOriginal
export const client = createClient({
  serviceDomain: "shamokit",
  apiKey: env.CMS_API_KEY,
});
