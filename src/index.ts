import app from './app';
import { AppDataSource } from './db/conexion';

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Base de datos conectada');
        app.listen(6505, () => {
            console.log("Server activo");
        });
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
        }
    }
}

main();