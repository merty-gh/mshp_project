<template>
    <div class="app-sidebar p-3 bg-white border rounded shadow-sm text-center">
        <div class="mb-4 border-bottom pb-3">
            <img src="../assets/logo.png" alt="Логотип проекта" class="img-fluid mb-2" style="max-height: 50px; object-fit: contain;">
            <h6 class="fw-bold text-secondary mb-0">Pocket Budget</h6>
        </div>

        <div class="text-muted small text-uppercase fw-bold mb-3 tracking-wide text-start">
            Навигация
        </div>
        <ul class="nav flex-column gap-2">
            <li class="nav-item">
                <button @click="$router.push({ name: 'home' })" 
                        class="btn w-100 text-start fw-semibold py-2"
                        :class="$route.name === 'home' ? 'btn-primary' : 'btn-outline-secondary'">
                    Обзор баланса
                </button>
            </li>
            <li class="nav-item">
                <button @click="$router.push({ name: 'add' })" 
                        class="btn w-100 text-start fw-semibold py-2"
                        :class="$route.name === 'add' ? 'btn-primary' : 'btn-outline-secondary'">
                    Новая операция
                </button>
            </li>
            <li class="nav-item">
                <button @click="$router.push({ name: 'analytics' })" 
                        class="btn w-100 text-start fw-semibold py-2"
                        :class="$route.name === 'analytics' ? 'btn-primary' : 'btn-outline-secondary'">
                    Бюджет и лимиты
                </button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.tracking-wide {
    letter-spacing: 0.05em;
}
</style>