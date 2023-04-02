const quotesURL = "http://localhost:3000/quotes?_embed=likes";
const likeURL = "http://localhost:3000/likes";

document.addEventListener("DOMContentLoaded",init)

function init () {
    fetch(quotesURL)
    .then(res=>res.json())
    .then(quotes => quotes.forEach((quote)=>renderQuote(quote)))
}

function renderQuote(quote) {
    let ul = document.querySelector("#quote-list")
    let li = document.createElement("li")
    li.innerHTML = `
     <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    `
    ul.appendChild(li)
    li.addEventListener("click", handleClick);
}

function handleClick(e) {
    if (e.target.matches(".btn-danger")) {
        const quoteId = e.target.dataset.id;
        fetch(`http://localhost:3000/quotes/${quoteId}`, {
           method : "DELETE",
        })
        .then(()=> e.target.parentElement.parentElement.remove())
    } else if (e.target.matches(".btn-success")) {
        const quoteId = e.target.dataset.id;
        const likeData = {
            quoteId : parseInt(quoteId),
        };
        fetch(likeURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(likeData),
        })
        .then((res) => res.json())
        .then((like) => {
          const likesSpan = e.target.querySelector("span");
          likesSpan.innerText = parseInt(likesSpan.innerText) + 1;
        })
    }
}