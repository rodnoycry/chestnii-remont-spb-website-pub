var calc = function () {
    var koef = 1.2 //
    if ($(".calc-form").length > 0) {
        var form = $(".calc-form").serializeArray()
        var type = form[0].value == "novostroika" ? 1370 : 1980
        var square = Number(area.value) * (type + 500) // 500 r 27.09.2023
        var rooms = square + Number(roomsQty.value) * 0.5 * square
        var toilets = Number(bathroomQty.value) * 41437
        var floors = 0
        var walls = 0
        var electro = 0
        var other = 0
        for (var i = 4; i < form.length; i++) {
            switch (form[i].name) {
                case "floorLeveling":
                    floors = 264 * Number(area.value)
                    break
                case "wallAlignment":
                    walls =
                        (type + 544) *
                        (Number(roomsQty.value) + Number(bathroomQty.value))
                    break
                case "electricalWork":
                    electro =
                        3500 *
                        (Number(roomsQty.value) + Number(bathroomQty.value))
                    break
                case "plumbingWork":
                    other = 8900 * Number(bathroomQty.value)
                    break
            }
        }
        return XFormatPrice(
            (rooms + toilets + floors + walls + electro + other) * koef * 1.4
        )
    } else {
        return 0
    }
}
