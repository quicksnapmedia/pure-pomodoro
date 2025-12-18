<style lang="scss">
@use "~/assets/scss/pages/home.scss";
</style>

<template>
  <header>
    <Logo variant="full"/>
  </header>

  <Timer />
  <FeatureProgress title="Sessions Completed" progress-text="0/4"/>
  
  <footer>
    <ul>
      <li>
        <PomoLink to="/settings">Settings</PomoLink>
      </li>
      <li>
        <PomoLink to="mailto:support@quicksnapmedia.com">Feedback</PomoLink>
      </li>
    </ul>
  </footer>
</template>