<template>
    <main class="main">
        <div class="kyara">
            <img id="kyara_img" class="img"  v-bind:src="this.store.state.run.kyara.img.path">
            <audio id="kyara_audio" v-bind:src="this.store.state.run.kyara.sound.path"></audio>
        </div>
    </main>
</template>

<script>
  export default {
    name: 'kyara',
    data(){
        return{
            kyara_id: this.$store.state.run.kyara.id,
            kyara_sound_old_id: '-1 -1',
            store: null,
            BrowserWindow: null,
            system_platform: require('os').platform()
        }
    },
    methods: {
        save_config(){
            var fs = require('fs-extra')
            var app = this.$electron.remote.app
            var pos = this.BrowserWindow.getPosition()
            this.store.commit('kyara_set_xy', {
                x: pos[0],
                y: pos[1]
            })
            fs.writeFileSync(app.getPath('userData') + '/resources/run.json', JSON.stringify(
                this.store.state.run
            ))
        },
        kyara_control_open(){
            var pos = this.BrowserWindow.getPosition()
            this.store.commit('kyara_set_xy', {
                x: pos[0],
                y: pos[1]
            })
            this.BrowserWindow.setSize(500,411)
            this.$router.push('/control')
        },
        kyara_userData_open(){
            this.$electron.shell.openItem(this.$electron.remote.app.getPath('userData'))
        },
        kyara_zoom_change(model){
            if(model)
                this.store.commit('kyara_set_zoom', this.store.state.run.kyara.zoom + 0.1)
            else
                this.store.commit('kyara_set_zoom', this.store.state.run.kyara.zoom - 0.1)
        },
        kyara_zoom(){
            var img = $('.img')
            img.css('width', this.store.state.run.kyara.img.width * this.store.state.run.kyara.zoom)
            window.kyara_window.setSize(parseInt(img.width())+1, parseInt(img.height())+1)
        },
        kyara_top(){
            if(this.BrowserWindow.isAlwaysOnTop()){
                this.store.commit('kyara_set_top', false)
            }else{
                this.store.commit('kyara_set_top', true)
            }
        },
        kyara_sound_play(id){
            if(id in this.store.state.kyaras[this.kyara_id].sounds){
                this.store.commit('kyara_sound_play', id)
                if(this.store.state.run.kyara.sound.enable){
                    var my_vue = this
                    $('#kyara_audio').on('canplay', function(){
                        my_vue.kyara_sound_old_id = id
                        this.play()
                    })
                    if(id == my_vue.kyara_sound_old_id) $('#kyara_audio')[0].play()
                }
            }
        },
        menu_setup(){
            const remote = require('electron').remote
            let Mousetrap = require('mousetrap')
            const Menu = remote.Menu
            const MenuItem = remote.MenuItem
            
            const menu = this.BrowserWindow.menu
            menu.clear()
            menu.append(new MenuItem({
                label: '控制台',
                click: () => this.kyara_control_open()
            }))
            Mousetrap.bind('shift+f12', () => this.kyara_control_open())

            menu.append(new MenuItem({
                label: '開啓資源目錄',
                click: () => this.kyara_userData_open()
            }))
            Mousetrap.bind('shift+f11', () => this.kyara_userData_open())

            menu.append(new MenuItem({
                label: '放大',
                click: () => this.kyara_zoom_change(true)
            }))
            Mousetrap.bind('shift+f1', () => this.kyara_zoom_change(true))

            menu.append(new MenuItem({
                label: '縮小',
                click: () => this.kyara_zoom_change(false)
            }))
            Mousetrap.bind('shift+f2', () => this.kyara_zoom_change(false))

            menu.append(new MenuItem({
                label: '角色置頂',
                type: 'checkbox',
                checked: false,
                click: () => this.kyara_top()
            }))
            Mousetrap.bind('shift+f3', () => this.kyara_top())

            menu.append(new MenuItem({
                label: '儲存設定',
                click: () => this.save_config()
            }))
            Mousetrap.bind('shift+f10', () => this.save_config())
        }
    },
    created(){
        this.store = this.$store
        this.BrowserWindow = this.$electron.remote.getCurrentWindow()
        window.kyara_window = this.BrowserWindow
        window.kyara_vue = this

        window.kyara_window.setAlwaysOnTop(this.store.state.run.kyara.top)
        window.kyara_window.setPosition(this.store.state.run.kyara.x, this.store.state.run.kyara.y)
        this.menu_setup()

        document.addEventListener('dragover',function(event){
            event.preventDefault()
            return false
        },false)
        document.addEventListener('drop',function(event){
            event.preventDefault()
            return false
        },false)

        let my_vue = this
        this.$nextTick(function(){
            $('#kyara_img').on('load', function(){
                var img = document.getElementById('kyara_img'); 
                var width = img.width
                var height = img.height
                window.kyara_vue.store.commit('kyara_save_img_size', {width, height})
                window.kyara_vue.kyara_zoom()
            })
            if(my_vue.system_platform == 'win32'){
                $('#kyara_img').on('contextmenu', function(e){
                    window.kyara_window.menu.popup(window.kyara_window)
                })
            }
            $('#kyara_img').dblclick(function(){
                my_vue.kyara_sound_play('t00')
            })
            my_vue.kyara_sound_play('init')
        })
    }
  }
</script>

<style>
    main{
        width: 100%;
        height: 100%;
    }
    .kyara{
        -webkit-app-region: drag;
    }
    .kyara .img{
        -webkit-user-drag: none;
    }
</style>
