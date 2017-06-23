<template>
    <div>
        <div class="title">Information</div>

        <div class="items">
            <div class="item">
                <div class="name">Connect to:</div>
                <div class="value">
                    <input type="text" id="ipAddress" placeholder="0.0.0.0" v-if="notConnected"
                           @keyup.enter="connectTo">
                    <p v-if="!notConnected"> {{ connectedTo }}
                        <button @click="disconnect">Disconnect</button>
                    </p>
                </div>
            </div>
            <div class="item">
                <div class="name">Time:</div>
                <div class="value">{{ time }}</div>
            </div>
            <div class="item">
                <div class="name">Path:</div>
                <div class="value">{{ path }}</div>
            </div>
            <div class="item">
                <div class="name">Route Name:</div>
                <div class="value">{{ name }}</div>
            </div>
            <div class="item">
                <div class="name">Vue.js:</div>
                <div class="value">{{ vue }}</div>
            </div>
            <div class="item">
                <div class="name">Electron:</div>
                <div class="value">{{ electron }}</div>
            </div>
            <div class="item">
                <div class="name">Node:</div>
                <div class="value">{{ node }}</div>
            </div>
            <div class="item">
                <div class="name">Platform:</div>
                <div class="value">{{ platform }}</div>
            </div>
        </div>
    </div>
</template>

<script>
  import Notifier from 'node-notifier'
  import SocketIOClient from 'socket.io-client'
  export default {
    data () {
      return {
        notConnected: true,
        connectedTo: null,
        time: new Date().toLocaleTimeString(),
        electron: process.versions['atom-shell'],
        name: 'landing-page',
        node: process.versions.node,
        path: '/',
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    },
    watch: {
      time(n, o) {
        let s = "ss:ww:12"
//        console.log(n.match(/^(\d+):(\d+):(\d+)$/)[3].charAt(1) == 0 ? 'Zehn Sekunden' : '')
        n.match(/^(\d+):(\d+):(\d+)$/)[3] == "00"
          ? Notifier.notify({
          title: "",
          message: "Eine Minute"
        })
          : ''
      }
    },
    methods: {
      connectTo(e) {
        e.preventDefault()
        e.stopPropagation()
        let sock = new SocketIOClient(`http://${e.target.value}:3000`);
        sock.emit('connected', null)
        sock.on('server.infos', (d) => console.log(d))
        this.connectedTo = sock.toString()
        this.notConnected = false
      },
      disconnect(e) {
        e.preventDefault()
        e.stopPropagation()
        this.notConnected = true
        this.connectedTo = null
      }
    },
    mounted() {
      setInterval(() => this.time = new Date().toLocaleTimeString(), 1000)
    }
  }
</script>

<style scoped>
    .title {
        color: #888;
        font-size: 18px;
        font-weight: initial;
        letter-spacing: .25px;
        margin-top: 10px;
    }

    .items {
        margin-top: 8px;
    }

    .item {
        display: flex;
        margin-bottom: 6px;
    }

    .item .name {
        color: #6a6a6a;
        margin-right: 6px;
    }

    .item .value {
        color: #35495e;
        font-weight: bold;
    }
</style>
