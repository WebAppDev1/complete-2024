'use strict';

import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const dashboard = {
  createView(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Playlist Dashboard',
      playlists: playlistStore.getUserPlaylists(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture
    };
    logger.info('about to render' + viewData.playlists);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
  addPlaylist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    
    const timestamp = new Date();
    const newPlaylist = {
      id: uuidv4(),
      userid: loggedInUser.id,
      title: request.body.title,
      songs: [],
      date: timestamp,
      picture: request.files.picture,
    };
    
    playlistStore.addPlaylist(newPlaylist, function() {
        response.redirect("/dashboard");
      });
  },
  
  deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect("/dashboard");
},
  
    updatePlaylist(request, response) {
      const loggedInUser = accounts.getCurrentUser(request);
    const playlistId = request.params.id;
    logger.debug("updating playlist " + playlistId);
    let data=playlistStore.getPlaylist(playlistId);
    let storedsongs= data.songs;
    let storeddate = data.date; 
    let storedpic = data.picture
    logger.info(request.body.title)
    const updatedPlaylist = {
      id: playlistId,
      userid: loggedInUser.id,
      title: request.body.title,
     songs:storedsongs,
     date:storeddate,
      picture: storedpic
    };
    playlistStore.editPlaylist(playlistId,  updatedPlaylist);
    response.redirect("/dashboard");
  }
};

export default dashboard;