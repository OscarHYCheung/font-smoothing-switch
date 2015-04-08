var isTurnedOn = false;
var injectClass = function() {
    if (!chrome || !chrome.tabs || !chrome.tabs.executeScript) {
        return;
    }

    var codeToBeInjected = isTurnedOn ? 'document.body.classList.add("chrome-webkit-font-smoothing-switch")' :
            'document.body.classList.remove("chrome-webkit-font-smoothing-switch")';
    chrome.tabs.executeScript({
        code: codeToBeInjected
    });
};

chrome.browserAction.onClicked.addListener(function browserActionOnClickHandler() {
    isTurnedOn = !isTurnedOn;
    injectClass();
});

chrome.tabs.onUpdated.addListener(injectClass);
chrome.tabs.onActivated.addListener(injectClass);
