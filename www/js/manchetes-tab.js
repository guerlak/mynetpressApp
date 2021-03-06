
 if(!user.authenticated){
    myNavigator.resetToPage('manchetes.html')

} else {

showLoading();

var loginFree = "manchetemobile";
var passFree = "mancheteqwerty";
var requestURL = 'https://services.manchete.pt:8001/Manchetes.asmx/getCoversPress?user=' + loginFree + '&password=' + passFree + '&callback=';

var images = document.querySelector('#manchetes-images-tab');
var mancheteImgZoom = document.querySelector('#manchete-image-zoom');

    var loadManchetesTab =  function(){

        var request = new XMLHttpRequest();

            request.open('GET', requestURL);
            request.responseType = 'text';
            request.onload = function () {  

                if(request.status === 500){  
                    
                    images.innerHTML = "<p id='error-request'>Ocorreu um erro ao aceder os servidores da Manchete...</p>"
                    hideLoading();
            
                } else {
            
                    var mancheteText = request.response;
                        mancheteText = mancheteText.substring(1, mancheteText.length - 1);
                    var manchetes = JSON.parse(mancheteText);
            
                    console.log("Response server:" + request.status)

                    var mancheteText = request.response;
                        mancheteText = mancheteText.substring(1, mancheteText.length - 1);
                    var manchetes = JSON.parse(mancheteText);
                    
                    hideLoading();
                    populate(manchetes);

                }
            }
            request.send();
    }

    loadManchetesTab();
    
    function populate(jsonObj) {

        var html = '';

        for (var i = 0; i < jsonObj.length; i++) {
            if (jsonObj[i].link !== "") {
                //html += "<div id='manchete-img'><ons-list><ons-list-item>"+jsonObj[i].publicacao+"</ons-list-item><ons-list-item><img width='100%' src=" + jsonObj[i].link + "></ons-list></ons-list-item></div><br><br>";
                //html += '<ons-list modifier="inset" style="margin-top: 15px;margin-bottom: 20px;"><ons-list-header></ons-list-header><ons-list-item><img width="100%" src=' + jsonObj[i].link + ' onclick="modal.show()"></ons-list-item><ons-list-header></ons-list-header></ons-list>';
                html += '<div><img class="mancheteImgs" alt="manchete do dia" width="100%" onClick="mancheteImgOpen()" src=' + jsonObj[i].link + ' /></div>';
            }
        }
        
        images.innerHTML = html;
    }

    var mancheteImgOpen = function(){
        const dialogHTML = "<ons-dialog id='zoom-manchete-img' cancelable><div style='text-align: center; padding: 5px;'><img width='100%' src='" + event.target.src + "' />"+
                        "<p><ons-button onclick='hideDialog(\"zoom-manchete-img\")'>fechar</ons-button></p>"
        mancheteImgZoom.innerHTML = dialogHTML;
        showTemplateDialog();
    }

    var showTemplateDialog = function() {
        var dialog = document.getElementById('zoom-manchete-img');
            dialog.show();
    };
    
    var hideDialog = function(id) {
        document.getElementById(id).hide();
    };

    var pullHook = document.getElementById('pull-hook-manchetes-tab');
    
    pullHook.addEventListener('changestate', function(event) {

        var message = '';
        
            switch (event.state) {
                case 'initial':
                message = 'Pull to refresh';
                break;
                case 'preaction':
                message = 'Release';
                break;
                case 'action':
                message = '<ons-progress-circular indeterminate></ons-progress-circular>';
                loadManchetesTab();
    
                break;
            }
                pullHook.innerHTML = message;

    });

    pullHook.onAction = function(done) {
        setTimeout(done, 2000);
    }
}

