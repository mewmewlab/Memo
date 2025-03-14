import type { PageLoad } from "./$types";
import { pb, user } from "$lib";
import { get } from "svelte/store"

export const load: PageLoad = async ({ fetch }) => {
    const userRecord = get(user) 
    const files = await pb.collection("files").getFullList({ 
        fetch: fetch, 
        filter: `userID=${userRecord!.id}`
    });
    const reversedFiles = files.reverse().map((file) => {
        const expired = new Date(file.created);
        expired.setDate(expired.getDate() + 7);
        return {
            ...file,
            created: new Date(file.created).toLocaleString(),
            expired: expired.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }),
            url: `${pb.baseURL}/api/files/${file.collectionId}/${file.id}/${file.file}?download=true`,
        }
    });
    return { files: reversedFiles };
};