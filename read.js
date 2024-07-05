let file = localStorage.getItem("filebook")
file = "../book/" + file
const count = 1700
let page = 0
let allbooks
// Завантажуємо текст книги
function load_text() {
    fetch(file)
        .then((res) => res.text())
        .then((data) => {
            allbooks = data.length
            let s = page * count
            let n = s + count
            data = data.slice(s, n)
            const temp = $('#textbook').html();
            const hb_temp = Handlebars.compile(temp);
            $("#read").html(hb_temp(data));
            document.querySelector('.page').innerHTML = page + 1
        })
}
load_text()
let before = document.querySelector(".before")
let next = document.querySelector(".next")
// Переходимо до наступної сторінки
function goToNextPage() {
    if (next.style.zIndex == 0) {
        if (page * count < allbooks) {
            page = page + 1
            load_text()
            before.style.zIndex = 0
        }
    }
    if ((page + 1) * count >= allbooks) {
        next.style.zIndex = -1
    }
}
// Повертаємося до попередньої сторінки
function goToPreviousPage() {
    if (before.style.zIndex == 0) {
        if (page > 0) {
            page = page - 1
            load_text()
            next.style.zIndex = 0
        }
    }
    if (page == 0) {
        before.style.zIndex = -1
    }
}
// Додаємо переміщення за допомогою стрілок та клавіш, щоб не наводитися
next.addEventListener("click", goToNextPage)
before.addEventListener("click", goToPreviousPage)

document.addEventListener("keydown", (event) => {
    if (event.code == "ArrowRight" || event.code == "KeyD") {
        goToNextPage()
    }
    if (event.code == "ArrowLeft" || event.code == "KeyA") {
        goToPreviousPage()
    }
})