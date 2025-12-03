<template>
  <header>
    <span class="logo-placeholder"></span>
    <span class="placeholder-title">PurePomodoro</span>
  </header>

  <Timer />

  <div>
    <span class="feature-title">Sessions Completed</span>
    <p class="feature-text">0/4</p>
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