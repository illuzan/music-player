// import Config from 'react-native-config';
import ytdl from 'react-native-ytdl';
import ytpl from 'react-native-ytpl'
// var ytpl = require('react-native-ytpl');

function getAudioUrl(youtubeUrl) {
  let videoUrl = youtubeUrl;
  if (!ytdl.validateURL(youtubeUrl)) {
    const url = new URL(youtubeUrl);
    const videoId = url.searchParams.get("v")?.split("=")[1];
    videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  }
  return ytdl(videoUrl, { filter: format => format.container === 'mp4' })
    .then(urls => {
      const { url } = urls[0];
      return url;
    });
}

const Songs = {
  playlists: [],
  async getPlaylists() {
    const response = await fetch("https://okmuhrunizvusvoypvis.supabase.co/rest/v1/playlists?select=*", {
      headers: {
        // Apikey: Config.SUPA_BASE,
        // Authorization: `Bearer ${Config.SUPA_BASE}`
      }
    });
    const playlists = await response.json();
    return playlists;
  },
  async getSongs(playlist) {
    console.log('DOes it song',playlist)
    const songs = await ytpl(playlist.url);
    const data = songs.items.map((item) => {
      let artist = item.author?.name;
      return {
        id: item.id,
        title: item.title,
        artist: artist,
        description: item?.duration,
        cover: item.thumbnails[0].url,
        path: item.url,
        type: 'youtube'
      }
    })
    return data;
  },
  async playSong(url) {
    try {
      const ytdlUrl = await getAudioUrl(url);
      return ytdlUrl;
    } catch (error) {
      console.log(error)
      return null;
    }
  }
}



export default Songs;
