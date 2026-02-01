import { ref, computed, watch } from 'vue';

export type SoundOption = 'default' | 'bell' | 'chime' | 'none';
export type ThemeOption = 'auto' | 'light' | 'dark';

export interface Settings {
	workDuration: number; // in minutes
	shortBreakDuration: number; // in minutes
	longBreakDuration: number; // in minutes
	longBreakFrequency: number; // number of sessions before long break
	sound: SoundOption;
	theme: ThemeOption;
}

const DEFAULT_SETTINGS: Settings = {
	workDuration: 25,
	shortBreakDuration: 5,
	longBreakDuration: 15,
	longBreakFrequency: 4,
	sound: 'default',
	theme: 'auto',
};

/**
 * Composable for managing application settings
 * Currently stores settings in memory (persistence will be added in Phase 4)
 */
export function useSettings() {
	// Initialize settings with defaults
	const settings = ref<Settings>({ ...DEFAULT_SETTINGS });

	// Individual reactive refs for easier binding
	const workDuration = computed({
		get: () => settings.value.workDuration,
		set: (value: number) => {
			settings.value.workDuration = value;
		},
	});

	const shortBreakDuration = computed({
		get: () => settings.value.shortBreakDuration,
		set: (value: number) => {
			settings.value.shortBreakDuration = value;
		},
	});

	const longBreakDuration = computed({
		get: () => settings.value.longBreakDuration,
		set: (value: number) => {
			settings.value.longBreakDuration = value;
		},
	});

	const longBreakFrequency = computed({
		get: () => settings.value.longBreakFrequency,
		set: (value: number) => {
			settings.value.longBreakFrequency = value;
		},
	});

	const sound = computed({
		get: () => settings.value.sound,
		set: (value: SoundOption) => {
			settings.value.sound = value;
		},
	});

	const theme = computed({
		get: () => settings.value.theme,
		set: (value: ThemeOption) => {
			settings.value.theme = value;
			applyTheme(value);
		},
	});

	/**
	 * Apply theme to the document
	 */
	function applyTheme(themeValue: ThemeOption) {
		if (typeof document === 'undefined') return;

		const html = document.documentElement;
		
		// Remove existing theme classes
		html.classList.remove('theme-light', 'theme-dark');
		
		// Update color-scheme to control light-dark() function behavior
		if (themeValue === 'auto') {
			// Auto theme - respect system preference
			html.style.colorScheme = 'light dark';
		} else if (themeValue === 'light') {
			html.style.colorScheme = 'light';
			html.classList.add('theme-light');
		} else if (themeValue === 'dark') {
			html.style.colorScheme = 'dark';
			html.classList.add('theme-dark');
		}
	}

	/**
	 * Update a specific setting
	 */
	function updateSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
		settings.value[key] = value;
		
		// Apply theme immediately if theme setting changed
		if (key === 'theme') {
			applyTheme(value as ThemeOption);
		}
	}

	/**
	 * Update multiple settings at once
	 */
	function updateSettings(updates: Partial<Settings>) {
		Object.assign(settings.value, updates);
		
		// Apply theme if it was updated
		if (updates.theme !== undefined) {
			applyTheme(updates.theme);
		}
	}

	/**
	 * Reset settings to defaults
	 */
	function resetToDefaults() {
		settings.value = { ...DEFAULT_SETTINGS };
		applyTheme(DEFAULT_SETTINGS.theme);
	}

	// Apply initial theme on mount
	if (typeof document !== 'undefined') {
		applyTheme(settings.value.theme);
	}

	return {
		settings,
		workDuration,
		shortBreakDuration,
		longBreakDuration,
		longBreakFrequency,
		sound,
		theme,
		updateSetting,
		updateSettings,
		resetToDefaults,
	};
}
