// import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { addToPlaylist } from './playlistsSlice';

export function addSongToPlaylist(playlistId, songId) {
  return dispatch => {
    const payload = {
      playlistId,
      songId,
    };
    dispatch(addToPlaylist(payload));
  };
}
