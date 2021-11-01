let fruits = []
let rain = []
let splatters = []

function init() {
    background = add(tex2.Background)
    splatterGroup = new PIXI.Container()
    app.stage.addChild(splatterGroup)
    // single = new addFruit(11)
    // single.x = 200
    // single.y = 200
    // app.stage.addChild(single)

    // circle = new PIXI.Graphics()
    // circle.lineStyle(2, 0x0000FF)
    // circle.beginFill(0xFF3300)
    // circle.drawCircle(0, 0, 5)
    
    // circle.endFill()
    // app.stage.addChild(circle)
    // circle.x = 200
    // circle.y = 200
}


function addFruit(i) {
    let bb = new PIXI.Container()
    let bb1 = new PIXI.Sprite(tex1[fruitTexture[i][0] + 'Left'])
    let bb2 = new PIXI.Sprite(tex1[fruitTexture[i][0] + 'Right'])
    bb2.x = fruitTexture[i][1]
    bb2.y = fruitTexture[i][2]
    bb.addChild(bb1, bb2);
    bb.left = bb1
    bb.right = bb2
    // bb.scale.set(2,2)
    bb.pivot.set(fruitTexture[i][3], fruitTexture[i][4])
    return bb
}

fruitTexture = [
    ['Pineapple', -4, 14, 21, 27],
    ['Coconut', -3, -1, 25, 24, 'Coconut'],
    ['Kiwi', -3, -1, 20, 20, 'Kiwi'],
    ['Banana', 28, 27, 35, 40, 'GreenApple'],
    ['GreenApple', 11, 2, 27, 29, 'GreenApple'],
    ['Watermelon', 11, 0, 30, 30, 'Pomegranate'],
    ['Orange', 3, 8, 27, 27, 'Orange'],
    ['Pomegranate', 1, 4, 28, 35, 'Pomegranate'],
    ['Lemon', 7, -4, 24, 21, 'Lemon'],
    ['RedApple', 7, 6, 26, 28, 'GreenApple'],
    ['Cherry', 20, 6, 24, 28],
    ['Ice', -2, 18, 26, 28],
]