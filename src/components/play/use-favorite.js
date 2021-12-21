import {
    computed
} from 'vue'
import {
    useStore
} from 'vuex'
import {
    save,
    remove
} from '@/assets/js/array-store'
import {
    FAVORITE_KEY
} from '@/assets/js/constant'
export default function useFavorite() {
    const store = useStore()
    const favoriteList = computed(() => store.state.favoriteList)

    function getFavoriteIcon(song) {
        return isFavorite(song) ? 'icon-like' : 'icon-not-like'
    }

    function isFavorite(song) {
        return favoriteList.value.findIndex(x => {
            return x.id === song.id
        }) > -1
    }

    function toggleFavorite(song) {
        let list
        if (isFavorite(song)) {
            list = remove(FAVORITE_KEY, compare)
        } else {
            list = save(song, FAVORITE_KEY, compare)
        }
        store.commit('setFavoriteList', list)

        function compare(item) {
            return item.id === song.id
        }
    }
    return {
        getFavoriteIcon,
        toggleFavorite
    }
}
