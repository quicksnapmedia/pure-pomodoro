<template>
  <header>
    <Logo variant="full"/>
  </header>

  <Timer />

  <div>
    <FeatureProgress title="Sessions Completed" progress-text="0/4"/>
  </div>
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