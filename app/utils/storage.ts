/**
 * localStorage utilities for persisting application state
 */

const STORAGE_KEYS = {
	TIMER_STATE: 'pomodoro-timer-state',
	SESSION_TYPE: 'pomodoro-session-type',
	SESSION_COUNTER: 'pomodoro-session-counter',
	SESSION_HISTORY: 'pomodoro-session-history',
} as const;

export interface TimerState {
	timeRemaining: number;
	status: string;
	timestamp: number; // Unix timestamp when state was saved
	duration: number; // Original duration for validation
}

/**
 * Check if localStorage is available
 */
function isStorageAvailable(): boolean {
	if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
		return false;
	}
	try {
		const test = '__storage_test__';
		localStorage.setItem(test, test);
		localStorage.removeItem(test);
		return true;
	} catch {
		return false;
	}
}

/**
 * Save timer state to localStorage
 */
export function saveTimerState(state: TimerState): void {
	if (!isStorageAvailable()) return;
	
	try {
		localStorage.setItem(STORAGE_KEYS.TIMER_STATE, JSON.stringify(state));
	} catch (error) {
		console.warn('Failed to save timer state:', error);
	}
}

/**
 * Load timer state from localStorage
 */
export function loadTimerState(): TimerState | null {
	if (!isStorageAvailable()) return null;
	
	try {
		const stored = localStorage.getItem(STORAGE_KEYS.TIMER_STATE);
		if (!stored) return null;
		
		const state = JSON.parse(stored) as TimerState;
		
		// Validate state structure
		if (
			typeof state.timeRemaining !== 'number' ||
			typeof state.status !== 'string' ||
			typeof state.timestamp !== 'number' ||
			typeof state.duration !== 'number'
		) {
			return null;
		}
		
		return state;
	} catch (error) {
		console.warn('Failed to load timer state:', error);
		return null;
	}
}

/**
 * Clear timer state from localStorage
 */
export function clearTimerState(): void {
	if (!isStorageAvailable()) return;
	
	try {
		localStorage.removeItem(STORAGE_KEYS.TIMER_STATE);
	} catch (error) {
		console.warn('Failed to clear timer state:', error);
	}
}

/**
 * Save session type to localStorage
 */
export function saveSessionType(sessionType: string): void {
	if (!isStorageAvailable()) return;
	
	try {
		localStorage.setItem(STORAGE_KEYS.SESSION_TYPE, sessionType);
	} catch (error) {
		console.warn('Failed to save session type:', error);
	}
}

/**
 * Load session type from localStorage
 */
export function loadSessionType(): string | null {
	if (!isStorageAvailable()) return null;
	
	try {
		return localStorage.getItem(STORAGE_KEYS.SESSION_TYPE);
	} catch (error) {
		console.warn('Failed to load session type:', error);
		return null;
	}
}

/**
 * Clear session type from localStorage
 */
export function clearSessionType(): void {
	if (!isStorageAvailable()) return;
	
	try {
		localStorage.removeItem(STORAGE_KEYS.SESSION_TYPE);
	} catch (error) {
		console.warn('Failed to clear session type:', error);
	}
}

/**
 * Save session counter to localStorage
 */
export function saveSessionCounter(count: number): void {
	if (!isStorageAvailable()) return;
	
	try {
		localStorage.setItem(STORAGE_KEYS.SESSION_COUNTER, count.toString());
	} catch (error) {
		console.warn('Failed to save session counter:', error);
	}
}

/**
 * Load session counter from localStorage
 */
export function loadSessionCounter(): number | null {
	if (!isStorageAvailable()) return null;
	
	try {
		const stored = localStorage.getItem(STORAGE_KEYS.SESSION_COUNTER);
		if (!stored) return null;
		
		const count = parseInt(stored, 10);
		if (isNaN(count) || count < 0) return null;
		
		return count;
	} catch (error) {
		console.warn('Failed to load session counter:', error);
		return null;
	}
}

/**
 * Clear session counter from localStorage
 */
export function clearSessionCounter(): void {
	if (!isStorageAvailable()) return;
	
	try {
		localStorage.removeItem(STORAGE_KEYS.SESSION_COUNTER);
	} catch (error) {
		console.warn('Failed to clear session counter:', error);
	}
}

/**
 * Session history entry interface
 */
export interface SessionHistoryEntry {
	id: string; // Unique identifier for the session
	type: string; // Session type: 'pomodoro', 'short-break', 'long-break'
	duration: number; // Duration in seconds
	completedAt: number; // Unix timestamp when session was completed
}

/**
 * Save session history to localStorage
 */
export function saveSessionHistory(history: SessionHistoryEntry[]): void {
	if (!isStorageAvailable()) return;
	
	try {
		localStorage.setItem(STORAGE_KEYS.SESSION_HISTORY, JSON.stringify(history));
	} catch (error) {
		console.warn('Failed to save session history:', error);
	}
}

/**
 * Load session history from localStorage
 */
export function loadSessionHistory(): SessionHistoryEntry[] {
	if (!isStorageAvailable()) return [];
	
	try {
		const stored = localStorage.getItem(STORAGE_KEYS.SESSION_HISTORY);
		if (!stored) return [];
		
		const history = JSON.parse(stored) as SessionHistoryEntry[];
		
		// Validate that it's an array
		if (!Array.isArray(history)) return [];
		
		// Validate each entry structure
		return history.filter(entry =>
			typeof entry.id === 'string' &&
			typeof entry.type === 'string' &&
			typeof entry.duration === 'number' &&
			typeof entry.completedAt === 'number'
		);
	} catch (error) {
		console.warn('Failed to load session history:', error);
		return [];
	}
}

/**
 * Clear session history from localStorage
 */
export function clearSessionHistory(): void {
	if (!isStorageAvailable()) return;
	
	try {
		localStorage.removeItem(STORAGE_KEYS.SESSION_HISTORY);
	} catch (error) {
		console.warn('Failed to clear session history:', error);
	}
}
