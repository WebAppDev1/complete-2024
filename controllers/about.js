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
    
    let averagePerPlaylist = 0;
    if (numPlaylists > 0) {
      averagePerPlaylist = numSongs/numPlaylists;
    }
     
    let currentLargest = 0;
    let largestPlaylistTitle = "";
    for (let playlist of playlists) {
      if (playlist.songs.length > currentLargest) {
        currentLargest = playlist.songs.length;        
    }
    }
      
    for (let playlist of playlists) {
      if (playlist.songs.length === currentLargest) {
            largestPlaylistTitle += playlist.title + ", ";
      }
    }
    
    let currentSmallest = 1;
    if (numPlaylists > 0) {
      currentSmallest = playlists[0].songs.length;
    } 
    let smallestPlaylistTitle = "";

    for (let playlist of playlists) {
      if (playlist.songs.length < currentSmallest) {
        currentSmallest = playlist.songs.length;
      }
    }
    for (let playlist of playlists) {
      if (playlist.songs.length === currentSmallest) {
        smallestPlaylistTitle += playlist.title + ", ";
      }
    }
    const viewData = {
      title: "Playlist App About",
      displayNumPlaylists: numPlaylists,
      displayNumSongs: numSongs,
      average: averagePerPlaylist.toFixed(2),
      largest: largestPlaylistTitle,
      smallest: smallestPlaylistTitle
    };

    response.render("about", viewData);
  },
};

export default about;
