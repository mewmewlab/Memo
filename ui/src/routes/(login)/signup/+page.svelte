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
    superForm,
    setError,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } =
    $props();

  const form = superForm(data.form, {
    SPA: true,
    validators: zodClient(formSchema),
    onUpdate: async ({ form }) => {
      if (form.valid) {
        if (form.data.password !== form.data.password_r) {
          setError(form, "password_r", "Password and repeate all not the same");
          return;
        }
        try {
          await pb
          .collection("users")
          .create({"email": form.data.email, "password": form.data.password, "passwordConfirm": form.data.password_r})
          await pb
            .collection("users")
            .authWithPassword(form.data.email, form.data.password);
          await applyAction({ type: "redirect", status: 303, location: "/" });
        } catch (e) {
          if (e instanceof ClientResponseError) {
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

<div class="flex align-center justify-center flex-col gap-6">
  <form method="POST" use:enhance>
    <Form.Field {form} name="email">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Username</Form.Label>
          <Input {...props} bind:value={$formData.email} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Password</Form.Label>
          <Input {...props} bind:value={$formData.password} type="password" />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password_r">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Password Repeat</Form.Label>
          <Input {...props} bind:value={$formData.password_r} type="password" />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Button type="submit" disabled={$submitting}>
      {#if $submitting}Processing...{:else}Sign Up{/if}
    </Form.Button>
  </form>
  <div class="text-xs text-gray-400 font-normal">
    Already have an account ? <a href="/signin">Signin!</a>
  </div>
</div>
