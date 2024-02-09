'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import playlist from './controllers/playlist.js';

router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/playlist/:id', playlist.createView);
router.get('/playlist/:id/deletesong/:songid', playlist.deleteSong);
router.get('/dashboard/deleteplaylist/:id', dashboard.deletePlaylist);
router.get('/dashboard/updateplaylist/:id', dashboard.updatePlaylist);

router.post('/playlist/:id/addsong', playlist.addSong);
router.post('/dashboard/addplaylist', dashboard.addPlaylist);
router.post('/playlist/:id/updatesong/:songid', playlist.updateSong);

export default router;