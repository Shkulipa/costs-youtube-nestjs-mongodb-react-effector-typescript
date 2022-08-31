export default () => ({
  database: {
    uri: process.env.SERVER_URL,
    DBname: process.env.DATABSE_NAME,
  },
});
