var aws = require ('aws-sdk');

aws.config.update({
   accessKeyId: 'AKIAIVTYA47IOX5BHNWA',
   secretAccessKey: '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'
});

exorts = module.exports ={
    sign: function(filename, filetype){
        var s3 = new aws.S3();

        var params={
            Bucket:fluffybugtrackerprivate,
            Key: req.params.file.name,
            Expires:60,
            ContentType: req.params.file,
        };
        s3.getSignedUrl('#####', params,function(err, data)
    {
        if(err){
            console.log(err);
            return err;

        }else
        return data;
    });
    }
}