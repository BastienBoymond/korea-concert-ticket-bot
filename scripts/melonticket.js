async function sleep(t) {
    return await new Promise(resolve => setTimeout(resolve, t));
  }

function theFrame() {
    if (window._theFrameInstance == null) {
      window._theFrameInstance = document.getElementById('oneStopFrame').contentWindow;
    }
  
    return window._theFrameInstance;
  }

async function searchSeat() {
    let frame = theFrame();
    await sleep(500);
    console.log(frame.document);
    let section = frame.document.getElementsByClassName("seat_name");
    console.log(section);
    for (let i = 0; i < section.length; i++) {
        console.log(section[i].parentElement);
            section[i].parentElement.click();
    }
    let area = frame.document.getElementsByClassName("area_tit");
    console.log(area);
    for (let i = 0; i < area.length; i++) {
        console.log(i, area[i]);
        if (area[i].innerHTML.includes("B")) {
            area[i].parentElement.click();
        }
    }
    let canvas = frame.document.getElementById("ez_canvas");
    let seat = canvas.getElementsByTagName("rect");
    console.log(seat);
    await sleep(500);
    for (let i = 0; i < seat.length; i++) {
        let fillColor = seat[i].getAttribute("fill");
    
        // Check if fill color is different from #DDDDDD or none
        if (fillColor !== "#DDDDDD" && fillColor !== "none") {
            console.log("Rect with different fill color found:", seat[i]);
            var clickEvent = new Event('click', { bubbles: true });
            seat[i].dispatchEvent(clickEvent);
            frame.document.getElementById("nextTicketSelection").click();
            return;
        }
    }
}

searchSeat();