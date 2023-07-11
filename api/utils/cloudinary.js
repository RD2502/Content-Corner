const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dotxdfbtp', 
    api_key: '724861826114664', 
    api_secret: 'bs8RtdUa6F12nXnEP2wB56beoyM' 
  });
module.exports=cloudinary;