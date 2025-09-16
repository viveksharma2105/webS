let timeoutId;

function startTimer(remindCb) {
  console.log("Ticket #4172 received");
  timeoutId = setTimeout(remindCb, 5000);
}

function acknowledge() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
    console.log("Ticket #4172 acknowledged on time");
  }
}

function remind() {
  console.log("Reminder: Ticket #4172 awaiting acknowledgment");
}

//// No acknowledgment
startTimer(remind);

////Uncomment to test acknowledgment
// setTimeout(() => {
//   startTimer(remind);
//   setTimeout(acknowledge, 2000);
// }, 7000);












// 2) Fitness App: Activity Streak
function startStreak(onDone) {
    let ticks = 0;
    const intervalId = setInterval(() => {
        ticks++;
        console.log(`Keep going! t=${ticks}s`);
        if (ticks === 5) {
            clearInterval(intervalId);
            onDone(ticks);
        }
    }, 1000);
}
function onStreakComplete(totalSeconds) {
    console.log(`Streak complete: ${totalSeconds}s`);
}
setTimeout(() => startStreak(onStreakComplete), 13000);














// 3) Food Delivery Pipeline (nested timeouts)
function orderFlow(askForRating) {
    console.log("Order accepted");
    setTimeout(() => {
        console.log("Food is being prepared");
        setTimeout(() => {
            console.log("Out for delivery");
            setTimeout(() => {
                console.log("Delivered");
                askForRating();
            }, 2000);
        }, 3000);
    }, 2000);
}
function askForRating() {
    console.log("Please rate your order!");
}
setTimeout(() => orderFlow(askForRating), 20000);



















// 4) Live Auction Countdown (pause/resume)
function startAuction(onEnd) {
    let remaining = 10;
    let intervalId = null;
    function tick() {
        if (remaining >= 0) {
            console.log(`Auction ends in: ${remaining}`);
            if (remaining === 0) {
                clearInterval(intervalId);
                onEnd("Auction closed");
            }
            remaining--;
        }
    }
    intervalId = setInterval(tick, 1000);
    startAuction._intervalId = intervalId;
    startAuction._remaining = remaining;
    startAuction._paused = false;
}
function pause() {
    if (!startAuction._paused) {
        clearInterval(startAuction._intervalId);
        startAuction._paused = true;
        console.log("Auction paused");
    }
}
function resume(onEnd) {
    if (startAuction._paused) {
        let remaining = startAuction._remaining;
        let intervalId = setInterval(() => {
            if (remaining >= 0) {
                console.log(`Auction ends in: ${remaining}`);
                if (remaining === 0) {
                    clearInterval(intervalId);
                    onEnd("Auction closed");
                }
                startAuction._remaining = --remaining;
            }
        }, 1000);
        startAuction._intervalId = intervalId;
        startAuction._paused = false;
    }
}
function auctionEnd(msg) {
    console.log(msg);
}
setTimeout(() => {
    startAuction(auctionEnd);
    setTimeout(pause, 3000); // Pause after 3s
    setTimeout(() => resume(auctionEnd), 6000); //  Resume after another 3s
}, 25000);



















// 5) Quiz Buzzer Race
function quizBuzzer(onWinner, onNoWinner) {
    let finished = false;
    let timeoutId = setTimeout(() => {
        if (!finished) {
            console.log("Time up! No one answered");
            onNoWinner();
            finished = true;
        }
    }, 4000);
    return {
        press: function(player) {
            if (!finished) {
                clearTimeout(timeoutId);
                console.log(`Player ${player} wins!`);
                onWinner(player);
                finished = true;
            }
        }
    };
}
function winner(player) {
    console.log(`Winner callback: ${player}`);
}
function noWinner() {
    console.log("No winner callback");
}
// Run 1: Player A wins at 1.5s
setTimeout(() => {
    let game = quizBuzzer(winner, noWinner);
    setTimeout(() => game.press('A'), 1500);
}, 35000);
// Run 2: Player B wins at 3.0s
setTimeout(() => {
    let game = quizBuzzer(winner, noWinner);
    setTimeout(() => game.press('B'), 3000);
}, 40000);
// Run 3: No presses (timeout)
setTimeout(() => {
    quizBuzzer(winner, noWinner);
}, 45000);

// 6) Stock Ticker with Debounced UI
function stockTicker(onSummary) {
    let lastPrice = 100;
    let intervalId = null;
    let renderTimeout = null;
    let ticks = 0;
    function render() {
        console.log(`UI render: price=${lastPrice}`);
        renderTimeout = null;
    }
    intervalId = setInterval(() => {
        lastPrice += Math.floor(Math.random() * 10 - 5);
        console.log(`data: price=${lastPrice}`);
        if (renderTimeout) clearTimeout(renderTimeout);
        renderTimeout = setTimeout(render, 1000);
        ticks += 1;
        if (ticks === 17) { // ~5s (17*300ms ≈ 5100ms)
            clearInterval(intervalId);
            if (renderTimeout) {
                clearTimeout(renderTimeout);
                render();
            }
            onSummary(lastPrice);
        }
    }, 300);
}
function onSummary(price) {
    console.log(`Summary: last price=${price}`);
}
setTimeout(() => stockTicker(onSummary), 50000);
