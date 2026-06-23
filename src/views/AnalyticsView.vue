<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                categories: [],
                transactions: [],
                editingId: null,
                newLimit: null
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            async loadData() {
                let catResponse = await axios.get('/api/categories');
                let txResponse = await axios.get('/api/transactions');
                
                this.categories = catResponse.data;
                this.transactions = txResponse.data;
            },
            getCategorySum(categoryTitle) {
                return this.transactions
                    .filter(tx => tx.category === categoryTitle && tx.type === 'expense')
                    .reduce((sum, tx) => sum + tx.amount, 0);
            },
            startEdit(cat) {
                this.editingId = cat._id;
                this.newLimit = cat.limit || 0;
            },
            async saveLimit(id) {
                await axios.put(`/api/categories/${id}`, { limit: Number(this.newLimit) });
                this.editingId = null;
                this.loadData();
            }
        }
    }
</script>

<template>
    <div class="container mt-4">
        <h4 class="mb-4 fw-bold text-secondary">Контроль бюджетов и лимитов</h4>
        
        <div class="row row-cols-1 row-cols-md-2 g-3">
            <div v-for="cat in categories" :key="cat._id" class="col">
                <div class="card h-100 shadow-sm p-3 border">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="mb-0 fw-bold text-dark">{{ cat.title }}</h6>
                        
                        <div v-if="editingId === cat._id" class="d-flex gap-1">
                            <input v-model="newLimit" type="number" class="form-control form-control-sm" style="width: 90px;">
                            <button @click="saveLimit(cat._id)" class="btn btn-sm btn-success">ОК</button>
                        </div>
                        <div v-else class="text-muted small">
                            Лимит: <span class="fw-bold text-dark">{{ cat.limit ? cat.limit + ' ₽' : 'Не задан' }}</span>
                            <button @click="startEdit(cat)" class="btn btn-sm btn-light ms-2 py-0 border">Изм.</button>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between small text-muted mb-1">
                        <span>Расход: {{ getCategorySum(cat.title) }} ₽</span>
                        <span v-if="cat.limit" :class="getCategorySum(cat.title) > cat.limit ? 'text-danger fw-bold' : ''">
                            {{ ((getCategorySum(cat.title) / cat.limit) * 100).toFixed(0) }}%
                        </span>
                    </div>

                    <div v-if="cat.limit" class="progress" style="height: 10px;">
                        <div class="progress-bar" 
                             :class="getCategorySum(cat.title) > cat.limit ? 'bg-danger' : 'bg-primary'"
                             role="progressbar" 
                             :style="{ width: Math.min((getCategorySum(cat.title) / cat.limit) * 100, 100) + '%' }">
                        </div>
                    </div>
                    <div v-else class="text-muted small fst-italic">Индикатор лимита отключен</div>
                </div>
            </div>
        </div>
    </div>
</template>