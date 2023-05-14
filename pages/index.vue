<template>
    <div class="d-flex flex-column text-center">
        <div class="mb-5">
            <h1>EL PENJAT ONLINE</h1>
        </div>
        <div class="d-flex flex-column gap-3">
            <button class="btn" @click.prevent="$router.push('games')">ENTRA A JUGAR</button>
            <button class="btn" @click.prevent="$router.push('help')">AJUDA</button>
        </div>
    </div>
</template>

<script>

export default {

}
</script>

<style scoped>

</style>