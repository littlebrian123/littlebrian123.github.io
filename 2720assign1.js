/* XIAOQIANG,BRIAN 1155143253 */
let hiddentext = document.getElementsByClassName("hiddentext");
let showtext = document.getElementsByClassName("fw-bolder text-center showtext goodfont");
let homeimg = document.getElementsByClassName("rounded-circle mx-auto d-block homeimg");
let needfadein = document.getElementsByClassName("col-4 needfadein");
const listcolor = [
        "list-group-item list-group-item-primary",
        "list-group-item list-group-item-secondary",
        "list-group-item list-group-item-success",
        "list-group-item list-group-item-danger",
        "list-group-item list-group-item-warning",
        "list-group-item list-group-item-info",
        "list-group-item list-group-item-dark"
];
let hobbies = [];
let goodtitle = document.getElementsByClassName("col-5 goodfont")[0];
let goodcontent = document.getElementsByClassName("col-7 goodfont")[0];
let align = ["text-start", "text-center", "text-end"]
let bar = document.getElementsByClassName("progress-bar progress-bar-striped progress-bar-animated")[0];

function addelement() {
        let position = document.getElementsByClassName("list-group")[0];
        let newelement = prompt("My new hobby is ");
        if (newelement !== null && newelement !== "") {
                hobbies.push(newelement);
        }
        position.innerHTML = "";
        for (let i = 0; i < hobbies.length; i++) {
                lucky = Math.floor(Math.random() * listcolor.length);
                let newcontent = '<li class="' + listcolor[lucky] + '">' + hobbies[i] + "</li>";
                position.innerHTML = position.innerHTML + newcontent;
                fadein(position, 100);
        }
}


function aligncontrol() {
        goodtitle.firstChild.nextSibling.className = align[0];
        goodcontent.firstChild.nextSibling.className = align[0];
        align.push(align.shift());
}


function scrollcontrol() {
        if (document.getElementsByClassName("progress")[0].style.display === "none") {
                document.getElementsByClassName("progress")[0].style.display = "";
        }
        else {
                document.getElementsByClassName("progress")[0].style.display = "none";
        }

}

