

const API_URL = "http://localhost:8000/api/posts";
const API_BASE_URL = "http://localhost:8000/";

window.onload = () => {
    getPosts();
}

const getPosts = () => {
    fetch(API_URL, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildPosts(data);
    })
}

const buildPosts = (blogPosts) => {
    
    let blogPostsContent = '';
    for(blog of blogPosts) {
        const postDate = new Date(parseInt(blog.added_date)).toDateString();
        const postImage = `${API_BASE_URL}${blog.post_image}`;
        blogPostsContent += `
        <div class="post">
            <div class="post-image" style="background-image: url(${postImage});"></div>
            <div class="post-content">
                <div class="post-date">${postDate}</div>
                <div class="post-title">${blog.title}</div>
                <div class="post-text">${blog.content}</div> 
            </div>
        </div>
        `
    }
    
    document.querySelector('.blog-posts').innerHTML = blogPostsContent;
}