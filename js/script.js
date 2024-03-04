const loadPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;
    // console.log(posts);
    displayPost(posts);
}

const displayPost = (posts) =>{
    const postContainer = document.getElementById("allPost-section");
    postContainer.textContent = '';

    posts.forEach(post => {
        let posTitle = post.title;
        posTitle = posTitle.replaceAll("'", '');
        // console.log(posTitle);
        const viewCount = post.view_count;

        const postCard = document.createElement("div");
        postCard.classList = `post flex gap-4 mb-6 lg:gap-10 bg-[#797dfc1a] py-8 px-5 rounded-2xl`;
        
        postCard.innerHTML = `<div class="indicator">
            <span class="indicator-item badge ${post.isActive?'bg-[#10B981]':'bg-[#FF3434]'} border-none"></span>
            <div class="grid w-24 h-24 bg-base-300 place-items-center">
                <img class="rounded-2xl" src="${post.image}" alt="">
            </div>
        </div>
        <div class="post-details w-full">
            <div class="post-type flex gap-6 font-inter font-medium text-sm">
                <p>#${post.category}</p>
                <p>Author : ${post.author.name}</p>
            </div>
            <h1 class="font-bold text-xl py-3">${post.title}</h1>
            <p class="font-inter text-black-hue pb-5">${post.description}</p>
            <hr>
            <div class="post-popularity pt-5 flex justify-between items-center">
                <div class="popularity-count flex gap-3 lg:gap-6">
                    <div class="comment flex items-center gap-2 lg:gap-4">
                        <img src="images/msg.png" alt="">
                        <p class="font-inter text-black-hue">${post.comment_count}</p>
                    </div>
                    <div class="seen flex items-center gap-2 lg:gap-4">
                        <img src="images/eye.png" alt="">
                        <p class="font-inter text-black-hue">${post.view_count}</p>
                    </div>
                    <div class="time flex items-center gap-2 lg:gap-4">
                        <img src="images/time.png" alt="">
                        <p class="font-inter text-black-hue">${post.posted_time} min</p>
                    </div>
                </div>
                <button onclick="readPost('${posTitle}', ${viewCount})" class="btn btn-ghost"><img src="images/mail.png" alt=""></button>
            </div>
        </div>`;

        postContainer.appendChild(postCard);
    });

    showSpinner(false);
}

const readPost = (title, viewCount) =>{
    // console.log(description, viewCount);
    const readContainer = document.getElementById("read-post-content");
    const readCount = document.getElementById("read-count");

    const readPostCard = document.createElement("div");
    readPostCard.classList = `flex bg-white rounded-2xl px-4 py-3 my-4`;

    readPostCard.innerHTML = `<h3 class="font-semibold">${title}</h3>
    <div class="seen flex justify-between items-center mr-5">
        <img src="images/eye.png" alt="">
        <p class="font-inter text-black-hue">${viewCount}</p>
    </div>`;

    readContainer.appendChild(readPostCard);

    let readPostCount = readContainer.childElementCount;
    readCount.innerText = readPostCount;
}

const searchCategory = async () =>{    
    const inputField = document.getElementById("search-input");
    const inputVal = inputField.value;
    if(inputVal === ''){
        alert("Please Enter A Category");
    }
    else{
        showSpinner(true);
        // console.log(inputVal);
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputVal}`);
        const data = await res.json();
        const posts = data.posts;

        const postContainer = document.getElementById("allPost-section");
        postContainer.textContent = '';
        // console.log(posts);
        setTimeout(() => {
            displayPost(posts);
        }, 2000);        
    }    
}

const showSpinner = (isLoading) => {
    const loadSpinner = document.getElementById('spinner');
    if (isLoading) {
        loadSpinner.classList.remove('hidden')
    }
    else {
        loadSpinner.classList.add('hidden');
    }
}

const latestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const latestPosts = data;

    const latestContainer = document.getElementById("latest-container");
    latestContainer.textContent = '';

    latestPosts.forEach(latPost => {
        const postCard = document.createElement("div");
        postCard.classList = `card w-96 border-2 border-[#12132d26] p-4`;

        postCard.innerHTML = `<figure><img class="rounded-xl" src="${latPost.cover_image}" alt="" /></figure>
        <div class="card-body p-0">
            <div class="date-section flex gap-2 mt-4">
                <img src="images/calendar.png" alt="">
                <p class="text-[#12132d99]">${latPost.author.posted_date?latPost.author.posted_date:'Unknown'}</p>
            </div>
            
            <h2 class="card-title font-extrabold text-lg py-2">
                ${latPost.title}
            </h2>
          <p class="lat-post-para text-ellipsis overflow-hidden text-[#12132d99]">${latPost.description}</p>
          <div class="author-section flex gap-4 items-center my-2">
            <img class="w-12 h-12 rounded-full" src="${latPost.profile_image}" alt="">
            <div class="author-details">
                <h4 class="font-bold">${latPost.author.name}</h4>
                <p class="text-[#12132d99] text-sm">${latPost.author.designation?latPost.author.designation:'Unknown'}</p>
            </div>
          </div>
        </div>`;

        latestContainer.appendChild(postCard);
    });
}

loadPost();

latestPost();