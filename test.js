
function makeController() {
    console.log("first");
}

function makeModel() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Make Model");
            resolve();
        }, 5000);
    });
}

function makeRoute() {
    console.log("make route");
}

async function automate() {

   await makeModel();
    makeController();
    makeRoute();
}

automate();