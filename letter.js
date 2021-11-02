class Letter extends PIXI.Container {
    constructor(type) {
        super();
        this.charLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));

        this.color = 'yellow'
        this.fruitNumber = Math.floor(fruitTexture.length * Math.random())
        this.fruit = addFruit(this.fruitNumber)
        this.fruit.y = 60
        this.letter = new PIXI.Text(this.charLetter ,{fontFamily : 'Arial', fontSize: 70, fill : this.color, align : 'center', fontWeight:'600', dropShadow:true, dropShadowDistance:4, dropShadowAlpha:0.5});
        this.letter.anchor.set(0.5)

        this.x = 100 + Math.random() * 600
        this.y = 420
        this.vx = (Math.random() * 800 - this.x) / 130
        this.vy = -7.5 - Math.random() * 1.2
        this.split = false
        this.alpha = 1
        this.fruit.angle = Math.random() * 360
 
        this.addChild(this.fruit, this.letter)
    }

    move() {
        if(freeze && gameTick % 2 == 1) {  // ice slow
            return
        }
        if(this.split) {
            if(this.alpha > 0) {
                this.fruit.left.x += -2
                this.fruit.right.x += 2
                this.alpha -= 0.05
            } else {
                this.dead = true
            }
            
            if(this.slice.alpha > 0) {
                this.slice.alpha -= 0.05
            } else {
                this.slice.visible = false
            }
        } else {
            this.x += this.vx
            this.y += this.vy
            this.vy += 0.1
            this.fruit.angle += 1
            if(this.y > 450) {
                this.dead = true
            }
        }
    }

    cut() {
        this.split = true
        this.letter.visible = false

        
        this.slice = new PIXI.Sprite(tex1.Slice)
        this.slice.anchor.set(0.5)
        
        this.slice.alpha = 1
        
        this.slice.angle = -90 * Math.random() - 45
        this.slice.x = this.fruit.x
        this.slice.y = this.fruit.y

        this.addChild(this.slice)

        // splatter
        if(fruitTexture[this.fruitNumber][5]) {
            let splatter = new Splatter(this.fruitNumber, this.fruit.x + this.x, this.fruit.y + this.y);
        }

        if(this.fruitNumber == 11) {
            if(!freeze) {
                freeze = new PIXI.Container()
                let left = new PIXI.Sprite(tex1.FreezeLeft)
                let right = new PIXI.Sprite(tex1.FreezeRight)
                let top = new PIXI.Sprite(tex1.FreezeTop)
                let bottom = new PIXI.Sprite(tex1.FreezeBottom)

                left.y = right.y = top.height
                right.x = 916 - right.width
                bottom.y = 400 - bottom.height

                freeze.addChild(left, right, top, bottom)
                freeze.alpha = 0.02
                freeze.countdown = 0
                app.stage.addChild(freeze)
            }
        } else if(this.fruitNumber == 0) {
            if(!arrows) {
                arrows = new PIXI.Container()

                let top = new PIXI.TilingSprite(tex1.ArrowTop, 916, 20)
                let bottom = new PIXI.TilingSprite(tex1.ArrowBottom, 916, 20)
                bottom.y = 400 - bottom.height

                arrows.addChild(top, bottom)
                arrows.countdown = 180
                app.stage.addChild(arrows)
            }
        }
    }
}