<template>
    <main class="main">
        <div class="container border-primary control">
            <div class="row title">
                <div class="col-12">
                    <h4>控制台</h4>
                </div>
            </div>
            <div class="box kyara">
                <div class="col-12 title">
                    <h4>角色</h4>
                </div>
                <div class="col-12 content">
                    <div class="col-12">
                        <div class="input-group">                        
                            <div class="input-group-prepend">
                                <span class="alert-primary input-group-text" id="inputGroup-sizing-default">選擇角色</span>
                            </div>
                            <select class="custom-select" id="inputGroupSelect04">
                                <option selected value="Zuihou">瑞鳳</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <div class="input-group-prepend">
                                <span class="alert-primary input-group-text space" id="inputGroup-sizing-default">音效</span>
                            </div>
                            <select class="custom-select">
                                <option selected value="0">不啓用</option>
                                <option value="1">啓用</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box alarm">
                <div class="col-12 title">
                    <h4>鬧鐘</h4>
                </div>
                <div class="col-12 content">
                    <div class="col-12">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="alert-primary input-group-text" id="inputGroup-sizing-default">時間</span>
                            </div>
                            <select class="custom-select">
                                <option selected value="0">星期天</option>
                                <option value="1">星期一</option>
                                <option value="2">星期二</option>
                                <option value="3">星期三</option>
                                <option value="4">星期四</option>
                                <option value="5">星期五</option>
                                <option value="6">星期六</option>
                            </select>
                            <select class="custom-select">
                                <option v-for="i in range(0, 23)" :key="'hour'+i" v-bind:value="i">{{i+ '時'}}</option>
                            </select>
                            <select class="custom-select">
                                <option v-for="i in range(0, 59)" :key="'minute'+i" v-bind:value="i">{{i+ '分'}}</option>
                            </select>
                            <select class="custom-select">
                                <option selected value="0">不重複</option>
                                <option value="1">重複</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="alert-primary input-group-text" id="inputGroup-sizing-default">動作</span>
                            </div>
                            <div class="input-group-prepend">
                                <button type="button" class="btn btn-outline-primary">選擇聲音</button>
                            </div>
                            <div class="input-group-prepend">
                                <span class="alert-primary input-group-text space" id="inputGroup-sizing-default">切換圖片</span>
                            </div>
                            <select class="custom-select">
                                <option v-for="i in range(0, 23)" :key="'action rid'+i" v-bind:value="i">{{i}}</option>
                            </select>
                            <div class="input-group-prepend">
                                <button type="button" class="btn btn-outline-primary">設定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="goto" @click="kyara_view_open_init">
                <router-link to="/kyara">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/></svg>
                </router-link>
            </div>
        </div>
    </main>
</template>

<script>
  export default {
    name: 'control',
    data(){
        return{
            store: null,
            BrowserWindow: null
        }
    },
    mounted(){
    },
    methods: {
        kyara_view_open_init(){
            var pos = this.BrowserWindow.getPosition()
            this.store.commit('kyara_set_xy', {
                x: pos[0],
                y: pos[1]
            })
        },
        range(start, end){
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }
    },
    created(){
        this.store = this.$store
        this.BrowserWindow = this.$electron.remote.getCurrentWindow()
        window.control_vue = this

        let my_vue = this
        let Mousetrap = require('mousetrap')
        Mousetrap.bind('shift+f12', () => {
            my_vue.kyara_view_open_init()
            my_vue.$router.push('/')
        })
    }
  }
</script>

<style>
    .control *{
        -webkit-app-region: no-drag;
    }
    .control{
        border: 1px solid skyblue;
        border-radius: 8px;
        background-color: rgba(254, 254, 255, 0.95);
        position: relative;
        overflow: hidden;
    }
    .control button{
        background-color: white;
    }
    .control h4{
        color: #4ea4fd;
        margin: 5px;
    }
    .control > .title{
        -webkit-app-region: drag;
        text-align: center;
        background-color: #3096ff;
        margin-bottom: 10px;
        opacity: .97;
    }
    .control > .title h4{
        -webkit-app-region: drag;
        color: white;
        font-size: 1.38rem;
    }
    .control > .box{
        margin-bottom: 10px;
        border: 1px solid #4ea4fd;
        border-radius: 10px;
        background-color: rgba(254, 254, 255, 0.98);
    }
    .control > .box > div{
        padding: 0;
    }
    .control > .box .title{
        text-align: center;
        position: relative;
    }
    .control > .box .title::before{
        content: ' ';
        width: 90%;
        height: 1px;
        background-color: #4ea4fd;
        position: absolute;
        left: 5%;
        bottom: -2px;
        opacity: .9;
    }
    .control > .box .content{
        
    }
    .control > .box .content .input-group .alert-primary.space{
        margin-left: 5px;
    }
    .control > .box .content > div{
        margin-bottom: 10px;
    }
    .control > .box .content > div:first-child{
        margin-top: 10px;
    }

    .control .goto{
        position: relative;
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
        transition: all .2s ease-in-out;
        opacity: .97;
    }
    .control .goto a{
        background-color: #3096ff;
        border-radius: 100%;
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
    }
    .control .goto a:hover{
        box-shadow: 0 0 3px black;
    }
    .control .goto a svg{
        position: absolute;
        fill: #f3f8ff;
        width: 40px;
        height: 40px;
        top: 50%;
        left: 47%;
        transition: all .2s ease-in-out;
        transform: translate(-50%, -50%);
    }
</style>
