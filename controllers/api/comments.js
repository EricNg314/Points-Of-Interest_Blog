const router = require('express').Router();
const { Comment } = require('../../models');
const {withAuth, withRecaptcha} = require('../../utils/auth');

// New comment route.
router.post('/', withAuth, withRecaptcha, async (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    // console.log("req.session: ",req.session )
    if (req.body.comment_text === "") {
      res.status(400).json({message: "Missing comment."})
      return;
    }
    const commentData = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
    console.log("commentData: ",commentData )
    res.status(200).json({message: "Comment Created"})
      
   } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;