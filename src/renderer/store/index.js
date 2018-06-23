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
                    path: '',
                    width: 0,
                    height: 0
                },
                x: 100,
                y: 80,
                zoom: 1,
                top: false
            },
            alarm:[
                {
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
            ]
        },
        kyaras: {
            'Zuihou': {
                name: '瑞鳳',
                images: {
                    'init':'0.png'
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
        run_root_path(state, path){
            state.run.root_path = path
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
        }
    }
})
