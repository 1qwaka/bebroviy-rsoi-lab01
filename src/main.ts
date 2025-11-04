import { buildApp } from 'main/server';



// app.get('/api/v1/persons', (req, res) => {
//     res.json(persons)
// })

// app.get('/api/v1/person/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const person = persons.find(p => p.id === id);

//     console.log(person)

//     if (person) {
//         res.json(person)
//     } else {
//         res.status(404).json({
//             message: 'Not found Person for ID: ' + id,
//         })
//     }
// })

// app.post('/api/v1/person', (req, res) => {
//     const valid = PersonSchema.omit({ id: true }).safeParse(req.body);
//     if (!valid.success) {
//         res.status(400).json({
//             message: 'Invalid request',
//             errors: valid.error.issues.reduce((errors, issue) => {
//                 errors[issue.path.join('.')] = issue.message;
//                 return errors;
//             }, {} as Record<string, string>)
//         });
//         return;
//     }
//     const person: Person = {
//         ...valid.data,
//         id: persons.reduce((id, p) => id > p.id ? id : p.id, 0) + 1,
//     }
//     persons.push(person);
//     res.setHeader('Location', person.id)
//     res.status(201).send()
// })

// app.delete('/api/v1/person/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const personId = persons.findIndex(p => p.id === id);
//     if (personId === -1) {
//         res.status(404).send();
//         return;
//     }

//     persons.splice(personId);
//     res.status(204).send();
// })

// app.patch('/api/v1/person/:id', (req, res) => {
//     const valid = PersonSchema.omit({ id: true }).safeParse(req.body);
//     if (!valid.success) {
//         res.status(400).json({
//             message: 'Invalid request',
//             errors: valid.error.issues.reduce((errors, issue) => {
//                 errors[issue.path.join('.')] = issue.message;
//                 return errors;
//             }, {} as Record<string, string>)
//         });
//         return;
//     }

//     const id = parseInt(req.params.id)
//     const personId = persons.findIndex(p => p.id === id);
//     if (personId === -1) {
//         res.status(404).send();
//         return;
//     }

//     persons.splice(personId);
//     res.status(204).send();
// });

// TODO мидлвар который отвечает на запрос к несуществующей ручке

const app = buildApp()
const port = 3000;

app.listen(port, err => {
    if (err) {
        console.error('Failed to start server on port', port, 'error:', err)
    } else {
        console.log('Server started on port', port)
    }
})
