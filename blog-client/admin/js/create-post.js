//Selectors
let form = document.getElementById("createPostForm");
let title = document.getElementById("title");
let author = document.getElementById("author");
let content = document.getElementById("content");

//Events
form.addEventListener("submit", createPost);
let postHTML = "";

//Functions
async function createPost(e) {
    e.preventDefault();

    let object = {

        title: title.value,
        author: author.value,
        content: content.value
        
    }
    console.log(JSON.stringify(object));
    try {
        await fetch("http://localhost:3000/posts", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(object)

        });
    } catch (error) {
        throw new Error(error);
    }

}