import { client_id, API_KEY } from './config.js';

const userInfoWrapper = document.querySelector('.user__info-wrapper');
const userRepoWrapper = document.querySelector('.user__repo-wrapper');
const userReposWrapper = document.querySelector('.repos__wrapper');
const errorWrapper = document.querySelector('.error__wrapper');
const btn = document.querySelector('#search-btn');
const input = document.querySelector('input');

const getUser = async () => {
  const userInput = input.value;
  if (userInput.trim() === '') {
    errorWrapper.innerHTML = `
      <div class="bg-red-100 border border-red-400 text-red-700 px-8 py-3 rounded relative" role="alert">
        <strong class="font-bold px-2">Holy smokes!</strong>
        <span class="block sm:inline">Please Enter a valid Username</span>
      </div>
    `;
    setTimeout(() => errorWrapper.style.display = 'none', 2000);
  } else {
    const fetchUser = await fetch(`https://api.github.com/users/${userInput}?client_id=${client_id}&client_secret=${API_KEY}`);
    const data = await fetchUser.json();
    const fetchRepos = await fetch(`https://api.github.com/users/${userInput}/repos?per_page=3&sort=created:asc&client_id=${client_id}&client_secret=${API_KEY}`);
    const repos = await fetchRepos.json();
    input.value = '';
    return { data, repos };
  }
}

const showUser = e => {
  getUser()
    .then(res => {
      if (res.data.login === undefined) {
        errorWrapper.innerHTML = `
          <div class="bg-red-100 border border-red-400 text-red-700 w-10/12 mt-12 flex justify-center px-4 py-3 rounded" role="alert">
            <strong class="font-bold">Holy smokes!</strong>
            <span class="block sm:inline">That user doesn't exist</span>
          </div>
        `;
        setTimeout(() => errorWrapper.style.display = 'none', 2000);
      } else {
        userInfoWrapper.innerHTML = `
          <img class="rounded-full" id="profile-img" src="${res.data.avatar_url}" alt="Profile Image">
          <div class="user__info sm:ml-10">
            <h1 class="text-xl text-white" id="username">Username: ${res.data.login}</h1>
            <h1 class="text-xl text-white" id="followers">Followers: ${res.data.followers}</h1>
            <h1 class="text-xl text-white" id="following">Following: ${res.data.following}</h1>
            <h1 class="text-xl text-white" id="member-since">Member Since: ${new Date(res.data.created_at).toDateString()}</h1>
            <h1 class="text-xl text-white" id="location">Location: ${res.data.location}</h1>
          </div>
          `;
        userRepoWrapper.innerHTML = `
          <h1 class="text-2xl text-white text-center font-semibold mt-8 mb-0">Recent Repos</h1>
  
          <div class="repos__wrapper flex justify-evenly p-12">
            <div class="card bg-white max-w-sm rounded overflow-hidden shadow-lg py-2 px-20 sm:mb-4">
              <a href="${res.repos[0].html_url}" target="_blank"><h1 class="font-semibold text-xl text-center text-blue-500 m-0">${res.repos[0].name}</h1></a>
              <div class="flex justify-evenly text-gray-700 text-lg">
                <p class="mx-8 mt-6">Stars</p>
                <p class="mx-8 mt-6">Watchers</p>
                <p class="mx-8 mt-6">Forks</p>
              </div>
              <div class="flex justify-evenly text-gray-700 text-lg">
                <p class="mx-8 mt-6">${res.repos[0].stargazers_count}</p>
                <p class="mx-8 mt-6">${res.repos[0].watchers}</p>
                <p class="mx-8 mt-6">${res.repos[0].forks}</p>
              </div>
            </div>
            <br>
            <div class="card bg-white max-w-sm rounded overflow-hidden shadow-lg mx-8 py-2 px-20 sm:mb-4">
              <a href="${res.repos[1].html_url}" target="_blank"><h1 class="font-semibold text-xl text-center text-blue-500 m-0">${res.repos[1].name}</h1></a>
              <div class="flex justify-evenly text-gray-700 text-lg">
                <p class="mx-8 mt-6">Stars</p>
                <p class="mx-8 mt-6">Watchers</p>
                <p class="mx-8 mt-6">Forks</p>
              </div>
              <div class="flex justify-around text-gray-700 text-lg">
                <p class="mx-8 mt-6">${res.repos[1].stargazers_count}</p>
                <p class="mx-8 mt-6">${res.repos[1].watchers}</p>
                <p class="mx-8 mt-6">${res.repos[1].forks}</p>
              </div>
            </div>
            <br>
            <div class="card bg-white max-w-sm rounded overflow-hidden shadow-lg py-2 px-20 sm:mb-4">
              <a href="${res.repos[2].html_url}" target="_blank"><h1 class="font-semibold text-xl text-center text-blue-500 m-0">${res.repos[2].name}</h1></a>
              <div class="flex justify-evenly text-gray-700 text-lg">
                <p class="mx-8 mt-6">Stars</p>
                <p class="mx-8 mt-6">Watchers</p>
                <p class="mx-8 mt-6">Forks</p>
              </div>
              <div class="flex justify-around text-gray-700 text-lg">
                <p class="mx-8 mt-6">${res.repos[2].stargazers_count}</p>
                <p class="mx-8 mt-6">${res.repos[2].watchers}</p>
                <p class="mx-8 mt-6">${res.repos[2].forks}</p>
              </div>
            </div>
          </div>
        `;
      }
    })
    .catch(() => {
      console.log('The username entered is not valid');
      input.value = ''
    });
  e.preventDefault();
}

btn.addEventListener('click', showUser);