document.getElementById('lookupBtn').addEventListener('click', function () {
    const searchTerm = document.getElementById('searchTerm').value;
    if (searchTerm) {
        const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(searchTerm)}`;
        chrome.tabs.create({ url: wikiUrl });
    }
});
