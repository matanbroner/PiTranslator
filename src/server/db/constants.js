module.exports = (() => {
  // Column Types
  const COLUMN_TYPE_ID = "INTEGER PRIMARY KEY AUTOINCREMENT";
  const COLUMN_TYPE_INTEGER = "INTEGER";
  const COLUMN_TYPE_TEXT = "TEXT";
  const COLUMN_TYPE_REAL = "REAL";
  const COLUMN_TYPE_BLOB = "BLOB";
  const COLUMN_TYPE_NULL = "NULL";

  return {
    // Database Config
    DB_FILE: "db.sqlite3",

    // Column Types
    COLUMN_TYPE_ID,
    COLUMN_TYPE_INTEGER,
    COLUMN_TYPE_TEXT,
    COLUMN_TYPE_REAL,
    COLUMN_TYPE_BLOB,
    COLUMN_TYPE_NULL,

    // Database Tables
    TABLE_DEVICES_NAME: "devices",
    TABLE_DEVICES_COLUMNS: {
      id: COLUMN_TYPE_ID,
      name: COLUMN_TYPE_TEXT,
      mac: COLUMN_TYPE_TEXT,
    },

    TABLE_CHANNELS_NAME: "channels",
    TABLE_CHANNELS_COLUMNS: {
      id: COLUMN_TYPE_ID,
      topic: COLUMN_TYPE_TEXT,
      name: COLUMN_TYPE_TEXT,
      restricted: COLUMN_TYPE_INTEGER,
      password: COLUMN_TYPE_TEXT,
    },
  };
})();
