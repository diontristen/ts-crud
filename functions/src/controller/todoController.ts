import { Response } from 'express'
import { db } from '../config/firebase.config'

type TodoType = {
    name: string,
    todo: string,
}

type Request = {
    body: TodoType,
    params: {
        todoId: string
    }
}

const addEntry = async (req: Request, res: Response) => {
    const {name, todo} = req.body
    try {
        const entry = db.collection('todo').doc()

        const todoObject = {
            id: entry.id,
            name,
            todo
        }

        entry.set(todoObject)

        res.status(200).send({
            status: 'success',
            message: 'Todo added successfully',
            data: todoObject
          })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getAllEntries = async (req: Request, res: Response) => {
    try {
        const todos: TodoType[] = []
        const querySnapshot = await db.collection('todo').get()
        querySnapshot.forEach((doc: any) => todos.push(doc.data()))
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateEntry = async (req: Request, res: Response) => {
    const {body: { name, todo}, params: { todoId }} = req

    try {
        const myTodo = db.collection('todo').doc(todoId)
        const currentData = (await myTodo.get()).data() || {}
        
        const todoObject = {
            title: name || currentData.name,
            text: todo || currentData.todo
        }

        await myTodo.set(todoObject)
        .catch(error => {
            return res.status(400).json({
                status: 'error',
                message: error.message
            })
        })

        res.status(200).json({
            status: 'success',
            message: 'entry updated succesfully',
            data: todoObject
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteEntry =  async (req: Request, res: Response) => {
    try {
        const { todoId } = req.params
        
        const todo = db.collection('todo').doc(todoId)

        await todo.delete()
        .catch(error => {
            return res.status(400).json({
                status: 'error',
                message: error.message
            })
        })

        res.status(200).json({
            status: 'success',
            message: 'entry deleted succesfully'
        })
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export { addEntry, getAllEntries, updateEntry, deleteEntry }
