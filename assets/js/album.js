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

async function renderAlbumPage(albumID) {
  const albumData = await getAlbumData(albumID);
  console.log(albumData);

  const albumHeroImg = document.querySelector(
    "#container-album div.text-center img"
  );
  /*  console.log(albumHeroImg);
   */
  albumHeroImg.src = albumData.covers[1];

  const heroTitle = document.querySelector("#hero-text");
  /*   console.log(heroTitle); */

  heroTitle.innerText = albumData.title;

  const heroInfoImg = document.querySelector("#hero-info img");
  heroInfoImg.src = albumData.artist.pictures[0];

  // TODO: da fare GAE!
  const heroArtistName = document.querySelector("#hero-name");
  heroArtistName.innerText = albumData.artist.name;

  const year = albumData.release_date.split("-")[0];
  const heroInfoReleaseDate = document.querySelector("#release-year");
  /* console.log(heroInfoReleaseDate); */
  heroInfoReleaseDate.innerText = year;

  const heroInfoNumTracks = document.querySelector("#number-tracks");
  /*   console.log(heroInfoNumTracks); */
  heroInfoNumTracks.innerText = albumData.nb_tracks + " tracks,  ";
  /*   console.log(heroInfoNumTracks); */

  const heroInfoTime = document.querySelector("#hero-info .fw-light");
  /*   console.log(heroInfoTime); */
  heroInfoTime.innerText = convertInHourMinuteSecond(albumData.duration);
  /*  console.log(heroInfoTime); */

  // TODO: rendi dinamiche le row track (html linea 232 circa)
  const trackRowsContainer = document.querySelector("#track-rows-container");

  let allRows = "";
  albumData.tracksList.forEach((track, i) => {
    allRows += renderTrackRow(track, i);
  });

  trackRowsContainer.innerHTML = allRows;
}

// prova pavarotti
//renderAlbumPage(229744);

function renderTrackRow(song, index) {
  const trackRow = ` <div class="row ms-xl-4 pe-xl-0 mt-xl-3 ps-xl-0 ms-lg-0 mb-lg-3 mb-md-3 mt-sm-0 mb-sm-3 mb-3">
  <div class="col-auto ms-md-0">
      <span class="d-none d-md-inline">${index + 1}</span>
  </div>
  <div class="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-5 d-flex flex-column ps-xl-0 pe-xl-0">
      <span class="fw-bold">${song.track.songTitle}</span>
      <span class="fw-light">
      <a href="./artist.html?id=${song.artist.id}">${song.artist.name}</a>
      </span>
  </div>
  <div class="col-5 col-sm-6 col-md-4 col-lg-4 col-xl-3 text-end">
      <!-- mobile menu -->
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
          viewBox="0 0 16 16" class="bi bi-three-dots-vertical d-md-none" style="font-size: 22px;">
          <path
              d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
          </path>
      </svg>
      <!-- end of mobile menu -->

      <span class="d-none d-md-inline">${song.track.rank}</span>
  </div>
  <div class="col-md-3 col-lg-4 col-xl-3 text-end pe-xl-5 d-none d-md-inline">
      <span>${convertInMinuteAndSeconds(song.track.duration)}</span>
  </div>
</div>`;

  return trackRow;
}

if (id) {
  renderAlbumPage(id);
}
