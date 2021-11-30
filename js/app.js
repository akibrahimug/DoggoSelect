const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');
// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

const fetchData = url => {
  return fetch(url)
      .then(res => res.json())
}

fetchData('https://dog.ceo/api/breeds/list')
      .then(data => generateOptions(data.message))

fetchData('https://dog.ceo/api/breeds/image/random')
      .then(data => generateHTML(data.message))


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
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
  console.log(select.value)
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


// ------------------------------------------
//  POST DATA
// ------------------------------------------
