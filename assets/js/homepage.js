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

const albumIDs = [240056142, 113019522, 62485122, 229744, 55961782, 78200];

function renderPreferredAlbumRow() {
  const albumsList = document.querySelectorAll("#album-row div.under");
  console.log(albumsList);

  albumsList.forEach(async (album, index) => {
    /*  const albumData = await getAlbumData(albumIDs[index]);

    const { id, title, covers, release_date } = album; */
    const albumHtml = `
    <img src="assets/imgs/search/image-13.jpeg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">2020 • Album</p>
    </div>`;

    album.innerHTML = albumHtml;
  });
}

renderPreferredAlbumRow();
