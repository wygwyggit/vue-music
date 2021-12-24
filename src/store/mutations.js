export default {
    // 播放的状态
    setPlayingState(state, playing) {
      state.playing = playing
    },
    // 顺序列表
    setSequenceList(state, list) {
      state.sequenceList = list
    },
    // 播放列表
    setPlaylist(state, list) {
      state.playlist = list
    },
    // 播放模式
    setPlayMode(state, mode) {
      state.playMode = mode
    },
    // 当前播放的索引
    setCurrentIndex(state, index) {
      state.currentIndex = index
    },
    // 播放是否全屏
    setFullScreen(state, fullScreen) {
      state.fullScreen = fullScreen
    },
    // 收藏歌曲
    setFavoriteList(state, list) {
      state.favoriteList = list
    },
    addSongLyric(state, { song, lyric }) {
      state.sequenceList.map((item) => {
        if (item.id === song.id) {
          item.lyric = lyric
        }
        return item
      })
    },
    setSearchHistory(state, searches) {
      state.searchHistory = searches
    },
    setPlayHistory(state, songs) {
      state.playHistory = songs
    }
  }
