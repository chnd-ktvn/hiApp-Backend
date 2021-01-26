const multer = require('multer')
const { getUserProfileById } = require('../model/user')
const helper = require('../helper/response')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/user')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})
const fileFilter = (request, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true)
  } else {
    cb(new Error('Extension file must be png or jpg'), false)
  }
}
const maxSize = 2 * 1024 * 1024
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize }
}).single('user_photo')

const uploadFilter = async (req, res, next) => {
  const { id } = req.params
  const checkUserId = await getUserProfileById(id)
  if (checkUserId.length > 0) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return helper.response(res, 400, err.message)
      } else if (err) {
        return helper.response(res, 400, err.message)
      }
      next()
    })
  } else {
    return helper.response(res, 404, `Id User ${id} is Not Found!`)
  }
}
module.exports = uploadFilter
