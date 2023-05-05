module.exports.index = function (req, res) {
    return res.json(200, {
        data: {
            message: "Posts list from v2",
            posts: []
        }
    })
}