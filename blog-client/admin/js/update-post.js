window.onload = function() {
    prefillPostData();
    updatePost();
}
   
    
    async function prefillPostData(){
        const urlParams=new URLSearchParams(window.location.search);
        const postId=urlParams.get('id');

        let postTitle=document.getElementById('title-input');
        let postAuthor=document.getElementById('author-input');
        let postContent=document.getElementById('content-input');
        let postTags='';

        try{
            const response=await fetch(`http://localhost:3000/posts/5fcfa52a46dbab087bdab405`);
            const data=await response.json();
            postTitle.value=`${data.title}`; 
            postAuthor.value=`${data.author}`;
            postContent.innerText=`${data.content}`;
            postTags.innerText=`${data.tags}`;
        } catch (error){
            document.getElementById('error-message-box').innerText=error;
        }
       

}


    
    async function updatePost(){
        let urlParams = new URLSearchParams(window.location.search);
        let form = document.getElementById('update-post-form');
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            let formData=new FormData(this);
            let object={
                title: formData.get('title'),
                author: formData.get('author'),
                content: formData.get('content')
            }
            try{

                await fetch(`http://localhost:3000/posts/5fcfa52a46dbab087bdab405`,{
                    method:'PATCH',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(object)
                })
                window.location.replace('index.html')

            } catch (error){
                document.getElementById('error-message-box').innerText=error;
            }

        })};