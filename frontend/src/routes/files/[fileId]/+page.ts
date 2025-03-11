import type { PageLoad } from "./$types";
import { pb } from "$lib"
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ( { fetch, params }) => {
	try {
		const response = await pb.collection("files").getOne(params.fileId, {
			fetch: fetch,
		})
		const fileName = response.file
		const url = pb.files.getURL(response, fileName)
		return {
			id: params.fileId,
			url: url,
			name: fileName,
			error: null
		}
	} catch (e) {
		// console.log(e)
		// error(404, 'Not found')
		return {
			error: e,
			id: params.fileId,
		}
	}
}