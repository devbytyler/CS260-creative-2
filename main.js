var imgData = '';
var convertType = 1;
$(document).ready(function() {
    $('#imageInput').change((event)=>{
        file = event.target.files[0]
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#image').attr('src', e.target.result);
                imgData = e.target.result.substring(0, 1000)
            };
            reader.readAsDataURL(file);
        }
    })
})


function changeToMonster() {
    convertType = 2;
    convert();
}

function changeToCat() {
    convertType = 4;
    convert();
}

function changeToRobot() {
    convertType = 1;
    convert();
}

function convert(){
    if (imgData){
        var myurl = "https://robohash.org/";
        myurl += imgData;
        //cat
        if (convertType == 4) {
            myurl += "?set=set4";
        }
        //monster
        else if (convertType == 2) {
            myurl += "?set=set2";
        }
        //robot is the default
        else {
            //do nothing
        }
        console.log(myurl)
        $.ajax({
            type: "GET",
            url: myurl,
            beforeSend: function (xhr) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
            },
            success: function (result, textStatus, jqXHR) {       
                if(result.length < 1){
                    alert("The robot doesn't exist");
                    $("#image").attr("src", "data:image/png;base64,");
                    return
                }
            
                var binary = "";
                var responseText = jqXHR.responseText;
                var responseTextLen = responseText.length;
            
                for ( i = 0; i < responseTextLen; i++ ) {
                    binary += String.fromCharCode(responseText.charCodeAt(i) & 255)
                }
                $("#image").attr("src", "data:image/png;base64,"+btoa(binary));
                },
                error: function(xhr, textStatus, errorThrown){
                alert("Error in getting document "+textStatus);
            } 
        });
    }
}