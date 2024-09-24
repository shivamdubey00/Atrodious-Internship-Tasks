document.getElementById('fetchBtn').addEventListener('click', fetchGitHubUser);

async function fetchGitHubUser() {
  const username = document.getElementById('username').value;
  const status = document.getElementById('status');
  const userData = document.getElementById('userData');

  // Clear previous data and show loading state
  status.textContent = 'Loading...';
  status.className = 'loading';
  userData.innerHTML = ''; 

  try {
    // Make API request
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      // Handle errors based on the response status
      throw new Error(`User not found: ${response.status}`);
    }

    const data = await response.json();
    
    // Display user data
    displayUser(data);

    // Clear loading status
    status.textContent = '';
  } catch (error) {
    // Display error message
    status.textContent = error.message;
    status.className = 'error';
  }
}

function displayUser(user) {
  const userData = document.getElementById('userData');
  userData.innerHTML = `
    <img src="${user.avatar_url}" alt="${user.name}" width="100">
    <h2>${user.name}</h2>
    <p><strong>Username:</strong> ${user.login}</p>
    <p><strong>Public Repos:</strong> ${user.public_repos}</p>
    <p><strong>Followers:</strong> ${user.followers}</p>
    <p><strong>Following:</strong> ${user.following}</p>
    <a href="${user.html_url}" target="_blank">View GitHub Profile</a>
  `;
}
