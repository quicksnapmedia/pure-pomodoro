<script setup lang="ts">
useHead({
	title: 'Settings'
})

// Temporary local state for UI (will be replaced with useSettings in Issue #7)
const workDuration = ref(25)
const shortBreakDuration = ref(5)
const longBreakDuration = ref(15)
const longBreakFrequency = ref(4)
const selectedSound = ref('default')
const selectedTheme = ref('auto')

const soundOptions = [
	{ value: 'default', label: 'Default' },
	{ value: 'bell', label: 'Bell' },
	{ value: 'chime', label: 'Chime' },
	{ value: 'none', label: 'None' }
]

const themeOptions = [
	{ value: 'auto', label: 'Auto' },
	{ value: 'light', label: 'Light' },
	{ value: 'dark', label: 'Dark' }
]
</script>

<template>
	<div class="settings">
		<header id="settings-header">
			<PomoLink to="/" class="settings-back-link">
				← Back
			</PomoLink>
			<Logo variant="full" />
		</header>

		<main class="settings-main">
			<h1 class="settings-title">Settings</h1>

			<form class="settings-form">
				<!-- Timer Durations Section -->
				<section class="settings-section">
					<h2 class="settings-section-title">Timer Durations</h2>
					
					<div class="settings-field">
						<label for="work-duration" class="settings-label">
							Work Duration (minutes)
						</label>
						<input
							id="work-duration"
							v-model.number="workDuration"
							type="number"
							min="1"
							max="60"
							class="settings-input"
							aria-describedby="work-duration-help"
						/>
						<p id="work-duration-help" class="settings-help">
							Default: 25 minutes
						</p>
					</div>

					<div class="settings-field">
						<label for="short-break-duration" class="settings-label">
							Short Break Duration (minutes)
						</label>
						<input
							id="short-break-duration"
							v-model.number="shortBreakDuration"
							type="number"
							min="1"
							max="30"
							class="settings-input"
							aria-describedby="short-break-duration-help"
						/>
						<p id="short-break-duration-help" class="settings-help">
							Default: 5 minutes
						</p>
					</div>

					<div class="settings-field">
						<label for="long-break-duration" class="settings-label">
							Long Break Duration (minutes)
						</label>
						<input
							id="long-break-duration"
							v-model.number="longBreakDuration"
							type="number"
							min="5"
							max="60"
							class="settings-input"
							aria-describedby="long-break-duration-help"
						/>
						<p id="long-break-duration-help" class="settings-help">
							Default: 15 minutes
						</p>
					</div>
				</section>

				<!-- Session Settings Section -->
				<section class="settings-section">
					<h2 class="settings-section-title">Session Settings</h2>
					
					<div class="settings-field">
						<label for="long-break-frequency" class="settings-label">
							Sessions Before Long Break
						</label>
						<input
							id="long-break-frequency"
							v-model.number="longBreakFrequency"
							type="number"
							min="2"
							max="10"
							class="settings-input"
							aria-describedby="long-break-frequency-help"
						/>
						<p id="long-break-frequency-help" class="settings-help">
							Default: 4 sessions
						</p>
					</div>
				</section>

				<!-- Sound Settings Section -->
				<section class="settings-section">
					<h2 class="settings-section-title">Sound</h2>
					
					<div class="settings-field">
						<label for="sound-selection" class="settings-label">
							Completion Sound
						</label>
						<select
							id="sound-selection"
							v-model="selectedSound"
							class="settings-select"
							aria-describedby="sound-selection-help"
						>
							<option
								v-for="option in soundOptions"
								:key="option.value"
								:value="option.value"
							>
								{{ option.label }}
							</option>
						</select>
						<p id="sound-selection-help" class="settings-help">
							Sound played when timer completes
						</p>
					</div>
				</section>

				<!-- Theme Settings Section -->
				<section class="settings-section">
					<h2 class="settings-section-title">Theme</h2>
					
					<div class="settings-field">
						<label for="theme-selection" class="settings-label">
							Theme Preference
						</label>
						<select
							id="theme-selection"
							v-model="selectedTheme"
							class="settings-select"
							aria-describedby="theme-selection-help"
						>
							<option
								v-for="option in themeOptions"
								:key="option.value"
								:value="option.value"
							>
								{{ option.label }}
							</option>
						</select>
						<p id="theme-selection-help" class="settings-help">
							Auto follows system preference
						</p>
					</div>
				</section>
			</form>
		</main>

		<footer id="settings-footer">
			<ul>
				<li>
					<PomoLink to="/">Home</PomoLink>
				</li>
				<li>
					<PomoLink to="mailto:support@quicksnapmedia.com">Feedback</PomoLink>
				</li>
			</ul>
		</footer>
	</div>
</template>
