module.exports = function (context, input, callback) {
    if (input.name) {
      context.storage.device.set('name', input.name, function (err) {
        if (err) callback(err)
  
        const message = nameManipulation(input.message, input.name)
        callback(null, { message })
      })
      return
    }
  
    context.storage.device.get('name', function (err, name) {
      if (err) return callback(err)
      if (!name) return callback(new Error('Please provide a name'))
  
      context.log.debug('Name was provided by storage')
      const message = nameManipulation(input.message, name)
      callback(null, { message })
    })
  }
  
  /**
   * @param {string} base base string to replace
   * @param {string} name name to replace
   */
  function nameManipulation (base, name) {
    return base.replace('World', name)
  }