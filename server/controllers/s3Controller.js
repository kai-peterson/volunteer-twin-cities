const aws = require('aws-sdk');
require('dotenv').config();

aws.config.update({
    region: 'us-east-2',
    accessKeyId: process.env.S3_API_KEY,
    secretAccessKey: process.env.S3_SECRET_API_KEY,
})

const s3_bucket = process.env.Bucket

exports.s3_function = (req,res) => {
    const s3 = new aws.S3();  // Create a new instance of S3
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
  // Set up the payload of what we are sending to the S3 api
  console.log('About to set up s3Params');
  console.log("bucket=", s3_bucket);
  console.log("fileName=", fileName);
  console.log("fileType=", fileType);
    const s3Params = {
      Bucket: s3_bucket,
      Key: fileName,
      Expires: 50,
      ContentType: fileType,
      ACL: 'public-read'
    };
    console.log('About to make request to S3 API in sign_s3.js');
    console.log("S3Params=", s3Params);
  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        res.json({success: false, error: err})
      }
      // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
      const returnData = {
        signedRequest: data,
        url: `https://${s3_bucket}.s3.amazonaws.com/${fileName}`
      };
      res.json({success:true, data:{returnData}});
    });
  }
  
  

