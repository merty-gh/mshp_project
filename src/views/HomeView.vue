<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                transactions: []
            }
        },
        computed: {
            totalBalance() {
                return this.transactions.reduce((sum, tx) => {
                    return tx.type === 'income' ? sum + tx.amount : sum - tx.amount;
                }, 0);
            }
        },
        mounted() {
            this.loadTransactions();
        },
        methods: {
            async loadTransactions() {
                let response = await axios.get('/api/transactions');
                this.transactions = response.data;
            },
            async deleteTx(id) {
                if(confirm("Вы уверены, что хотите удалить запись об операции?")) {
                    await axios.delete(`/api/transactions/${id}`);
                    this.loadTransactions();
                }
            }
        }
    }
</script>

<template>
    <div class="container mt-4">
        <div class="card p-4 mb-4 shadow-sm bg-light border">
            <span class="text-muted text-uppercase tracking-wider small fw-bold text-center d-block">Состояние счета</span>
            <h1 class="display-5 fw-bold text-center mt-1" :class="totalBalance >= 0 ? 'text-success' : 'text-danger'">
                {{ totalBalance }} ₽
            </h1>
        </div>

        <h4 class="mb-3 fw-bold text-secondary">Журнал операций</h4>
        <div class="list-group shadow-sm border-0">
            <div v-for="item in transactions" :key="item._id" 
                 class="list-group-item d-flex justify-content-between align-items-center py-3">
                <div>
                    <span class="badge me-3 p-2 text-uppercase" :class="item.type === 'income' ? 'bg-success' : 'bg-danger'">
                        {{ item.type === 'income' ? 'Доход' : 'Расход' }}
                    </span>
                    <strong class="text-dark me-3">{{ item.category }}</strong>
                    <span class="text-muted fst-italic small">{{ item.comment }}</span>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <span class="badge bg-secondary font-monospace">{{ item.amount }} ₽</span>
                    <span class="text-muted small d-none d-md-inline">{{ item.createdAt }}</span>
                    <button @click="deleteTx(item._id)" class="btn btn-sm btn-outline-danger border-0">Удалить</button>
                </div>
            </div>
            <div v-if="transactions.length === 0" class="list-group-item text-center text-muted py-4">
                Записи в журнале отсутствуют.
            </div>
        </div>
    </div>
</template>