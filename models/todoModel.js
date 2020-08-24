const Todo = require('../database/mongodb');
module.exports = {
    insertTodo: async (title, done) => {
        console.log("adding todo with title " + title)
        return await Todo.create({
            title: title,
            done: done
        }).then((document,err ) => {
            if(err) return false;
            return document;
        });
    },
    doneTodo: async (done, todoId) => {
        console.log(" is changing status to " + done)
        return await Todo.findByIdAndUpdate(todoId, {"done": done}, {useFindAndModify: false, versionKey: false})
            .then((document,err ) => {
                if(err) return false;
                console.log("made check..." + document)
                return document._id;
            });
    },
    updateTodo: async (title, done, todoId) => {
        console.log("making update for..." +todoId)
       return await Todo.findByIdAndUpdate(todoId, { "title": title, "done": done}, {useFindAndModify: false, versionKey: false})
            .then((document,err ) => {
                if(err) return false;
                console.log("made update..." + document)
                return document._id;
            });
    },
    deleteTodo: async (todoId) => {
        console.log("removing todo with id" + todoId)
        return await Todo.deleteOne({_id: todoId})
            .then((document,err ) => {
                if(err) return false;
                return document.deletedCount;
            });
    },
    getTodos: async(sorted = 'asc', direction = -1, page = 0) => {
        let pageLimit = 5
        let returnobject = {};
        /**
         * Make sure page cant go -1
         */
        if(page < 0) {
            page = 0
        }
        console.log(page )
        /**
         * switch direction to a number for mongo
         */
        if(direction === 'asc') {
            direction = -1
        }if(direction === 'desc') {
            direction = 1
        }
        if(sorted === 'created') {
            returnobject.count = await Todo.countDocuments({})
            returnobject.data = await Todo.find({}).sort( { createdAt: direction } ).skip(page * pageLimit).limit(pageLimit)
            return returnobject
        } else if(sorted === 'updated') {
            returnobject.count = await Todo.countDocuments({})
            returnobject.data = await Todo.find({}).sort( { updatedAt: direction } ).skip(page * pageLimit).limit(pageLimit)
            return returnobject
        } else {
            return await Todo.find({}, {}).skip(page * pageLimit).limit(pageLimit)
        }
    },
    getTodo: async(todoId) => {
        return await Todo.findOne({_id: todoId}, {'title': 1, 'done': 1})
    }
}