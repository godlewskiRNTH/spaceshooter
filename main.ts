//  Background
effects.starField.startScreenEffect()
//  Set Score and Life 
info.player1.setLife(1)
info.player1.setScore(0)
//  Spaceship Configuration
let spaceship = sprites.create(img`
    . . . . . . . c d . . . . . . .
    . . . . . . . c d . . . . . . .
    . . . . . . 2 c d 2 . . . . . .
    . . . . . 2 2 c b 2 2 . . . . .
    . . . . 2 2 2 f f 2 2 2 . . . .
    . . . . . . . c 2 . . . . . . .
    . . . . . . . f f . . . . . . .
    . . . . . . . e 2 . . . . . . .
    . . . . . . e e 4 e . . . . . .
    . . . . . . e 2 4 e . . . . . .
    . . . . . c c c e e e . . . . .
    . . . . e e 2 2 2 4 e e . . . .
    . . c f f f c c e e f f e e . .
    . c c c c e e 2 2 2 2 4 2 e e .
    c c c c c c e e 2 2 2 4 2 2 e e
    c c c c c c e e 2 2 2 2 4 2 e e
`)
spaceship.setPosition(80, 111)
spaceship.setKind(SpriteKind.Player)
controller.moveSprite(spaceship, 100, 0)
spaceship.setStayInScreen(true)
//  Spawn Asteroids
game.onUpdateInterval(1000, function spawner() {
    let yVel = randint(20, 50)
    let asteroid = sprites.createProjectileFromSprite(img`
        . . . . . . c c c . . . . . . .
        . . . . . a a a c c c . . . . .
        . . . c a c f a a a a c . . . .
        . . c a c f f f a f f a c . . .
        . c c a c c f a a c f f a c . .
        . a b a a c 6 a a c c f a c c c
        . a b b b 6 a b b a a c a f f c
        . . a b b a f f b b a a c f f c
        c . a a a c c f c b a a c f a c
        c c a a a c c a a a b b a c a c
        a c a b b a a 6 a b b 6 b b c .
        b a c b b b 6 b c . c c a c . .
        b a c c a b b a c . . . . . . .
        b b a c a b a a . . . . . . . .
        a b 6 b b a c . . . . . . . . .
        . a a b c . . . . . . . . . . .
    `, null, 0, yVel)
    let xPos = randint(0, scene.screenWidth())
    asteroid.setPosition(xPos, 0)
    asteroid.setKind(SpriteKind.Enemy)
    asteroid.setFlag(SpriteFlag.AutoDestroy, true)
})
//  Fire Button
controller.A.onEvent(ControllerButtonEvent.Pressed, function shoot() {
    let laser = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . 2 2 2 . . . . . .
        . . . . . . 2 3 1 3 2 . . . . .
        . . . . . . 3 1 1 1 3 . . . . .
        . . . . . . 3 1 1 1 3 . . . . .
        . . . . . . 3 1 1 1 3 . . . . .
        . . . . . . 2 1 1 1 3 . . . . .
        . . . . . . 2 1 1 1 2 . . . . .
        . . . . . . 2 3 1 3 2 . . . . .
        . . . . . . . 3 1 3 . . . . . .
        . . . . . . . 2 1 2 . . . . . .
        . . . . . . . 2 1 2 . . . . . .
        . . . . . . . 2 1 2 . . . . . .
        . . . . . . . . . . . . . . . .
    `, spaceship, 0, -50)
    laser.setKind(SpriteKind.Projectile)
    music.pewPew.play()
    laser.setFlag(SpriteFlag.AutoDestroy, true)
})
//  Check for collisions
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function collision(sprite: Sprite, otherSprite: Sprite) {
    sprite.destroy(effects.fire, 500)
    otherSprite.destroy(effects.ashes, 500)
    // scene.camera_shake(20, 1000)
    music.bigCrash.play()
    info.player1.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function hit(sprite: Sprite, otherSprite: Sprite) {
    sprite.destroy()
    otherSprite.destroy(effects.ashes, 100)
    music.bigCrash.play()
    info.player1.changeScoreBy(1)
})
