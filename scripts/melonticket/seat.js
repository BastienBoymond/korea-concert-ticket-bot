async function sleep(t) {
    return await new Promise(resolve => setTimeout(resolve, t));
}

function theFrame() {
    if (window._theFrameInstance == null) {
      window._theFrameInstance = document.getElementById('oneStopFrame').contentWindow;
    }
  
    return window._theFrameInstance;
}

function getConcertId() {
    return document.getElementById("prodId").value;
}

function openEverySection() {
    let frame = theFrame();
    let section = frame.document.getElementsByClassName("seat_name");
    console.log(section);
    for (let i = 0; i < section.length; i++) {
        section[i].parentElement.click();
    }
}

function clickOnArea(area) {
    let frame = theFrame();
    let section = frame.document.getElementsByClassName("area_tit");
    for (let i = 0; i < section.length; i++) {
        let reg = new RegExp(area + "\$","g");
        if (section[i].innerHTML.match(reg)) {
            section[i].parentElement.click();
            return;
        }
    }
}

async function findSeat() {
    let frame = theFrame();
    let canvas = frame.document.getElementById("ez_canvas");
    let seat = canvas.getElementsByTagName("rect");
    console.log(seat);
    await sleep(750);
    for (let i = 0; i < seat.length; i++) {
        let fillColor = seat[i].getAttribute("fill");
    
        // Check if fill color is different from #DDDDDD or none
        if (fillColor !== "#DDDDDD" && fillColor !== "none") {
            console.log("Rect with different fill color found:", seat[i]);
            var clickEvent = new Event('click', { bubbles: true });

            seat[i].dispatchEvent(clickEvent);
            frame.document.getElementById("nextTicketSelection").click();
            return true;
        }
    }
    return false;
}

async function checkCaptchaFinish() {
    if (document.getElementById("certification").style.display != "none") {
        await sleep(1000);
        checkCaptchaFinish();
        return;
    }
    let frame = theFrame();
    await sleep(500);
    frame.document.getElementById("nextTicketSelection").click();
    return;
}

async function reload() {
    let frame = theFrame();
    frame.document.getElementById("btnReloadSchedule").click();
    await sleep(750);
}

async function searchSeat(data) {
    for (sec of data.section) {
        openEverySection();
        clickOnArea(sec);
        if (await findSeat()) {
            checkCaptchaFinish();
            return;
        }
    }
    reload();
    await searchSeat(data);
}

async function waitFirstLoad() {
    let concertId = getConcertId();
    let data = await get_stored_value(concertId);
    await sleep(1000);
    searchSeat(data);
}


waitFirstLoad();