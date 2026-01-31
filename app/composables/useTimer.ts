import { ref, computed, onUnmounted } from 'vue';
import { TimerCore, TIMER_STATUS } from '../../lib/timer-core';

// Re-define the type for use in the composable
export type TimerStatus = (typeof TIMER_STATUS)[keyof typeof TIMER_STATUS];

export function useTimer(initialDurationSeconds: number = 1500) {
    const timeRemaining = ref(initialDurationSeconds);
    const status = ref<TimerStatus>(TIMER_STATUS.IDLE);

    const timer = new TimerCore(initialDurationSeconds, {
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

    const formattedTime = computed(() => {
        const mins = Math.floor(timeRemaining.value / 60);
        const secs = timeRemaining.value % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    });

    const start = () => timer.start();
    const pause = () => timer.pause();
    const reset = (newDuration?: number) => {
        timer.reset(newDuration);
        if (newDuration !== undefined) {
            timeRemaining.value = newDuration;
        }
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
