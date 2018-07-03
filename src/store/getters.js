export default{
	$play(state){
		console.log('数组长度或者数组内容改变');
		let song = state.songs[state.currentIndex] || {};
		if(JSON.stringify(song) != '{}') song.play = true;
		localStorage.setItem('songs',JSON.stringify(state.songs));
		localStorage.setItem('currentIndex',state.currentIndex);
		return song;
	}
}