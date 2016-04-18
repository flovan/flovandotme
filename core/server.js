const path = require('path');
const express = require('express');
const webpack = require('webpack');

const config = require('./config/webpack.config');
const compiler = webpack(config);

const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    // publicPath: config.output.publicPath,
	stats: { colors: true, cached: false }
}));

app.use(require('webpack-hot-middleware')(compiler));

// app.use('/public', express.static('public'));

app.use(express.static('.'));

// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

app.listen(1337, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:1337');
});
