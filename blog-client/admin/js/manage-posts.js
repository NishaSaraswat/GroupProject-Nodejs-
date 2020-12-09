
    deletePost();


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