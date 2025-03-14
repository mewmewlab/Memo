<script lang="ts">
  import type { PageData } from "./$types.js";
  import SignInForm from "./SignInForm.svelte";
  let { data }: { data: PageData } = $props();
</script>
 
<SignInForm {data} />