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

async function searchConcert() {
    let concertId = getConcertId();
    let data = await get_stored_value(concertId);

    if (!data) {
        return;
    }
    await sleep(100);
    select_day(data.date.replaceAll("-", ""));
    await sleep(100);
    select_time(formatTime(data.time));
    await sleep(100);
    document.getElementsByClassName("reservationBtn")[0].click();
}

searchConcert();