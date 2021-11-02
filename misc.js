class Splatter extends PIXI.Container {
    constructor(fruitNumber, x, y) {
        super();
        let r = Math.floor(Math.random() * 3) + 1
        let splatter = new PIXI.Sprite(tex1[fruitTexture[fruitNumber][5] + 'Splatter' + r]);
        splatter.anchor.set(0.5)
        splatter.rotation = Math.random() * Math.PI * 2
        splatter.x = x
        splatter.y = y
        objects.push(splatter)
        splatterGroup.addChild(splatter)
        splatter.countdown = 5 * 60
    }

    move() {
        if(sp.countdown > 0) {
            sp.countdown--
        } else {
            if(sp.alpha > 0) {
                sp.alpha -= 0.01
            } else {
                sp.dead = true
            }
        }
    }

}