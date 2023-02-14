const gravity = 0.6

const backgroundSpritePath = "../assets/placeholder.png"

class Sprite {
  constructor({ position, velocity, dimensions, source }) {
    this.position = position
    this.velocity = velocity
    this.width = dimensions?. width
    this.height = dimensions?. height
    
    if (source) {
      this.image = new Image()
      this.image.src = source
      this.width = this.image.width
      this.height = this.image.height
    }
  }

  draw() {
    if (this.image) {
      ctx.drawImage(
        this.image,
        this.position.X,
        this.position.Y,
        this.width,
        this.height
      )
    } else {
      ctx.fillStyle = "white"
      ctx.fillRect(this.position.X, this.position.Y, this.width, this.height)
    }

    if (this.isAttacking) {
      ctx.fillStyle = "red"
      ctx.fillRect(
        this.attackBox.position.X,
        this.attackBox.position.Y,
        this.attackBox.width,
        this.attackBox.height
      )
    }
  }

  update() {
    this.draw()
  }
}

class Fighter extends Sprite {
  constructor({ position, velocity, dimensions }) {
    super({
      position,
      velocity,
      dimensions,
    })

    this.velocity = velocity
    this.width = dimensions.width
    this.height = dimensions.height

    this.attackBox = {
      position: {
        X: this.position.X,
        Y: this.position.Y,
      },
      width: 125,
      height: 50
    }

    this.isAttacking
    this.attackCooldown = 500
    this.onAttackCooldown

    this.lastKeyPressed
    this.onGround
  }

  update() {
    if (Math.ceil(this.position.Y + this.height >= canvas.height)) {
      this.onGround = true
    } else {
      this.onGround = false
    }

    if (this.position.Y + this.height > canvas.height) {
      this.position.Y = canvas.height - this.height
      this.velocity.Y = 0
    } else {
      if (!this.onGround) this.velocity.Y += gravity
    }

    this.position.X += this.velocity.X
    this.position.Y += this.velocity.Y

    this.attackBox.position.X = this.position.X
    this.attackBox.position.Y = this.position.Y

    this.draw()
  }

  attack() {
    if (this.onAttackCooldown) return

    this.isAttacking = true
    this.onAttackCooldown = true

    
    setTimeout(() => {
      this.isAttacking = false
    }, 100)

    setTimeout(() => {
      this.onAttackCooldown = false
    }, this.attackCooldown)
  }

  jump() {
    if (!this.onGround) return
    this.velocity.Y = -16
  }
}

const player = new Fighter({
  position: {
    X: 100,
    Y: 0,
  },
  velocity: {
    X: 0,
    Y: 10,
  },
  dimensions: {
    width: 50,
    height: 150,
  },
})

// const player2 = new Fighter({
//   position: {
//     X: 500,
//     Y: 20,
//   },
//   velocity: {
//     X: 0,
//     Y: 10,
//   },
//   dimensions: {
//     width: 50,
//     height: 200,
//   },
// })

const background = new Sprite({
  position: {
    X: 0,
    Y: 0,
  },
  source: backgroundSpritePath
})