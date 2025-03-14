import { redirect } from '@sveltejs/kit';

import { pb, user } from '$lib/stores/pocketbase';

import type { LayoutLoad } from './$types';
import { get } from 'svelte/store';

export const load: LayoutLoad = async ({ url, fetch }) => {
	const currentUser = get(user)
	if (!currentUser) {
		try {
			if (!pb.authStore.record?.id) {
				throw new Error("No user ID found in auth store")
			}
			const userData = await pb.collection("users").getOne(pb.authStore.record.id, {
				fetch: fetch,
			})
			user.set(userData)
		} catch(e) {
			throw redirect(303, "/signin")
		}
	}
};