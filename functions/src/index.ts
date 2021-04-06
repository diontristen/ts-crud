import * as functions from "firebase-functions"
import * as express from 'express'
import { addEntry, getAllEntries, updateEntry, deleteEntry } from './controller/todoController'
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const app = express()

app.get('/', (req, res) => res.status(200).send("Hello World"))
app.post('/todo', addEntry)
app.get('/todos', getAllEntries)
app.patch('/todo/:todoId', updateEntry)
app.delete('/todo/:todoId', deleteEntry)

exports.app = functions.https.onRequest(app)


