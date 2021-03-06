var View = require('ampersand-view');
var permissions = require('../../utils/permissions');
var services = require('./services.json');

var FormView = View.extend({

  template: require('./form.hbs'),

  events: {
    'click [data-hook=create]': 'onCreate'
  },

  render: function() {
    this.renderWithTemplate({services: services});
    return this;
  },

  onCreate: function() {
    var self = this;

    var domain = this.queryByHook('domain').value;
    var service = this.queryByHook('service').value;

    permissions.request(['tabs', 'webNavigation'], domain)
      .then(function() {
        return self.collection.create({
          domain: domain,
          service: service
        });
      })
      .then(function() {
        self.render();
      });
  }

});

module.exports = FormView;
