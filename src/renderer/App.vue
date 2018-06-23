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
        var BrowserWindow = this.$electron.remote.getCurrentWindow()
        var userData_path = this.$electron.remote.app.getPath('userData')
        this.$store.commit('run_root_path', userData_path + '/resources')
        this.$store.commit('kyara_setup', 'Zuihou')
        BrowserWindow.setPosition(this.$store.state.run.kyara.x, this.$store.state.run.kyara.y)
    }
  }
</script>

<style>
    .v-leave { opacity: 1; }
    .v-leave-active { transition: opacity .8s }
    .v-leave-to { opacity: 0; }
    .v-enter { opacity: 0; }
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
    }
</style>
