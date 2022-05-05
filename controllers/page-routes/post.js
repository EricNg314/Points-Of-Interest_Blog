const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/create', withAuth, async (req, res) => {
  res.render('createPost', {
    loggedIn: req.session.loggedIn
  })
})

router.get('/view/:id', withAuth, async (req, res) => {
// If not logged in, send to login page.
  // if (!req.session.loggedIn) {
  //   res.render('login');
  //   return;
  // }

  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_comment',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    console.log('postData: ', postData);
    const { id, title, created_at, post_comment} = postData.dataValues;
    const { username } = postData.dataValues.user.dataValues;

    const comments = postData.dataValues.comments.map((comment) => {
      let data = {}
      const {user, user_id, created_at, comment_text } = comment.dataValues;
      data.username = user.dataValues.username;
      data.user_id = user_id;
      data.created_at = created_at;
      data.comment_text = comment_text;
      // console.log('comment.dataValues: ', comment.dataValues)
      return data;
    })

    const postInfo = {};
    postInfo.id = id;
    postInfo.title = title;
    postInfo.created_at = created_at;
    postInfo.post_comment = post_comment;
    postInfo.comments = comments;
    postInfo.username = username;

    console.log('postInfo: ', postInfo)

    res.render('viewPost', {
      postInfo: postInfo,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    })
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})


module.exports = router;