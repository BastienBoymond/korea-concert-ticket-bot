let seatSelect = [];

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

function reload() {
    let frame = theFrame();
    frame.getElementsByName("maphall")[0].children[0].click();
    findSeat();
}


function disableEndButton() {
    const frame = theFrame();
    frame.getElementsByClassName("btn")[0].children[1].children[0].removeAttribute("href");
}

function reactivateEndButton() {
    let href = "javascript:ChoiceEnd();"
    const frame = theFrame();
    frame.getElementsByClassName("btn")[0].children[1].children[0].setAttribute("href", href);
}

async function getSeat() {
    let frame = theFrame();
    let seatArray = frame.getElementById("divSeatArray").children;
    for (let i = 0; i < seatArray.length; i++) {
        let seat = seatArray[i];
        if (!seat.className.includes("s13")) {
            seat.click();
            await sleep(200);
            clickOnArea(frame.getElementsByClassName("booking")[0]);
            return true;
        }
    }
    return false;
}

async function findSeat() {
    disableEndButton();
    console.log(document.getElementsByTagName("iframe"));
    if (await getSeat()) {
        reactivateEndButton();
        return;
    }
    console.log("no seat");
    await sleep(1000);
    reload();
    return;    
}

async function searchSeat() {
    let concertId = getConcertId();
    let data = await get_stored_value(concertId);
    await sleep(1000);
    selectDate(data);
    await sleep(1000);
    findSeat();
}

searchSeat();
