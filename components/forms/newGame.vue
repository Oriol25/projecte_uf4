<template>
    <div class="d-flex flex-column text-center col-xs-12 col-md-12 mt-5">
        <h2>Nova Partida</h2>
        <div class="input-group input-group-lg my-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Nom de la partida</span>
            <input type="text" class="form-control" v-model="newgame.gameName">
        </div>
        <div class="input-group input-group-lg mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Contrasenya</span>
            <input type="password" class="form-control" v-model="newgame.gamePassword">
        </div>

        <button class="btn btn-success" @click.prevent="sendForm" :disabled="!(newgame.gameName && newgame.gamePassword)">Send</button>

    </div>
</template>

<script>

import Swal from 'sweetalert2'

export default {
    data() {
        return {
            newgame: this.$vform({
                action: "createGame",
                gameName: "",
                gamePassword: "",
            })
        }
    },
    methods: {
        async sendForm() {
            try {
                const { data } = await this.newgame.post()
                
                if (data.status === 'OK' && (data.response === "The game has been created." || data.response === "The game has been restored.")) {
                    this.$store.commit('vars/SET_GAMENAME', this.newgame.gameName)
                    this.$store.commit('vars/SET_PLAYER', "P1")
                    this.$router.push("/penjat")
                } else {
                    Swal.fire(
                        'Error!',
                        data.response,
                        'error'
                    )
                    console.error(data.status, data.response)
                }
            } catch (e) {
                console.error(e)
            }
            
        }
    }
}
</script>