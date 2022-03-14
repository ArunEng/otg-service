const schedule = require('node-schedule')
const otg_service = require('./otg_service')
const otg_model = require('./otg_model')

let jobs = {}
let jobRunning = false

jobs.scheduleJobs = () => {
  try {
    schedule.scheduleJob('*/1 * * * *', async () => {
      if (!jobRunning) {
        jobRunning = true
        let resp = await otg_service.getAttendance()
        if (!resp.error && resp.data.length > 0) {
          console.log('received attendance data length:::', resp.data.length)
          for (let att of resp.data) {
            let update = await otg_model.update(att)
            if (!update.error && update.result.rowsAffected.length > 0) {
              await otg_service.updateAttendance(att)
            }
          }
        }
        jobRunning = false
      }
    })
  } catch (error) {
    console.log(error)
    jobRunning = false
  }
}

module.exports = jobs
