import DS from 'ember-data';
const { attr } = DS;
import { computed } from '@ember/object';
import Ember from 'ember';
const htmlEscape = Ember.Handlebars.Utils.escapeExpression;

export default DS.Model.extend({
    name: attr('string'),
    order: attr('number'),
    isTicked: attr('boolean'),
    formattedName: computed('name', function() {
        return htmlEscape(this.get('name').trim().replace(/:+$/,'')).replace(/#(\S*)/g,'<span class="inline-block bg-grey text-grey-darkest rounded p-1 text-xs">$1</span>')
    }),
    isHeading: computed('name', function() {
        if(this.get('name').trim().substring(this.get('name').trim().length - 1) == ":") {
            return true;
        }
    })
});
