var imgData = '';

$(document).ready(function() {
    $('#imageInput').change((event)=>{
        file = event.target.files[0]
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#uploaded')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
                imgData = e.target.result.substring(0,500)
                console.log(imgData)
                // TODO: enable the convert button
            };
            reader.readAsDataURL(file);
        }
    })
})

function convert(){
    if (imgData){
        var myurl = "https://robohash.org/";
        myurl += imgData;
        $.ajax({
            url: myurl,
            type: 'get',
            dataType: 'html',
            async: false,
            crossDomain: 'true',
            success: function(result) {
                console.log("success")
                console.log(result)
            },
            error: function(result){
                console.log(result)
                console.log("failure")
            }
        });
    }
}