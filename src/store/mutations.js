export default{
	addSongs(state, payload,callback){

		if(payload.recommend){
			state.songs = [];
			payload.song.forEach(s=>{
				s.duration = s.duration || s.dt;
				s.album    = s.album    || s.al;
				s.artists  = s.artists  || s.ar;
			})
			state.songs = state.songs.concat(payload.song);
			state.currentIndex = payload.index;
			
			localStorage.setItem('songs', JSON.stringify(state.songs));
			return;
		}

		if(payload.arrNext){
			let map = {};
			let current = state.songs.splice(0, state.currentIndex+1);

			state.songs.forEach((s,i)=>{
				map['$'+s.id] = i;
			});
			
			payload.arrNext.forEach(a=>{
				a.duration = a.duration || a.dt;
				a.album    = a.album    || a.al;
				a.artists  = a.artists  || a.ar;
				map['$'+a.id] && state.songs.splice(map['$'+a.id],1);
			});

			state.songs = current.concat(payload.arrNext).concat(state.songs);
			$app.$toast('已成功添加下一曲'); callback; return;
		}

		payload.song.duration = payload.song.duration || payload.song.dt;
		payload.song.album    = payload.song.album    || payload.song.al;
		payload.song.artists  = payload.song.artists  || payload.song.ar;

		// 如果已存在歌曲, 则播放
		let i = state.songs.findIndex((value)=>{
			return value.id == payload.song.id;
		})

		if(i != -1 && !payload.next){ // 已存在但不下一曲
			state.currentIndex = i;

		}else if(i != -1 && payload.next){ // 已存在并下一曲
			if(i != state.currentIndex){
				let song = state.songs.splice(i,1)[0]; 
				i<state.currentIndex && state.currentIndex--;
				state.songs.splice(state.currentIndex+1, 0,song);
			} 
			$app.$toast('已成功添加下一曲');

		}else if(i == -1 && !payload.next){ // 不存在并不下一曲

			console.log('添加');
			state.songs.push(payload.song);
			state.currentIndex = state.songs.length-1;

		}else{                             // 不存在但下一曲
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