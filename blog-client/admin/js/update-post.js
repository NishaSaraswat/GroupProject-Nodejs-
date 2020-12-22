window.onload = function() {
    prefillPostData();
    updatePost();
}
let tags = $(".tags");
let checkedBoxesValues = [];

for (const tag of tags) {

    tag.addEventListener("click", function () {

        if (tag.checked===true){
            checkedBoxesValues.push(tag.value);
        }
    });
}
    
    async function prefillPostData(){
        const urlParams=new URLSearchParams(window.location.search);
        const postId=urlParams.get('id');
        
        try{
            const response=await fetch(`http://localhost:3000/posts/${postId}`);
            const data=await response.json();
            console.log(data);
            const dataTags=data.tags;

            console.log(dataTags);
            
            $('#title-input')[0].value=`${data.title}`; 
            $('#author-input')[0].value=`${data.author}`;
            $('#content-input')[0].innerText=`${data.content}`;
            for(const tag of tags){
                console.log(tag.value)
                if(dataTags.includes(tag.value)){
                        tag.checked=true;
                }
            }
        
        } catch (error){
            $('#error-message-box')[0].innerText=error;
        }
}

    async function updatePost(){
        const urlParams = new URLSearchParams(window.location.search);
        const postId=urlParams.get('id');
        let form = document.getElementById('update-post-form');
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            let formData=new FormData(this);
            let object={
                title: formData.get('title'),
                author: formData.get('author'),
                content: formData.get('content'),
                tags:    checkedBoxesValues.join(', ')
            }
            try{

                await fetch(`http://localhost:3000/posts/${postId}`,{
                    method:'PATCH',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(object)
                })
               window.location.replace('index.html')

            } catch (error){
                $('#error-message-box')[0].innerText=error;
            }

        })};
