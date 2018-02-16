const sqlite3 = require('sqlite3').verbose()
const userTable = process.env.USER_TABLE
const db = new sqlite3.Database(process.env.DATABASE)

function Database () {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS ${userTable} (user_id TEXT, balance INT)`)
  })
}

Database.prototype.getUser = function (userID, cb) {
  db.get(`SELECT * FROM ${userTable} WHERE user_id = ?`, userID, (err, rows) => {
    cb(err, rows)
  })
}

Database.prototype.insertUser = function (userID, balance, cb) {
  db.run(`INSERT INTO ${userTable} (user_id, balance) VALUES (?,?);`, [userID, balance], (err) => {
    cb(err)
  })
}

Database.prototype.dropUser = function (userID, cb) {
  db.run(`DELETE FROM ${userTable} WHERE user_id=?;`, userID, (err) => {
    cb(err)
  })
}

Database.prototype.getBalance = function (userID, cb) {
  db.get(`SELECT balance FROM ${userTable} WHERE user_id=?;`, userID, (err, row) =>{
    if (err) {
      cb(error, null)
    }
    cb(null, row.balance)
  })
}

Database.prototype.updateBalance = function (userID, amount, cb) {
  db.run(`UPDATE ${userTable} SET balance = ? WHERE user_id = ?;`, [amount, userID], (err) => {
    cb(err)
  })
}
// http://yizhang82.me/async-sqlite-as-promise

module.exports = Database
