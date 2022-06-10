import * as React from 'react';

// import { PlaylistDialog } from './Dialogs/PlaylistDialog';
// import { SwipeList } from './Lists/SwipeList';
// import { Container } from '@serenity/components';
import {Player, Playlist, useAppDispatch} from '../store/index'
import { ListSongHeader } from './ListSongHeader';
import { Track } from './Track';
import Screen from './Screen';

export const SongList = ({
  data,
  title,
  cover,
  fetchData,
}) => {
  const dispatch = useAppDispatch();
  const [visible, setVisibility] = React.useState(false);
  const [song, setSong] = React.useState();

  function showModal(track) {
    setVisibility(true);
    setSong(track);
  };

  function hideModal() {
    setVisibility(false);
  };

  function addPlaylist(id) {
    addSongsToPlaylist(id, song);
    hideModal();
  };

  function addSongsToPlaylist(id, song) {
    dispatch(Playlist.addSongToPlaylist(id, song));
  };

  function addSongsToQueue(songs) {
    dispatch(Player.add(songs));
  };

  return (
    <Screen>
        <ListSongHeader
          title={title}
          cover={cover}
          addSongsToQueue={() => addSongsToQueue(data)}
        />
        {data.map((item)=> (            
        <Track track={item} />
        ))}
    </Screen>
  );
};


// const styles = StyleSheet.create({
//     rowBack: {
//       alignItems: 'center',
//       // backgroundColor: '#DDD',
//       flex: 1,
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       paddingLeft: 15,
//       paddingRight: 15,
//     },
//   });