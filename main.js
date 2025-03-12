const postForm = document.querySelector("#postForm");
const titulo = document.querySelector("#titulo");
const conteudo = document.querySelector("#conteudo");
const postsContainer = document.querySelector("#output-lado");


function verificarPosts() {
    if (postsContainer.children.length === 0) {
        postsContainer.innerHTML = "<hr><p id='mensagem-nenhum-post'>Nenhum post para mostrar</p>";
    } else {
        const mensagem = document.querySelector("#mensagem-nenhum-post");
        if (mensagem) mensagem.remove();
    }
}

verificarPosts();

postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        title: titulo.value,
        body: conteudo.value,
        userId: 1
    };

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        const result = await response.json();

        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `<hr><h2>${result.title}</h2><p>${result.body}</p>`;

        postsContainer.prepend(postElement);


        titulo.value = "";
        conteudo.value = "";

     
        verificarPosts();
    } catch (error) {
        console.error("Erro ao postar:", error);
    }
});
