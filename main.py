def collision(sprite, otherSprite):
    sprite.destroy(effects.fire, 1000)

def hit(sprite, otherSprite):
    pass

def shoot():
    laser = sprites.create_projectile_from_sprite(img("""
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
    """), spaceship, 0, -50)
    laser.set_kind(SpriteKind.projectile)
    music.pew_pew.play()
    laser.set_flag(SpriteFlag.AUTO_DESTROY, True)

def spawner():
    yVel = randint(20, 50)
    asteroid = sprites.create_projectile_from_sprite(img("""
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
    """), None, 0, yVel)
    
    xPos = randint(0, scene.screen_width())
    asteroid.set_position(xPos, 0)
    asteroid.set_kind(SpriteKind.enemy)
    asteroid.set_flag(SpriteFlag.AUTO_DESTROY, True)

# Background
effects.star_field.start_screen_effect()

# Spaceship Configuration
spaceship = sprites.create(img("""
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
"""))
spaceship.set_position(80, 111)
spaceship.set_kind(SpriteKind.player)
controller.move_sprite(spaceship, 100, 0)
spaceship.set_stay_in_screen(True)

# Spawn Asteroids
game.on_update_interval(1000, spawner)

# Fire Button
controller.A.on_event(ControllerButtonEvent.PRESSED, shoot)

# Check for collisions
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, collision)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, hit)