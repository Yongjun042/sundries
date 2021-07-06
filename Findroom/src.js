function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function beep() {
    //오디오 설정해야됨
    var snd = new Audio("002_0202_message_JEC_cityofmist.mp3");
    snd.play();
}

async function button1_click() {
    var found = false;
    while (!found) {
        for (var j = 1; j < 6; j++) {
            var requestURL = "https://www.seoul-escape.com/reservation/change_date/?current_date=2021/06/2" + j;
            var request = new XMLHttpRequest();
            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();
            request.onload = function() {
                var list = request.response;
                var book = list.bookList;
                for (var i = 0; i < book.length; i++) {
                    //찾는 조건
                    if (book[i].booked === false && book[i].room === "유럽횡단 야간열차") {
                        beep();
                        alert("Found " + j);
                        found = true;
                    }
                }
            }
            await sleep(1000);
        }
        const date = new Date();
        let elem = document.getElementById('time');
        elem.textContent = date;
        await sleep(240000);
    }
}