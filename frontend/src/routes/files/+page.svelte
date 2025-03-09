<script lang="ts">
    let fileInput: HTMLInputElement;
    import PocketBase, { type RecordModel } from "pocketbase";
    const pb = new PocketBase("http://127.0.0.1:8090");

    async function handleUpload() {
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

<div class="w-full flex flex-col gap-4 flex items-center justify-center">
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
