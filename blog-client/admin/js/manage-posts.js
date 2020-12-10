
window.onload = function(){
    fetchPost();
}
//Selectors
let postHTML = "";
let posts = document.getElementById("post-table");

async function fetchPost() {


    let response = await fetch(`http://localhost:3000/posts`);
    let data = await response.json();
    //console.log(data);
    for (let post of data) {
        console.log(post);
        let postDate = new Date(post.date);

        postHTML += `
            <tr>
            <td>
            <p>${post.content} <br>
            <span class="date">${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}</span></p>
            </td>
            </tr>
            <tr>
            <td>
            <a href = "#"> Update</a>
            <a href = "#"> Delete</a>
           </td>
            </tr>`
    }
    posts.innerHTML += postHTML;
}
