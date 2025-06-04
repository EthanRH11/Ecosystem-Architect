export class Vector {
    constructor(
        x = 0,
        y = 0
    ) {
        this.x = x;
        this.y = y;
    }

    add(paraVec) {
        this.x += paraVec.x;
        this.y += paraVec.y;
    }

    sub(paraVec) {
        this.x -= paraVec.x;
        this.y -= paraVec.y; 
    }

    flipX() {this.x *= -1;}
    flipY() {this.y *= -1;}

    toObject() {
        return {
            x: this.x,
            y: this.y
        }
    }
}