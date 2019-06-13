var Post = require('../model/post');

module.exports.getPost = (req, res) => {
    console.log(req.body.skip);
    Post.find()
        .skip(req.body.skip)
        .limit(5)
        .then((docs) => {
            res.json({ success : true, message : 'Loading posts..', data : docs });
        })
        .catch(err => res.json({ success : false, message : err.message, data :null }));
}