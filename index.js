fetch("data/new.json")
    .then((res) => res.json())
    .then((data) => {
        const temp = $("#book").html()
        const htTemp = Handlebars.compile(temp)
        $("#new").html(htTemp(data))
    })

    .then((data) => {
        let books = document.querySelectorAll(".book")
        for (let bb of books) {
            bb.addEventListener("click", function () {
                let id = this.querySelector(".id").innerHTML
                localStorage.setItem("id", id)
                window.location.href = "html/aboutbook.html"

            })
        }
    })

fetch("data/popular.json")
    .then((res) => res.json())
    .then((data) => {
        const temp = $("#book").html()
        const htTemp = Handlebars.compile(temp)
        $("#popular").html(htTemp(data))
    })

    .then((data) => {
        let books = document.querySelectorAll(".book")
        for (let bb of books) {
            bb.addEventListener("click", function () {
                let id = this.querySelector(".id").innerHTML
                localStorage.setItem("id", id)
                window.location.href = "html/aboutbook.html"

            })
        }
    })