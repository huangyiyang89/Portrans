window.addEventListener('message', function (rs) {
    window.history.replaceState({}, "", rs.data.portrans);  
});
window.addEventListener('load',function(){
    console.log('load');
    var scripts = document.getElementsByTagName('script');
    for (i = 0; i < scripts.length; i++){
        var index=scripts[i].src.indexOf('portrans-router.js?url=');
        if(index>0){
            var host=scripts[i].src.substr(index+23);
            document.getElementsByTagName('iframe')[0].src = host + window.location.pathname + window.location.search;
        }
    }
});