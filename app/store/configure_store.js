if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configure_store.prod');
} else {
    module.exports = require('./configure_store.dev');
}
