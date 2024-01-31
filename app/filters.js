const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

addFilter('groupBySupplier', function (tasks) {
    const suppliers = {};

    tasks.forEach(task => {
        const supplierId = task.supplier.id;
        const taskStatus = task.status;
        const taskSelected = task.selected;

        if (!suppliers[supplierId]) {
            suppliers[supplierId] = [];
        }

        if (taskStatus === 'unstarted') {
            suppliers[supplierId].push(task);
        }
    });

    Object.keys(suppliers).forEach(supplierId => {
        if (suppliers[supplierId].length === 0) {
            delete suppliers[supplierId];
        }
    });

    return suppliers;
});

addFilter('groupBySelectedSupplier', function (tasks) {
    const suppliers = {};

    tasks.forEach(task => {
        const supplierId = task.supplier.id;
        const taskStatus = task.status;
        const taskSelected = task.selected;

        if (!suppliers[supplierId]) {
            suppliers[supplierId] = [];
        }

        if ( taskSelected === true) {
            suppliers[supplierId].push(task);
        }
    });

    Object.keys(suppliers).forEach(supplierId => {
        if (suppliers[supplierId].length === 0) {
            delete suppliers[supplierId];
        }
    });

    return suppliers;
});