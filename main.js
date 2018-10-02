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
                // console.log(e.target.result.substring(0,1000))
            };
            reader.readAsDataURL(file);
        }
    })
})