class Splatter extends PIXI.Sprite {
    constructor(fruitNumber, x, y) {
        let r = Math.floor(Math.random() * 3) + 1
        super(tex1[fruitTexture[fruitNumber][5] + 'Splatter' + r])
        this.anchor.set(0.5)
        this.rotation = Math.random() * Math.PI * 2
        this.x = x
        this.y = y
        this.countdown = 5 * 60
    }

    move() {
        if(this.countdown > 0) {
            this.countdown--
        } else {
            if(this.alpha > 0) {
                this.alpha -= 0.01
            } else {
                this.dead = true
            }
        }
    }

}

class DropCross extends PIXI.Sprite {
    constructor(x, y) {
        super(tex1['X On'])
        this.anchor.set(0.5)
        this.x = x
        this.y = 360 + Math.random() * 20
        this.countdown = 1 * 60
    }

    move() {
        let dis = 2
        if(this.countdown > 0) {
            this.countdown--
            if(this.countdown % 10 < 5 ) {
                this.x += dis
                this.y += dis
            } else {
                this.x -= dis
                this.y -= dis
            }
        } else {
            this.dead = true
        }
    }

}

class Freeze extends PIXI.Container {
    constructor() {
        super()
        let left = new PIXI.Sprite(tex1.FreezeLeft)
        let right = new PIXI.Sprite(tex1.FreezeRight)
        let top = new PIXI.Sprite(tex1.FreezeTop)
        let bottom = new PIXI.Sprite(tex1.FreezeBottom)

        left.y = right.y = top.height
        right.x = 916 - right.width
        bottom.y = 400 - bottom.height

        this.addChild(left, right, top, bottom)
        this.alpha = 0.02
        this.countdown = 0
    }

    move() {
        if(this.countdown == 0) {
            if(this.alpha >= 1) {
                this.countdown = 1
            } else {
                this.alpha += 0.02
            }
        } else if(this.countdown > 300){
            if(this.alpha <= 0) {
                this.dead = true
            } else {
                this.alpha -= 0.02
            }
        } else {
            this.countdown++
        }
    }


    restart() {
        this.countdown = 0
        this.alpha = 0.02
        this.dead = false
    }
}


class Arrows extends PIXI.Container {
    constructor() {
        super()

        let top = new PIXI.TilingSprite(tex1.ArrowTop, 916, 20)
        let bottom = new PIXI.TilingSprite(tex1.ArrowBottom, 916, 20)
        bottom.y = 400 - bottom.height

        this.addChild(top, bottom)
        this.countdown = 360
    }

    move() {
        this.children[0].tilePosition.x++
        this.children[1].tilePosition.x--
        if(this.countdown-- <= 0) {
            this.dead = true
        }
    }
    restart() {
        this.countdown = 360
    }
}

class Popup extends PIXI.Container {
    constructor(number, x, y) {
        super()

        let combo = new PIXI.Sprite(tex1.FruitCombo)
        this.position.set(x, y)
        let numberSprite = new PIXI.Text('' + number ,{fontFamily : 'Arial', fontSize: 40, fill : 'white', align : 'center', fontWeight:'300', dropShadow:true, dropShadowDistance:4, dropShadowAlpha:0.5});
        numberSprite.position.set(45, 10)
        this.addChild(combo, numberSprite)
        this.countdown = 120
        this.pivot.set(this.width/2, this.height/2)
        this.scale.set(0)
    }

    move() {
        if(this.countdown-- <= 0) {
            this.dead = true
        }
        if(this.countdown > 110) {
            this.scale.set((120 - this.countdown) / 10)
        } else if(this.countdown < 10) {
            this.scale.set(this.countdown / 10)
        } else {
            this.scale.set(1)
        }
    }
}


class LifeSign extends PIXI.Container {
    constructor(number) {
        super()
        this.maxLife = number
        this.life = number
        this.signs = []
        for(let i = 0;i < number;i++) {
            let sign = new PIXI.Sprite(tex1['X Off'])
            sign.position.set(0, i *40)
            this.addChild(sign)
            this.signs.push(sign)
        }
    }

    setLife(n) {
        this.life = n
        for(let i = 0;i < this.maxLife;i++) {
            if(i < this.maxLife - n) {
                this.signs[i].texture = tex1['X On']
            } else {
                this.signs[i].texture = tex1['X Off']
            }
        }
    }

    lose() {
        if(this.life > 0) {
            this.setLife(this.life - 1)
        }
    }

    loseAll() {
        this.setLife(0)
    }
}