// Set up SQLITE database

const sqlite3 = require("sqlite3").verbose();
const constants = require("./constants");
const dummyData = require("./dummyData");

let db = new sqlite3.Database(constants.DB_FILE);

// Create Tables
const createTable = (table, columns, unique = [], foreignKeys = []) => {
  return new Promise((resolve, reject) => {
    // Always make id unique
    unique.push("id");
    // Parse JSON columns to string for SQLite
    const columnString = Object.entries(columns)
      .map(([name, type]) => {
        return `${name} ${type}`;
      })
      .join(", ");
    // Parse list of unique columns to string for SQLite
    const uniqueString = unique
      .map((column) => {
        return `${column}`;
      })
      .join(", ");

    let foreignKeyString = foreignKeys.join(", ");

    const query = `CREATE TABLE IF NOT EXISTS ${table} (${columnString}, ${`UNIQUE (${uniqueString}) ${
      foreignKeyString.length ? `, ${foreignKeyString}` : ""
    }`})`;
    db.run(query, [], (err) => {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    });
  });
};

const getRows = (table, columns = "*", where = {}) => {
  return new Promise((resolve, reject) => {
    // Parse JSON WHERE to string for SQLite
    const whereString = Object.entries(where)
      .map(([name, value]) => {
        return `${name} = ${value}`;
      })
      .join(" AND ");

    const query = `SELECT ${columns} FROM ${table} ${
      whereString.length ? `WHERE ${whereString}` : ""
    }`;
    db.all(query, [], (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

// Insert row into table
const insertRow = async (table, values) => {
  return new Promise((resolve, reject) => {
    let keys = Object.keys(values).filter((column) => {
      return column !== "id";
    });
    const columnString = keys
      .map((name) => {
        return `${name}`;
      })
      .join(", ");
    const valueString = Object.values(values)
      .map((value) => {
        return `'${value}'`;
      })
      .join(", ");
    const query = `INSERT INTO ${table} (${columnString}) VALUES (${valueString})`;
    db.run(query, [], (err) => {
      if (err) {
        return reject(err);
      } else {
        const lastIdQuery = `SELECT last_insert_rowid() as id`;
        db.get(lastIdQuery, [], (err, row) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(row.id);
          }
        });
      }
    });
  });
};

const updateRow = (table, values, where) => {
  return new Promise((resolve, reject) => {
    if(typeof values.id !== "undefined") {
      delete values.id; // cannot update id
    }
    const valueString = Object.entries(values)
      .map(([name, value]) => {
        return `${name} = '${value}'`;
      })
      .join(", ");
    const whereString = Object.entries(where)
      .map(([name, value]) => {
        return `${name} = '${value}'`;
      })
      .join(" AND ");
    const query = `UPDATE ${table} SET ${valueString} WHERE ${whereString}`;
    db.run(query, [], (err) => {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    });
  });
};

const encrypt = (text) => {
 // TODO: encrypt
  return text;
};

// Close database
const dbClose = () => {
  db.close();
};

const dbSetup = () => {
  return new Promise(async (resolve, reject) => {
    // Create tables
    try {
      await createTable(
        constants.TABLE_DEVICES_NAME,
        constants.TABLE_DEVICES_COLUMNS
      );
      await createTable(
        constants.TABLE_CHANNELS_NAME,
        constants.TABLE_CHANNELS_COLUMNS,
        [],
        [constants.FOREIGN_KEY_CONSTRAINT("deviceId", "devices", "id")]
      );
      await createTable(
        constants.TABLE_SETTINGS_NAME,
        constants.TABLE_SETTINGS_COLUMNS,
        [],
        [constants.FOREIGN_KEY_CONSTRAINT("deviceId", "devices", "id")]
      );
      // add dummy data
      // for (let device of dummyData.devices) {
      //   db.insertRow(
      //     constants.TABLE_DEVICES_NAME,
      //     device
      //   );
      // }
      // for (let channel of dummyData.channels) {
      //   db.insertRow(
      //     constants.TABLE_CHANNELS_NAME,
      //     channel
      //   );
      // }
      return resolve();
    } catch (err) {
      return reject(err);
    }
  });
};

db.setupDb = dbSetup;
db.closeDb = dbClose;
db.insertRow = insertRow;
db.updateRow = updateRow;
db.getRows = getRows;
db.encrypt = encrypt;

module.exports = db;
