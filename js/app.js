const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');
// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
      .then(checkResponse)
      .then(res => res.json())
      .catch(error => console.log('Looks like there was a problem', error))
}

Promise.all([
   fetchData('https://dog.ceo/api/breeds/list'),
    fetchData('https://dog.ceo/api/breeds/image/random')
])
.then(data => {
    const breedList = data[0].message;
    const randomImage = data[1].message;

    generateOptions(breedList);
    generateHTML(randomImage)
})


// fetchData('https://dog.ceo/api/breeds/list')
//       .then(data => generateOptions(data.message))

// fetchData('https://dog.ceo/api/breeds/image/random')
//       .then(data => generateHTML(data.message))


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkResponse(response){
    if (response.ok){
        return Promise.resolve(response);
    }else{
        return Promise.reject( new Error(response.statusText))
    }
}

const generateOptions = (data) => {
  const options = data.map(breed => `
    <option value='${breed}'>${breed}</option>
`).join('');
  select.innerHTML = options;
};


const generateHTML = (data) => {
  const html = `
  <img src='${data}'>
  <p>Click to view images of ${select.value}s</p>
`;
  card.innerHTML = html;
};

const generateBreed = () => {
  const breed = select.value;
  const img = card.querySelector('img');
  const p = card.querySelector('p');
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
  .then(res => res.json())
  .then(data => {
    img.src = data.message;
    img.alt = breed;
    p.textContent = `Click to view more ${breed}s`;
  })
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', generateBreed);
card.addEventListener('click', generateBreed)
form.addEventListener('submit', postData)

// ------------------------------------------
//  POST DATA
// ------------------------------------------
function postData(e) {
    e.preventDafault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    fetch('https://jsonplaceholder.typicode.com/comments', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({name, comment})
    })
    .then(checkResponse)
    .then(res => res.json())
    .then(data => console.log(data))
}
