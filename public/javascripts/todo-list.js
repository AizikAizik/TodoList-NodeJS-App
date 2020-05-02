$(document).ready(function () {
        $('form').on("submit" , function () {
            const item = $("form input")
            let todo = { item : item.val() }

            $.ajax({
                type : "POST",
                url : "/todo",
                data : todo,
                success : function (data) {
                    // do something with the data via the front end framework
                    location.reload()
                }
            })
            return false
        })

        $("li").on("click", function () {
            let item = $(this).text().replace(/ /g, "-")
            $.ajax({
                type : "DELETE",
                url : "/todo/" + item,
                success : function (data) {
                    location.reload();
                }
            })

        })
})