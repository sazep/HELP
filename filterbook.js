let filter_book
const count = 3
let page = 0
let all_books
let before = document.querySelector(".before1")
let next = document.querySelector(".next1")
function load_books() {
    filter_book = JSON.parse(localStorage.getItem("filterbook"))
    all_books = filter_book.length

    let s = page * count
    let n = s + 3
    let data = filter_book.slice(s, n)
    const temp = $('#onebook').html();
    const hb_temp = Handlebars.compile(temp);
    $("#allbooks").html(hb_temp(data));
    document.querySelector(".page1").innerHTML = page + 1

    let books = document.querySelectorAll(".onebook")
    for (let bb of books) {
        bb.addEventListener("click", function () {
            let id = this.querySelector(".id").innerHTML
            localStorage.setItem("id", id)
            window.location.href = "../html/aboutbook.html"
        })
    }

    if ((page + 1) * count >= all_books) {
        next.style.zIndex = -1
    }
}
load_books()
function goToNextPage() {
    if (next.style.zIndex == 0){
        if (page * count < all_books) {
            page = page + 1
            load_books()
            before.style.zIndex = 0
        }
    }
    if ((page + 1) * count >= all_books) {
        next.style.zIndex = -1
    }
}

function goToPreviousPage() {
    if (before.style.zIndex == 0) {
        if (page > 0) {
            page = page - 1
            load_books()
            next.style.zIndex = 0
        }
    }
    if (page <= 0) {
        before.style.zIndex = -1
    }
}

// добавил перемещение с помощу стрелочек и букв чтоб не tнаводится 
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