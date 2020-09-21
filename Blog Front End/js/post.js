/**
 * TODO (Together): Create getPostIdParam to get the id of the post to use in the request later
 * TODO: Complete getPost function to get post data from API
 * TODO: Complete buildPost function to fill in the post data in the post.html file using ids
 */

const API_URL = "http://localhost:8000/api/posts/";
const API_BASE_URL = "http://localhost:8000/";

window.onload = () => {
    getPost();
}

const getPostIdParam = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

const getPost = () => {
    // CODE GOES HERE
    const postId = getPostIdParam();
    const post = `${API_URL}${postId}`

    fetch(post, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((postJsonData) => {
        buildPost(postJsonData);
    })
}

const buildPost = (postJsonData) => {
    const postDate = new Date(parseInt(postJsonData.added_date)).toDateString();

    document.getElementById('individual-post-title').innerText = `${postJsonData.title}`;
    document.getElementById('individual-post-date').innerText = `Published on ${postDate}`;
    document.getElementById('individual-post-content').innerText = `${postJsonData.content}`;
    document.querySelector('header').style.backgroundImage = `url(${API_BASE_URL}${postJsonData.post_image})`;
}

