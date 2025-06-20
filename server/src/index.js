import express from 'express'
import router from './routes/user/user.router.js'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, '..', 'uploads');

app.use(cors())
app.use(express.json())
app.use(router)
app.use('/uploads', express.static(path.join(uploadsPath)));

app.listen(8081, () => {
    console.log(`Servidor ouvindo na porta: 8081`)
})