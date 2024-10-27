import app from './app';
import { AppDataSource } from './databases/connection';
import { createClient } from 'redis';

const client = createClient();

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected.');
        await client.connect();
        app.listen(6505, () => {
            console.log("Server running.");
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

main();
export { client };