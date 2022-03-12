module.exports = (req, res, next)=>{
    console.log(`${req.method} COMING IN AT ${req.url}`)
    next()
}