import { ref, computed, watch } from 'vue';
import type { Ref } from 'vue';
import { saveSessionCounter, loadSessionCounter } from '../utils/storage';

/**
 * Composable for tracking completed work sessions
 * Tracks progress toward long break (e.g., 0/4 sessions completed)
 */
export function useSessionCounter(longBreakFrequency: number | Ref<number> = 4) {
    // Try to restore session counter from localStorage
    const savedCount = loadSessionCounter();
    const initialCount = savedCount !== null ? savedCount : 0;
    
    const completedSessions = ref(initialCount);
    
    // Save session counter whenever it changes
    watch(completedSessions, (newCount) => {
        saveSessionCounter(newCount);
    });
    
    const frequencyRef = typeof longBreakFrequency === 'number' 
        ? ref(longBreakFrequency) 
        : longBreakFrequency;

    /**
     * Increment the session counter when a work session completes
     * Counter will show 4/4 during long break, then reset after long break completes
     */
    const increment = () => {
        completedSessions.value++;
    };

    /**
     * Reset the session counter
     */
    const reset = () => {
        completedSessions.value = 0;
        // Counter is automatically saved via watch
    };

    /**
     * Get the progress text in format "X/Y"
     */
    const progressText = computed(() => {
        return `${completedSessions.value}/${frequencyRef.value}`;
    });

    /**
     * Check if it's time for a long break
     */
    const shouldTakeLongBreak = computed(() => {
        return completedSessions.value >= frequencyRef.value - 1;
    });

    /**
     * Update the long break frequency
     */
    const setLongBreakFrequency = (frequency: number) => {
        frequencyRef.value = frequency;
        // Reset counter if new frequency is less than current count
        if (completedSessions.value >= frequency) {
            completedSessions.value = 0;
        }
    };

    return {
        completedSessions,
        progressText,
        shouldTakeLongBreak,
        increment,
        reset,
        setLongBreakFrequency,
    };
}
