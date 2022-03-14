let otg_model = require('./otg_model')
let jobs = require('./job')

async function start() {
  try {
    let connect = await otg_model.connect()
    if (connect) {
      jobs.scheduleJobs()
    } else {
      console.log('Connection Error::')
    }
  } catch (error) {
    console.log(error)
    console.log('Unable to start serice')
  }
}

start()
