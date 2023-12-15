const URL_Rapid_Api = "https://deezerdevs-deezer.p.rapidapi.com";
const URL_PROXY_StriveSchool =
  "https://striveschool-api.herokuapp.com/api/deezer/artist";
const API_KEY_Rapid_Api = "1c9a44634bmshc420986a1ca9d4bp149ee4jsn6c74b6ea3e35";
const API_KEY_Gaetano = "cd5ce390cbmsh8338260badec5d5p1d8d07jsnaf615db6cd16";
const API_KEY_Altra = "c47b2ad3bdmshc757bf49d438d40p117580jsna7bb59d8b09b";
const BEARER_API_KEY_Gaetano =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZmYzNDBkOGEyMDAwMThhNDhiNDQiLCJpYXQiOjE3MDE5Njk3MTYsImV4cCI6MTcwMzE3OTMxNn0.5_oa--6z6w4Aq79-5uXNafYJq213OKyZCsAYn0F3d_Q";

// endpoints
const getArtist = "artist";
const getAlbum = "album";
const getTrack = "track";
const getPlaylsit = "playlist";
const TOTAL_TRACK_NUMBER_PLAYLIST = 10;
const search = "search";

// options per fetch
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY_Gaetano,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const proxy_options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${BEARER_API_KEY_Gaetano}`,
  },
};

async function loadData(url, endpoint, param) {
  let dynamicUrl =
    endpoint === "search"
      ? `${url}/${endpoint}?q=${param}`
      : `${url}/${endpoint}/${param}`;

  try {
    const response = await fetch(dynamicUrl, options);
    const result = await response.json();
    //console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// const di prova
const wardrunaArtistID = 1690105;
const albumPavarotti = 229744;
const playlistAllenamentiCasa = 12109987971;

// aggiungi anche api track prime 10 canzoni
export async function getArtistTracklist(artistId, limitSongs) {
  const artistTrackList = [];
  const proxyUrl = `${URL_PROXY_StriveSchool}/${artistId}/top?limit=${limitSongs}`;
  let artistTracklistData;
  try {
    const response = await fetch(proxyUrl, proxy_options);
    artistTracklistData = await response.json();
  } catch (error) {
    console.error(error);
  }
  const { data: trackList } = artistTracklistData;

  trackList.forEach((track) => {
    const {
      album: { id: albumId, title, cover_medium, cover_small },
      artist: { id, name },
      contributors,
      duration,
      id: songId,
      rank,
      title: songTitle,
    } = track;

    const contributorList = createContributorArray(contributors);

    const actualTrack = {
      album: {
        albumId,
        title,
        covers: [cover_medium, cover_small],
      },
      artist: {
        id,
        name,
      },
      track: {
        songId,
        songTitle,
        rank,
        duration,
      },
      contributorList,
    };

    artistTrackList.push(actualTrack);
  });

  console.log(artistTrackList);
  return artistTrackList;
}

//TODO: prendi dati per pagina artista e mostrali
export async function getArtistData(artistId) {
  const artistData = await loadData(URL_Rapid_Api, getArtist, artistId);

  const { name, picture_small, picture_medium, picture_big, nb_fan } =
    artistData;

  return {
    artistId,
    name,
    pictures: [picture_small, picture_medium, picture_big],
    nb_fan,
  };
}

//TODO: prendi dati per pagina album e mostrali
export async function getAlbumData(albumId) {
  const albumData = await loadData(URL_Rapid_Api, getAlbum, albumId);

  const {
    id,
    title,
    cover_small,
    cover_medium,
    cover_big,
    genre_id,
    genres: { data: genres },
    nb_tracks,
    duration,
    fans,
    release_date,
    contributors,
    artist: { id: artistId, name, picture_small, picture_big },
    tracks: { data: tracks },
  } = albumData;

  const contributorList = createContributorArray(contributors);

  // guardare assieme se servono altri dati
  let tracksList = [];
  tracks.forEach((track) => {
    const {
      album: { id: albumId, title, cover_medium, cover_small },
      artist: { id, name },
      duration,
      id: songId,
      rank,
      title: songTitle,
      explicit_lyrics,
    } = track;

    const actualTrack = {
      album: {
        albumId,
        title,
        covers: [cover_medium, cover_small],
      },
      artist: {
        id,
        name,
      },
      track: {
        songId,
        songTitle,
        rank,
        duration,
        explicit_lyrics,
      },
    };
    tracksList.push(actualTrack);
  });

  console.log({
    id,
    title,
    covers: [cover_small, cover_medium, cover_big],
    artist: { artistId, name, pictures: [picture_small, picture_big] },
    genre_id,
    genres,
    nb_tracks,
    duration,
    fans,
    release_date,
    contributorList,
    tracksList,
  });
  return {
    id,
    title,
    covers: [cover_small, cover_medium, cover_big],
    artist: { artistId, name, pictures: [picture_small, picture_big] },
    genre_id,
    genres,
    nb_tracks,
    duration,
    fans,
    release_date,
    contributorList,
    tracksList,
  };
}

//TODO: prendi dati per pagina playlist e mostrali

//TODO: prendi dati per pagina home e mostrali
export async function getPlaylistData(playlistId) {
  const playlistData = await loadData(URL_Rapid_Api, getPlaylsit, playlistId);

  const {
    id,
    title,
    description,
    duration,
    nb_tracks,
    fans,
    picture_small,
    picture_medium,
    creation_date,
    creator: { id: creatorId, name: creatorName },
    tracks: { data: tracks },
  } = playlistData;

  const trackList = createTracklistArray(tracks);

  /*  console.log({
    id,
    title,
    description,
    duration,
    nb_tracks,
    fans,
    pictures: [picture_small, picture_medium],
    creation_date,
    creator: { creatorId, creatorName },
    trackList,
  }); */
  return {
    id,
    title,
    description,
    duration,
    nb_tracks,
    fans,
    pictures: [picture_small, picture_medium],
    creation_date,
    creator: { creatorId, creatorName },
    trackList,
  };
}

// helper function
function createContributorArray(contributors) {
  let contributorList = [];
  contributors.forEach((contributor) => {
    const { id, name, picture_medium, picture_small, role } = contributor;
    const contributorObj = {
      id,
      name,
      pictures: [picture_medium, picture_small],
      role,
    };
    contributorList.push(contributorObj);
  });
  return contributorList;
}

// helper fun
function createTracklistArray(tracks) {
  let tracksList = [];
  tracks.forEach((track) => {
    const {
      album: { id: albumId, title, cover_medium, cover_small },
      artist: { id, name },
      duration,
      id: songId,
      rank,
      title: songTitle,
      explicit_lyrics,
    } = track;

    const actualTrack = {
      album: {
        albumId,
        title,
        covers: [cover_medium, cover_small],
      },
      artist: {
        id,
        name,
      },
      track: {
        songId,
        songTitle,
        rank,
        duration,
        explicit_lyrics,
      },
    };
    tracksList.push(actualTrack);
  });
  return tracksList;
}

//TODO??: fare la search utilizzando i role vari (album, track, artist ecc) in modo da poter mettere bottoni in cui clicchi e cerchi
// per categoria

//getArtistData(wardrunaArtistID);
//getArtistTracklist(wardrunaArtistID, 10);
//getAlbumData(albumPavarotti);
//const prova = await getPlaylistData(playlistAllenamentiCasa); // funziona grazie a type = module nello script

export async function searchData(data) {
  const searchData = await loadData(URL_Rapid_Api, search, data);
  console.log("searchData", searchData);
  const similarAlbumList = [];
  const similarArtistList = [];

  const { data: songList } = searchData;
  console.log("songList", songList);

  // TODO: aggiungi anche id e covers/immagini
  const {
    type: typeTrack,
    title: titleTrack,
    artist: {
      name: nameArtist,
      type: typeArtist,
      id: artistId,
      picture_medium,
    },
    album: { title: titleAlbum, type: typeAlbum, cover_medium, id: albumId },
  } = songList[0];

  const searchPotentialResultsArr = [
    { typeTrack, titleTrack, cover_medium, artistId, albumId, nameArtist },
    { typeArtist, nameArtist, artistId, albumId, picture_medium },
    { titleAlbum, typeAlbum, cover_medium, albumId, artistId, nameArtist },
  ];

  const regExp = new RegExp(data, "i");
  console.log(regExp);
  let mostRelevantResult;

  if (regExp.test(titleTrack)) {
    mostRelevantResult = searchPotentialResultsArr[0];
  } else if (regExp.test(nameArtist)) {
    mostRelevantResult = searchPotentialResultsArr[1];
  } else if (regExp.test(titleAlbum)) {
    mostRelevantResult = searchPotentialResultsArr[2];
  }

  console.log("Most Relevant Result", mostRelevantResult);

  // brani section
  const tracklist = getRelevantTracks(songList, mostRelevantResult);
  console.log("tracklist", tracklist);
  // controlla se togliere primo elemento invece di fare if ogni ciclo (slice) ASPETTA A FARE SLiCE
  songList.forEach((track, index) => {
    // brani section

    if (index != 0) {
      const extractedAlbum = extractAlbumData(track);
      const extractedArtist = extractArtistData(track);
      similarAlbumList.push(extractedAlbum);
      similarArtistList.push(extractedArtist);
    }
  });

  console.log("similar album list", similarAlbumList);
  console.log("similar artist list", similarArtistList);
  //TODO mettere return a search quando mi arriva la page html

  return {
    mostRelevantResult,
    similarAlbumList,
    similarArtistList,
    tracklist,
  };
}

// helper function
function extractAlbumData(song) {
  const { id, title, cover_small, cover_medium, type } = song.album;

  return { id, title, covers: [cover_small, cover_medium], type };
}

function extractArtistData(song) {
  const { id, name, picture_small, picture_medium, type } = song.artist;

  return { id, name, covers: [picture_small, picture_medium], type };
}

// TEST SEARCH
const provaSearch = "lucia";
//const searchPippo = await searchData(provaSearch);
//console.log(searchPippo);

/* TODO: sezione brani affinaco risultato rilevante:
in caso di album: come piu rilevante, uso canzoni date da 
search.
in caso di artista: o uso canzoni di search CONTRIBUTORS??? uso proxy tacklist??? non c'è tempo
in caso di brano: uso canzoni di search
*/
function getRelevantTracks(trackList, relevantResult) {
  const relevantTrackList = [];
  if (relevantResult) {
    for (let i = 0; i < 4; i++) {
      const {
        id,
        title,
        rank,
        explicit_lyrics,
        duration,
        artist: {
          id: artistId,
          name,
          picture_small,
          picture_medium,
          picture_big,
        },
        album: { cover_small, cover_medium },
      } = trackList[i];

      const actualTrack = {
        id,
        title,
        rank,
        explicit_lyrics,
        duration,
        album: { cover_small, cover_medium },
        artist: {
          artistId,
          name,
          pictures: { picture_small, picture_medium, picture_big },
        },
      };

      relevantTrackList.push(actualTrack);
    }
  }

  return relevantTrackList;
}

// helper function for songs and artist time formatting
export function convertInHourMinuteSecond(seconds) {
  let totalSeconds = seconds;
  const HOUR_TOTAL_MINUTES = 3600;
  const MINUTE_TOTAL_SECONDS = 60;

  let hours = Math.floor(totalSeconds / HOUR_TOTAL_MINUTES);
  let minutes = Math.floor(
    (totalSeconds - hours * HOUR_TOTAL_MINUTES) / MINUTE_TOTAL_SECONDS
  );

  let secondsLeft =
    totalSeconds - hours * HOUR_TOTAL_MINUTES - minutes * MINUTE_TOTAL_SECONDS;

  let finalStr = "";
  if (hours === 0 && minutes === 0) {
    finalStr = `circa ${secondsLeft} sec`;
  } else if (hours === 0 && secondsLeft === 0) {
    finalStr = `circa ${minutes} min`;
  } else if (minutes === 0 && secondsLeft === 0) {
    finalStr = `circa ${hours} hours`;
  } else if (secondsLeft === 0) {
    finalStr = `circa ${hours} hours ${minutes} min`;
  } else {
    finalStr = `circa ${hours} hours ${minutes} min ${secondsLeft} sec`;
  }

  return finalStr;
}

/* const tempo = 3600;
const oreMinuti = convertInHourMinuteSecond(tempo);
console.log(oreMinuti); */
// TODO: stessa roba per brani, solo che in formato 3:12 esempio
export function convertInMinuteAndSeconds(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds}`;
}

/* const tempoPiccolo = 342;
const minutiCanzone = convertInMinuteAndSeconds(tempoPiccolo);
console.log("per canzone:", minutiCanzone); */

// TODO? gestione errori search:
/*
se most Relevant result undefined -> gestire
se searchData -> data : array vuoto -> return?? gestire
*/
