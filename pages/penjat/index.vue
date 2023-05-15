<template>
    <div>
        <div class="main_container d-flex flex-row justify-content-around">
            <div class="player p-3" :class="(turn == 'P1' && continuojugant) ? 'bg-white' : 'bg-not-turn'">
                <div class="text-center my-2">
                    <h2>Player 1 - <span>{{stateGame.p1}} vides</span></h2>
                </div>

                <div class="scaffold_container" v-if="continuojugant">
                    <img v-if="stateGame.p1" :src="`img/monster${imgArray[stateGame.p1]}.png`" alt="monstre penjat" id="monster" class="monster">
                </div>

                <div class="letters_container" v-if="continuojugant">
                    <span id="letters">{{stateGame.word}}</span>
                </div>

                <div class="text-center" v-if="!continuojugant && !heguanyat">
                    <p>Has perdut!</p>
                </div>
                <div class="text-center" v-if="!continuojugant && heguanyat">
                    <p>Has guanyat!</p>
                </div>
            </div>

            <div class="player p-3" :class="(turn == 'P2' && continuojugant ) ? 'bg-white' : 'bg-not-turn'">
                <div class="text-center my-2">
                    <h2>Player 2 - <span>{{stateGame.p2}} vides</span></h2>
                </div>
                <div class="scaffold_container" v-if="continuojugant">
                    <img v-if="stateGame.p2" :src="`img/monster${imgArray[stateGame.p2]}.png`" alt="monstre penjat"  class="monster">
                </div>
                <div class="letters_container" v-if="continuojugant">
                    <span id="letters">{{stateGame.word}}</span>
                </div>
                <div class="text-center" v-if="!continuojugant && !heguanyat">
                    <p>Has perdut!</p>
                </div>
                <div class="text-center" v-if="!continuojugant && heguanyat">
                    <p>Has guanyat!</p>
                </div>
            </div>
        </div>
        <div class="mt-5 d-flex justify-content-center">
            <button class="btn btn-secondary" @click.prevent="closeGame">Torna al menú</button>
        </div>
    </div>
    
</template>

<script>

import { mapGetters } from "vuex";
import $ from 'jquery';
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            info: this.$vform({
                action: "infoGame",
                gameName: "Oriol"
            }),
            jugar: this.$vform({
                action: "playGame",
                gameName: "",
                player: "",
                word: ""
            }),
            stateGame: {
                p1: null,
                p2: null,
                word: "",
            },
            imgArray: [
                5,
                4,
                3,
                2,
                1,
                0
            ],
            turn: undefined,
            continuojugant: true,
            heguanyat: false,
        }
    },
    computed: {
        ...mapGetters({
            gamename: 'vars/gamename',
            player: 'vars/player',
        }),
    },
    watch: {
        "stateGame.word"(newWord) {
            if (!newWord.includes("_")) {
                this.continuojugant = false
                this.heguanyat = true

            }
        },
        "stateGame.p1"(newp1) {
            if (newp1 == 0) {
                this.continuojugant = false
                Swal.fire(
                    'Casi!',
                    'Has perdut!',
                    'error'
                )
            }
        },
        "stateGame.p2"(newp2) {
            if (newp2 == 0) {
                this.continuojugant = false
                Swal.fire(
                    'Casi!',
                    'Has perdut!',
                    'error'
                )
            }
        },
        "heguanyat"(newHeGuanyat) {
            if (newHeGuanyat) {
                Swal.fire(
                    'Molt Bé!',
                    'Has guanyat!',
                    'success'
                )
            }
        }
    },
    async created() {

        if (!this.gamename || !this.player) {
            this.$router.push("/games")
        }

        this.jugar.gameName = this.gamename
        this.jugar.player = this.player
        
        await this.getInfo()

        $(document).on("keyup", this.checkword)

    },
    mounted() {
        setInterval(async () => {
            if (this.turn != this.player && this.player && this.gamename) {
                if (((this.turn == "P1" && this.stateGame.p1 != 0) ||
                    (this.turn == "P2" && this.stateGame.p2 != 0)) &&
                    this.continuojugant
                ) {
                    console.log(this.turn, "Estic buscant")
                    await this.getInfo()
                }
            }
        }, 2000);
    },
    methods: {
        async getInfo() {
            const { data } = await this.info.post()

            this.stateGame.p1 = data.gameInfo.livesP1
            this.stateGame.p2 = data.gameInfo.livesP2

            this.stateGame.word = data.gameInfo.wordCompleted

            this.turn = data.player

            return;
        },
        async getjugar() {
            try {
                await this.jugar.post()
            } catch (e) {
                console.error(e)
            }
        },
        async checkword(event) {
            // NO ES EL NOSTRE TORN
            if (!this.turn) {
                return;
            }

            // HEM GUANYAT
            if (!this.stateGame.word.includes("_")) {
                return;
            }

            // HE PERDUT
            if ((this.player == "P1" && this.stateGame.p1 == 0) || (this.player == this.stateGame.p2 && this.stateGame.p2 != 0)){
               return;
            }

            if (this.turn == this.player) {
                this.jugar.word = event.key.toUpperCase()
                await this.getjugar()
                await this.getInfo()
            }
        },
        closeGame() {
            this.$store.commit('vars/SET_GAMENAME', null)
            this.$store.commit('vars/SET_PLAYER', null)
            this.$router.push("/games")
        }
    }
}
</script>

<style scoped>
    .bg-not-turn {
        background: #ddd;
    }
</style>
