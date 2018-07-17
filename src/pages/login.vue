<template>
    <div class="login">
    	<heador>
			<div class="title"  slot="middle">手机号登录</div>
    		<div slot="right" class="search"></div>
    	</heador>
    	<div class="content">
    		<div class="login_input">
    			<input type="text" placeholder="请输入手机号" v-model="phone">
    		</div>
    		<div class="password_input">
    			<input type="password" placeholder="请输入密码" v-model="password">
    		</div>

    		<div class="submit" @click="login">
    			<btn >登 录</btn>
    		</div>
    	</div>
    </div>
</template>

<script>

import heador    from "../components/common/header.vue";
import btn       from "../components/common/button.vue";
import { login } from "../service/getData.js";


export default {
	data(){
		return{
			phone : '18575598470',
			password : 'wj1787176370.'
		}
	},
	methods:{
		async login(){
			try{
				let res = await login(this.phone, this.password);
				console.log(res);

				if(res.data.code == 200){
					this.$store.state.userInfo = res.data.account;
					localStorage.setItem('userInfo', JSON.stringify(res.data.account));
					this.$toast('登录成功');
					this.$router.push('/main');
				}else{
					this.$toast("登录失败");
				}
			}catch(e){
				this.$toast('请检查一下网络哦!');
			}
		}
	},
	components:{
		heador,
		btn
	}
    
}
</script>

<style scoped  lang="scss">

@import "../scss/mixin.scss";

.login{
	height: 100%;
	min-height: 100vh;
	@include padding( px2rem(120) 0 0 );
	position: relative;
	z-index: 10;
	background: white;
}
.content{
	@include padding(px2rem(100) px2rem(50));
	div{
		width: 100%;
		height: px2rem(90);
		line-height: px2rem(90);
		margin-bottom: px2rem(40);
		input{
			width: 100%;
			height:100%;
			line-height: px2rem(90);
			font-size: px2rem(32);
			color: black;
			border-bottom: px2rem(2) solid #ccc;
		}
	}
	.submit{
		margin-top: px2rem(100);
		width: 100%;
		div{
			background-color: $bg;
		}
	}
}
input ::-webkit-input-placeholder{
	color: #bg;
	font-size: px2rem(32);
}


</style>
