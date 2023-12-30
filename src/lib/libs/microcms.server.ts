import { CMS_API_KEY } from '$env/static/private';
import {
	createClient,
	type GetRequest as GetRequestOriginal,
	type MicroCMSListContent as MicroCMSListContentOriginal
} from 'microcms-js-sdk';
export type GetRequest = GetRequestOriginal;
export type MicroCMSListContent = MicroCMSListContentOriginal;
export const client = createClient({
	serviceDomain: 'shamokit',
	apiKey: CMS_API_KEY
});
