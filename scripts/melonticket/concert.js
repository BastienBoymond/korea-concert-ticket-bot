function getConcertId() {
    return document.getElementById("prodIdNum").value;
}

function select_day(day) {
    let daysAvaible = document.getElementById("list_date");
    let num = daysAvaible.childElementCount;
    if (num <= 1) return;

    for (let i = 0; i < num; i++) {
        let dayElement = daysAvaible.children[i];
        if (dayElement.getAttribute("data-perfday") == day) {
            dayElement.children[0].click();
            return;
        }
    }
    return;
}

function select_time(time) {
    let timesAvaible = document.getElementById("list_time");
    let num = timesAvaible.childElementCount;
    if (num <= 1) return;

    for (let i = 0; i < num; i++) {
        let timeElement = timesAvaible.children[i];
        if (timeElement.children[0].children[0].innerHTML.includes(time)) {
            timeElement.children[0].click();
            return;
        }
    }
    return;
}

async function isPlaceOpen() {
    let selector = document.getElementsByClassName("box_ticketing_process")[0];
    
    if (selector.style.display == "none") {
        return false;
    }
    return true;
}

async function searchConcert() {
    let concertId = getConcertId();
    let data = await get_stored_value(concertId);

    if (!data) {
        return;
    }
    if (!await isPlaceOpen()) {
        console.log("not open");
        await sleep(200);
        searchConcert();
        return;
    }
    await sleep(500);
    select_day(data.date.replaceAll("-", ""));
    await sleep(500);
    select_time(formatTime(data.time));
    await sleep(500);

    await sleep(5000);
    
    document.getElementsByClassName("reservationBtn")[0].click();


    console.log("clicked reservation");
}

function simulateMouseEvent(element, eventType) {
    const event = new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        isTrusted: true,
    });

    element.dispatchEvent(event);
}

searchConcert();