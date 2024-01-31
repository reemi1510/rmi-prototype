//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit');
const bodyParser = require('body-parser');
const defaults = require('./data/session-data-defaults');
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.use(bodyParser.urlencoded({ extended: true}));

router.get('/', function(req, res) {
    res.render('index');
});

router.post('/user', function (req, res) {
    const userType = req.body['user-type'];

    if (!userType) {
        return res.render('index', {error: 'please select a user type' });
    }

    req.session.userType = userType;

    res.redirect('/tasks')
});

router.get('/tasks', function(req, res) {
    const userType = req.session.userType || 'user_one';
    const selectedUserData = defaults[userType];

    res.render('tasks', { userType, data: selectedUserData });
});

router.get('/report-no-business', function(req, res) {
    const userType = req.session.userType || 'user_one';
    const selectedUserData = defaults[userType];

    selectedUserData.forEach(task => {
        task.selected = task.selected? false : task.selected;
    });
    
    res.render('report-no-business', { userType, data: selectedUserData });
});

router.post('/update-selected-tasks', function(req, res) {
    const userType = req.session.userType || 'user_one';
    const selectedUserData = defaults[userType];
    const selectedTaskIds = req.body.selectedTasks || [];

    selectedUserData.forEach(task => {
        task.selected = selectedTaskIds.includes(task.id);
    });

    defaults[userType] = selectedUserData;
    
    res.redirect('/confirm-no-business');
});

router.get('/confirm-no-business', function(req, res) {
    const userType = req.session.userType || 'user_one';
    const selectedUserData = defaults[userType];

    res.render('confirm-no-business', { userType, data: selectedUserData })
});

router.post('/complete-selected-tasks', function(req, res) {
    const userType = req.session.userType || 'user_one';
    const selectedUserData = defaults[userType];

    selectedUserData.forEach(task => {
        task.status = task.selected? 'completed' : task.status;
        task.updated_at = task.selected? updateDateField(task) : task.updated_at;
    });

    defaults[userType] = selectedUserData;
    
    res.redirect('/task-complete');
});

router.get('/task-complete', function(req, res) {
    const userType = req.session.userType || 'user_one';
    const selectedUserData = defaults[userType];

    res.render('task-complete', { userType, data: selectedUserData });
});

router.get('/completed-tasks', function(req, res) {
    const userType = req.session.userType || 'user_one';
    const selectedUserData = defaults[userType];
    const filteredTasks = filterTasksByStatus(selectedUserData, 'completed');

    res.render('completed-tasks', { userType, data: filteredTasks });
});

router.get('/reset', function(req, res) {
    const userOneTasks = defaults['user_one'] || [];
    const userTwoTasks = defaults['user_two'] || [];

    userOneTasks.forEach(task => {
        if (task.status === 'completed') {
            task.status = 'unstarted';
        }
        if (task.selected) {
            task.selected = false;
        }
    });

    userTwoTasks.forEach(task => {
        if (task.status === 'completed') {
            task.status = 'unstarted';
        }
        if (task.selected) {
            task.selected = false;
        }
    });

    defaults['user_one'] = userOneTasks;
    defaults['user_two'] = userTwoTasks;

    res.redirect('/');
});

function updateDateField(task) {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    return formattedDate;
}

function formatDate(date) {
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
        timeZone: 'UTC'
    };
    
    return date.toLocaleString('en-GB', options).replace(/ at /, ' ');
}

function filterTasksByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
}