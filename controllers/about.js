"use strict";

import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";

const about = {
  createView(request, response) {
    logger.info("About page loading!");
    const playlists = playlistStore.getAllPlaylists();

    let numPlaylists = playlists.length;

    let numSongs = 0;

    for (let item of playlists) {
      numSongs += item.songs.length;
    }
    
    let averagePerPlaylist = numPlaylists/numSongs;
    const viewData = {
      title: "Playlist App About",
      displayNumPlaylists: numPlaylists,
      displayNumSongs: numSongs,
      average: averagePerPlaylist
    };

    response.render("about", viewData);
  },
};

export default about;
