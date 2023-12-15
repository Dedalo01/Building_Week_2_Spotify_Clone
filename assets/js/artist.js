import {
  getArtistData,
  getAlbumData,
  getPlaylistData,
  getArtistTracklist,
  searchData,
  convertInHourMinuteSecond,
  convertInMinuteAndSeconds,
} from "./script.js";

let params = new URLSearchParams(window.location.search);

let id = params.get("id");

async function renderArtistHero(artistID) {
  const artistData = await getArtistData(artistID);
  console.log("artist data", artistData);

  const { artistId, name, pictures, nb_fan } = artistData;

  const artistHero = document.querySelector("#container-center-main");
  console.log(artistHero);
  console.log(pictures[2]);
  /* artistHero.setAttribute("background-image", `url(${pictures[2]})`); */
  artistHero.style.backgroundImage = `url(${pictures[2]})`;
  const artistDiv = document.createElement("div");
  artistDiv.classList.add("ms-4");

  const renderArtistHeroHtml = `<h1>${name}</h1>
  <p id="ascMens" class="mt-4 d-none mb-4 d-md-block"> ${nb_fan} ascoltatori mensili</p>
  `;
  artistDiv.innerHTML = renderArtistHeroHtml;

  artistHero.appendChild(artistDiv);
}

async function renderTracksArtist(artistID) {
  const tracklist = await getArtistTracklist(artistID, 5);

  const tracksRows = document.querySelectorAll("#song-container div.row.mb-3");

  tracksRows.forEach((trackRow, index) => {
    const { album, artist, track } = tracklist[index];

    const trackHtml = `<div class="d-flex justify-content-between align-items-center">
        <div class="col-8">
            <div class="d-flex align-items-center w-300">
                <div class="d-flex align-items-center">
                    <p>${index + 1}</p>
                    <img src="${album.covers[0]}" class="ms-3">
                </div>
                <div class="container ms-3 d-md-flex flex-md-row justify-content-between">
                    <div>
                        <p>${track.songTitle}</p>
                    </div>
                    <div>
                        <p class="opacity-50">${track.rank}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-2">
            <p class="d-none d-md-block">${convertInMinuteAndSeconds(
              track.duration
            )}</p>
            <i class="bi bi-three-dots-vertical d-block d-md-none opacity-50"></i>
        </div>
    </div>
    `;

    trackRow.innerHTML = trackHtml;
  });
  console.log(tracksRows);
}

if (id) {
  renderArtistHero(id);
  renderTracksArtist(id);
}
