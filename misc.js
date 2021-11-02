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