import {get_stored_value, delete_value} from "../module/storage.js"

let loadAutoBooking = async () => {
    let autoBooking = await get_stored_value("autoBooking")
    if (!autoBooking || autoBooking.lenght < 1) {
        return document.getElementById("list-booking").appendChild(document.createTextNode("No auto booking"));
    }
    
}

loadAutoBooking();