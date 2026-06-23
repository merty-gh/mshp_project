<script>
    import axios from 'axios';
    import dayjs from 'dayjs';

    export default {
        data() {
            return {
                amount: null,
                type: 'expense',
                category: 'Продукты',
                comment: '',
                categories: [], // Категории расходов из БД
                incomeCategories: ['Зарплата', 'Стипендия', 'Фриланс', 'Подарок', 'Прочее'] // Категории доходов
            }
        },
        computed: {
            availableCategories() {
                if (this.type === 'income') {
                    return this.incomeCategories;
                }
                return this.categories.map(cat => cat.title);
            }
        },
        watch: {
            type(newType) {
                if (newType === 'income') {
                    this.category = 'Зарплата';
                } else if (this.categories.length > 0) {
                    this.category = this.categories[0].title;
                }
            }
        },
        mounted() {
            this.loadCategories();
        },
        methods: {
            async loadCategories() {
                let response = await axios.get('/api/categories');
                this.categories = response.data;
                if (this.type === 'expense' && this.categories.length > 0) {
                    this.category = this.categories[0].title;
                }
            },
            async submitForm() {
                let formattedDate = dayjs().format('DD.MM.YYYY HH:mm');

                let transactionData = {
                    amount: Number(this.amount),
                    type: this.type,
                    category: this.category,
                    comment: this.comment,
                    createdAt: formattedDate
                };

                await axios.post('/api/transactions', transactionData);
                this.$router.push({ name: 'home' });
            }
        }
    }
</script>

<template>
    <div class="container mt-4">
        <div class="card shadow-sm">
            <div class="card-header bg-light">
                <h5 class="mb-0 text-dark fw-bold">Новая операция</h5>
            </div>
            <div class="card-body">
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label class="form-label text-muted small fw-bold">Сумма (руб.)</label>
                        <input v-model="amount" type="number" class="form-control" required placeholder="0.00">
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-muted small fw-bold">Тип операции</label>
                        <select v-model="type" class="form-select" @change="category = availableCategories[0]">
                            <option value="expense">Расход</option>
                            <option value="income">Доход</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-muted small fw-bold">Категория</label>
                        <select v-model="category" class="form-select">
                            <option v-for="catTitle in availableCategories" :key="catTitle" :value="catTitle">
                                {{ catTitle }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-muted small fw-bold">Комментарий</label>
                        <input v-model="comment" type="text" class="form-control" placeholder="Укажите детали (необязательно)">
                    </div>

                    <button type="submit" class="btn btn-primary w-100">Сохранить проводку</button>
                </form>
            </div>
        </div>
    </div>
</template>