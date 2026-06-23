const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3005;

app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(express.json()); 

mongoose.connect('mongodb://127.0.0.1:27017/pocket-budget');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));

db.once('open', async () => {
    console.log('MongoDB подключено.');
    const count = await Category.countDocuments();
    if (count === 0) {
        const defaultCategories = [
            { title: 'Продукты', icon: '', limit: 0 },
            { title: 'Транспорт', icon: '', limit: 0 },
            { title: 'Кафе и рестораны', icon: '', limit: 0 },
            { title: 'Развлечения', icon: '', limit: 0 },
            { title: 'Жилье и ЖКХ', icon: '', limit: 0 },
            { title: 'Другое', icon: '', limit: 0 }
        ];
        await Category.insertMany(defaultCategories);
        console.log('Базовые категории расходов успешно добавлены в БД!');
    }
});

// СХЕМЫ
const transactionSchema = new mongoose.Schema({
    amount: Number,
    type: String, 
    category: String,
    comment: String,
    createdAt: String
});
const Transaction = mongoose.model('transaction', transactionSchema);

const categorySchema = new mongoose.Schema({
    title: String,
    icon: String,
    limit: Number
});
const Category = mongoose.model('category', categorySchema);

// РОУТЫ

// GET: Получить все транзакции (ВЫПОЛНЕНИЕ КРИТЕРИЯ: обработка query параметров ?type=expense или ?type=income)
app.get('/api/transactions', async (req, res) => {
    const { type } = req.query; 
    let filter = {};
    if (type) {
        filter.type = type; 
    }
    const list = await Transaction.find(filter).sort({ _id: -1 });
    res.send(list);
});

// POST: Добавить транзакцию (обработка body параметров)
app.post('/api/transactions', async (req, res) => {
    const newTx = new Transaction(req.body);
    await newTx.save();
    res.send({ success: true, data: newTx });
});

// DELETE: Удалить транзакцию
app.delete('/api/transactions/:id', async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);
    res.send({ success: true });
});

// GET: Получить категории
app.get('/api/categories', async (req, res) => {
    const list = await Category.find();
    res.send(list);
});

// PUT: Изменение лимита категории (обработка body параметров)
app.put('/api/categories/:id', async (req, res) => {
    const { limit } = req.body;
    await Category.findByIdAndUpdate(req.params.id, { limit: limit });
    res.send({ success: true });
});

app.listen(port, () => {
    console.log(`Бэкенд запущен: http://localhost:${port}`);
});