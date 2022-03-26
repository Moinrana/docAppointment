window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    alert('your browser is not supported indexedDB');
}

var db = window.indexedDB;


let request = window.indexedDB.open("idbdapp", 1);
request.onerror = () => function(event) {
    console.log("error " + event.target.result);
}

request.onsuccess = () => function(event) {
    db = request.result;
    console.log("success " + db);
}

request.onupgradeneeded = () => function(event) {
    var db = request.result;
    let objectStore = db.createObjectStore('idbapp');
}