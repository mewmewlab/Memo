export const ssr = false;

import { get } from "svelte/store";
import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

import { user } from "$lib";

export const load: LayoutLoad = async ({url}) => {
    if (get(user) !== null) {
        throw redirect(302, url.searchParams.get('next') || '/')
    }
}