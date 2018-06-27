<template>
  <div id="app">
        <transition>
            <router-view></router-view>
        </transition>
  </div>
</template>

<script>
  export default {
    name: 'desktop_erufin',
    created(){
        var my_vue = this
        var app = this.$electron.remote.app
        var BrowserWindow = this.$electron.remote.getCurrentWindow()
        var resources_path = app.getPath('userData') + '/resources'
        
        for(var r of app.my_config.kyara){
            this.$store.commit('load_config', {
                key: r.kyara,
                data: r.data
            })
        }
        if(app.my_config.run_data == null){
            this.$store.commit('run_root_path', resources_path)
            this.$store.commit('kyara_setup', app.my_config.kyara_id[0])
        }else{
            this.$store.commit('run_root_path', resources_path)
            this.$store.commit('load_run_config', app.my_config.run_data)
        }
        BrowserWindow.setPosition(this.$store.state.run.kyara.x, this.$store.state.run.kyara.y)
    }
  }
</script>

<style>
    .v-leave { opacity: 1; }
    .v-leave-active { transition: opacity .8s }
    .v-leave-to { opacity: .1; }
    .v-enter { opacity: .1; }
    .v-enter-active  { transition: opacity 1.5s }
    .v-enter-to { opacity: 1; }

    h1, h2, h3, h4, span{
        cursor: default;
        -webkit-user-select: none;
    }
    *{
        margin: 0;
        padding: 0;
    }
    body {
        background-color: transparent !important;
        font-family: setofont;
    }
    main{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
