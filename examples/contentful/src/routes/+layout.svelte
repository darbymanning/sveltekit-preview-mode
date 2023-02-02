<script lang="ts">
  import { PreviewBanner } from "sveltekit-preview-mode";
  import { Footer } from "ui";
</script>

<PreviewBanner />

<main>
  <slot />
</main>

<Footer />
