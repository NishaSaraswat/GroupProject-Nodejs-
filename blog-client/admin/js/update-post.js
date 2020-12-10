window.onload = function() {
    prefillPostData();
    updatePost();
}
   
    
    async function prefillPostData(){
        const urlParams=new URLSearchParams(window.location.search);
        const postId=urlParams.get('id');
        let postTagsChoices='';
        function getSelectedCheckboxValues(name) {
            const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
            let values = [];
            checkboxes.forEach((checkbox) => {
                values.push(checkbox.value);
            });
            return values;
        }
        
        try{
            const response=await fetch(`http://localhost:3000/posts/${postId}`);
            const data=await response.json();
            $('#title-input')[0].value=`${data.title}`; 
            $('#author-input')[0].value=`${data.author}`;
            $('#content-input')[0].innerText=`${data.content}`;
            postTagsChoices+=getSelectedCheckboxValues('tags')
        
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
                tags:    formData.get('tags')
            }
            console.log(object);
            try{

                await fetch(`http://localhost:3000/posts/${postId}`,{
                    method:'PATCH',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(object)
                })
               // window.location.replace('index.html')

            } catch (error){
                $('#error-message-box')[0].innerText=error;
            }

        })};
