let book
let comments = []

// Завантажуємо дані з файлу data.json
fetch('../data/data.json')
    .then(response => response.json()) // Розбираємо JSON відповідь
    .then(books => {
        // Отримуємо ідентифікатор книги з localStorage
        book = localStorage.getItem("id")
        
        // Знаходимо книгу за ідентифікатором
        for (let bb of books) {
            if (bb["id"] == +book) {
                book = bb
                break
            }
        }

        // Отримуємо шаблон Handlebars з HTML
        const temp = $('#aboutbook').html()
        const hb_temp = Handlebars.compile(temp)
        
        // Відображаємо інформацію про книгу в елементі з ідентифікатором book
        $("#book").html(hb_temp(book))

        // Відображаємо рейтинг у вигляді зірок
        const filledStars = '★'.repeat(book.mark)
        const unfilledStars = '☆'.repeat(10 - book.mark)
        document.getElementById('filled-stars').textContent = filledStars
        document.getElementById('unfilled-stars').textContent = unfilledStars
    })

const count = 3
let page = 0

function load_books() {
    // Завантажуємо дані книг
    fetch("../data/data.json")
        .then((res) => res.json())
        .then((data) => {
            let s = Math.floor(Math.random() * 5) * 3
            let n = s + 3
            data = data.slice(s, n)
            const temp = $('#similbook').html()
            const hb_temp = Handlebars.compile(temp)
            $("#similar-book").html(hb_temp(data))
        })
        .then((abc) => {
            // Додаємо обробники подій для кнопок завантаження та читання книги
            document.querySelector('.downbook').addEventListener("click", () => {
                const file = '../book/' + book["file"]
                const down = document.createElement("a")
                down.setAttribute('href', file)
                down.setAttribute('download', book['file'])
                down.style.display = "none"
                document.body.appendChild(down)
                down.click()
                document.body.removeChild(down)
            })
            document.querySelector('.readbook').addEventListener("click", () => {
                localStorage.setItem("filebook", book['file'])
                window.location.href = "read.html"
            }) 
            let books = document.querySelectorAll(".book")
            for (let bb of books) {
                bb.addEventListener("click", function () {
                    let id = this.querySelector(".id").innerHTML
                    localStorage.setItem("id", id)
                    window.location.href = "../html/aboutbook.html"
                })
            }
        })
}
load_books()

// Коментарі
document.addEventListener('DOMContentLoaded', () => {
    // Знаходимо елементи форми та шаблони
    const commentForm = document.getElementById('comment-form')
    const commentTextArea = document.getElementById('comment-text-area')
    const userCommentsLists = document.getElementById('user-comments-lists')
    const commentTemplateScript = document.getElementById('comment-template').innerHTML
    const commentTemplate = Handlebars.compile(commentTemplateScript)
    
    // Ініціалізуємо коментарі та отримуємо ідентифікатор поточної книги
    let comments = {}
    const currentBookId = getCurrentBookId()
    comments[currentBookId] = loadCommentsFromLocalStorage(currentBookId)

    // Відображаємо коментарі
    renderComments()

    // Додаємо обробник події для додавання коментаря
    commentForm.addEventListener('submit', addComment)

    // Функція для додавання нового коментаря
    function addComment(event) {
        event.preventDefault()

        const newComment = {
            name: 'Anonymous', // Ім'я користувача (анонімно)
            timeBack: new Date(), // Час додавання коментаря
            comment: commentTextArea.value, // Текст коментаря
            timeAgo: getTimeAgo(new Date()) // Відображення часу додавання у вигляді "скільки часу назад"
        }
        
        comments[currentBookId].unshift(newComment) // Додаємо новий коментар на початок списку
        commentTextArea.value = '' // Очищуємо текстову область

        saveCommentsToLocalStorage(currentBookId, comments[currentBookId]) // Зберігаємо коментарі у localStorage

        renderComments() // Оновлюємо відображення коментарів
    }

    // Функція для відображення коментарів
    function renderComments() {
        const html = commentTemplate(comments[currentBookId])
        userCommentsLists.innerHTML = html
    }

    // Функція для обчислення часу, що минув з моменту додавання коментаря
    function getTimeAgo(commentDate) {
        const currentDate = new Date()
        const diffInSeconds = Math.floor((currentDate - commentDate) / 1000)

        if (diffInSeconds < 60) {
            return 'Декілька секунд тому'
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60)
            return `${minutes} ${getNoun(minutes, ['хвилину', 'хвилини', 'хвилин'])} тому`
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600)
            return `${hours} ${getNoun(hours, ['годину', 'години', 'годин'])} тому`
        } else {
            const days = Math.floor(diffInSeconds / 86400)
            return `${days} ${getNoun(days, ['день', 'дні', 'днів'])} тому`
        }
    }

    // Функція для вибору правильної форми іменника в залежності від числа
    function getNoun(number, titles) {
        const cases = [2, 0, 1, 1, 1, 2]
        return titles[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : cases[number % 10 < 5 ? number % 10 : 5]
        ]
    }

    // Функція для збереження коментарів у localStorage
    function saveCommentsToLocalStorage(bookId, comments) {
        localStorage.setItem(`comments_${bookId}`, JSON.stringify(comments))
    }

    // Функція для завантаження коментарів з localStorage
    function loadCommentsFromLocalStorage(bookId) {
        const commentsString = localStorage.getItem(`comments_${bookId}`)
        if (commentsString) {
            const comments = JSON.parse(commentsString)
            comments.forEach(comment => {
                comment.timeBack = new Date(comment.timeBack) // Преобразуємо рядок назад в об'єкт Date
            })
            return comments
        } else {
            return []
        }
    }

    // Функція для отримання ідентифікатора поточної книги
    function getCurrentBookId() {
        book = localStorage.getItem("id")
        return book
    }

    // Якщо написав щось не те в книзі, можна видалити коментарі
    // function clearCommentsFromLocalStorage(bookId) {
    //     const key = `comments_${bookId}`
    //     localStorage.removeItem(key)
    // }
    
    // Оновлюємо час коментарів кожну хвилину
    setInterval(updateTimeAgo, 60000)

    // Функція для оновлення часу "скільки часу назад" для кожного коментаря
    function updateTimeAgo() {
        const currentDate = new Date()
        comments[currentBookId].forEach(comment => {
            comment.timeAgo = getTimeAgo(new Date(comment.timeBack))
        })
    
        renderComments() // Оновлюємо відображення коментарів
        saveCommentsToLocalStorage(currentBookId, comments[currentBookId]) // Зберігаємо оновлені коментарі у localStorage
    }
})