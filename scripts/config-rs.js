var config = {
  "_id": "dbrs",
  "version": 1,
  "members": [
    {
      "_id": 1,
      "host": "localhost:27017",
      "priority": 2
    }
  ]
};
rs.initiate(config, { force: true });
