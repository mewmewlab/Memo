<script lang="ts">
    let fileInput: HTMLInputElement;
    import { type RecordModel } from "pocketbase";
    import {pb} from "$lib"
    import { goto } from "$app/navigation";

    async function handleUpload() {
        const formData = new FormData();
        // 2. Upload File
        if (fileInput.files && fileInput.files[0]) {
            formData.append("file", fileInput.files[0]);
            try {
                const createRecord: RecordModel = await pb.collection("files").create(formData);
                goto(`/files/${createRecord.id}`)
            } catch (error) {
                console.error("Upload error:", error);
                alert("上传失败，请重试");
            }
        }
    }
</script>

<div class="w-full flex flex-col gap-4 items-center justify-center">
    <span>Upload Your Temporary Files</span>
    <div class="flex flex-col gap-2">
        <input
            type="file"
            class="hidden"
            bind:this={fileInput}
            onchange={handleUpload}
        />
        <button
            class="bg-sky-500 hover:bg-sky-700 cursor-pointer text-white px-4 py-2 rounded-md"
            onclick={() => fileInput.click()}
        >
            Choose File!
        </button>
    </div>
</div>