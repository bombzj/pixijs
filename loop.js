
let count = 0
let 方向 = 0
let sq = 30
let countRain = 0
let countFruit = 0

function gameLoop() {
    rainLoop()
    // single.angle+=1
 
    // if(方向 == 0) {
    //     bomb.x += 3
    //     if(bomb.x > 800) 方向 = 1
    // }
    // if(方向 == 1) {
    //     bomb.y += 3
    //     if(bomb.y > 300) 方向 = 2
    // }
    // if(方向 == 2) {
    //     bomb.x += -3
    //     if(bomb.x < 100) 方向 = 3
    // }
    // if(方向 == 3) {
    //     bomb.y += -3
    //     if(bomb.y < 0) 方向 = 0
    // }

    fruits.filter(x => x.dead).forEach(x => app.stage.removeChild(x))
    fruits = fruits.filter(x => !x.dead)
    for(let fruit of fruits) {
        fruit.move()
    }


    if(++countFruit > 50) {
        let fruit = new Letter()
        app.stage.addChild(fruit)
        fruits.push(fruit)
        countFruit = 0
    }

    count++
}



function rainLoop() {
    countRain++
    if(countRain > 60) {
        let fruit = addFruit(Math.floor(fruitTexture.length * Math.random()))
        fruit.x = Math.random() * 600 + 100
        fruit.y = 0
        fruit.vr = Math.random() * 5 - 2.5
        rain.push(fruit)
        app.stage.addChild(fruit)
        countRain = 0
    }
    for(let x of rain) {
        x.y += 3
        x.angle += x.vr
    }
    rain.filter(x => x.y >= 400).forEach(x => app.stage.removeChild(x))
    rain = rain.filter(x => x.y < 400)
}


window.addEventListener('keydown', function(event) {
    
    for(let fruit of fruits) {
        if(!fruit.split && fruit.charLetter == event.key) {
            fruit.cut()
            break
        }
    }
})