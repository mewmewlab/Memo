import PocketBase from "pocketbase"
import { API_BASE_URL } from "$lib"
import { getContext, setContext } from "svelte"

export class PB {
    pb = $state(new PocketBase(API_BASE_URL))
}

const PB_KEY = "POCKET_BASE_KEY"

export const setPB = () => {
    return setContext(PB_KEY, new PB())
}

export const getPB = () => {
    return getContext<ReturnType<typeof setPB>>(PB_KEY)
}