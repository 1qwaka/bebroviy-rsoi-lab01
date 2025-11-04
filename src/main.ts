import { env } from '@shared/env';
import { buildApp } from 'main/server';

// TODO мидлвар который отвечает на запрос к несуществующей ручке


const app = buildApp()
const port = env.port;

app.listen(port, err => {
    if (err) {
        console.error('Failed to start server on port', port, 'error:', err)
    } else {
        console.log('Server started on port', port)
    }
})
