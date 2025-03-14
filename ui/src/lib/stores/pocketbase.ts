import PocketBase, { type AuthRecord } from "pocketbase"
import { writable } from "svelte/store";
import { API_BASE_URL } from "$lib";

const pb = new PocketBase(API_BASE_URL)

const user = writable<AuthRecord>(null)
pb.authStore.onChange((_, authRecord) => {
	user.set(authRecord);
}, true);

export { pb, user }