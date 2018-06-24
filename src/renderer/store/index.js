import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        run:{
            root_path: '',
            kyara:{
                id: '',
                img: {
                    id: '',
                    path: '',
                    width: 0,
                    height: 0
                },
                enable_sound: false,
                x: 100,
                y: 80,
                zoom: 1,
                top: false
            },
            alarm:{
                0:{
                    enable: true,
                    name: '測試',
                    time: {
                        repeat: true,
                        week: 1,
                        hour: 12,
                        minute: 20
                    },
                    kyara_img: '',
                    sound_path: ''
                }
            }
        },
        kyaras: {
            'Zuihou': {
                name: '瑞鳳',
                images: {
                    'init':'0.png',
                    's0':'0.png'
                },
                sounds: {
                    's1':'0.mp3'
                },
                events: [
                    {
                        enable: true,
                        name: '測試',
                        time: {
                            repeat: true,
                            week: 1,
                            hour: 12,
                            minute: 20
                        },
                        action: [
                            {type: 'image:sound', rid: 'init:s1', keep: 1000}
                        ]
                    }
                ]
            },
            'Hibiki': {
                name: '響',
                images: {
                    'init':'0.png',
                    's0':'1.png'
                },
                sounds: {
                    's1':'0.mp3'
                },
                events: [
                    {
                        enable: true,
                        name: '測試',
                        time: {
                            repeat: true,
                            week: 1,
                            hour: 12,
                            minute: 20
                        },
                        action: [
                            {type: 'image:sound', rid: 'init:s1', keep: 1000}
                        ]
                    }
                ]
            }
        }
    },
    mutations: {
        load_config(state, config){
            state.kyaras = config
        },
        load_run_config(state, config){
            var now = state.run
            now.kyara.id = config.kyara.id

            now.kyara.img.id = config.kyara.img.id
            now.kyara.img.path = config.kyara.img.path
            now.kyara.img.width = config.kyara.img.width
            now.kyara.img.height = config.kyara.img.height

            now.kyara.enable_sound = config.kyara.enable_sound
            
            now.kyara.x = config.kyara.x
            now.kyara.y = config.kyara.y
            now.kyara.zoom = config.kyara.zoom

            now.kyara.top = config.kyara.top
        },
        run_root_path(state, path){
            state.run.root_path = path
        },
        alarm_add(state, data){
            state.run.alarm[new Date().getTime()] = data
        },
        alarm_del(state, id){
            delete state.run.alarm[id]
        },
        kyara_setup(state, id){
            if(state.kyaras[id] != null){
                state.run.kyara.id = id
                this.commit('kyara_set_img', 'init')
                this.commit('kyara_set_xy', {
                    x: state.run.kyara.x,
                    y: state.run.kyara.y
                })
            }
        },
        kyara_set_img(state, id){
            var path = 'file://' + state.run.root_path + '/' + state.run.kyara.id + '/' + state.kyaras[state.run.kyara.id].images[id]
            state.run.kyara.img.id = id
            state.run.kyara.img.path = path
        },
        kyara_save_img_size(state, size){
            state.run.kyara.img.width = size.width
            state.run.kyara.img.height = size.height
        },
        kyara_set_xy(state, val){
            state.run.kyara.x = val.x
            state.run.kyara.y = val.y
        },
        kyara_set_zoom(state, val){
            state.run.kyara.zoom = val
            window.kyara_vue.kyara_zoom()
        },
        kyara_set_top(state, val){
            state.run.kyara.top = val
            window.kyara_window.setAlwaysOnTop(val)
        },
        kyara_set_enable_sound(state, val){
            state.run.kyara.enable_sound = val
        }
    }
})
