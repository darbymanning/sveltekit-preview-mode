<footer>
  <div class="container">
    <h3>Prerendered with SvelteKit.</h3>
    <a href={import.meta.env.REPOSITORY_URL}>View on GitHub</a>
  </div>
</footer>

<style lang="scss">
  .container {
    margin: var(--gap) auto;
    width: min(85vw, 128rem);
  }

  footer {
    background: #fafafa;
    border-top: 1px solid #e2e8f0;
    gap: 2rem;
    padding: var(--gap) 0;

    .container {
      align-items: center;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }

    h3 {
      font-size: clamp(3.2rem, 7vw, 4rem);
      letter-spacing: var(--letter-inset);
    }

    a {
      font-weight: bold;

      &:not(:hover) {
        text-decoration: none;
      }
    }
  }
</style>
