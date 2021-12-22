const { app } = require('./app');
const recordRoute = require('./record');
const userRoute = require('./user');

app.use('/api/record', recordRoute);
app.use('/api/user', userRoute);
