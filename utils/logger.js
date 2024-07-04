const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('Query: ', req.query)
    console.log('Params: ', req.params)
    console.log('Cookies: ', req.cookies)
    console.log('---')
    next()
}

module.exports = requestLogger;