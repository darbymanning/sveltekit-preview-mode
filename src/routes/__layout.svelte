<script>
  import { session } from "$app/stores";
  import Footer from "$lib/components/Footer.svelte";
  import PreviewBanner from "$lib/components/PreviewBanner.svelte";
</script>

{#if $session.preview}
  <PreviewBanner />
{/if}

<main>
  <slot />
</main>

<Footer />

<style lang="scss" global>
  @import "styles/app.scss";
</style>
