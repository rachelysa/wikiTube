
function onInit() {
    onSearch();
}

function onSearch(ev) {
    if (ev) ev.preventDefault();
    const elInputSearch = document.querySelector('input[name=search]');
    getVideos(elInputSearch.value)
        .then(videos => {
            if (!videos.length) return;
            renderVideos(videos);
            playVideo(videos[0].id);
        })
    getWikis(elInputSearch.value)
        .then(wikis => {
            renderWikis(wikis);
        })

}

function renderVideos(videos) {
    const elSearchResults = document.querySelector('.search-results');
    var strHTMLs = videos.map(video => {
        return `<article class="video-preview" >
                       <button class="btn-play" onclick="playVideo('${video.id}')"><img class="icon"src="img/icon.png"></button>
                       <img src="${video.img.url}" width="${video.img.width}" height="${video.img.height}">
                       <span>${video.title}</span>
                    </article>`
    })
    elSearchResults.innerHTML = strHTMLs.join('');
}

function playVideo(videoId) {
    const elVideoPlayer = document.querySelector('.video-play iframe');
    elVideoPlayer.src = `https://www.youtube.com/embed/${videoId}?controls=0`;
}

function renderWikis(wikis) {
    const elWikiResults = document.querySelector('.wiki-results');
    var strHTMLs = wikis.map(wiki => {
        return `<article class="wiki-preview">
            <h3 class="title">${wiki.title}</h3>
            <span class="snippet>${wiki.snippet}</span>
        </article>`
    })
    elWikiResults.innerHTML = strHTMLs.join('');
}