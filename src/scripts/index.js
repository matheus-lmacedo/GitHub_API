import { getUser } from "./services/user.js";
import { getRepos } from "./services/repositories.js";
import { getEvents } from "./services/events.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";


document.getElementById('btn-search').addEventListener('click', () => {
  const username = document.getElementById('input-search').value
  if (validateEmptyInput(username)) return
  getUserData(username);
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
  const username = e.target.value
  const key = e.which || e.keyCode
  const isEnterKeyPressed = key === 13

  if (isEnterKeyPressed) {
    if (validateEmptyInput(username)) return
    getUserData(username);
  }
});

function validateEmptyInput(username) {
  if (username === '') {
    alert('Preencha o campo com o nome de usuário do GitHub')
    return true
  }
}

async function getUserData(username) {
  const userResponse = await getUser(username)
  if (userResponse.message === 'Not Found') {
    screen.renderNotFound()
    return
  }
  const repositoriesResponse = await getRepos(username)
  const eventsResponse = await getEvents(username)

  user.setInfo(userResponse)
  user.setRepositories(repositoriesResponse)
  user.setEvents(eventsResponse)
  screen.renderUser(user)
};