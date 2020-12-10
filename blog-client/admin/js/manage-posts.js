

window.onload = function(){
    fetchPost();
}
//Selectors
let postHTML = "";
let posts = document.getElementById("table-posts");

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
            <p>${post.title} <br>
            <span class="date">${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}</span></p>
            </td>
            <td>
            <p>${post.author} <br>
            </td>
            <td>
            <p>${post.tags} <br>
            </td>
            <td>
            <a href = "update-post.html" class = "update-post-btn"> Update</a>
            <a href = "" class = "delete-post-btn" data-id="${post['_id']}"> Delete</a>
           </td>
            </tr>`
    }
    posts.innerHTML += postHTML;
    deletePost();
}

    


function deletePost() {
    // this code might change if the class names are different;
    let deleteBtns = document.getElementsByClassName('delete-post-btn');

    for (let deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', async function(e) {
            e.preventDefault()

            let postId = this.dataset.id
            console.log(postId);

            try {
                await fetch(`http://localhost:3000/posts/${postId}`, {
                    method: 'DELETE', 
                });

                this.parentNode.parentNode.remove();
            } catch (message) {
                throw new Error(message);
            }
        
        })
    }
}

