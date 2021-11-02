
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


    if(freeze) {
        if(freeze.countdown == 0) {
            if(freeze.alpha >= 1) {
                freeze.countdown = 1
            } else {
                freeze.alpha += 0.02
            }
        } else if(freeze.countdown > 200){
            if(freeze.alpha <= 0) {
                app.stage.removeChild(freeze)
                freeze = undefined
            } else {
                freeze.alpha -= 0.02
            }
        } else {
            freeze.countdown++
        }
    }
    if(arrows) {
        arrows.children[0].tilePosition.x++
        arrows.children[1].tilePosition.x--
        if(arrows.countdown-- <= 0) {
            app.stage.removeChild(arrows)
            arrows = undefined
        }
    }

    if(++countFruit > 40) {
        let fruit = new Letter()
        app.stage.addChild(fruit)
        objects.push(fruit)
        countFruit = 0
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
            break
        }
    }
})