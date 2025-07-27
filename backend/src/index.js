const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const Joi = require('joi');

const app = express();
const port = 5004;
app.use(cors());

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://cecelcecel415:Dayane1997@isothermica-contacts.gjushky.mongodb.net/?retryWrites=true&w=majority&appName=Isothermica-Contacts')
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Esquema atualizado para corresponder ao formulário HTML
const contatoSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true },
  phone: { type: String },
  service: { type: String, required: true }, // Alterado de subject para service
  message: { type: String, required: true, minlength: 10 },
}, { timestamps: true }); // Adicionando timestamps para registrar quando o documento foi criado/atualizado

const Contato = mongoose.model('Contato', contatoSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para buscar todos os contatos
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contato.find().sort({ createdAt: -1 }); // Ordena por mais recente
    res.json(contacts);
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os contatos.' });
  }
});

// Rota para enviar novo contato - atualizada para corresponder ao formulário
app.post("/contact", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().allow('').optional(), // Permite string vazia
    service: Joi.string().valid(
      'isolamento', 
      'caldeiraria', 
      'ar-condicionado', 
      'dutos', 
      'outros'
    ).required(), // Valida os valores possíveis do select
    message: Joi.string().min(10).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: "Dados inválidos",
      details: error.details.map((detail) => detail.message),
    });
  }

  try {
    const novoContato = new Contato(req.body);
    await novoContato.save();
    res.status(200).json({ message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar contato:", err);
    res.status(500).json({ error: "Erro ao salvar a mensagem." });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});