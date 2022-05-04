const appPort = process.env.SERVER_PORT || 8080;
const mongoClusterName = process.env.MONGO_CLUSTER;
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const dbName = process.env.MONGO_DB_NAME;
// Time to live for DB entries in seconds
const ttlDuration = process.env.TTL_DURATION || '30m';
const uri = `mongodb+srv://${mongoClusterName}:${mongoPass}@${mongoUser}.bnst9.mongodb.net/${dbName}?retryWrites=true&w=majority`;

module.exports = {
  appPort: appPort,
  uri: uri,
  ttlDuration: ttlDuration,
};
