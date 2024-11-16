// Fetch and display the game schedule
fetch('/api/schedule')
  .then((response) => response.json())
  .then((data) => {
    const scheduleList = document.getElementById('schedule-list');
    data.forEach((game) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img src="${game.logo}" alt="${game.team}" style="width: 30px; vertical-align: middle;" />
        <strong>${game.date}</strong> - ${game.team} (${game.location}) - Result: ${game.result}
      `;
      scheduleList.appendChild(listItem);
    });
  })
  .catch((error) => console.error('Error fetching schedule:', error));

// Fetch and display the team roster
fetch('/api/roster')
  .then((response) => response.json())
  .then((data) => {
    const rosterList = document.getElementById('roster-list');
    data.forEach((player) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img src="imageslogos/${player.img_name}" alt="${player.name}" style="width: 30px; vertical-align: middle;" />
        <strong>${player.name} (#${player.number})</strong> - ${player.position}, ${player.location}
      `;
      rosterList.appendChild(listItem);
    });
  })
  .catch((error) => console.error('Error fetching roster:', error));
