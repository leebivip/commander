function openNewTab() {
    chrome.tabs.create({});
}

function openNewWindow() {
    chrome.windows.create({});
}

function openHistory() {
    chrome.tabs.create({url: "chrome://history"});
}

function openDownloads() {
    chrome.tabs.create({url: "chrome://downloads"});
}

function openExtensions() {
    chrome.tabs.create({url: "chrome://extensions"});
}

function openSettings() {
    chrome.tabs.create({url: "chrome://settings"});
}

function openBookmarks(){
    chrome.tabs.create({url: "chrome://bookmarks"});
}

function closeCurrentTab() {
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (currentTab) {
        currentTab = currentTab[0];
        chrome.tabs.remove(currentTab.id);
    });
}

function reloadTab() {
    chrome.tabs.reload();
}

function reloadAllTabs(){
    chrome.tabs.query({'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (allTabs){
        for(tab of allTabs){
            chrome.tabs.reload(tab.id);
        }
        populateSuggestionsBox(suggestionList);
    });
}

function reloadWithoutCache() {
    chrome.tabs.reload(reloadProperties={'bypassCache':true});
}

function newIncognitoWindow() {
    chrome.windows.create({'incognito': true});
}

function togglePin(){
    var isPinned;
    chrome.tabs.query(queryInfo = {'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(currentTab){
        isPinned = currentTab[0].pinned;
        chrome.tabs.update(updateProperties = {'pinned': !isPinned});
    });

}

function switchToTab(tabId) {
    return function () {
        chrome.tabs.update(tabId, {'active': true});
    };
}

function toggleMute(){
    var isMuted;
    chrome.tabs.query(queryInfo = {'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(currentTab){
        isMuted = currentTab[0].mutedInfo.muted;
        chrome.tabs.update(updateProperties = {'muted': !isMuted});
    });
}

function duplicateTab(){
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (currentTab) {
        currentTab = currentTab[0];
        chrome.tabs.create({'url': currentTab.url, 'index': currentTab.index +  1});
    });
}

function closeOtherTabs(){
    chrome.tabs.query({'active': false, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (otherTabs) {
        var otherTabIds = [];
        for (tab of otherTabs) {
            otherTabIds.push(tab.id);
        }
        chrome.tabs.remove(otherTabIds);
    });
}

function closeTabsToRight(){
    chrome.tabs.query({'active': false, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (otherTabs) {
        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (currentTab) {
            currentTab = currentTab[0];
            var otherTabIds = [];
            for (tab of otherTabs) {
                if (tab.index > currentTab.index){
                    otherTabIds.push(tab.id);
                }
            }
            chrome.tabs.remove(otherTabIds);
        });
    });
}

function closeTabsToLeft(){
    chrome.tabs.query({'active': false, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (otherTabs) {
        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (currentTab) {
            currentTab = currentTab[0];
            var otherTabIds = [];
            for (tab of otherTabs) {
                if (tab.index < currentTab.index){
                    otherTabIds.push(tab.id);
                }
            }
            chrome.tabs.remove(otherTabIds);
        });
    });
}

var defaultSugestions = [
    {
        "text": "New Tab",
        "action": openNewTab
    },
    {
        "text": "New Window",
        "action": openNewWindow
    },
    {
        "text": "Show History",
        "action": openHistory
    },
    {
        "text": "Show Downloads",
        "action": openDownloads
    },
    {
        "text": "Show Extensions",
        "action": openExtensions
    },
    {
        "text": "Show Bookmarks",
        "action": openBookmarks
    },
    {
        "text": "Show Settings",
        "action": openSettings
    },
    {
        "text": "Close Current Tab",
        "action": closeCurrentTab
    },
    {
        "text": "Reload Tab",
        "action": reloadTab
    },
    {
        "text": "Reload All Tabs",
        "action": reloadAllTabs
    },
    {
        "text": "Clear Cache and Reload Tab",
        "action": reloadWithoutCache
    },
    {
        "text": "Toggle Pin",
        "action": togglePin
    },
    {
        "text": "Duplicate Tab",
        "action": duplicateTab
    },
    {
        "text": "New Incognito Window",
        "action": newIncognitoWindow
    },
    {
        "text": "Close Other Tabs",
        "action": closeOtherTabs
    },
    {
        "text": "Close Tabs To Right",
        "action": closeTabsToRight
    },
    {
        "text": "Close Tabs To Left",
        "action": closeTabsToLeft
    },
    {
        "text": "Mute/Unmute Tab",
        "action": toggleMute
    }
];
