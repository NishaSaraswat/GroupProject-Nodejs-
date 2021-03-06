//Selectors
let form = document.getElementById("createPostForm");
let title = document.getElementById("title");
let author = document.getElementById("author");
let content = document.getElementById("content");
let tags = document.getElementsByName("tags");
let submitTags = document.getElementById("submitTag");
let selectedItems = [];
//Events
form.addEventListener("submit", createPost);
let postHTML = "";

for (let tag of tags) {

    tag.addEventListener("click", function () {
       
        submitTags.addEventListener("click",function(){
            if (tag.checked){
                selectedItems.push(tag.value);
                console.log(selectedItems);
            }
        });
    });
}

//Functions
async function createPost(e) {
    e.preventDefault();

    let object = {

        title: title.value,
        author: author.value,
        content: content.value,
        tags: selectedItems
    }
    try {
        await fetch("http://localhost:3000/posts", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(object)

        });
        window.location.replace("./index.html");
    } catch (error) {
        throw new Error(error);
    }

}