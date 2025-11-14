document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configuration ---
    // IMPORTANT: Replace this with your Render backend URL after deployment
    const BACKEND_URL = 'http://localhost:3001'; 

    // --- Custom Cursor & Sidebar (same as before) ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => { /* ... cursor logic ... */ });
    const sidebar = document.getElementById('sidebar');
    let sidebarTimer;
    document.addEventListener('mousemove', (e) => { /* ... sidebar logic ... */ });

    // --- Instagram Tool Logic ---
    const instaUsernameInput = document.getElementById('insta-username');
    const instaSearchBtn = document.getElementById('insta-search-btn');
    const instaResultsDiv = document.getElementById('insta-results');

    instaSearchBtn.addEventListener('click', () => {
        const username = instaUsernameInput.value.trim();
        if (!username) {
            alert('Please enter a username.');
            return;
        }
        fetchInstagramData(username);
    });

    async function fetchInstagramData(username) {
        try {
            const response = await fetch(`${BACKEND_URL}/api/instagram?username=${username}`);
            const result = await response.json();

            if (result.success) {
                displayInstagramResults(result.data);
            } else {
                instaResultsDiv.innerHTML = `<strong style="color: red;">Error:</strong> ${result.error}`;
                instaResultsDiv.classList.add('show');
            }
        } catch (error) {
            instaResultsDiv.innerHTML = `<strong style="color: red;">Network Error:</strong> Could not connect to the backend.`;
            instaResultsDiv.classList.add('show');
        }
    }

    function displayInstagramResults(data) {
        instaResultsDiv.innerHTML = `
            <img src="${data.profilePic}" alt="Profile Picture" class="profile-pic">
            <p><strong>Username:</strong> ${data.username}</p>
            <p><strong>Full Name:</strong> ${data.fullName}</p>
            <p><strong>Bio:</strong> ${data.bio || 'N/A'}</p>
            <p><strong>Followers:</strong> ${data.followers.toLocaleString()}</p>
            <p><strong>Following:</strong> ${data.following.toLocaleString()}</p>
            <p><strong>Private:</strong> ${data.isPrivate ? 'Yes' : 'No'}</p>
            <p><strong>Verified:</strong> ${data.isVerified ? 'Yes' : 'No'}</p>
        `;
        instaResultsDiv.classList.add('show');
    }

    // --- Phone Number Tool Logic ---
    const phoneNumberInput = document.getElementById('phone-number');
    const phoneSearchBtn = document.getElementById('phone-search-btn');
    const phoneResultsDiv = document.getElementById('phone-results');

    phoneSearchBtn.addEventListener('click', () => {
        const number = phoneNumberInput.value.trim();
        if (!number) {
            alert('Please enter a phone number.');
            return;
        }
        fetchPhoneData(number);
    });

    async function fetchPhoneData(number) {
        try {
            const response = await fetch(`${BACKEND_URL}/api/phone?number=${number}`);
            const result = await response.json();

            if (result.success) {
                displayPhoneResults(result.data);
            } else {
                phoneResultsDiv.innerHTML = `<strong style="color: red;">Error:</strong> ${result.error}`;
                phoneResultsDiv.classList.add('show');
            }
        } catch (error) {
            phoneResultsDiv.innerHTML = `<strong style="color: red;">Network Error:</strong> Could not connect to the backend.`;
            phoneResultsDiv.classList.add('show');
        }
    }

    function displayPhoneResults(data) {
        phoneResultsDiv.innerHTML = `
            <p><strong>Number:</strong> ${data.number}</p>
            <p><strong>Country:</strong> ${data.country}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Carrier:</strong> ${data.carrier}</p>
            <p><strong>Line Type:</strong> ${data.lineType}</p>
        `;
        phoneResultsDiv.classList.add('show');
    }
});
