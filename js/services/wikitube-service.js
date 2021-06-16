const KEY = 'videosDB';

function getVideos(term) {
    const termVideosMap = loadFromStorage(KEY) || {};
    if (termVideosMap[term]) return Promise.resolve(termVideosMap[term]);

    console.log('Getting from Network');

    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCp8KMTEjR9frWUGpSnc8Cw5cLVe7wRRDM&q=${term}`)
        .then(res => {
            var youtubeV = res.data.items;
            var videos = youtubeV.map(youtubeVideo => ({
                id: youtubeVideo.id.videoId,
                title: youtubeVideo.snippet.title,
                img: {
                    url: youtubeVideo.snippet.thumbnails.default.url,
                    width: youtubeVideo.snippet.thumbnails.default.width,
                    height: youtubeVideo.snippet.thumbnails.default.height,
                }
            }))
            termVideosMap[term] = videos;
            saveToStorage(KEY, termVideosMap)
            return videos;
        })

}

function getWikis(term) {
    return axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${term}&format=json`)
        .then(res => res.data.query.search.slice(0, 5))
}

