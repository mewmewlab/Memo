<script lang="ts">
    import type { PageData } from "./$types";

    import * as Dialog from "$lib/components/ui/dialog";
    import * as Table from "$lib/components/ui/table";
    import { Toaster, toast } from "svelte-sonner";
    import { invalidateAll } from "$app/navigation";
    import {get} from "svelte/store"

    let isOpen = $state(false);

    const { data } = $props<{ data: PageData }>();

    let fileInput: HTMLInputElement;
    import { type RecordModel } from "pocketbase";
    import { pb, user } from "$lib";

    async function handleUpload() {
        const formData = new FormData();
        const userRecord = get(user)
        if (fileInput.files && fileInput.files[0]) {
            formData.append("file", fileInput.files[0]);
            formData.append("userID", userRecord!.id)
            try {
                const createRecord: RecordModel = await pb
                    .collection("files")
                    .create(formData);
                toast.success(`File ${createRecord.id} uploaded successfully`);
                isOpen = false;
                await invalidateAll();
            } catch (error) {
                console.error("Upload error:", error);
                alert("上传失败，请重试");
            }
        }
    }
</script>

<div class="w-full flex flex-col gap-4 items-center">
    <Toaster />
    <div class="w-full flex gap-2 justify-end">
        <Dialog.Root bind:open={isOpen}>
            <Dialog.Trigger
                class="bg-gray-400 hover:bg-sky-700 cursor-pointer 
            text-white px-4 py-2 rounded-md">Upload</Dialog.Trigger
            >
            <Dialog.Content>
                <Dialog.Title>Upload Your Temporary Files</Dialog.Title>
                <Dialog.Description
                    >The files will be deleted after 7 days</Dialog.Description
                >
                <input
                    type="file"
                    class="hidden"
                    bind:this={fileInput}
                    onchange={handleUpload}
                />
                <button
                    class="bg-sky-500 hover:bg-sky-700 cursor-pointer text-white px-4 py-2 rounded-md"
                    type="submit"
                    onclick={() => fileInput.click()}
                >
                    Choose File!
                </button>
            </Dialog.Content>
        </Dialog.Root>
    </div>
    <Table.Root>
        <Table.Header>
            <Table.Row>
                <Table.Head>File ID</Table.Head>
                <Table.Head>File Name</Table.Head>
                <Table.Head>Created</Table.Head>
                <Table.Head>Expired</Table.Head>
                <Table.Head>Actions</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body class="font-light">
            {#each data.files as file}
                <Table.Row>
                    <Table.Cell>
                        {file.id}
                    </Table.Cell>
                    <Table.Cell>{file.file}</Table.Cell>
                    <Table.Cell>{file.created}</Table.Cell>
                    <Table.Cell>{file.expired}</Table.Cell>
                    <Table.Cell class="flex gap-2">
                        <a class="text-blue-500" href={file.url} download
                            >Download</a
                        >
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>
