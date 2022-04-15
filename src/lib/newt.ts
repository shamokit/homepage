import { createClient } from 'newt-client-js'
export const newtClient = createClient({
	spaceUid: 'shamokit',
	token: process.env['NEWT_API_KEY'] ? process.env['NEWT_API_KEY'] : '',
	apiType: 'cdn',
})
