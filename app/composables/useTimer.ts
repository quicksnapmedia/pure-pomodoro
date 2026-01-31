import { ref, computed, onUnmounted, watch, unref, type Ref } from 'vue';
import { TimerCore, TIMER_STATUS } from '../../lib/timer-core';

// Re-define the type for use in the composable
export type TimerStatus = (typeof TIMER_STATUS)[keyof typeof TIMER_STATUS];

export function useTimer(initialDurationSeconds: number | Ref<number> = 1500) {
    const durationRef = typeof initialDurationSeconds === 'number' 
        ? ref(initialDurationSeconds) 
        : initialDurationSeconds;
    
    // Ensure we always extract the numeric value, not a Ref object
    const initialDuration = unref(durationRef);
    
    const timeRemaining = ref(initialDuration);
    const status = ref<TimerStatus>(TIMER_STATUS.IDLE);

    const timer = new TimerCore(initialDuration, {
        onTick: (seconds: number) => {
            timeRemaining.value = seconds;
        },
        onStatusChange: (newStatus: TimerStatus) => {
            status.value = newStatus;
        },
        onFinish: () => {
            // Additional logic for when the timer finishes can go here
            console.log('Timer finished!');
        }
    });

    // Watch for duration changes and reset timer if idle or completed
    watch(durationRef, (newDuration) => {
        if (status.value === TIMER_STATUS.IDLE || status.value === TIMER_STATUS.COMPLETED) {
            // Ensure newDuration is a number, not a Ref
            const durationValue = unref(newDuration);
            timer.reset(durationValue);
            timeRemaining.value = durationValue;
        }
    });

    const formattedTime = computed(() => {
        const mins = Math.floor(timeRemaining.value / 60);
        const secs = timeRemaining.value % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    });

    const start = () => timer.start();
    const pause = () => timer.pause();
    const reset = (newDuration?: number) => {
        // Ensure we always use a number, not a Ref object
        const durationToUse = newDuration ?? unref(durationRef);
        timer.reset(durationToUse);
        timeRemaining.value = durationToUse;
    };

    // Cleanup when the component using this composable is unmounted
    onUnmounted(() => {
        timer.destroy();
    });

    return {
        timeRemaining,
        status,
        formattedTime,
        start,
        pause,
        reset
    };
}
