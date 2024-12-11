const Task = require('../models/task');

exports.getTasks = async (req, res, next) => {

    try {

        const tasks = await Task.findAll({
            where: { userId: req.user.id },
        });
        res.json(tasks);

    } catch (error) {

        console.error('Error fetching tasks: ', error);
        next(error);

    }

};

// get details of a single task using its id
exports.getTaskById = async (req, res) => {
    const { id } = req.params;

    try {

        const task = await Task.findOne({
            where: {
                id,
                userId: req.user.id,
            },
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }
        res.json(task);

    } catch (error) {

        console.error("Error fetching task: ". error.message);
        res.status(500).json({ message: 'Server error.' })

    }
};

exports.createTask = async (req, res, next) => {

    try {

        // ensure user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'User authentication failed. No user ID found.'});
        }

        const { title, description, dueDate, priority, status } = req.body;

        const newTask = await Task.create({ 
            title, 
            description, 
            dueDate, 
            priority,
            status,
            userId: req.user.id,
        });
        
        res.status(201).json(newTask);

    } catch (error) {

        console.error('Error creating task: ', error.message);
        next(error);

    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    try {

        // find task using ID
        const task = await Task.findOne({
            where: {id, userId: req.user.id},
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // update task fields
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;

        await task.save();

        res.json({ message: 'Task updated successfully', task });

    } catch (error) {

        console.error('Error updating task: ', error);
        res.status(500).json({ message: 'Server error' });

    }
};

exports.deleteTask = async (req, res, next) => {
    
    // finding the task using ID
    try {

        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // delete the found task
        await task.destroy();

        res.json({ message: 'Task deleted successfully' });

    } catch (error) {
        
        console.error('Error deleting task: ', error);
        next(error);

    }
};