(function(){

  /*
   * Helper methods
   */
  const parse = message => {
    let parsedMessage = JSON.parse(message);
    if( !parsedMessage.hasOwnProperty('OP') ){
      throw new Error('Improperly formatted OP message.');
    }
    return parsedMessage;
  };

  // implicit return without brackets
  const create = (OP, payload) => JSON.stringify({
    OP,
    payload,
  });

  /*
   * OP codes
   */
  const ERROR = 'ERROR';

  /*
   * the module
   */
  const OP = {
    create,
    parse,
    ERROR,
  };


  /* Make this module available to Node and Browser */
  const root = this;
  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = OP;
    }
    exports.OP = OP;
  }
  else {
    root.OP = OP;
  }

}).call(this);