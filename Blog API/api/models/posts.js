const PATH = './data.json'
const fs = require('fs');


class Post {

    get = () => {
        /* get posts */
        return this.readData();
    }

    getIndividualPost = (requestedPostId) => {
        /* get posts */
        const currentPosts = this.get();
        const individualPost = []
        for(let post of currentPosts) {
            if(post['id'] === requestedPostId) {
                individualPost.push(post);
            }
        } 
        return individualPost[0];
    }

    add = (newPost) => {
        /* add post */
        const currentPosts = this.readData();
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);
    }

    readData = () => {
        let rawData = fs.readFileSync(PATH);
        let posts = JSON.parse(rawData);
        return posts;
    }

    storeData = (rawData) => {
        let data = JSON.stringify(rawData);
        fs.writeFileSync(PATH, data);
    }
}

module.exports = Post;