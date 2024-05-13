import multer from 'multer'
let fileName = '';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      fileName = file.originalname 
      cb(null, Date.now() + '-' + fileName)
    }
  })
  
  const upload = multer({ storage: storage })

export {upload}