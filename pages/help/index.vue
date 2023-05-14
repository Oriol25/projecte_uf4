<template>
    <div class="d-flex flex-column">
        <h1 class="text-center">Com es juga?</h1>

        <div>
            <h2 class="text-center my-5">Primer de tot el jugador 1 ha de crear la partida.</h2>
            <img class="img-fluid my-5" src="img/help_1.png" alt="Ajuda numero 1">
        </div>

        <div>
            <h2 class="text-center my-5">Desprès el jugador número 2 ha de fer clic en el butó de ''<i>Entrar a una partida existent</i>''</h2>
            <img class="img-fluid my-5" src="img/help_2.png" alt="Ajuda numero 2">
        </div>

        <div class="">
            <h2 class="text-center my-5">Com es guanya?</h2>
            <h3 class="text-center my-5">Per guanyar han de esbrinar la paraula entre els dos, es un joc cooperatiu.</h3>
        </div>
        <div class="">
            <h2 class="text-center my-5">Com es perd?</h2>
            <h3 class="text-center my-5">Si un dels dos es queda sense vides, els dos jugadors han perdut.</h3>
        </div>

        <div class="mb-5 d-flex justify-content-center">
            <button class="btn btn-secondary" @click.prevent="$router.push('/')">Torna al menú</button>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    img {
        border: 1px solid #000;
    }
</style>