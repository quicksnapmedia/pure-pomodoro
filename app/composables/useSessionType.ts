import { ref, computed } from 'vue';

export const SESSION_TYPES = {
    POMODORO: 'pomodoro',
    SHORT_BREAK: 'short-break',
    LONG_BREAK: 'long-break',
} as const;

export type SessionType = (typeof SESSION_TYPES)[keyof typeof SESSION_TYPES];

// Default durations in seconds
const DEFAULT_DURATIONS = {
    [SESSION_TYPES.POMODORO]: 25 * 60,      // 25 minutes
    [SESSION_TYPES.SHORT_BREAK]: 5 * 60,    // 5 minutes
    [SESSION_TYPES.LONG_BREAK]: 15 * 60,    // 15 minutes
} as const;

// Display labels for session types
const SESSION_LABELS = {
    [SESSION_TYPES.POMODORO]: 'Work',
    [SESSION_TYPES.SHORT_BREAK]: 'Short Break',
    [SESSION_TYPES.LONG_BREAK]: 'Long Break',
} as const;

export function useSessionType() {
    const currentSessionType = ref<SessionType>(SESSION_TYPES.POMODORO);

    const duration = computed(() => {
        return DEFAULT_DURATIONS[currentSessionType.value];
    });

    const label = computed(() => {
        return SESSION_LABELS[currentSessionType.value];
    });

    const setSessionType = (type: SessionType) => {
        currentSessionType.value = type;
    };

    const switchToNextSessionType = () => {
        // Cycle: Pomodoro -> Short Break -> Pomodoro -> Short Break -> ...
        // Long breaks will be handled separately based on session count
        if (currentSessionType.value === SESSION_TYPES.POMODORO) {
            currentSessionType.value = SESSION_TYPES.SHORT_BREAK;
        } else {
            currentSessionType.value = SESSION_TYPES.POMODORO;
        }
    };

    const switchToLongBreak = () => {
        currentSessionType.value = SESSION_TYPES.LONG_BREAK;
    };

    return {
        currentSessionType,
        duration,
        label,
        setSessionType,
        switchToNextSessionType,
        switchToLongBreak,
        SESSION_TYPES,
    };
}
