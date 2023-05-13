export default {
    namespaced: true,
    state: {
        gamename: null,
        player: null,
    },
    getters: {
        gamename: state => state.gamename,
        player: state => state.player,
    },
    mutations: {
        SET_GAMENAME(state, gamename) {
            state.gamename = gamename
        },
        SET_PLAYER(state, player) {
            state.player = player
        }
    },
}