// Define API key and base URL for TMDB API
const apiKey = '6b4bd767e9913e24fbfb97704b64c5b0';
const baseURL = 'https://api.themoviedb.org/3';

function fetchMovies(searchQuery = '') {
    let url = `${baseURL}/discover/movie?api_key=${apiKey}`;
    if (searchQuery !== '') {
        url = `${baseURL}/search/movie?api_key=${apiKey}&query=${searchQuery}`;
    }
    fetch(`${baseURL}/discover/movie?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const movieResults = document.getElementById('movieResults');
            movieResults.innerHTML = ''; 
            data.results.forEach(movie => {
                const li = document.createElement('li');
                const titleHeading = document.createElement('h4');
                const descriptionPara = document.createElement('p');
                const posterImg = document.createElement('img');

                titleHeading.textContent = movie.title;
                descriptionPara.textContent = movie.overview;
                posterImg.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                posterImg.alt = "Movie Poster";

                li.appendChild(titleHeading);
                li.appendChild(descriptionPara);
                li.appendChild(posterImg);

                movieResults.appendChild(li);
            });
        })
    
}

// Event listener for form submission to add a movie
document.getElementById('add-movie-form').addEventListener('submit', function (event) {
    event.preventDefault(); 
    const title = document.getElementById('title').value;
    console.log("Title:", title);
    const movieDisplay = document.getElementById("movie-display");
    movieDisplay.innerHTML = "<p>The movie title you entered is: " + title + "</p>";

    createMovie(title);

});

// Event listener to check movies upon clicking "CLICK HERE" button
document.querySelector('.buttons button').addEventListener('click', function () {
    fetchMovies();
});

// Function to create a new movie
function createMovie(title) {
    // POST a request 
    fetch(`${baseURL}/movie?api_key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Movie created:', data);
        fetchMovies();
    })
}

// Function to update a movie
function updateMovie(id, newData) {
    // To update 
    fetch(`${baseURL}/movie/${id}?api_key=${apiKey}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then(response => response.json())
    .then(data => {console.log('Movie updated:', data);

        fetchMovies();
    })
    .catch(error => {
        console.error('Error updating movie:', error);
    });
}

// Function to delete a movie
function deleteMovie(id) {
    // DELETE request
    fetch(`${baseURL}/movie/${id}?api_key=${apiKey}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Movie deleted:', data);
        
        fetchMovies();
    })
}

// Event listener for form submission to search for movies
document.getElementById('search-movie-form').addEventListener('submit', function (event) {
    event.preventDefault(); 
    const searchQuery = document.getElementById('search').value;
    fetchMovies(searchQuery);
});


// Event listener to view more details about a movie
document.getElementById('movieResults').addEventListener('click', function (event) {
    if (event.target.tagName === 'H4') {
        const movieTitle = event.target.textContent;
        const movieDetailsContainer = document.getElementById('movie-details');

        // Create elements to display the movie title and other details
        const titleHeading = document.createElement('h2');
        titleHeading.textContent = 'Selected Movie';
        const movieTitlePara = document.createElement('p');
        movieTitlePara.textContent = 'Title: ' + movieTitle;

        // Clear the container first before adding new details
        movieDetailsContainer.innerHTML = '';

        // Append the elements to the container
        movieDetailsContainer.appendChild(titleHeading);
        movieDetailsContainer.appendChild(movieTitlePara);
    }
});