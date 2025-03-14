// place files you want to import through the `$lib` alias in this folder.
import PocketBase, { type AuthRecord } from "pocketbase"
import { browser } from "$app/environment"
import { writable } from "svelte/store";

let API_BASE_URL = ""
if (browser) {
    API_BASE_URL = document.location.origin;
    if (import.meta.env.MODE === 'development') {
        API_BASE_URL = import.meta.env.VITE_API_URL;
    }
}

const pb = new PocketBase(API_BASE_URL)

const user = writable<AuthRecord>(null)
pb.authStore.onChange((_, authRecord) => {
	user.set(authRecord);
}, true);

export { pb, API_BASE_URL, user }