function processform() {
        const re = /^\w+@\w+.com$/;
        let falsetime = 0;
        if (re.test(document.querySelector('#new-email').value) === true) {
                document.querySelector('#new-email').classList.remove("is-invalid");
        }
        else {
                document.querySelector('#new-email').classList.add("is-invalid");
                console.log(document.querySelector('#new-email').value);
                falsetime++;
        }
        if (document.querySelector('#new-comment').checkValidity() === true) {
                document.querySelector('#new-comment').classList.remove("is-invalid");
        }
        else {
                document.querySelector('#new-comment').classList.add("is-invalid");
                falsetime++;
        }
        if (falsetime === 0) {
                let newComment = document.createElement("div");
                let element = '<div><svg height="100" width = "100" > <circle cx="50" cy="50" r = "40" ></svg ></div > <div><h3></h3><p></p></div>';
                newComment.innerHTML = element;
                newComment.className = "d-flex";
                newComment.querySelectorAll("div")[0].className
                        = "flex-shrink-0"; // 1st div
                newComment.querySelectorAll("div")[1].className
                        = "flex-grow-1"; // 2nd div
                let lastComment = document.querySelector("#comments").lastElementChild; // instead of lastChild for div element
                newComment.id = 'c' + (Number(lastComment.id.substr(1)) + 1)
                newComment.querySelector("h3").innerHTML = document.querySelector("#new-email").value;
                newComment.querySelector("p").innerHTML = document.querySelector("#new-comment").value;
                let color = document.querySelector('.form-check-input:checked').value;
                // look for checked radio buttons
                newComment.querySelector("circle").setAttribute("fill", color);
                document.querySelector("#comments").appendChild(newComment);
                document.querySelector("form").reset();
                result = document.querySelector('#comments').outerHTML;
                fetch('./file.txt', {
                        method: 'PUT',
                        headers: {
                                'Content-Type': 'text'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: result
                });
        }
}

function magic(element) {
        console.log(element.style);
        if (element.style.display === "none") {
                fadein(element, 200);
        }
        else {
                fadeout(element, 200)
        }
}

function fontsizing(element, trigger) {
        /* let height = document.documentElement.clientHeight; */
        let height = document.getElementsByClassName("rounded")[0].clientWidth;
        element.style.fontSize = Math.trunc(height / trigger) + "px";
}

function fadein(element, fadespeed) {
        let index = 0;
        element.style.display = "";
        let timer = setInterval(function () {
                index++;
                element.style.opacity = index / 10;
                if (index >= 10) {
                        clearInterval(timer);
                }
        }, fadespeed)
}

function fadeout(element, fadespeed) {
        let index = 10;
        let speed = fadespeed;
        let trigger = 2;
        let timer = setInterval(function () {
                index--;
                element.style.opacity = index / 10;
                /* fontsizing(element, trigger); */
                trigger++;
                if (index <= 0) {
                        clearInterval(timer);
                        element.style.display = "none";
                }

        }, speed)

}

function fontresizing(element, initialsize, fadespeed) {
        return new Promise(
                (resolve, reject) => {
                        setTimeout(function () {
                                fontsizing(element, initialsize);
                                console.log("initialsize" + initialsize);
                                resolve(initialsize);
                        }, fadespeed);

                }
        )
}





function homepage() {
        fontsizing(showtext[0], 11);
        fontsizing(showtext[1], 11);
        goodtitle.style.fontFamily = "serif";
        goodcontent.style.fontFamily = "serif";
        fontsizing(goodtitle, 30);
        fontsizing(goodcontent, 40);
        fontsizing(comments, 35);
        fetch('./file.txt').then(res => res.text()).then(result => {
                document.querySelector('#comments').innerHTML = result;
        });
        for (let i = 0; i < 2; i++) {
                let j = 1;
                /*                 console.log(j);
                                console.log(hiddentext[i].innerHTML);
                                console.log(showtext[i].innerHTML); */
                starttype(i, j);
        }
}

function typing(i, j) {
        return new Promise(
                (resolve, reject) => {
                        setTimeout(() => {
                                showtext[i].innerHTML = hiddentext[i].innerHTML.substring(0, j);
                                console.log(j);
                                /*                                 if (hiddentext[i].innerHTML === showtext[i].innerHTML) {
                                                                        if (i === 1) {
                                                                                finishtyping();
                                                                                return;
                                                                        }
                                                                }
                                                                j++;*/
                                resolve();
                                reject();
                        }, 200);
                }
        )
}

async function starttype(i, j) {
        while (hiddentext[i].innerHTML !== showtext[i].innerHTML) {
                await typing(i, j);
                j++;
        }

        if (i == 1) {
                showtext[0].style.animation = "none";
                showtext[1].style.animation = "none";
                homeimg[0].style.animation = "none";
                setTimeout(async () => {
                        resizeinput(showtext[0], 11, 18, 10);
                        resizeinput(showtext[1], 11, 18, 10);
                        imgresizing(homeimg[0], 10);
                        fadein(needfadein[0], 200);
                        fadein(needfadein[1], 200);
                        resizeinput(needfadein[1], 20, 25, 10);

                }, 2000);
                console.log();
        }
}


async function resizeinput(element, initialsize, finalsize, fadespeed) {
        while (initialsize <= finalsize) {
                await fontresizing(element, initialsize, fadespeed);
                initialsize = initialsize + 0.1;
        }
}


function switchmode() {
        document.querySelector('#body').classList.toggle("mode");
        document.querySelector('.homeimg').classList.toggle("mode");
}



/* async function finishtyping() {
        showtext[0].style.animation = "none";
        showtext[1].style.animation = "none";
        homeimg[0].style.animation = "none";
         let reverse = Math.trunc((j * 300 % 4000) * 360 * -1);
        homeimg[0].style.transform = "rotate(" + reverse + "deg)";
let result = 1;
while (result !== 0) {
        result = await fontresizing(showtext[0], 10, 14, 50);
}
result = 1;
while (result !== 0) {
        result = await fontresizing(showtext[1], 10, 14, 50);
}
imgresizing(homeimg[0], 70);
fadein(needfadein[0], 200);
fadein(needfadein[1], 200);
result = 1;
while (result !== 0) {
        result = await fontresizing(needfadein[1], 20, 25, 50);
}
} */


function imgresizing(element, fadespeed) {
        let speed = fadespeed;
        let trigger = 1;
        let Width = 20;
        let timer = setInterval(function () {
                element.style.width = Width * trigger * 1.5 + "%";
                trigger = trigger + 0.05;
                if (trigger > 2) {
                        clearInterval(timer);
                }
        }, speed)
}

window.onload = homepage();
document.addEventListener('scroll', function () {
        let scrollPos = window.scrollY;
        let progressheight = document.getElementsByClassName("rounded")[0].clientHeight - window.innerHeight;
        if (progressheight > 10) {
                let progressstatus = scrollPos / progressheight;
                bar.ariaValueNow = progressstatus * 100;
                bar.style.width = progressstatus * 100 + "%";
        }
});
document.getElementById("magic").onclick = function () { magic(document.getElementById("comments")); }

/* window.addEventListener('resize', function () {
        resizeinput(showtext[0], 11, 18, 10);
        resizeinput(showtext[1], 11, 18, 10);
        imgresizing(homeimg[0], 10);
        resizeinput(needfadein[1], 20, 25, 10);
}); */



