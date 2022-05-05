const router = require('express').Router();
const { Post, User, Comment } = require('../../models');


router.get('/', async (req, res) => {
  // If not logged in, send to login page.
    // if (!req.session.loggedIn) {
    //   res.render('login');
    //   return;
    // }
  
    try {
      const postData = await Post.findAll({
        limit: 50,
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
        ],
        order: [
          ['created_at', 'DESC']
        ]
      })
  
      if (!postData) {
        res.status(404).json({ message: 'No posts found.' });
        return;
      }
  
      const posts = postData.map((post) => {
        const data = {};
        const {id, post_comment, comments, created_at, title, user} = post.dataValues;

        data.id = id;
        data.post_comment = post_comment;
        data.comments = {}
        data.comments.length = comments.length;
        data.created_at = created_at;
        data.title = title;
        data.user = user.dataValues;
        return data;
      })
  
      res.render('homepage', {
        posts: posts,
        loggedIn: req.session.loggedIn,
        username: req.session.username
      })
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  })

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;