<template>
    <div>
        <div class="text-center">
            <button class="btn btn-primary" @click.prevent="changeForm">Crear una nova partida</button>
            <button class="btn btn-secondary" @click.prevent="changeForm">Entrar a una partida existent</button>
        </div>
        <div>
            <FormsNewGame v-if="showNewGame" />
            <FormsBackGame v-if="showBackGame" />
        </div>
    </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
    data() {
        return {
            showNewGame: true,
            showBackGame: false,
        }
    },
    mounted() {
        if (this.gameName || this.player) {
            this.$router.push("penjat");
        }
    },
    computed: {
        ...mapGetters({
            gameName: 'vars/gamename',
            player: 'vars/player',
        }),
    },
    methods: {
        changeForm() {
            this.showNewGame = !this.showNewGame
            this.showBackGame = !this.showBackGame
        }
    }
}
</script>