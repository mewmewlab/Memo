import { redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

import { pb } from '$lib';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, fetch }) => {
	try {
		await pb.collection('users').authRefresh({ fetch });
	} catch (e) {
		if (!(e instanceof ClientResponseError)) {
			throw e;
		}
		pb.authStore.clear();
		throw redirect(302, `/signin`);
	}
};