abstract class Figure {
  //   getArea(): void {
  //     console.log("Not Implemented");
  //   }
  abstract getArea(): void;
}
class Rectangle extends Figure {
  constructor(public width: number, public height: number) {
    super();
  }

  getArea(): void {
    let square = this.width * this.height;
    console.log("area =", square);
  }
}

//////////////////////////////////////////////////////////////////

abstract class Figure1 {
  abstract x: number;
  abstract y: number;
  abstract getArea(): void;
}
class Rectangle1 extends Figure1 {
  x: number;
  // y: number;
  // width: number;
  // height: number;

  constructor(
    x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    super();
    this.x = x;
  }

  getArea(): void {
    let square = this.width * this.height;
    console.log("area =", square);
  }
}

///////////////////////////////////////////////////////////////////

export default function (): void {
  let someFigure: Figure = new Rectangle(20, 30);
  someFigure.getArea(); // area = 600

  /////////////////////////////////////////////////////////////////

  let someFigure2: Figure1 = new Rectangle1(10, 10, 20, 25);
  someFigure2.getArea();
}
