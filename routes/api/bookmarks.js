const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Bookmarks = mongoose.model('Bookmarks');

//POST new user route (optional, everyone has access)
router.post('/', auth.required, (req, res, next) => {
  const userId = req.user.id;
  const bookmark = req.body.bookmark;

  if(!bookmark.url) {
    return res.status(422).json({
      errors: {
        url: 'is required',
      },
    });
  }

  bookmark.userId = userId;
  const finalBookmark = new Bookmarks(bookmark);

  return finalBookmark.save()
    .then(() => res.json({ bookmark: finalBookmark }));
});

//GET current route (required, only authenticated users have access)
router.get('/', auth.required, (req, res, next) => {
  const userId = req.user.id;

  return Bookmarks.find({userId: userId})
    .then((bookmarks) => {
      return res.json({ bookmarks: bookmarks });
    });
});

//GET current route (required, only authenticated users have access)
router.get('/:id', auth.required, (req, res, next) => {
  const userId = req.user.id;
  const bookmarkId = req.params.id;

  return Bookmarks.findById({userId: userId, _id: bookmarkId})
    .then((bookmark) => {
      if(!bookmark) {
        return res.sendStatus(404);
      }

      return res.json({ bookmark: bookmark });
    });
});

module.exports = router;