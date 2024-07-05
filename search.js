let input = document.getElementById('search')

let filter_book

$("#search").on("keyup", function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        let txt = input.value.trim().toLowerCase()
        fetch("https://sazep.github.io/Loogik-Library/data/data.json")
            .then((res) => res.json())
            .then((data) => {
                filter_book = []
                let regex = new RegExp(txt, "i") // ТиПа ВОТак оНо Все Равно СчиТаЕт 
                for (let bb of data) {
                    if (regex.test(bb["name"].toLowerCase()) || regex.test(bb["author"].toLowerCase()) || regex.test(bb["genre"].toLowerCase())) {
                        filter_book.push(bb)
                    }
                }
                localStorage.setItem("filterbook", JSON.stringify(filter_book))
                window.location.href = "https://sazep.github.io/HELP/html/filter_book.html"
            })
    }
})
