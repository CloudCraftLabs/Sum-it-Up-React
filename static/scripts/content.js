function createPanel() {
    if ($("#summarizationPanelCntnr").length === 0) {
        $("html").append('<div id="summarizationPanelCntnr"></div>'); 
        $("#OpenSummarizationPanelButton").remove()

        $("#summarizationPanelCntnr").load(chrome.runtime.getURL("panel.html"), function() {

            // PREPARING PATH FOR IMAGES IN EXTENSION
            $("#img-icon-close").attr("src", chrome.runtime.getURL("static/images/stickers/close.png"));
            $("#img-icon-before").attr("src", chrome.runtime.getURL("static/images/stickers/before.png"));
            $("#img-icon-next").attr("src", chrome.runtime.getURL("static/images/stickers/next.png"));
            $("#img-icon-copy").attr("src", chrome.runtime.getURL("static/images/stickers/copy.png"));
            $("#img-icon-download").attr("src", chrome.runtime.getURL("static/images/stickers/download.png"));
            $("#img-icon-share").attr("src", chrome.runtime.getURL("static/images/stickers/share.png"));
            $("#img-icon-audio").attr("src", chrome.runtime.getURL("static/images/stickers/audio.png"));
            $("#img-icon-highlighter").attr("src", chrome.runtime.getURL("static/images/stickers/highlighter.png"));

            // SIDE NAVIGATION HOVER EFFECT
            $('.side-sub-panel-nav .indi-side-panel-nav-link').hover(function() {
                $(this).next('.indi-side-panel-nav-link').addClass('scaled');
                $(this).prev('.indi-side-panel-nav-link').addClass('scaled');
            }, function() {
                $(this).siblings('.indi-side-panel-nav-link').removeClass('scaled');
            });

            
            // TABS CHANGING FUNCTIONALITY ON NEXT/PREVIOUS BUTTON AND TABS BUTTON
            $(".tab").click(function() {
                const tabId = $(this).data("tab");
                $(".tab-content").hide();
                $("#" + tabId).show();
            });
            const $tabs = $(".tab");
            const $tabContents = $(".tab-content");
            let activeTabIndex = 0;
            function updateTabs(index) {
                $tabs.removeClass('active').eq(index).addClass('active');
                $tabContents.hide().eq(index).show();
                activeTabIndex = index;
            }
            $tabs.click(function() {
                const tabId = $(this).data("tab");
                const index = $tabs.index(this);
                updateTabs(index);
            });
            $("#previousTab").click(function() {
                if (activeTabIndex > 0) {
                    updateTabs(activeTabIndex - 1);
                }
            });
            $("#nextTab").click(function() {
                if (activeTabIndex < $tabs.length - 1) {
                    updateTabs(activeTabIndex + 1);
                }
            });
            // INITIALIZING FIRST TAB
            updateTabs(activeTabIndex);


            // SIDE DOCK FUNCTIONS START
            
            $("#option_highlighter").change(function (e) { 
                alert("chenged")            
            });
            // SIDE DOCK FUNCTIONS END


            // SUBMIT BUTTON EVENT
            $("#submitSummary").click(function() {
                const inputText = $("#summaryInput").val();
                $.ajax({
                    url: 'https://your-api-url.com/summarize', // RAPLACE API ENDPOINT HERE
                    method: 'POST',
                    data: JSON.stringify({ text: inputText }),
                    contentType: 'application/json',
                    success: function(response) {
                        $("#responseOutput").text(response.summary);
                    },
                    error: function() {
                        $("#responseOutput").text("Error fetching summary.");
                    }
                });
            });

            
            // CLOSE BUTTON EVENT
            $("#closePanel").click(function() {
                createOpenPanelButton()
                $("#summarizationPanelCntnr").remove();
            });
        });
    }
}

function createOpenPanelButton() {
    if ($("#OpenSummarizationPanelButton").length === 0) {
        $("html").append('<button id="OpenSummarizationPanelButton">Open Panel</button>');

        // DRAGABLE BUTTON START FROM HERE
        const $draggable = $('#OpenSummarizationPanelButton');
        let offsetX, offsetY;

        if (buttonPosition.left !== null && buttonPosition.top !== null && buttonPosition.right !== null) {
            $draggable.css({
                position: 'fixed',
                left: buttonPosition.left,
                top: buttonPosition.top,
                right: buttonPosition.right,
            });
        }   

        $draggable.on('mousedown', function(e) {
            isDragging = false;

            offsetX = e.clientX - ($draggable.offset().left + $draggable.outerWidth() / 2);
            offsetY = e.clientY - ($draggable.offset().top + $draggable.outerHeight() / 2);

            $(document).on('mousemove', onMouseMove);
            $(document).on('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            isDragging = true;

            let newLeft = e.clientX;
            let newTop = e.clientY;

            const windowWidth = $(window).width();
            const windowHeight = $(window).height();
            const draggableWidth = $draggable.outerWidth();
            const draggableHeight = $draggable.outerHeight();

            // BOUNDARY CHECKS
            if (newLeft < 0) newLeft = 0;
            if (newTop < 0) newTop = 0;
            if (newLeft + draggableWidth > windowWidth) newLeft = windowWidth - draggableWidth;
            if (newTop + draggableHeight > windowHeight) newTop = windowHeight - draggableHeight;

            // UPDATE POSITIONS
            buttonPosition.left = newLeft
            buttonPosition.top = newTop
            buttonPosition.right = "unset"
            $draggable.css({
                left: newLeft,
                top: newTop,
                right: "unset"
            });
        }

        function onMouseUp(e) {
            $(document).off('mousemove', onMouseMove);
            $(document).off('mouseup', onMouseUp);

            // SNAP TO CLOSEST SIDE
            const windowWidth = $(window).width();
            const draggableWidth = $draggable.outerWidth();

            const distanceToLeft = buttonPosition.left;
            const distanceToRight = windowWidth - (buttonPosition.left + draggableWidth);

            if (distanceToLeft < distanceToRight) {
                var left = 0
                var right = "unset"
            } else {
                var left = "unset"
                var right = 0
            }

            $draggable.css({
                left: left,
                right: right
            });
            
            // UPDATE FINAL POSITIONS FOR BUTTON
            buttonPosition.left = left;
            buttonPosition.right = right;
            buttonPosition.top = parseInt($draggable.css('top'), 10) || 0;
        }

        $("#OpenSummarizationPanelButton").click(function() {
            if (isDragging) {
                isDragging = false;
            } else {
                createPanel()
                $(this).remove();
            }
        });
    }
}

window.onload = createOpenPanelButton;

const buttonPosition = { left: null, top: null, right: null };
let isDragging = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.todo == "openSummarizationPanel") {
        createPanel()
    }

    if(request.todo == "addOpenSummarizationPanelButton") { 
        createOpenPanelButton()
    }
})