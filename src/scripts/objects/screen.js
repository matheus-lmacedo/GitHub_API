const screen = {
  userProfile: document.querySelector('.profile-data'),
  renderUser(user) {
    this.userProfile.innerHTML =
      `<div class="info">
        <img src="${user.avatarUrl}" alt="Foto de perfil do usuário"/>
     <div class="data">
      <h1>${user.name ?? 'Não possui nome cadastrado😢'}</h1>
      <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
      <br>
      <p>🫂 Seguidores: ${user.followers} <br> 🫂 Seguindo: ${user.following}</p>
    </div>
   </div>`

   let repositoriesItems = ''
   user.repositories.forEach(repo => repositoriesItems +=
     `<li><a href="${repo.html_url}" target="_blank">${repo.name}
     <div class="repo-counters">
     <ul>
      <li>🍴 ${repo.forks_count}</li>
      <li>⭐ ${repo.stargazers_count}</li>
      <li>👀 ${repo.watchers_count}</li>
      <li>👨‍💻 ${repo.language ?? 'Não especificado'}</li>
     </ul>
   </div>
  </li>
  </a>`)


    if (user.repositories.length > 0) {
      this.userProfile.innerHTML +=
        `<div class="repositories section">
           <h2>Repositórios</h2>
           <ul>${repositoriesItems}</ul>
        </div>`
    }

    let eventsItems = ''

    user.events.forEach(event => {
      if (event.type === 'PushEvent') {
        eventsItems += `<li id="event">
                          <h3>${event.repo.name}</h3>
                          <p> - ${event.payload.commits[0].message}</p>
                          </li></br>`
      } else {
        eventsItems += `<li id="event">
                          <h3>${event.repo.name}</h3>
                          <p> - New ${event.payload.ref_type}</p>
                          </li></br>`
      }
    })

    if (user.events.length > 0) {
      this.userProfile.innerHTML += `<div class="events-section">
                                      <h2>Eventos</h2></br>
                                      <ul>${eventsItems}</ul>
                                     </div>`
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = '<h3>Usuário não encontrado</h3>'
  }
}

export { screen }