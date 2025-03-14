<script lang="ts">
  import { applyAction } from "$app/forms";
  import { ClientResponseError } from "pocketbase";
  import { pb } from "$lib";
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { formSchema, type FormSchema } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm, setError
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } =
    $props();

  const form = superForm(data.form, {
    SPA: true,
    validators: zodClient(formSchema),
    onUpdate: async ({ form }) => {
      if (form.valid) {
        try {
          await pb
            .collection("users")
            .authWithPassword(form.data.email, form.data.password);
          await applyAction({ type: "redirect", status: 303, location: "/" });
        } catch (e) {
          if (e instanceof ClientResponseError) {
            setError(form, 'email', '')
            setError(form, 'password', 'Email or password is incorrect')
            await applyAction({
              type: "failure",
              status: 400,
              data: { response: e.response },
            });
          } else {
            throw e;
          }
        }
      }
    },
  });

  const { form: formData, enhance, submitting } = form;
</script>

<div class="flex align-center justify-center flex-col gap-4">
  <form method="POST" use:enhance>
    <Form.Field {form} name="email">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Email</Form.Label>
          <Input {...props} bind:value={$formData.email} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Password</Form.Label>
          <Input {...props} bind:value={$formData.password} type="password"/>
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Button type="submit" disabled={$submitting} class="top-10">
      {#if $submitting}Processing...{:else}Sign In{/if}
    </Form.Button>
  </form>
  <div class="text-xs text-gray-400 font-normal">
    <a href="/signup">Create an account!</a>
  </div>
</div>
