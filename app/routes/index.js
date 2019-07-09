import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        // var results = this.store.query('list-item', { orderBy: 'order' });
        return this.store.findAll('list-item');
    },
    actions: {
        refresh() {
            this.refresh();
        }
    }
});
