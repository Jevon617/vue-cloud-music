import {clone} from '../service/utlis.js';

export default{
	$play(state){
		console.log('数组长度或者数组内容改变');
		let song = state.songs[state.currentIndex] || {};

		// 如果歌曲库的长度为1
		if(state.songs.length == 1){
			state.currentIndex = 0;
			song = state.songs[0];
			song.duration = song.duration || song.dt;
			song.album = song.album || song.al;
			song.artists = song.artists || song.ar
		}

		if(JSON.stringify(song) != '{}'){
			song.duration = song.duration || song.dt;
			song.album = song.album || song.al;
			song.artists = song.artists || song.ar;
			console.log(song.artists[0]);
			localStorage.setItem('songs',JSON.stringify(state.songs));
			localStorage.setItem('currentIndex',state.currentIndex);

		}
		return song;
	},
	$currentLength(state){
		return state.songs.length;
	}
}