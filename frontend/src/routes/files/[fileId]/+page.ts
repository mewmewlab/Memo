import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(`/api/files/${params.fileId}`);
	const file = await res.json();
	return { file };
};