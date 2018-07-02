export default{
	$current(state){
		console.log('current改变');
		if(state.songs.length){
			for(let i = 0; i < state.songs.length; i++ ){
				let s = state.songs[i];
				if(s.play){
					state.currentIndex = i;
					return i;
				} 
			}	
			return -1;
		}else{
			return -1;
		}
	},
	$getLength(state){
		return state.songs.length;
	}
}