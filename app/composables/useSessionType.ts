import { ref, computed, watch } from 'vue';
import { saveSessionType, loadSessionType } from '../utils/storage';

export const SESSION_TYPES = {
    POMODORO: 'pomodoro',
    SHORT_BREAK: 'short-break',
    LONG_BREAK: 'long-break',
} as const;

export type SessionType = (typeof SESSION_TYPES)[keyof typeof SESSION_TYPES];

// Display labels for session types
const SESSION_LABELS = {
    [SESSION_TYPES.POMODORO]: 'Work',
    [SESSION_TYPES.SHORT_BREAK]: 'Short Break',
    [SESSION_TYPES.LONG_BREAK]: 'Long Break',
} as const;

export function useSessionType() {
    // Try to restore session type from localStorage
    const savedSessionType = loadSessionType();
    const initialSessionType = (savedSessionType && Object.values(SESSION_TYPES).includes(savedSessionType as SessionType))
        ? (savedSessionType as SessionType)
        : SESSION_TYPES.POMODORO;
    
    const currentSessionType = ref<SessionType>(initialSessionType);
    
    // Save session type whenever it changes
    watch(currentSessionType, (newType) => {
        saveSessionType(newType);
    });
    
    // Get settings - useSettings is auto-imported by Nuxt
    const { workDuration, shortBreakDuration, longBreakDuration } = useSettings();

    const duration = computed(() => {
        // Convert minutes to seconds
        switch (currentSessionType.value) {
            case SESSION_TYPES.POMODORO:
                return workDuration.value * 60;
            case SESSION_TYPES.SHORT_BREAK:
                return shortBreakDuration.value * 60;
            case SESSION_TYPES.LONG_BREAK:
                return longBreakDuration.value * 60;
            default:
                return 25 * 60; // fallback
        }
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
