chrome.storage.local.clear();

// Function to save the created menu items to storage
function saveMenuItem(id) {
    chrome.storage.local.get('createdMenuItems', function(result) {
        let createdMenuItems = result.createdMenuItems || [];
        if (!createdMenuItems.includes(id)) {
            createdMenuItems.push(id);
            chrome.storage.local.set({ createdMenuItems: createdMenuItems });
            console.log(`Saved menu item ID: ${id}`);
        }
    });
}

// Function to check if a menu item has been created
function menuItemExists(id, callback) {
    chrome.storage.local.get('createdMenuItems', function(result) {
        let createdMenuItems = result.createdMenuItems || [];
        callback(createdMenuItems.includes(id));
    });
}

// Create context menu items if they do not already exist
function createContextMenuItems() {
    menuItemExists("summarizerspeach", function(exists) {
        if (!exists) {
            chrome.contextMenus.create({
                id: "summarizerspeach",
                title: "Summarizer Speech",
                contexts: ["selection"]
            }, function() {
                if (chrome.runtime.lastError) {
                    console.error('Error creating "Summarizer Speech" menu item:', chrome.runtime.lastError);
                } else {
                    saveMenuItem("summarizerspeach");
                    console.log('Created "Summarizer Speech" menu item');
                }
            });
        } else {
            console.log('"Summarizer Speech" menu item already exists');
        }
    });

    menuItemExists("googleit", function(exists) {
        if (!exists) {
            chrome.contextMenus.create({
                id: "googleit",
                title: "Summarizer Google It",
                contexts: ["selection"]
            }, function() {
                if (chrome.runtime.lastError) {
                    console.error('Error creating "Summarizer Google It" menu item:', chrome.runtime.lastError);
                } else {
                    saveMenuItem("googleit");
                    console.log('Created "Summarizer Google It" menu item');
                }
            });
        } else {
            console.log('"Summarizer Google It" menu item already exists');
        }
    });
}

// Call the function to create context menu items
createContextMenuItems();

// Listener for context menu item clicks
chrome.contextMenus.onClicked.addListener(function(clickData) {
    console.log('Context menu item clicked:', clickData.menuItemId);
    if (clickData.menuItemId === "summarizerspeach" && clickData.selectionText) {
        chrome.tts.speak(clickData.selectionText, { rate: 0.7 });
    } else if (clickData.menuItemId === "googleit" && clickData.selectionText) {
        var wikiUrl = "https://www.google.co.in/search?q=" + encodeURIComponent(clickData.selectionText);
        var createData = {
            url: wikiUrl,
            type: "popup",
            top: 5,
            left: 5,
            width: screen.availWidth / 2,
            height: screen.availHeight / 2
        };
        chrome.windows.create(createData);
    }
});
