<style lang="scss">
@use "~/assets/scss/pages/home.scss";
</style>

<template>
  <div class="home">
    <header id="home-header">
      <Logo variant="full" />
    </header>

    <main>
      <Timer />
      <FeatureProgress title="Sessions Completed" progress-text="0/4" />
    </main>

    <footer id="home-footer">
      <ul>
        <li>
          <PomoLink to="/settings">Settings</PomoLink>
        </li>
        <li>
          <PomoLink to="mailto:support@quicksnapmedia.com">Feedback</PomoLink>
        </li>
      </ul>
    </footer>
  </div>
</template>