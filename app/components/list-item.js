import Component from '@ember/component';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';

export default Component.extend({
    tagName: "div",
    classNames: ["mb-1", "mx-4", "py-2", "px-2", "rounded", "text-grey-darker", "relative"],
    classNameBindings: ["isHeading::bg-white"],
    editing: false,
    isHeading: computed('item.name', function (){
        return (this.get('item.name').trim().endsWith(':'))
    }),
    originalName: "",
    actions: {
        toggleEdit() {
            this.set('editing', true);
            this.set('originalName', this.get('item').name);
            later(() => {
                document.querySelector('input.item-editor').focus();
                document.querySelector('input.item-editor').select();
            },200);
        },
        save() {
            this.get('item').save();
            this.set('editing', false);
        },
        cancel() {
            this.set('editing', false);
            this.set('item.name', this.get('originalName'));
            this.set('originalName', "");
        },
        delete() {
            this.get('item').deleteRecord();
            this.get('item').save();
        },
    }
});
