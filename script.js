const imagesList = document.querySelector('.images')
const allCatPageLink = document.querySelector('#allCats')
const favCatPageLink = document.querySelector('#favCats')


const getData = async () => {
    const resp = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    const data = await resp.json()
    data.map((i) => {
        imagesList.insertAdjacentHTML("beforeend", `
<li class="image" data-id="${i.id}">
<img class="img" src="${i.url}" alt="cat"> 
<span class="heart" onClick = "localStorage.setItem(this.parentNode.dataset.id, this.parentNode.children[0].src); this.classList.toggle('clicked-heart')"></span>
</li>
`)
    })
}
getData()
getData()
getData()





function checkPosition() {
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 4;
    const position = scrolled + screenHeight;
    if (position >= threshold) {
        getData();
    }
}

function throttle(callee, timeout) {
    let timer = null;

    return function perform(...args) {
        if (timer) return;

        timer = setTimeout(() => {
            callee(...args);

            clearTimeout(timer);
            timer = null;
        }, timeout);
    };
}

(() => {
    window.addEventListener("scroll", throttle(checkPosition, 250));
    window.addEventListener("resize", throttle(checkPosition, 250));
})();