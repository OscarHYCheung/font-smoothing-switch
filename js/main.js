(function() {
    var isTurnedOn = false;
    var injectClass = function() {
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

    chrome.tabs.onUpdated.addListener(function tabOnUpdatedHandler(changeInfo) {
        var status = changeInfo.status;
        if (status === 'complete') {
            injectClass();
        }
    });

    chrome.tabs.onActivated.addListener(function tabOnActivatedHandler(activeInfo) {
        var tabId = activeInfo.tabId
        var getTabCompletedHandler = function(tab) {
            if (tab.status === 'complete') {
                injectClass();
            }
        };

        chrome.tabs.get(tabId, getTabCompletedHandler);
    });
})();
