const express = require('express');
const app = express();
const morgan = require('morgan');
//Settings
app.set('port',process.env.PORT || 3000);
app.set('json spaces',2);
//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes
app.use(require('./routes/index'))
app.use('/api/get_states',require('./routes/get_states'))
app.use('/api/get_municipalities',require('./routes/get_municipalities'))
app.use('/api/get_suburb',require('./routes/get_suburb'))

//Server
app.listen(app.get('port'),() => {    
    console.log(`Server on port ${app.get('port')}`);
});