const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// New Post route.
router.post('/', withAuth, async (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    console.log("req.session: ",req.session )
    if (req.body.title === "" || req.body.post_comment === "") {
      res.status(400).json({message: "Missing title and/or comment."})
      return;
    }
    const postData = await Post.create({
      title: req.body.title,
      post_comment: req.body.post_comment,
      user_id: req.session.user_id
    })
    console.log("postData: ",postData )
    // res.status(200).json(postData)
    res.status(200).json({message: "Post Created"})
      
   } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;