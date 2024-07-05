const count = 3
let page = 0
let allbooks
let save_book = []
document.addEventListener("DOMContentLoaded", function(){
let ids = JSON.parse(localStorage.getItem("save_books"))
fetch("../data/data.json")
    .then((res) => res.json())
    .then((data) => {
        for (let bb of data){
            for (let id of ids){
                if (bb.id === +id){
                    save_book.push(bb)
                }
            }
        }
        allbooks = save_book.length
        load_books()
    })
})

function load_books() {
    let s = page * count
    let n = s + 3
    let data = save_book.slice(s, n)
    const temp = $('#onebook').html();
    const hb_temp = Handlebars.compile(temp);
    $("#allbooks").html(hb_temp(data));
    document.querySelector(".page").innerHTML = page + 1 

    let books = document.querySelectorAll(".onebook")
    for (let bb of books) {
        bb.addEventListener("click", function () {
            let id = this.querySelector(".id").innerHTML
            localStorage.setItem("id", id)
            window.location.href = "../html/aboutbook.html"
        })
    }
    let minus = document.querySelectorAll(".icon-minus")
            for (let p of minus) {
                p.addEventListener("click", function(){
                    let ids_book = JSON.parse(localStorage.getItem("save_books"))
                    let id = this.parentNode.querySelector('.id').innerHTML
                    let i = ids_book.indexOf(id)
                    ids_book.splice(i,1)
                    alert(i)
                    if (ids_book.length === 0){
                        localStorage.removeItem("save_books")
                    }else{
                    localStorage.setItem('save_books', JSON.stringify(ids_book))
                    }
                    window.location.reload()
                })
            }
}

let before = document.querySelector(".before")
let next = document.querySelector(".next")

function goToNextPage() {
    if (next.style.zIndex == 0){
        if (page * count < allbooks) {
            page = page + 1
            load_books()
            before.style.zIndex = 0
        }
    }
    if ((page + 1) * count >= allbooks) {
        next.style.zIndex = -1
    }
}

function goToPreviousPage() {
    if (before.style.zIndex == 0){
        if (page > 0) {
            page = page - 1
            load_books()
            next.style.zIndex = 0
        }
    }
    if (page == 0) {
        before.style.zIndex = -1
    }
}

// добавил перемещение с помощу стрелочек и букв чтоб не наводится
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