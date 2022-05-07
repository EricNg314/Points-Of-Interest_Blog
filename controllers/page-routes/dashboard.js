const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const {withAuth} = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
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
      ],
      order: [
        ['created_at', 'DESC']
      ]
    })

    // console.log('postData: ', postData)
    // .then(dbPostData => res.json(dbPostData))
    // .catch(err => {
    //   console.log(err);
    //   res.status(500).json(err);
    // });

    const posts = postData.map((post) => {
      let data = {}
      data = post.dataValues;
      data.user = post.dataValues.user.dataValues;
      return data;
    })

    console.log('posts: ', posts)


    res.render('dashboard', {
      posts: posts,
      loggedIn: req.session.loggedIn
    })
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})


module.exports = router;