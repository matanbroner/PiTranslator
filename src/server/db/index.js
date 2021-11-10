// Set up SQLITE database

const sqlite3 = require("sqlite3").verbose();
const constants = require("./constants");

let db = new sqlite3.Database(constants.DB_FILE);

// Create Tables
const createTable = async (table, columns) => {
  // Parse JSON columns to string for SQLite
  const columnString = Object.entries(columns)
    .map(([name, type]) => {
      return `${name} ${type}`;
    })
    .join(", ");
  const query = `CREATE TABLE IF NOT EXISTS ${table} (${columnString})`;
  db.run(query, [], (err) => {
    if (err) {
      return Promise.reject(err);
    } else {
      return Promise.resolve();
    }
  });
};

// Insert row into table
const insertRow = async (table, columns, values) => {
  const columnString = Object.entries(columns)
    .map(([name, _]) => {
      return `${name}`;
    })
    .join(", ");
  const valueString = Object.entries(values)
    .map(([_, value]) => {
      return `'${value}'`;
    })
    .join(", ");
  const query = `INSERT INTO ${table} (${columnString}) VALUES (${valueString})`;
  db.run(query, [], (err) => {
    if (err) {
      return Promise.reject(err);
    } else {
      return Promise.resolve();
    }
  });
};

// Close database
const dbClose = () => {
  db.close();
};

const dbSetup = async () => {
  // Create tables
  await createTable(
    constants.TABLE_DEVICES_NAME,
    constants.TABLE_DEVICES_COLUMNS
  );
};

db.dbSetup = dbSetup;
db.dbClose = dbClose;
db.dbInsertRow = insertRow;

module.exports = db;
