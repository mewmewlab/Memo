import {API_BASE_URL} from "$lib"

import { FileID } from "$lib/api"

export const generateID = async () : Promise<FileID> =>  {
    const response = await fetch(`${API_BASE_URL}/-/api/v1/id`) 
    return response.json()
}