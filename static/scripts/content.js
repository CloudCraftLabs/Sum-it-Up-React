function convertToH3(cntnr) {
    let html = cntnr.innerHTML;

    html = html.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
        return `<h3>${p1}</h3>`;
    });
    cntnr.innerHTML = html;
}

function convertToDiv(cntnr) {
    let html = cntnr.innerHTML;
    html = html.replace(/\*(.*?)\*/g, (match, p1) => {
        return `<div>${p1}</div>`;
    });
    cntnr.innerHTML = html;
}

function replace_astersik_to_br(cntnr) {
    var html = cntnr.innerHTML;
    var html = html.replace(/\*/g, '<br>');
    cntnr.innerHTML = html;
}


function loadSummary() {
    var text_url = $(location).prop('href');
    var summary_type = $('#summary_type').val();
    var selectedLength = localStorage.getItem('summary_length') || 'short';
    var selectedStyle = localStorage.getItem('summary_style') || 'concise';
    
    console.warn("sending Request");
    $.ajax({
        url: 'https://rago6qu4uneepm7wivuf5sbu340zxnes.lambda-url.ap-south-1.on.aws/summary-via-url',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            text_url: text_url,
            summary_type: summary_type,
            length: selectedLength,
            style: selectedStyle
        }),
        success: function(response) {
            if (response['data'] != "UNABLE ACCESS"){
                console.log('Success:', response);
                $("#response_output").html(response['data']);
                convertToH3($("#response_output").get(0));
                convertToDiv($("#response_output").get(0));
                replace_astersik_to_br($("#response_output").get(0));
                $("#response_flowchart").html();
                $("#response_input_summary").html();
            } else {
                response['data'] = "We are unable to access the data due to private user site!";
                console.log('Failure:', response);
                $("#response_output").html(response['data']);
                convertToH3($("#response_output").get(0));
                convertToDiv($("#response_output").get(0));
                replace_astersik_to_br($("#response_output").get(0));
                $("#response_flowchart").html();
                $("#response_input_summary").html();
            }
        },
        error: function(xhr, status, error) {
            console.error(xhr, status, error);
            $("#response_output").html(error);
            $("#response_flowchart").html(error);
            $("#response_input_summary").html(error);
        }
    });


    $.ajax({
        url: 'https://rago6qu4uneepm7wivuf5sbu340zxnes.lambda-url.ap-south-1.on.aws/summary-via-flowchart',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            text_url: text_url
        }),
        success: function(response) {
            console.log('Success:', response);
            $("#response_flowchart").html(response['data'])
            convertToH3($("#response_flowchart").get(0))
            convertToDiv($("#response_flowchart").get(0))
            replace_astersik_to_br($("#response_flowchart").get(0))
        },
        error: function(xhr, status, error) {
            console.error(xhr, status, error);
            $("#response_flowchart").html(error)
        }
    });
}

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


            // // SIDE DOCK FUNCTIONS START
            
            // HIGHLIGHTER START
            $('#summarizationPanel').on('mouseup', function() {
                if ($("#option_audio").is(':checked')) {
                    const selection = window.getSelection();
                    const selectedText = selection.toString();

                    const utterance = new SpeechSynthesisUtterance(selectedText);
                    window.speechSynthesis.speak(utterance);

                    // chrome.tts.speak(clickData.selectedText, { rate: 0.7 });
                } else {
                    console.log("Audio is not enabled");
                }

                if ($("#option_highlighter").is(':checked')) {
                    const selection = window.getSelection();
                    const selectedText = selection.toString();
                    
                    function isValidSelection(selection) {
                        const range = selection.getRangeAt(0);
                        const container = range.cloneContents();
                        const childNodes = $(container).children();
                    
                        return childNodes.length === 0 || childNodes.length > 0 && childNodes.not('span').length === 0;
                    }

                    if (selectedText && isValidSelection(selection)) {
                        const range = selection.getRangeAt(0);
                        const fragment = range.cloneContents();
                        const highlightedSpan = $('<span>').addClass('highlighted');

                        range.deleteContents();
                        highlightedSpan.append(fragment);
                        range.insertNode(highlightedSpan[0]);

                        selection.removeAllRanges();
                    } else {
                        console.log("Selected text contains invalid elements or no text selected");
                    }
                } else {
                    console.log("Highlighter is not enabled");
                }
            });
            // HIGHLIGHTER END

            // DOWNLOAD START

            $("#option_download").change(function (e) { 
                e.preventDefault();
                if ($("#option_download").is(':checked')) {
                    var cssPath = chrome.runtime.getURL("static/styles/print.css");
                    var summary_cntnt = $("#response_output").html()
                    $("#summary-cntnt").html(summary_cntnt)

                    var _c = $('#print-cntnt-cntnr').html();
                    var nw = window.open('', '_blank', 'width=900,height=600')
                    nw.document.write('<link rel="stylesheet" type="text/css" href="' + cssPath + '">');
                    nw.document.write(_c)
                    nw.document.close()
                    setTimeout(function () {
                        nw.print()
                    }, 1000);

                    $('#option_download').prop('checked', false);
                }
            });

            
            $("#option_copy").change(function (e) { 
                e.preventDefault();
                if ($("#option_copy").is(':checked')) {
                    var range = document.createRange();
                    range.selectNode(document.getElementById("response_output"));
                    window.getSelection().removeAllRanges(); // clear current selection
                    window.getSelection().addRange(range); // to select text
                    document.execCommand("copy");
                    window.getSelection().removeAllRanges();// to deselect
                    alert("Copied")

                    $('#option_copy').prop('checked', false);
                }
            });

            // DOWNLOAD END
            loadSummary()

            // SIDE DOCK FUNCTIONS END
            
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

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received:", request);
    
    if (request.todo === "openSummarizationPanel") {
        // Store the selected options
        if (request.options) {
            localStorage.setItem('summary_length', request.options.length);
            localStorage.setItem('summary_style', request.options.style);
        }
        createPanel();
    } else if (request.todo === "copy_to_clipboard") {
        $('#option_copy').prop('checked', true).trigger('change');
    } else if (request.todo === "share_summary") {
        // Implement share functionality
        const text = $('#response_output').text();
        if (navigator.share) {
            navigator.share({
                title: 'Summary',
                text: text
            });
        }
    } else if (request.todo === "download_summary") {
        $('#option_download').prop('checked', true).trigger('change');
    } else if (request.todo === "text-to-speech") {
        $('#option_audio').prop('checked', true).trigger('change');
        const text = $('#response_output').text();
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }
});

function sendMessage() {
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();

    if (messageText === "") return;

    // Add the user's message to the chat
    addMessage(messageText, 'user');

    // Clear the input field
    input.value = "";

    // Simulate bot response after a delay
    setTimeout(() => {
        addMessage("This is a bot reply!", 'bot');
    }, 1000);
}

// Function to add messages dynamically
function addMessage(text, sender) {
    const messageContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;

    messageContainer.appendChild(messageDiv);

    // Auto scroll to the bottom
    messageContainer.scrollTop = messageContainer.scrollHeight;
}