import { Model } from 'ember-cli-mirage';
// const { attr } = DS;
import { computed } from '@ember/object';
import Ember from 'ember';
const htmlEscape = Ember.Handlebars.Utils.escapeExpression;

export default Model.extend({
    // name: attr('string'),
    // order: attr('number'),
    // isTicked: attr('boolean'),
    // formattedName: computed('name', function() {
    //     return htmlEscape(this.get('name').trim().replace(/:+$/,'')).replace(/#(\S*)/g,'<span class="inline-block bg-grey text-grey-darkest rounded p-1 text-xs">$1</span>')
    // })
});
