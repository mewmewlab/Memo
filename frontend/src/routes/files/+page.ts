import type { PageLoad } from "./$types";
import { pb } from "$lib";

export const load: PageLoad = async ({ fetch }) => {
    const files = await pb.collection("files").getFullList({ fetch });
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