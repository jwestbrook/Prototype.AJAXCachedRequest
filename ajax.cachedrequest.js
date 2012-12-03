Ajax.CachedRequest = Class.create(Ajax.Request, {
  initialize: function($super, url, options) {
    options = options || {};
    var onSuccess = options.onSuccess || Prototype.K;
    if (!Ajax.CachedRequest.cache[url] || options.reload) {
      options.onSuccess = function(transport) {
        Ajax.CachedRequest.cache[url] = transport.responseText;
        onSuccess(transport);
      }
      $super(url, options);
    } else {
      eval(Ajax.CachedRequest.cache[url]);
      this.dispatch.defer();
      [onSuccess, options.onComplete].each(function(m) { m && m() });
    }
  },

  dispatch: function() {
    Ajax.Responders.dispatch('onComplete', null);
  }
});

Ajax.CachedRequest.cache = {};