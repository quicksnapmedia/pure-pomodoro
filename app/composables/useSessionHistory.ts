import { ref, computed, watch } from 'vue';
import {
	saveSessionHistory,
	loadSessionHistory,
	clearSessionHistory,
	type SessionHistoryEntry,
} from '../utils/storage';

// Re-export the type for consumers
export type { SessionHistoryEntry };

/**
 * Generate a unique ID for session entries
 */
function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get the start of a day (midnight) for a given timestamp
 */
function getStartOfDay(timestamp: number): number {
	const date = new Date(timestamp * 1000);
	date.setHours(0, 0, 0, 0);
	return Math.floor(date.getTime() / 1000);
}

/**
 * Composable for tracking completed session history
 * Stores session data in localStorage for statistics and history display
 */
export function useSessionHistory() {
	// Load existing history from localStorage
	const history = ref<SessionHistoryEntry[]>(loadSessionHistory());

	// Save history whenever it changes
	watch(
		history,
		(newHistory) => {
			saveSessionHistory(newHistory);
		},
		{ deep: true }
	);

	/**
	 * Record a completed session
	 */
	const recordSession = (type: string, duration: number): SessionHistoryEntry => {
		const entry: SessionHistoryEntry = {
			id: generateId(),
			type,
			duration,
			completedAt: Math.floor(Date.now() / 1000),
		};

		history.value.push(entry);
		return entry;
	};

	/**
	 * Remove a session from history by ID
	 */
	const removeSession = (id: string): boolean => {
		const index = history.value.findIndex((entry) => entry.id === id);
		if (index !== -1) {
			history.value.splice(index, 1);
			return true;
		}
		return false;
	};

	/**
	 * Clear all session history
	 */
	const clearHistory = (): void => {
		history.value = [];
		clearSessionHistory();
	};

	/**
	 * Get sessions filtered by type
	 */
	const getSessionsByType = (type: string): SessionHistoryEntry[] => {
		return history.value.filter((entry) => entry.type === type);
	};

	/**
	 * Get sessions completed today
	 */
	const todaySessions = computed(() => {
		const todayStart = getStartOfDay(Math.floor(Date.now() / 1000));
		return history.value.filter((entry) => entry.completedAt >= todayStart);
	});

	/**
	 * Get only pomodoro (work) sessions from today
	 */
	const todayPomodoroSessions = computed(() => {
		return todaySessions.value.filter((entry) => entry.type === 'pomodoro');
	});

	/**
	 * Total number of sessions recorded
	 */
	const totalSessions = computed(() => history.value.length);

	/**
	 * Total number of pomodoro (work) sessions
	 */
	const totalPomodoroSessions = computed(() => {
		return history.value.filter((entry) => entry.type === 'pomodoro').length;
	});

	/**
	 * Total focus time in seconds (sum of all pomodoro durations)
	 */
	const totalFocusTime = computed(() => {
		return history.value
			.filter((entry) => entry.type === 'pomodoro')
			.reduce((total, entry) => total + entry.duration, 0);
	});

	/**
	 * Total focus time today in seconds
	 */
	const todayFocusTime = computed(() => {
		return todayPomodoroSessions.value.reduce(
			(total, entry) => total + entry.duration,
			0
		);
	});

	/**
	 * Format seconds into a human-readable string (e.g., "2h 30m")
	 */
	const formatDuration = (seconds: number): string => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);

		if (hours > 0) {
			return `${hours}h ${minutes}m`;
		}
		return `${minutes}m`;
	};

	/**
	 * Formatted total focus time
	 */
	const formattedTotalFocusTime = computed(() => formatDuration(totalFocusTime.value));

	/**
	 * Formatted today's focus time
	 */
	const formattedTodayFocusTime = computed(() => formatDuration(todayFocusTime.value));

	/**
	 * Get sessions grouped by day
	 */
	const sessionsByDay = computed(() => {
		const grouped: Record<string, SessionHistoryEntry[]> = {};

		history.value.forEach((entry) => {
			const date = new Date(entry.completedAt * 1000);
			const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format

			if (!grouped[dateKey]) {
				grouped[dateKey] = [];
			}
			grouped[dateKey].push(entry);
		});

		return grouped;
	});

	/**
	 * Get the most recent sessions (limited)
	 */
	const getRecentSessions = (limit: number = 10): SessionHistoryEntry[] => {
		return [...history.value]
			.sort((a, b) => b.completedAt - a.completedAt)
			.slice(0, limit);
	};

	return {
		// State
		history,

		// Actions
		recordSession,
		removeSession,
		clearHistory,
		getSessionsByType,
		getRecentSessions,

		// Computed statistics
		todaySessions,
		todayPomodoroSessions,
		totalSessions,
		totalPomodoroSessions,
		totalFocusTime,
		todayFocusTime,
		formattedTotalFocusTime,
		formattedTodayFocusTime,
		sessionsByDay,

		// Utilities
		formatDuration,
	};
}
