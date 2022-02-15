'use strict'
require('dotenv').config()
const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register({
    plugin: require('hapi-mongodb'),
    options: {
      url: process.env.DB_URL,
      settings: {
        useUnifiedTopology: true
      },
      decorate: true
    }
  })

  server.route(routes)

  await server.start()
  console.log('server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
