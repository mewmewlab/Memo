<script lang="ts">
    let fileInput: HTMLInputElement;
    import { type RecordModel } from "pocketbase";
    import {pb} from "$lib"
    import { generateID } from "$lib/api"

    async function handleUpload() {
        // 1. Generate an ID
        const fileID = await generateID()
        
        const formData = new FormData();
        if (fileInput.files && fileInput.files[0]) {
            formData.append("documents", fileInput.files[0]);
            try {
                const createRecord: RecordModel = await pb.collection("files").create(formData);
                // 上传成功后刷新页面
                window.location.reload();
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
            on:change={handleUpload}
        />
        <button
            class="bg-sky-500 hover:bg-sky-700 cursor-pointer text-white px-4 py-2 rounded-md"
            on:click={() => fileInput.click()}
        >
            Choose File!
        </button>
    </div>
</div>
