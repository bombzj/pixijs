
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

    if(++countFruit > 30) {
        let fruit = new Letter()
        letterGroup.addChild(fruit)
        objects.push(fruit)
        countFruit = 0
    }

    if(gameTick - lastCutTime > 20) {
        if(cutCombo > 2) {
            let popup = new Popup(cutCombo, lastCutX, lastCutY)
            app.stage.addChild(popup)
            objects.push(popup)

            score += 13 * cutCombo
            scoreSprite.text = score
        }
        cutCombo = 0
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


let lastCutTime = -100, lastCutX, lastCutY
let cutCombo = 0, cutComboX, cutComboY

window.addEventListener('keydown', function(event) {
    let hit = false
    let sorted = objects.filter(o => o.prio > 0)
    sorted.sort((a, b) => {
        return a.prio - b.prio
    })
    for(let fruit of sorted) {
        if(!fruit.split && fruit.charLetter == event.key) {
            fruit.cut()
            hit = true
            if(fruit.fruitNumber == 10) {   // cut all fruits
                for(let fruit2 of objects) {
                    if(fruit2.charLetter && !fruit2.split && fruit2.fruitNumber != -1) {
                        fruit2.cut()
                    }
                }
            }

            if(fruit.fruitNumber != -1) {
                cutCombo++
                lastCutX = fruit.x
                lastCutY = fruit.y
                lastCutTime = gameTick
            }

            break
        }
    }
    if(!hit) {
        score -= 7
        scoreSprite.text = score
    }
})