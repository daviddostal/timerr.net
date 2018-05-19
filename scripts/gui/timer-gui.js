'use strict';

var stopwatchElement = void 0;
var startButtonElement = void 0;
var resetButtonElement = void 0;
var formElement = void 0;

var hoursInput = void 0;
var minutesInput = void 0;
var secondsInput = void 0;

var timer = new Timer(1000, timerTick, 2 * 60 * 1000, timerCompleted);

document.addEventListener("DOMContentLoaded", function (event) {
    stopwatchElement = document.getElementById('timer-time');

    hoursInput = document.getElementById('hours-input');
    minutesInput = document.getElementById('minutes-input');
    secondsInput = document.getElementById('seconds-input');
    startButtonElement = document.getElementById('button-start');
    resetButtonElement = document.getElementById('button-reset');
    formElement = document.getElementById('timer-time');

    if (localStorage && localStorage.getItem('timer-start-time') === null) {
        saveTimerTime();
    }
    if (localStorage) {
        var _JSON$parse = JSON.parse(localStorage.getItem('timer-start-time')),
            h = _JSON$parse.h,
            m = _JSON$parse.m,
            s = _JSON$parse.s;

        timer.reset(toMilliseconds(h, m, s));
    }

    new NumberInput(hoursInput);
    new NumberInput(minutesInput);
    new NumberInput(secondsInput);

    startButtonElement.onclick = startClick;
    resetButtonElement.onclick = resetClick;

    updateUi(timer.getTime());
});

function timerTick(remaining) {
    //console.log(decomposeTime(remaining));
    updateUi(remaining);
}

function startClick() {
    switch (timer.getState()) {
        case TimerState.STOPPED:
            startTimer();
            break;
        case TimerState.PAUSED:
            timer.resume();
            startButtonElement.innerText = 'Pause';
            break;
        case TimerState.RUNNING:
            timer.pause();
            startButtonElement.innerText = 'Resume';
            break;
    }
}

function startTimer() {
    if (inputsValid()) {
        freezeInputs();
        var _ref = [parseInt(hoursInput.value), parseInt(minutesInput.value), parseInt(secondsInput.value)],
            h = _ref[0],
            m = _ref[1],
            s = _ref[2];

        saveTimerTime();
        timer.start(toMilliseconds(h, m, s));
        startButtonElement.innerText = 'Pause';
    }
}

function saveTimerTime() {
    if (localStorage) {
        var _ref2 = [parseInt(hoursInput.value), parseInt(minutesInput.value), parseInt(secondsInput.value)],
            h = _ref2[0],
            m = _ref2[1],
            s = _ref2[2];

        localStorage.setItem('timer-start-time', JSON.stringify({ h: h, m: m, s: s }));
    }
}

function resetClick() {
    timer.reset();
    updateUi(timer.getTime());
    startButtonElement.innerText = 'Start';
    unfreezeInputs();
}

function timerCompleted() {
    setTimeout(function () {
        alert('Time is up!');
        resetClick();
    }, 1); // Timeout needed to give time to the browser to re-render before the alert is shown.
}

function updateUi(millis) {
    //console.log(millis);
    millis = Math.round(millis / 1000) * 1000;

    var _decomposeTime = decomposeTime(millis),
        h = _decomposeTime.h,
        m = _decomposeTime.m,
        s = _decomposeTime.s,
        _ = _decomposeTime._;

    hoursInput.value = h.toString().padStart(2, '0');
    minutesInput.value = m.toString().padStart(2, '0');
    secondsInput.value = s.toString().padStart(2, '0');
}

function inputsValid() {
    var valid = hoursInput.validity.valid && minutesInput.validity.valid && secondsInput.validity.valid;
    if (!valid) {
        formElement.reportValidity();
    }
    return valid;
}

function freezeInputs() {
    hoursInput.setAttribute('readonly', '');
    minutesInput.setAttribute('readonly', '');
    secondsInput.setAttribute('readonly', '');
}

function unfreezeInputs() {
    hoursInput.removeAttribute('readonly');
    minutesInput.removeAttribute('readonly');
    secondsInput.removeAttribute('readonly');
}
//# sourceMappingURL=timer-gui.js.map
//# sourceMappingURL=timer-gui.js.map