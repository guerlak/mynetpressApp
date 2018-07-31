
if(!checkAuth()){

    myNavigator.resetToPage("manchetes.html");

} else {

    var loginFree = "manchetemobile";
    var passFree = "mancheteqwerty";
    var requestURL = 'https://services.manchete.pt:8001/Manchetes.asmx/getCoversPress?user=' + loginFree + '&password=' + passFree + '&callback=';

        modal.show();
    
    var images = document.querySelector('#manchetes-images-tab');
    var mancheteImgZoom = document.querySelector('#manchete-image-zoom');
    var request = new XMLHttpRequest();

        request.open('GET', requestURL);
        request.responseType = 'text';
        
        request.onload = function () {
            var mancheteText = request.response;
                mancheteText = mancheteText.substring(1, mancheteText.length - 1);
            var manchetes = JSON.parse(mancheteText);
            modal.hide();
            populate(manchetes);
            
        }

        if(request.status === 500){
            images.innerHTML = "<p>Error</p>"
        }

        request.send();
            
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

        var prev = function() {
            var carousel = document.getElementById('carousel');
            carousel.prev();
        };
        
        var next = function() {
            var carousel = document.getElementById('carousel');
            carousel.next();
        };
        
        ons.ready(function() {
            var carousel = document.addEventListener('postchange', function(event) {
            
            });

        });

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

}