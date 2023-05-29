let carentUserId =1
const getUsers = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (response.ok) {
        const users = await response.json()
        return users
        } else {
        throw new Error('Failed to fetch users')
        }
    }

const getInfoUsers = async (id) => {
            const userURL = `https://jsonplaceholder.typicode.com/users/${id}`;
            const postsURL = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

    const userData = {};
    const [userRespose, postRespose] = await Promise.all([fetch(userURL), fetch(postsURL)]); 
    if (userRespose.ok && postRespose.ok){
        const [user, post] = await Promise.all([userRespose.json(),postRespose.json()])
        userData.user = user
        userData.posts = post
    }
    const nameParagraph = document.querySelector('.name')
    const emailParagraph = document.querySelector('.email')
    nameParagraph.innerText = userData.user.name
    emailParagraph.innerText = userData.user.email

    const postContainer = document.querySelector('.posts')
    const postElements = userData.posts.map(el => {
        const container = document.createElement('div')
        container.classList.add('item')
        const namPosts = document.createElement('p')
        const textPosts =document.createElement('p')
        namPosts.innerText = el.title
        textPosts.innerText = el.body
        container.append(namPosts, textPosts)
        return container
    })
        postContainer.innerText = ''
        postContainer.append(... postElements)

    
} 

const pushForward = async()=>{
    const users = await getUsers()
    if(carentUserId < users.length)
    carentUserId ++
    getInfoUsers(carentUserId)
}
const pushBack = () =>{
    if(carentUserId>1){
    carentUserId --
    getInfoUsers(carentUserId)
}
}
const forward = document.querySelector('.button .forward')
forward.addEventListener('click', pushForward())
const back = document.querySelector('.button .back')
back.addEventListener('click', pushBack)


document.addEventListener('DOMContentLoaded', () => {
    getInfoUsers(carentUserId);
})