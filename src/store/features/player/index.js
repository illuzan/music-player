import { addEventListener, TrackPlayer } from 'react-track-player';
// import { EmitterSubscription } from 'react-native';
import { sample, isEmpty, head } from 'lodash';
// import { ThunkDispatch } from 'redux-thunk';
// import { AnyAction } from 'redux';
import { addSongToHistory } from "./historySlice";
import { playTrack, updateRadioMode, updateRepeatType } from "./playerSlice";
import { addSongToQueue, addSongsToQueue, removeSongFromQueue } from './queueSlice';
import { updateNotification } from '../ui/uiSlice';
// import { SongProps } from './types';
import Songs from '../../../utils/ytsongs';

let subscription;

async function loadTrack(track) {
  let url = track.path;
  if (track?.type === "youtube") {
    url = await Songs.playSong(url);
  }
  return TrackPlayer.load({
    path: url,
    title: track.title,
    artist: track.artist,
    cover: track.cover,
  });
}

export function setUpTrackPlayer() {
  return (dispatch, getState) => {
    try {
      TrackPlayer.setup();

      subscription = addEventListener('media', (event) => {
        if (event === "skip_to_next") {
          dispatch(playNext());
        }
      });
      const { track } = getState().player;
      if (!isEmpty(track)) {
        loadTrack(track);
      }
    } catch (error) {
      console.log('setUpTrackPlayer', error);
    }
  };
}

export function destroyTrackPlayer() {
  TrackPlayer.destroy();
  if (subscription !== undefined) {
    subscription.remove();
  }
}

export function repeatSongs(repeatType) {
  return (dispatch) => {
    try {
      dispatch(updateRepeatType(repeatType));
    } catch (error) {
      console.log('shufflePlay', error);
    }
  };
}


export function playSong(song) {
  return (dispatch, getState) => {
    if (!song?.path && !song?.url) {
      throw new Error("path or url of the song is missing");
    }

    const { track } = getState().player;
    if (!isEmpty(track)) {
      dispatch(addSongToHistory({
        ...track,
        date: new Date().toUTCString(),
      }))
    }
    loadTrack(song).then(() => {
      TrackPlayer.play();
    });
    dispatch(playTrack(song));
  }
}

export async function play() {
  await TrackPlayer.play();
}

export async function pause() {
  await TrackPlayer.pause();
}

export function playNext() {
  return (dispatch, getState) => {
    const { repeat } = getState().player;
    if (repeat === "repeat-one") {
      const { track } = getState().player;
      dispatch(playSong(track));
    } else if (repeat === "repeat-all") {
      const { queue } = getState();
      if (!queue.ids.length) {
        dispatch(updateNotification("No songs in the queue"));
      } else {
        const { entities, ids } = queue;
        const song = entities[ids[0]];
        dispatch(playSong(song));
        dispatch(removeSongFromQueue(song.id));
        loadTrack(song);
      }
    } else if (repeat === "repeat-off") {
      dispatch(updateNotification("Repeat is off"));
    }
  }
}

export function playPrevious() {
  return (dispatch, getState) => {
    const { history } = getState();
    if (!history.ids.length) {
      dispatch(updateNotification("No songs in the history"));
    }
    const { entities, ids } = history;
    const song = entities[ids[0]];
    dispatch(playSong(song));
    loadTrack(song);
  }
}

export function add(songs) {
  return (dispatch, getState) => {
    const { track } = getState().player;
    if (Array.isArray(songs)) {
      dispatch(addSongsToQueue(songs));
      dispatch(updateNotification(`${songs.length} songs added to queue`));
    } else {
      dispatch(addSongToQueue(songs));
      dispatch(updateNotification(`${songs.title} added to queue`));
    }
    if (isEmpty(track)) {
      const song = Array.isArray(songs) ? head(songs) : songs;
      if (song) {
        dispatch(playSong(song));
      }
    }
  }
}

export function startRadio() {
  return (dispatch, getState) => {
    try {
      dispatch(updateNotification("Starting radio"));
      const { track } = getState().player;
      if (isEmpty(track)) {
        const song = sample(getState().songs.entities);
        dispatch(playSong(song));
        dispatch(updateRadioMode(true));
      } else {
        TrackPlayer.play();
      }
    } catch (error) {
      console.log('startRadio', error);
    }
  }
}

export function getDuration() {
  return TrackPlayer.getDuration();
}

export function getPosition() {
  return TrackPlayer.getPosition();
}
