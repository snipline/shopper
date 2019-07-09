import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { observer } from '@ember/object';
import { once, bind, later } from '@ember/runloop';
// import { scheduleOnce } from '@ember/runloop';
import { sort } from '@ember/object/computed';

export default Controller.extend({
    state: "reading",
    isReading: computed("state", function() {
        return this.get('state') === "reading";
    }),
    newItem: "",
    active: null,
    isAdding: computed('newItem', function() {
        return !isEmpty(this.get('newItem'));
    }),
    sortedItems: sort('model', 'sortBy'),
    init() {
        this._super(...arguments);
        this.sortBy = ['order:asc', 'name:asc'];
    },
    updateOrder: observer('model.@each.order', function() {
        // this.model.reload();
        // once(() => {
        //     this.model.reload();
        // });
    }),
    actions: {
        save() {
            if(this.get('newItem').trim().length > 0) {
                var order = (this.model.get('lastObject')) ? this.model.get('lastObject').order + 1 : 0;

                var listItem= this.store.createRecord('list-item',{
                    name : this.get('newItem'),
                    isTicked: false,
                    order: order,
                });
                listItem.save();
                this.set('newItem', '');

                this.set('state', 'reading');
                window.scrollTo(0,document.body.scrollHeight);
            }
        }, 
        cancel() {
            this.set('newItem', '');
            this.set('state', 'reading');
        },
        beginAdding() {
            this.set('state', 'adding');

            later(() => {
                document.querySelector('#addInput').focus();
            }, 250);
        },
        toggleTicked(item) {
            item.set('isTicked', !item.isTicked);
            item.save();
        },
        sortEndAction: function() {
            this.model.forEach((item, index) => {
                if(index !== item.order) {
                    item.set('order', index);
                    item.save()
                }
            });
            this.send("refresh");
        },
        clearAll() {
            if(confirm("Are you sure you want to clear your grocery list?")) {
                this.model.forEach((item) => {
                    if(!item.isHeading) {
                        item.deleteRecord();
                        item.save();
                    }
                })
            }
        }
    }
});
