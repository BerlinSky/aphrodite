	export default class RotationCalculator {
	 	distantLeft(platePos, circlePos) {
	    // console.log("platePos", platePos);
	    // console.log("circlePos", circlePos);

			let factor = 0;
      for (let i=0; i<=Math.abs(platePos); i+=360) {
      	factor ++;
      }
      // console.log("factor on the left", factor);

  		let distanceLeft = 0;

			if (platePos <= circlePos) {
  			distanceLeft = circlePos - platePos;
  		}
  		else {
  			distanceLeft = circlePos + 360 * factor - platePos;
  		}
      // console.log("distanceLeft", distanceLeft);

      return distanceLeft;
		}

		distantRight(platePos, circlePos) {
      let factor = 0;
      for (let i=0; i<=Math.abs(platePos); i+=360) {
      	factor ++;
      }
      // console.log("factor", factor);

			let distanceRight = 0;
      if (platePos === 0) {
				distanceRight = 360 - circlePos;
      }
      else if (platePos < circlePos) {
				distanceRight = platePos + 360 * factor - circlePos;
      }
      else {
				distanceRight = platePos - 360 * (factor -1) - circlePos;
      }
      // console.log("distanceRight", distanceRight);

      return distanceRight;
		}
	}