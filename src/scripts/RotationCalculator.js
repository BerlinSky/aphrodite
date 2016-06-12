	export default class RotationCalculator {
	 	distantLeft(platePos, circlePos) {
			console.log("RotationCalculator", "distantLeft");

	    console.log("platePos", platePos);
	    console.log("circlePos", circlePos);

  		let degreeLeft = circlePos;

  		if (circlePos < platePos) {
  			for (let i=0; i<plateDeg; i+=360) {
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
		}
	}