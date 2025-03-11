import {API_BASE_URL} from "$lib"

import type { FileID } from "./types"

export const generateID = async () : Promise<FileID> =>  {
    const response = await fetch(`${API_BASE_URL}/-/api/v1/id`) 
    const data = await response.json()
    return data.id
}