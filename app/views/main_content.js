// Currently used to determine the height of list-views
var MainContentView = Ember.View.extend({
  classNames: ['app__main-content'],
  height: Ember.computed.alias('controller.contentHeight'),

  didInsertElement: function() {
    this._super();

    Ember.$(window).on('resize.view-' + this.get('elementId'), function() {
      Ember.run.debounce(this, 'updateHeight', 200);
    }.bind(this));
    this.updateHeight();
  },

  updateHeight: function() {
    // could be destroyed but with debounce pending
    if (this.$()) {
      this.set('height', this.$().height());
    }
  },

  willDestroyElement: function() {
    Ember.$(window).off('.view-' + this.get('elementId'));
  },
});

export default MainContentView;
