class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.isActive = false;
    this.targetDate = targetDate;
    this.selector = selector;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    setInterval(() => {
      const time = this.targetDate - Date.now();
      const timeComponents = this.getTimeComponents(time);
      console.log(timeComponents);
      this.onTick(timeComponents);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, "0");
  }
  onTick({ days, hours, mins, secs }) {
    const timerEL = document.querySelector(this.selector);
    const daysEl = document.querySelector("span[data-value=days]");
    const hoursEl = document.querySelector("span[data-value=hours]");
    const minsEl = document.querySelector("span[data-value=mins]");
    const secsEl = document.querySelector("span[data-value=secs]");

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minsEl.textContent = mins;
    secsEl.textContent = secs;
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Oct 30, 2021"),
});

timer.start();
