const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'https://github.com/taniarascia/sandbox/raw/master/ghibli/logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

// Create a request variable and assign a new XMLHttpRequest object to it
let request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

request.onload = function() {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response);

    // checking the status code
    if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => { // callback arrow function as argument forEach 
            
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const h1 = document.createElement('h1');
            h1.textContent = movie.title;

            const p = document.createElement('p');
            movie.description = movie.description.substring(0, 300);
            p.textContent = `${movie.description}...`;

            container.appendChild(card);

            card.appendChild(h1);
            card.appendChild(p);
        });
    }
    else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = "Gah, it's not working!";
        app.appendChild(errorMessage);
    }
}

// Send request
request.send();