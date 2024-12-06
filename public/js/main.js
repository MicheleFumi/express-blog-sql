let listEl= document.querySelector('ul')

axios.get("http://127.0.0.1:3000/post")
.then(res=>{
    const posts = res.data.data
  console.log(posts);
  
  
    listElement= ''
    posts.forEach(post => {
        console.log(post);
        
        let {title, content, image, tags} = post
        const markup=`
            <li class="pb-2 text-center"><h2>${title}</h2></li>
            <li class="pb-2 text-center">${content}</li>
            <li class="pb-2 text-center"><img src="${image}" alt=""></li>
            <li class="pb-2 text-center">${tags}</li>
            
            `
        listElement+=markup
    });
    listEl.innerHTML= listElement
})

