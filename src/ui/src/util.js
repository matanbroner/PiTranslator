// utilties for the UI

import {
    v4 as uuidv4
} from "uuid";
import * as fs from "browserify-fs";

// Read or create a .uuid file if it doesn't exist
// This stores a unique ID for the device
// This is used to identify the device when it connects to the server
async function thisId() {
    return new Promise((resolve, reject) => {
        // see if the file exists
        fs.exists(".uuid", (exists) => {
            if (exists) {
                // read the file
                fs.readFile(".uuid", "utf8", (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            } else {
                const id = uuidv4();
                // create the file
                fs.writeFile(".uuid", id, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(id);
                    }
                });
            }
        });
    });
}

function randomString(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function storeObjectLocalStorage(obj) {
    Object.entries(obj).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });
}

// shallow compare two objects
function shallowCompare(obj1, obj2) {
    return Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
}

// shallow clone an object
function shallowClone(obj) {
    return Object.assign({}, obj);
}

// export all the functions
export {
    thisId,
    randomString,
    storeObjectLocalStorage,
    shallowCompare,
    shallowClone
};