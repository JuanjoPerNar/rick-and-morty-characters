const btnPrevPage = document.getElementById('prev-page');
const btnNextPage = document.getElementById('next-page');
const characterList = document.getElementById('character-list');
const mensajeError = document.getElementById('mensajeError');

const fetchCharacters = (pagina) => {
    const url = 'https://rickandmortyapi.com/api/character/?page=' + pagina;
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json()
        })
        .then((data) => {
            mensajeError.innerText = '';
            mostrarCharacters(data.results);
        })
        .catch((error) => {
            mensajeError.innerText = 'Error al obtener los personajes. Inténtalo más tarde';
        });
};

const mostrarCharacters = (characters) => {
    characterList.innerHTML = '';
    characters.forEach(character => {
        const listaPersonajes = document.createElement('li');
        listaPersonajes.classList.add('lista-personajes');

        const img = document.createElement('img');
        img.src = character.image;
        img.alt = character.name;
        img.classList.add('lista-imagenes');
        listaPersonajes.appendChild(img);

        const nombre = document.createElement('p');
        nombre.innerHTML = `<span class="texto-negrita">Nombre:</span> ${character.name}`;
        listaPersonajes.appendChild(nombre);

        const especies = document.createElement('p');
        especies.innerHTML = `<span class="texto-negrita">Especie:</span> ${character.species}`;
        listaPersonajes.appendChild(especies);

        characterList.appendChild(listaPersonajes);

    });
};

let pagActual = 1;

btnPrevPage.addEventListener('click', () => {
    if (pagActual > 1) {
        pagActual--;
        fetchCharacters(pagActual);
    }
});

btnNextPage.addEventListener('click', () => {
    pagActual++;
    fetchCharacters(pagActual);
});

fetchCharacters(pagActual);