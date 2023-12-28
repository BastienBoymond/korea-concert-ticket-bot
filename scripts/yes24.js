let url = "http://ticket.yes24.com/Pages/English/";

let params = {};
let queryString = location.href.split('?')[1];

if (queryString) {
  params = queryString.split('&').reduce((prev, curr) => {
    let [key, value] = curr.split('=');
    prev[key] = value;
    return prev;
  }, {});
}

let getPopupInfo = async () => {
    let data = await get_stored_value(params.IdPerf);
    return data;
}


let selectDate = (data) => {
    let date = data.date;
    let time = data.time;
    if (date) {
        document.getElementById(date).click();
        if (time) {
            document.getElementsByTagName("li").foreach((li) => {
                if (li.innerText.includes(time)) {
                    li.click();
                }
            });
        }
    }
}


if (params.IdPerf && location.href.includes("FnPerfSaleProcess")) {
    let data = getPopupInfo();
    selectDate(data);
}

console.log(url, params);