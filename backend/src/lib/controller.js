class Controller {
  constructor(model) {
    this.model = model;
  }

  /**
   * Return the result json and catch errors.
   * @param {Express.Response} res Express response.
   * @param {Promise} result Query result promise.
   */
  _handleResult(res, result) {
    if (!result) {
      res.status(500).send('Internal Error.');
      throw new Error('Result is required.');
    }

    result
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).send((err || {}).message || 'An unexpected error occurred.');
        console.error('An unexpected error occurred.', err);
      });
  }
}


module.exports = Controller;
