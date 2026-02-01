import { ref, computed, onUnmounted, watch, unref, type Ref } from 'vue';
import { TimerCore, TIMER_STATUS } from '../../lib/timer-core';
import { saveTimerState, loadTimerState, clearTimerState } from '../utils/storage';

// Re-define the type for use in the composable
export type TimerStatus = (typeof TIMER_STATUS)[keyof typeof TIMER_STATUS];

export function useTimer(initialDurationSeconds: number | Ref<number> = 1500) {
    const durationRef = typeof initialDurationSeconds === 'number' 
        ? ref(initialDurationSeconds) 
        : initialDurationSeconds;
    
    // Ensure we always extract the numeric value, not a Ref object
    const initialDuration = unref(durationRef);
    
    // Try to restore state from localStorage
    const savedState = loadTimerState();
    let restoredTimeRemaining = initialDuration;
    let restoredStatus: TimerStatus = TIMER_STATUS.IDLE;
    let shouldRestoreTimer = false;
    
    if (savedState) {
        // Check if timer was running when saved
        if (savedState.status === TIMER_STATUS.RUNNING) {
            // Calculate elapsed time since save
            const now = Math.floor(Date.now() / 1000);
            const elapsedSeconds = now - savedState.timestamp;
            const newTimeRemaining = savedState.timeRemaining - elapsedSeconds;
            
            // If timer expired, mark as completed
            if (newTimeRemaining <= 0) {
                restoredTimeRemaining = 0;
                restoredStatus = TIMER_STATUS.COMPLETED;
            } else {
                // Timer is still valid, restore it
                restoredTimeRemaining = newTimeRemaining;
                restoredStatus = TIMER_STATUS.PAUSED; // Restore as paused, user can resume
                shouldRestoreTimer = true;
            }
        } else if (savedState.status === TIMER_STATUS.PAUSED) {
            // Restore paused state as-is
            restoredTimeRemaining = savedState.timeRemaining;
            restoredStatus = TIMER_STATUS.PAUSED;
        } else if (savedState.status === TIMER_STATUS.COMPLETED) {
            // Restore completed state
            restoredTimeRemaining = 0;
            restoredStatus = TIMER_STATUS.COMPLETED;
        } else {
            // IDLE or invalid state - use initial duration
            restoredTimeRemaining = initialDuration;
            restoredStatus = TIMER_STATUS.IDLE;
        }
        
        // Validate duration matches (in case settings changed)
        if (savedState.duration !== initialDuration) {
            // Duration changed, reset to idle with new duration
            restoredTimeRemaining = initialDuration;
            restoredStatus = TIMER_STATUS.IDLE;
            shouldRestoreTimer = false;
        }
    }
    
    const timeRemaining = ref(restoredTimeRemaining);
    const status = ref<TimerStatus>(restoredStatus);

    const timer = new TimerCore(restoredTimeRemaining, {
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
    
    // Set initial status if restored
    if (restoredStatus === TIMER_STATUS.PAUSED) {
        // Timer was paused (either from paused state or running state that was restored as paused)
        timer.reset(restoredTimeRemaining);
        timer.pause();
    } else if (restoredStatus === TIMER_STATUS.COMPLETED) {
        // Timer was completed - reset to 0 which will complete it
        timer.reset(0);
        // The reset(0) will trigger finish() which sets status to COMPLETED via onStatusChange
    }
    
    // Save state whenever timeRemaining or status changes
    watch([timeRemaining, status], () => {
        const currentDuration = unref(durationRef);
        saveTimerState({
            timeRemaining: timeRemaining.value,
            status: status.value,
            timestamp: Math.floor(Date.now() / 1000),
            duration: currentDuration,
        });
    }, { deep: true });

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
        // Clear saved state when resetting
        clearTimerState();
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
