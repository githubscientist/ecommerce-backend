const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = unknownEndpoint;