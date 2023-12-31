/* 
** Description: This module contains functions to interact with the chrome storage
** Author: Bastien Boymond
*/

/* 
** Description: Get a value from the chrome storage
** Parameters: [key] {string}: the key of the value to get
** Return: {Promise}: a promise that will be resolved with the value
*/ 
function get_stored_value(key) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(key, function(value) {
            resolve(value[key]);
        });
    });
}

/* 
** Description: Store a value in the chrome storage
** Parameters: [key] {string}: the key of the value to store
**             [value] {string}: the value to store
** Return: None
*/
function store_value(key, value)
{
    chrome.storage.sync.set({
        [key]: value,
    })
}

/* 
** Description: Delete a value from the chrome storage
** Parameters: [key] {string}: the key of the value to delete
** Return: None
*/
function delete_value(key)
{
    chrome.storage.sync.remove(key);
}