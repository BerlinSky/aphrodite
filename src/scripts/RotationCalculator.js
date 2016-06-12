	export default class RotationCalculator {
	 	distantLeft(platePos, circlePos) {
			console.log("RotationCalculator", "distantLeft");

	    console.log("platePos", platePos);
	    console.log("circlePos", circlePos);

  		let degreeLeft = circlePos;

  		if (circlePos < platePos) {
  			for (let i=0; i<platePos; i+=360) {
  				degreeLeft += 360;
  		    console.log("degreeLeft: inside the loop", degreeLeft);
  			}
  		}
  		const distanceLeft = degreeLeft - platePos;
      console.log("distanceLeft", distanceLeft);

      return distanceLeft;
		}

		distantRight(platePos, circlePos) {
			console.log("RotationCalculator", "distantRight");

      console.log("platePos", platePos);
      console.log("circlePos", circlePos);

			const distanceRight = platePos + 360 - circlePos;
      console.log("distanceRight", distanceRight);

      return distanceRight;
      
			// if (circleDeg > plateDeg) {
				// degreeRight = degreeRight -360;

				// for (let i=0; i<plateDeg; i-=360) {

				// 	degreeRight -= 360;

			 //    console.log("degreeRight: inside the loop", degreeRight);
				// }

		 //    console.log("degreeRight: On the right", degreeRight);

			// 	distanceRight = degreeRight - plateDeg;
			// }
		}
	}