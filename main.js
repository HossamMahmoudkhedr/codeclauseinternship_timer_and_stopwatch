// Selecting General Elements
const span = document.querySelector('span');
const lightOff = document.querySelector('.light-off');

// Selecting Timer Elements
const timerBtn = document.querySelector('.timer-btn');
const timerContainer = document.querySelector('.timer');
const setBtn = document.querySelector('.set');
const setTimer = document.querySelector('.setTimer');
const closeBtn = document.querySelector('.close');
const timerHoursSetter = document.getElementById('hours');
const timerMinSetter = document.getElementById('minutes');
const timerSecSetter = document.getElementById('seconds');
const timerHoursValue = document.querySelector('.timer .hours');
const timerMinValue = document.querySelector('.timer .minutes');
const timerSecValue = document.querySelector('.timer .seconds');
const submit = document.querySelector('.submit-btn');
const error = document.querySelector('.error');
const startTimer = document.querySelector('.start-timer');
const continuePauseResetTimer = document.querySelector('.timer .controls div');
const continuePauseTimer = document.querySelector(
	'.timer .continue-pause-timer'
);
const resetTimer = document.querySelector('.timer .reset-timer');

// Selecting Stopwatch Elements
const stopwatchBtn = document.querySelector('.stopwatch-btn');
const stopwatchContainer = document.querySelector('.stopwatch');
const stopwatchHoursValue = document.querySelector('.stopwatch .hours');
const stopwatchMinValue = document.querySelector('.stopwatch .minutes');
const stopwatchSecValue = document.querySelector('.stopwatch .seconds');
const startStopwatch = document.querySelector(
	'.stopwatch .controls .start-stopwatch'
);
const continuePauseResetStopwatch = document.querySelector(
	'.stopwatch .controls div'
);
const continuePauseStopwatch = document.querySelector(
	'.stopwatch .continue-pause-stopwatch'
);
const resetStopwatch = document.querySelector('.stopwatch .reset-stopwatch');

// ********** SHOW - HIDE **********
// Toggling the timer and stopwatch buttons
const activeTimerStopwatch = (e, disactive) => {
	let target = e.target;

	target.classList.add('active');
	disactive.classList.remove('active');
	span.classList.toggle('right');
	stopwatchContainer.classList.toggle('active');
	timerContainer.classList.toggle('active');
};

// Make the timer setter and the light off appear
const activeSetter = () => {
	setTimer.classList.add('active');
	lightOff.classList.add('active');
};
// Make the timer setter and the light off disappear
const closeSetter = () => {
	setTimer.classList.remove('active');
	lightOff.classList.remove('active');
};
// ********** SHOW - HIDE **********

// Set timer values
const submitValues = (e) => {
	let hours = parseInt(timerHoursSetter.value);
	let min = parseInt(timerMinSetter.value);
	let sec = parseInt(timerSecSetter.value);
	e.preventDefault();

	hours += parseInt(min / 60);
	min = parseInt((min % 60) + sec / 60);
	sec = parseInt(sec % 60);

	if (hours <= 99 && (min <= 99) & (sec <= 99)) {
		timerHoursValue.textContent = hours < 10 ? `0${hours}` : hours;
		timerMinValue.textContent = min < 10 ? `0${min}` : min;
		timerSecValue.textContent = sec < 10 ? `0${sec}` : sec;
		closeSetter();
		error.style.display = 'none';
	} else {
		error.style.display = 'block';
	}
};

let TimerCounting;
let countingInterval;
// Counting Down
const countDown = () => {
	let hours = parseInt(timerHoursValue.textContent);
	let min = parseInt(timerMinValue.textContent);
	let sec = parseInt(timerSecValue.textContent);
	countingInterval = setInterval(() => {
		if (sec > 0) {
			sec -= 1;
			timerSecValue.textContent = sec < 10 ? `0${sec}` : sec;
		} else {
			if (min > 0) {
				sec = 59;
				min -= 1;
				timerMinValue.textContent = min < 10 ? `0${min}` : min;
				timerSecValue.textContent = sec < 10 ? `0${sec}` : sec;
			} else {
				if (hours > 0) {
					min = 59;
					hours -= 1;
					timerHoursValue.textContent = hours < 10 ? `0${hours}` : hours;
					timerMinValue.textContent = min < 10 ? `0${min}` : min;
				} else {
					clearInterval();
				}
			}
		}
	}, 1000);
	if (hours != 0 || min != 0 || sec != 0) {
		TimerCounting = true;
		continuePauseResetTimer.style.display = 'block';
		startTimer.style.display = 'none';
	}
};

const timercontorl = () => {
	if (TimerCounting) {
		continuePauseTimer.textContent = 'Continue';
		clearInterval(countingInterval);
		TimerCounting = false;
	} else {
		continuePauseTimer.textContent = 'Pause';
		countDown();
		TimerCounting = true;
	}
};

let stopwatchinterval;
let StopwatchCounting;
const stopwatchStart = () => {
	let hours = parseInt(stopwatchHoursValue.textContent);
	let min = parseInt(stopwatchMinValue.textContent);
	let sec = parseInt(stopwatchSecValue.textContent);

	stopwatchinterval = setInterval(() => {
		if (sec < 59) {
			sec += 1;

			stopwatchSecValue.textContent = sec < 10 ? `0${sec}` : sec;
		} else {
			if (min < 59) {
				min += 1;
				sec = 0;
				stopwatchSecValue.textContent = sec < 10 ? `0${sec}` : sec;
				stopwatchMinValue.textContent = min < 10 ? `0${min}` : min;
			} else {
				hours += 1;
				min = 0;
				stopwatchHoursValue.textContent = hours < 10 ? `0${hours}` : hours;
				stopwatchMinValue.textContent = min < 10 ? `0${min}` : min;
			}
		}
	}, 1000);
	StopwatchCounting = true;
	continuePauseResetStopwatch.style.display = 'block';
	startStopwatch.style.display = 'none';
};

const stopwatchContorl = () => {
	if (StopwatchCounting) {
		continuePauseStopwatch.textContent = 'Continue';
		clearInterval(stopwatchinterval);
		StopwatchCounting = false;
	} else {
		continuePauseStopwatch.textContent = 'Pause';
		stopwatchStart();
		StopwatchCounting = true;
	}
};
const reset = (stop) => {
	if (stop === 'timer') {
		clearInterval(countingInterval);
		timerHoursValue.textContent = '00';
		timerMinValue.textContent = '00';
		timerSecValue.textContent = '00';
		continuePauseResetTimer.style.display = 'none';
		startTimer.style.display = 'block';
	} else {
		clearInterval(stopwatchinterval);
		stopwatchHoursValue.textContent = '00';
		stopwatchMinValue.textContent = '00';
		stopwatchSecValue.textContent = '00';
		continuePauseResetStopwatch.style.display = 'none';
		startStopwatch.style.display = 'block';
	}
};
// Add Event Listeners
timerBtn.addEventListener('click', (e) =>
	activeTimerStopwatch(e, stopwatchBtn)
);
stopwatchBtn.addEventListener('click', (e) =>
	activeTimerStopwatch(e, timerBtn)
);
setBtn.addEventListener('click', activeSetter);
closeBtn.addEventListener('click', closeSetter);
submit.addEventListener('click', submitValues);
startTimer.addEventListener('click', countDown);
continuePauseTimer.addEventListener('click', timercontorl);
resetTimer.addEventListener('click', () => reset('timer'));
startStopwatch.addEventListener('click', stopwatchStart);
continuePauseStopwatch.addEventListener('click', stopwatchContorl);
resetStopwatch.addEventListener('click', () => reset('stopwatch'));
