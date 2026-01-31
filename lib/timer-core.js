/**
 * Core Timer Logic - Framework Agnostic
 * This library handles the raw countdown logic and state.
 */

export const TIMER_STATUS = {
    IDLE: 'idle',
    RUNNING: 'running',
    PAUSED: 'paused',
    COMPLETED: 'completed',
};

/**
 * @typedef {Object} TimerConfig
 * @property {function(number): void} [onTick] - Callback fired every second with remaining time.
 * @property {function(): void} [onFinish] - Callback fired when timer reaches 0.
 * @property {function(string): void} [onStatusChange] - Callback fired when status changes.
 */

export class TimerCore {
    /**
     * Creates a new TimerCore instance.
     * @param {number} durationSeconds - Initial duration in seconds.
     * @param {TimerConfig} [config={}] - Configuration object with callbacks.
     */
    constructor(durationSeconds, config = {}) {
        /** @type {number} */
        this.secondsRemaining = durationSeconds;
        /** @type {number} */
        this.initialDuration = durationSeconds;
        /** @type {TimerConfig} */
        this.config = config;
        /** @type {string} */
        this.status = TIMER_STATUS.IDLE;
        /** @type {number|null} */
        this.intervalId = null;
    }

    /**
     * Starts the timer if not already running.
     */
    start() {
        if (this.status === TIMER_STATUS.RUNNING) return;

        this.setStatus(TIMER_STATUS.RUNNING);

        this.intervalId = setInterval(() => {
            this.tick();
        }, 1000);
    }

    /**
     * Pauses the timer if currently running.
     */
    pause() {
        if (this.status !== TIMER_STATUS.RUNNING) return;

        this.clearTimer();
        this.setStatus(TIMER_STATUS.PAUSED);
    }

    /**
     * Resets the timer to the initial duration or a new one.
     * @param {number} [newDuration] - Optional new duration in seconds.
     */
    reset(newDuration) {
        this.clearTimer();
        if (newDuration !== undefined) {
            this.initialDuration = newDuration;
            this.secondsRemaining = newDuration;
        } else {
            this.secondsRemaining = this.initialDuration;
        }
        this.setStatus(TIMER_STATUS.IDLE);
        this.triggerTick();
    }

    /**
     * Gets the current time remaining in seconds.
     * @returns {number} Seconds remaining.
     */
    getSecondsRemaining() {
        return this.secondsRemaining;
    }

    /**
     * Gets the current status of the timer.
     * @returns {string} Current status (idle, running, paused, completed).
     */
    getStatus() {
        return this.status;
    }

    /**
     * Internal tick method called every second.
     * @private
     */
    tick() {
        if (this.secondsRemaining > 0) {
            this.secondsRemaining--;
            this.triggerTick();

            if (this.secondsRemaining === 0) {
                this.finish();
            }
        } else {
            this.finish();
        }
    }

    /**
     * Internal method called when timer completes.
     * @private
     */
    finish() {
        this.clearTimer();
        this.setStatus(TIMER_STATUS.COMPLETED);
        if (this.config.onFinish) {
            this.config.onFinish();
        }
    }

    /**
     * Updates the status and triggers the change callback.
     * @private
     * @param {string} newStatus - The new status to set.
     */
    setStatus(newStatus) {
        if (this.status === newStatus) return;
        this.status = newStatus;
        if (this.config.onStatusChange) {
            this.config.onStatusChange(this.status);
        }
    }

    /**
     * Triggers the onTick callback.
     * @private
     */
    triggerTick() {
        if (this.config.onTick) {
            this.config.onTick(this.secondsRemaining);
        }
    }

    /**
     * Clears the internal interval.
     * @private
     */
    clearTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    /**
     * Cleanup method for when the timer is no longer needed.
     */
    destroy() {
        this.clearTimer();
    }
}
