export default{
	addSongs(state, payload){
		if(payload.recommend){
			console.log('推荐歌曲');

			state.songs = [];
			state.songs = state.songs.concat(payload.song);
			state.currentIndex = payload.index;
			
			localStorage.setItem('songs', JSON.stringify(state.songs));
			return;
		}

		// 如果已存在歌曲, 则播放
		let i = state.songs.findIndex((value)=>{
			return value.id == payload.song.id;
		})

		if(i != -1 && !payload.next){ // 已存在但不下一曲
			console.log('切换');
			state.currentIndex = i;

		}else if(i != -1 && payload.next){ // 已存在并下一曲

			if(i != state.currentIndex){
				let song = state.songs.splice(i,1);
				state.songs.splice(state.currentIndex+1, 0, payload.song);
			}
			$app.$toast('已成功添加下一曲');

			console.log('添加下一曲',state.songs);

		}else if(i == -1 && !payload.next){ // 不存在并不下一曲

			console.log('添加');
			state.songs.push(payload.song);
			state.currentIndex = state.songs.length-1;

		}else{                             // 不存在但下一曲
			console.log('不存在但下一曲');
			
			if(!state.songs.length){
				state.songs.push(payload.song);
				state.currentIndex = 0;
			}else{
				state.songs.splice(state.currentIndex+1,0,payload.song);
			} 
			$app.$toast('已成功添加下一曲');
		}

		localStorage.setItem('songs', JSON.stringify(state.songs));
	}
}