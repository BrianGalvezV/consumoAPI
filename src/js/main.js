const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=c08d415f-dea7-4a38-bb28-7b2188202e46';
const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites?limit=&api_key=c08d415f-dea7-4a38-bb28-7b2188202e46';

const spanError = document.getElementById('error')

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const bt_save_favourite = document.getElementById('bt_save_favourite');
    const bt_save_favourite2 = document.getElementById('bt_save_favourite2');
    
    img1.src = data[0].url;
    img2.src = data[1].url;

    bt_save_favourite.onclick = () => saveFavouriteMichi(data[0].id)
    bt_save_favourite2.onclick = () => saveFavouriteMichi(data[1].id)
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVOTITES);
  const data = await res.json();
  console.log('Favoritos')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }else{
    data.forEach(michi => {
        const section = document.getElementById('favoriteMichis')
        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('Sacar al michi de favoritos');

        btn.appendChild(btnText);
        img.src = michi.image.url

        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);

        
    });
  }
}

async function saveFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVOTITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();

    console.log('Save')
    console.log(res)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      }
}

loadRandomMichis();
loadFavouriteMichis();