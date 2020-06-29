exports.aceInitialized = function(hook, context){
    //chat.stickToScreen(true);
    var isDragging = false;
    var isMouseDown = false
    var padOuter = null;
	var padInner = null;
	var outerBody = null;
    var innerBody = null ;
    var startHeight , pY ;
    var docHeight =$(document).height() ;


    chat.show()
    padOuter = $('iframe[name="ace_outer"]').contents();
    padInner = padOuter.find('iframe[name="ace_inner"]').contents();
    outerBody = padOuter.find("#outerdocbody");
    innerBody = padInner.find("#innerdocbody");
    /**
     * resizer inserting
     */
    $(".chat-content").attr('id', 'chatBoxBottom');
    var chatBoxBottom = document.getElementById("chatBoxBottom")
    var resizer = document.createElement('div');
    resizer.className = 'resizer';
    resizer.id = 'resizer';
    chatBoxBottom.prepend(resizer);

    /**
     * Mouse down
     */

    $("#resizer").on('mousedown', function(event){
        startHeight = parseInt(document.defaultView.getComputedStyle(chatBoxBottom).height, 10);
        pY = event.pageY;
        isDragging = false;
        isMouseDown = true;
        $("#resizer").css({"background-color":"red"})
        $("body").append("<div id='ghost_chat_resizer' style='top : "+event.pageY+"px'></div>")
        e=event || window.event;
        pauseEvent(e);
        
    })
    /**
     * mouse move
     */
    $(document).on('mousemove', function(event){
        console.log("mousemove ",event.pageY)

        isDragging= true
        if(isMouseDown){
            $("#resizer").css({"background-color":"brown"})
            $('#ghost_chat_resizer').css({
                top:   event.pageY
            });
        }else{
            $("#ghost_chat_resizer").remove()
        }

    });

    outerBody.on("mousemove",function(event){
        console.log("mousemove ",event.pageY)
        isDragging= true
        if(isMouseDown){
            $("#resizer").css({"background-color":"brown"})
            $('#ghost_chat_resizer').css({
                top:   event.pageY +85
            });
        }else{
            $("#ghost_chat_resizer").remove()
        }
    })
    innerBody.on("mousemove",function(event){
        console.log("mousemove ",event.pageY)
        isDragging= true
        if(isMouseDown){
            $("#resizer").css({"background-color":"brown"})
            $('#ghost_chat_resizer').css({
                top:   event.pageY + 145
            });
        }else{
            $("#ghost_chat_resizer").remove()
        }
    })


    /**
     * mouseup
     */
    $(document).on('mouseup', function(event){
        console.log("mouseup document")
        $("#resizer").css({"background-color":"green"})
        $("#ghost_chat_resizer").remove()

        isDragging = false;
        isMouseDown = false ;
        resizeChatBar(event.pageY)

    });


    outerBody.on("mouseup",function(event){
        console.log("mouseup outerBody")
        $("#resizer").css({"background-color":"green"})
        $("#ghost_chat_resizer").remove()

        isDragging = false;
        isMouseDown = false ;
        resizeChatBar(event.pageY+85)

    })
    innerBody.on("mouseup",function(event){
        console.log("mouseup innerBody ")
        $("#resizer").css({"background-color":"green"})
        $("#ghost_chat_resizer").remove()

        isDragging = false;
        isMouseDown = false ;
        resizeChatBar(event.pageY+ 145)

    })
    function pauseEvent(e){
        if(e.stopPropagation) e.stopPropagation();
        if(e.preventDefault) e.preventDefault();
        e.cancelBubble=true;
        e.returnValue=false;
        return false;
    }
    function resizeChatBar(pageY){
        var chatBoxBottom = $("#chatBoxBottom")
        
        var mY = (pY - pageY );
        //console.log(mY  ,   pageY , pY , startHeight , (startHeight - mY))
        var newHeight = (startHeight + mY < 10) ?  10 : startHeight + mY ;
        var newHeight = (newHeight >= docHeight ) ?  docHeight : newHeight;
        chatBoxBottom.css({
            height: newHeight,
        });
    }

}