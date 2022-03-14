const mssql = require('mssql')
const config = require('./config')

let otg_model = {}

let connect = async () => {
  try {
    await new mssql.connect(config.db)
    let res = await new mssql.Request().query('SELECT CURRENT_TIMESTAMP')
    console.log(res)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

otg_model.update = async (params) => {
  let resp = {
    error: false
  }
  try {
    let request = new mssql.Request()
    let qry = `insert into "poc-arun".test.attendance(emp_id, punch_date_time,modified_date) values(@emp_id, @punch_date_time,@modified_date)`
    request.input('emp_id', mssql.VarChar, params.emp_id)
    request.input('punch_date_time', mssql.DateTime, new Date(params.punch_date_time))
    request.input('modified_date', mssql.DateTime, new Date())
    let result = await request.query(qry)
    resp.result = result
  } catch (error) {
    console.log(error)
    resp.error = true
  }
  return resp
}

module.exports = otg_model
module.exports.connect = connect
