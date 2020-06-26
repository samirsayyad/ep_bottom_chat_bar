exports.aceInitialized = function(hook, context){
    //chat.stickToScreen(true);
    chat.show()
    $("#chatbox").resizable({  maxWidth: "100%" ,handles: 'n, e, s, w' });

}