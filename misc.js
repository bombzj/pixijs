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
        } else if(this.countdown > 200){
            if(this.alpha <= 0) {
                this.dead = true
            } else {
                this.alpha -= 0.02
            }
        } else {
            this.countdown++
        }
    }

}