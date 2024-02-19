function getConcertId() {
    let url = window.location.href;
    let concertId = url.split("=")[1];
    return concertId;
}

async function selectDate(data) {
    let date = data.date;
    let time = data.time;
    if (date) {
        document.getElementById(date).click();
        await sleep(200);
        if (time) {
            console.log("time", time);
            console.log(document.getElementsByTagName("li"));
            let lis = document.getElementsByTagName("li");
            for (let i = 0; i < lis.length; i++) {
                if (lis[i].innerText.includes(time)) {
                    lis[i].click();
                }
            }
        }
    }
    document.getElementById("btnSeatSelect").click();
}


function theFrame() {
    return window.frames[0].document;
}

async function findSeat() {
    console.log(document.getElementsByTagName("iframe"));
    let frame = theFrame();
    console.log(frame);
    console.log(frame.getElementById("divSeatArray"));
    let seatArray = frame.getElementById("divSeatArray").children;
    for (let i = 0; i < seatArray.length; i++) {
        let seat = seatArray[i];
        if (!seat.className.includes("s13")) {
            seat.click();
            await sleep(200);
            clickOnArea(frame.getElementsByClassName("booking")[0]);
            // execute code javascript:ChoiceEnd();
            
            return;
        }
    }
}

// function that create a click event 
function clickOnArea(area) {
    const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
}

async function searchSeat() {
    let concertId = getConcertId();
    let data = await get_stored_value(concertId);
    await sleep(500);
    selectDate(data);
    await sleep(1000);
    findSeat();
}

searchSeat();

console.log("Hello from the script");