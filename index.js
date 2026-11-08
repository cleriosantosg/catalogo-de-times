import express from 'express';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.use(express.static(join(__dirname, 'public')));

const times = [
  { id: 1, nome: "Grêmio", estadio: "Arena do Grêmio", cidade: "Porto Alegre" },
  { id: 2, nome: "Internacional", estadio: "Beira-Rio", cidade: "Porto Alegre" },
  { id: 3, nome: "Juventude", estadio: "Alfredo Jaconi", cidade: "Caxias do Sul" }
];

app.get('/', (req, res) => {
  res.render('index', { mensagem: "Bem-vindo ao Catálogo de Times Esportivos!" });
});

app.get('/times', (req, res) => {
  res.render('times', { listaTimes: times });
});

app.get('/times/:id', (req, res) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(404).render('nao-encontrado');
  }

  const idParam = Number(req.params.id);
  const timeEncontrado = times.find(t => t.id === idParam);

  if (!timeEncontrado) {
    return res.status(404).render('nao-encontrado');
  }

  res.render('detalhe', { time: timeEncontrado });
});

app.use((req, res) => {
  res.status(404).render('nao-encontrado');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});