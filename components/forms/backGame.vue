<template>
    <div class="d-flex flex-column text-center col-xs-12 col-md-12 mt-5">
        <h2>Carregar Partida</h2>
        <div class="input-group input-group-lg my-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Nom de la partida</span>
            <input type="text" class="form-control" v-model="backGame.gameName">
        </div>

        <button class="btn btn-success" @click.prevent="sendForm" :disabled="!backGame.gameName">Send</button>

    </div>
</template>

<script>
export default {
    data() {
        return {
            backGame: this.$vform({
                action: "infoGame",
                gameName: "",
            })
        }
    },
    methods: {
        async sendForm() {
            try {
                const { data } = await this.backGame.post()

                if (data.status === 'OK' && data.response === "Enjoy the game.") {
                    this.$store.commit('vars/SET_GAMENAME', this.backGame.gameName)
                    this.$store.commit('vars/SET_PLAYER', "P2")
                    this.$router.push("penjat")
                } else {
                    console.error(data.status, data.response)
                }
            } catch (e) {
                console.error(e)
            }
        }
    }
}
</script>