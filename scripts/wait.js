let conn;

while (conn === undefined) {
  try {
    conn = new Mongo("localhost:27017");
  }
  catch (Error) {
  }
  sleep(100);
}

const db = conn.getDB("test");
Result = db.runCommand('buildInfo');

print('Database ready!')
