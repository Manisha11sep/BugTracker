module.exports = function( req, res, next ) {
    const { session } = req;
  
    if ( !session.user ) {
      session.user = { username: '', id: '', profile_pic: '' };
    } 
    
    next();
  };