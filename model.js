var speedtest = require('speedtest-net')
var roundTo = require('round-to')
var url = require('url')

module.exports = {
  state: {
    current: 'ping',
    ping: '',
    download: '',
    upload: '',
    data: null
  },
  reducers: {
    updateStats: (data, state) => data
  },
  subscriptions: {
    speedtest: (send, done) => {
      var st = speedtest({ maxTime: 20000 })

      function update (stats) {
        send('updateStats', stats, done)
      }

      st.once('testserver', (server) => {
        update({
          data: {
            server: map(server)
          },
          ping: `${Math.round(server.bestPing)} ms`,
          current: 'download'
        })
      })

      st.on('downloadspeedprogress', (speed) => {
        var dl = roundTo(speed, speed >= 10 ? 0 : 1)

        update({
          download: `${dl} Mbps (${toMBps(dl)} MBps)`
        })
      })

      st.on('uploadspeedprogress', (speed) => {
        var ul = roundTo(speed, speed >= 10 ? 0 : 1)

        update({
          upload: `${ul} Mbps (${toMBps(ul)} MBps)`
        })
      })

      st.once('downloadspeed', (speed) => {
        var dl = roundTo(speed, speed >= 10 ? 0 : 1)

        update({
          current: 'upload',
          download: `${dl} Mbps (${toMBps(dl)} MBps)`
        })
      })

      st.once('uploadspeed', (speed) => {
        var ul = roundTo(speed, speed >= 10 ? 0 : 1)

        update({
          current: '',
          upload: `${ul} Mbps (${toMBps(ul)} MBps)`
        })
      })

      st.on('data', (data) => {
        update({ data })
      })

      st.on('done', function () {
        console.log('done!')
      })

      st.on('error', (err) => {
        if (err.code === 'ENOTFOUND') {
          console.error('Please check your internet connection')
        } else {
          console.error(err)
        }
      })
    }
  }
}

function toMBps (n) { return n * (1 / 8) }

function map (server) {
  server.host = url.parse(server.url).host
  server.location = server.name
  server.distance = server.dist

  return server
}
