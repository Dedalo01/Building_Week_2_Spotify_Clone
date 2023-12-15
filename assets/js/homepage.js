import {
  getArtistData,
  getAlbumData,
  getPlaylistData,
  getArtistTracklist,
  searchData,
  convertInHourMinuteSecond,
  convertInMinuteAndSeconds,
} from "./script.js";

async function renderContainerAd(artistID) {
  const albumData = await getAlbumData(artistID);
  console.log("albumData:", albumData);

  const {
    id,
    title,
    covers,
    artist: { artistId, name },
  } = albumData;

  const containerAdAlbum = document.querySelector(
    ".containerAd div:first-of-type"
  );
  console.log("containerAlbum", containerAdAlbum);
  const renderAdHtml = `
    <div>
      <img src="${covers[2]}" id="imgAd">
    </div>
    <div class="ms-3">
      <p class="small fw-bold">ALBUM</p>
      <h1 class="display-1 fw-bold">${title}</h1>
      <p>${name}</p>
      <p>Ascolta il nuovo singolo di "${name}"</p>
      <div class="d-flex align-items-center">
        <button type="button" class="btn me-3 fw-bold btnCustom btnPlay">Play</button>
        <button type="button" class="btn btn-outline-light border-secondary fw-bold me-3 btnCustom">Salva</button>
        <div class="iconWrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c757d" class="bi bi-three-dots"
            viewBox="0 0 16 16">
            <path
              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
          </svg>
          <div class="iconLabel">Opzioni</div>
        </div>
      </div>
    </div>`;

  containerAdAlbum.innerHTML = renderAdHtml;
}

// prendi poi dinamicamente id da array locale per ad
//renderContainerAd(314276);

// Playlist da dinamicizzare in caso di tempo extra
/* async function renderSinglePlaylist(playlistID) {
  const buonaseraRow = document.querySelector()
}
 */

const albumIDs = [240056142, 113019522, 62485122, 229744];
// 55961782, 78200
async function renderPreferredAlbumRow() {
  const albumsRowContainer = document.querySelector("#album-rows");
  console.log(albumsRowContainer);

  let albumsHtml = "";
  for (let i = 0; i < 4; i++) {
    const albumData = await getAlbumData(albumIDs[i]);

    const { id, title, covers, release_date } = albumData;
    const albumHtml = `<div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-4">
    <div class="card border-0">
      <img src="${covers[1]}" class="card-img p-3" alt="imgPlaylist">
      <div class="card-body">
        <h5 class="card-title text-truncate"><a href="./album.html?id=${id}" >${title}</a></h5>
        <p class="card-text text-secondary">${release_date}</p>
      </div>
    </div>
  </div>`;

    albumsHtml += albumHtml;
  }

  albumsRowContainer.innerHTML = albumsHtml;
}

const artistIDs = [1690105, 64635, 2829401, 4966646];

async function renderPreferredArtistRow() {
  const artistsRowContainer = document.querySelector("#artist-rows");
  console.log(artistsRowContainer);

  let artistsHtml = "";
  for (let i = 0; i < 4; i++) {
    const artistData = await getArtistData(artistIDs[i]);

    const { artistId, name, pictures, nb_fan } = artistData;
    const artistHtml = `<div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-4">
    <div class="card border-0">
      <img src="${pictures[1]}" class="card-img p-3" alt="imgPlaylist">
      <div class="card-body">
        <h5 class="card-title text-truncate"><a href="./artist.html?id=${artistId}">${name}</a></h5>
        <p class="card-text text-secondary">fans: ${nb_fan}</p>
      </div>
    </div>
  </div>`;

    artistsHtml += artistHtml;
  }

  artistsRowContainer.innerHTML = artistsHtml;
}

/* function renderAlbumRow() {
  const 
} */

//renderContainerAd(314276);
//renderPreferredAlbumRow();
//renderPreferredArtistRow();
