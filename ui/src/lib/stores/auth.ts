import { writable } from "svelte/store";
import type { AuthRecord } from "pocketbase"

export const currentUser = writable<AuthRecord | null>(null)