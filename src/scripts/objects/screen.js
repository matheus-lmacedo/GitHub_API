const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
        <img src="${user.avatarUrl}" alt="User's profile picture"/>
     <div class="data">
      <h1>${user.name ?? "No name registered 😢"}</h1>
      <p>${user.bio ?? "No BIO registered 😢"}</p>
      <br>
      <p>🫂 Followers: ${user.followers} <br> 🫂 Following: ${
      user.following
    }</p>
    </div>
   </div>`;

    let repositoriesItems = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItems += `<li><a href="${repo.html_url}" target="_blank">${
          repo.name
        }
     <div class="repo-counters">
     <ul>
      <li>🍴 ${repo.forks_count}</li>
      <li>⭐ ${repo.stargazers_count}</li>
      <li>👀 ${repo.watchers_count}</li>
      <li>👨‍💻 ${repo.language ?? "Not specified"}</li>
     </ul>
   </div>
  </li>
  </a>`),
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
           <h2>Repositories</h2>
           <ul>${repositoriesItems}</ul>
        </div>`;
    }

    let eventsItems = "";

    user.events.forEach((event) => {
      if (event.type === "PushEvent") {
        eventsItems += `<li id="event">
                          <h3>${event.repo.name}</h3>
                          <p> - ${event.payload.commits[0].message}</p>
                          </li></br>`;
      } else {
        eventsItems += `<li id="event">
                          <h3>${event.repo.name}</h3>
                          <p> - New ${event.payload.ref_type}</p>
                          </li></br>`;
      }
    });

    if (user.events.length > 0) {
      this.userProfile.innerHTML += `<div class="events-section">
                                      <h2>Events</h2></br>
                                      <ul>${eventsItems}</ul>
                                     </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>User Not Found</h3>";
  },
};

export { screen };
