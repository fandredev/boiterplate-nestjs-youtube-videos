export default () => ({
  port: parseInt(process.env.APP_PORT) || 3000,
  database: {
    host: '',
    port: 5432,
  },
});
