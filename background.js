chrome.runtime.onInstalled.addListener(function () {
    try {
        chrome.contextMenus.create({
            id: "wikipediaLookup",
            title: "Look up on Wikipedia",
            contexts: ["selection"]
        });
    } catch (error) {
        console.error("Error creating context menu:", error);
    }
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    try {
        if (info.menuItemId === "wikipediaLookup") {
            const selectedText = info.selectionText;
            if (selectedText) {
                fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(selectedText)}&format=json&origin=*`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.query.search.length > 0) {
                            const closestEntry = data.query.search[0];
                            const closestUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(closestEntry.title)}`;
                            chrome.tabs.create({ url: closestUrl });
                        } else {
                            console.warn("No matches found for the selected text.");
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching from Wikipedia API:", error);
                    });
            } else {
                console.warn("No text selected");
            }
        }
    } catch (error) {
        console.error("Error handling context menu click:", error);
    }
});
