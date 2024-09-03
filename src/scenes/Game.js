import { Scene } from "phaser";

// import class entitities
import { Paddle } from "../entities/Paddle";
import { Ball } from "../entities/Ball";
import { Brick } from "../entities/Brick";
import { WallBrick } from "../entities/WallBrick";

export class Game extends Scene {
  constructor() {
    super("Game");
  }
  

  create() {
    // instanciar una nueva paleta.
    // crea un nuevo objeto
    // el this, aca, hace referencia a la escena
    

    //this.ball = new Ball(this, 400, 300, 10, 0xffffff, 1);
    this.balls= this.add.group();
    this.balls.add(new Ball(this, 400, 300, 10, 0xffffff, 1));

    this.paddle = new Paddle(this, 200, 650, 1000, 20, 0xffffff, 1);
    this.wall = new WallBrick(this);

   
  
   // colisiones
    this.physics.add.collider(this.paddle, this.balls);

    this.physics.add.collider(
      this.balls,
      this.wall,
      (ball, brick) => {
        brick.hit();
        if (brick.isBallCreator) {
          const newBall = new Ball(this, ball.x, ball.y, 10, 0xffffff, 1);
          this.balls.add(newBall);
      } if(brick.isBallCreator){
        const newBola = new Ball(this, ball.x, ball.y, 10, 0xffffff, 1);
          this.balls.add(newBola);
      }
        // Verificar si todos los bloques han sido destruidos
        if (this.wall.getChildren().every(brick => brick.destroyed)) {
         
          this.balls.increaseSpeed(1.1); // Incrementa la velocidad en un 10%
          this.velocidadX = this.ball.newVelocityX;
          this.velocidadY = this.ball.newVelocityY;
          this.scene.restart({ newVelocityX: this.velocidadX, newVelocityY: this.velocidadY }); // Reinicia la escena
          console.log (this.balls.newVelocityX);
          console.log (this.balls.newVelocityY);
      }
    },
   // this.incremento(),
      null,
      this
    );

    //colision de la pelota con el limite inferior
    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      console.log("worldbounds");
      if (down) {
        console.log("hit bottom");
        this.scene.start("GameOver");
      }
    });
  }
 
 // incremento(){
 //   console.log(this.ball.newVelocityX);
 //   console.log(this.ball.newVelocityY)
 // }


  update() {
  
    this.paddle.update();
  }
}