let objects = []
let rain = []
let freeze = {dead:true}
let arrows = {dead:true}
let score = 0

function init() {
    background = add(tex2.Background)
    splatterGroup = new PIXI.Container()
    letterGroup = new PIXI.Container()
    monkeyHead = new PIXI.Sprite(tex1.MonkeyHead)
    monkeyHead.position.set(5, 5)
    scoreSprite = new PIXI.Text('0' ,{fontFamily : 'Arial', fontSize: 24, fill : '#00ffff', align : 'center', fontWeight:'600', dropShadow:true, dropShadowDistance:4, dropShadowAlpha:0.5});
    scoreSprite.position.set(100, 20)
    life = new LifeSign(3)
    life.position.set(25, 90)
    app.stage.addChild(splatterGroup, letterGroup, monkeyHead, scoreSprite, life)
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
    bb.addChild(bb1, bb2)
    bb.left = bb1
    bb.right = bb2
    // bb.scale.set(2,2)
    bb.pivot.set(fruitTexture[i][3], fruitTexture[i][4])
    return bb
}
function addBomb() {
    let bb = new PIXI.Container()

    let bb1 = new PIXI.Sprite(tex1.Bomb)
    bb1.anchor.set(0.5)

    let bb2 = new PIXI.Sprite(tex1.Spark)
    bb2.x = -40
    bb2.y = -40
    bb.addChild(bb1, bb2)
    bb.spark = bb2
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