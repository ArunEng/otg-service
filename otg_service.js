const axios = require('axios').default
const _ = require('lodash')
const config = require('./config')
const OTG_SERVICE_URL = config.otg_service_url
let otg_service = {}

otg_service.getAttendance = async () => {
  let resp = {
    error: false
  }
  try {
    let attendance = await axios.get(`${OTG_SERVICE_URL}/attendance?api_key=${config.api_key}`)
    resp.data = attendance.data.data
  } catch (error) {
    console.log(error)
    resp.error = true
  }
  return resp
}

otg_service.updateAttendance = async (params) => {
  try {
    await axios.put(`${OTG_SERVICE_URL}/attendance?api_key=${config.api_key}`, { attendance: [params] })
  } catch (error) {
    console.log(error)
  }
}

module.exports = otg_service
