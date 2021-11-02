
let gameTick = 0
let sq = 30
let countRain = 0
let countFruit = 0

function gameLoop() {
    rainLoop()
    // single.angle+=1

    objects.filter(x => x.dead).forEach(x => x.parent.removeChild(x))
    objects = objects.filter(x => !x.dead)
    
    for(let fruit of objects) {
        fruit.move()
    }


    if(freeze && freeze.dead) {
        freeze = undefined
    }

    if(arrows && arrows.dead) {
        arrows = undefined
    }
    

    if(++countFruit > 40) {
        let fruit = new Letter()
        letterGroup.addChild(fruit)
        objects.push(fruit)
        countFruit = 0
    }

    if(lastCutTime != 0 && gameTick - lastCutTime > 30 && cutCombo > 2) {
        let popup = new Popup(cutCombo, lastCutX, lastCutY)
        app.stage.addChild(popup)
        objects.push(popup)
        lastCutTime = 0
    }

    gameTick++
}



function rainLoop() {
    countRain++
    if(countRain > 60) {
        let fruit = addFruit(Math.floor(fruitTexture.length * Math.random()))
        fruit.x = Math.random() * 600 + 100
        fruit.y = 0
        fruit.vr = Math.random() * 5 - 2.5
        rain.push(fruit)
        letterGroup.addChild(fruit)
        countRain = 0
    }
    for(let x of rain) {
        x.y += 3
        x.angle += x.vr
    }
    rain.filter(x => x.y >= 400).forEach(x => letterGroup.removeChild(x))
    rain = rain.filter(x => x.y < 400)
}


let lastCutTime = 0
let cutCombo = 0
let lastCutX, lastCutY

window.addEventListener('keydown', function(event) {
    
    for(let fruit of objects) {
        if(!fruit.split && fruit.charLetter == event.key) {
            fruit.cut()
            if(fruit.fruitNumber == 10) {   // cut all fruits
                for(let fruit2 of objects) {
                    if(fruit2.charLetter && !fruit2.split) {
                        fruit2.cut()
                    }
                }
            }
            if(gameTick - lastCutTime < 30) {
                cutCombo++
            } else {
                cutCombo = 1
            }
            lastCutTime = gameTick
            lastCutX = fruit.x
            lastCutY = fruit.y

            break
        }
    }
})