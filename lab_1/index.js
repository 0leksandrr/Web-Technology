function triangle(value1, type1, value2, type2) {

    const DEG_TO_RAD = Math.PI / 180;
    const RAD_TO_DEG = 180 / Math.PI;

    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Error: Invalid types entered. Please refer to the instructions.");
        return "failed";
    }

    if (value1 <= 0 || value2 <= 0) {
        console.log("Error: Values must be positive.");
        return "failed";
    }

    let a, b, c, alpha, beta;

    function solveFromLegAndHypotenuse(leg, hypotenuse) {
        if (leg >= hypotenuse) {
            console.log("Error: The leg cannot be greater than or equal to the hypotenuse.");
            return "failed";
        }
        c = hypotenuse;
        a = leg;
        b = Math.sqrt(c * c - a * a);
        alpha = Math.asin(a / c) * RAD_TO_DEG;
        beta = 90 - alpha;
        return { a, b, c, alpha, beta };
    }

    function solveFromLegAndAdjacentAngle(leg, angle) {
        if (angle <= 0 || angle >= 90) {
            console.log("Error: The angle must be acute.");
            return "failed";
        }
        alpha = angle;
        a = leg;
        c = a / Math.sin(alpha * DEG_TO_RAD);
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
        return { a, b, c, alpha, beta };
    }

    function solveFromLegAndOppositeAngle(leg, angle) {
        if (angle <= 0 || angle >= 90) {
            console.log("Error: The angle must be acute.");
            return "failed";
        }
        beta = angle;
        b = leg;
        c = b / Math.sin(beta * DEG_TO_RAD);
        a = Math.sqrt(c * c - b * b);
        alpha = 90 - beta;
        return { a, b, c, alpha, beta };
    }

    function solveFromHypotenuseAndAngle(hypotenuse, angle) {
        if (angle <= 0 || angle >= 90) {
            console.log("Error: The angle must be acute.");
            return "failed";
        }
        c = hypotenuse;
        alpha = angle;
        a = c * Math.sin(alpha * DEG_TO_RAD);
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
        return { a, b, c, alpha, beta };
    }

    let result;

    if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {
        result = type1 === "leg" ? solveFromLegAndHypotenuse(value1, value2) : solveFromLegAndHypotenuse(value2, value1);
    } else if ((type1 === "leg" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "leg")) {
        result = type1 === "leg" ? solveFromLegAndAdjacentAngle(value1, value2) : solveFromLegAndAdjacentAngle(value2, value1);
    } else if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) {
        result = type1 === "leg" ? solveFromLegAndOppositeAngle(value1, value2) : solveFromLegAndOppositeAngle(value2, value1);
    } else if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) {
        result = type1 === "hypotenuse" ? solveFromHypotenuseAndAngle(value1, value2) : solveFromHypotenuseAndAngle(value2, value1);
    } else {
        console.log("Error: Incompatible pair of types. Please refer to the instructions.");
        return "failed";
    }

    if (result === "failed") {
        return "failed";
    }

    console.log(`Results: a = ${result.a.toFixed(2)}, b = ${result.b.toFixed(2)}, c = ${result.c.toFixed(2)}, alpha = ${result.alpha.toFixed(2)}°, beta = ${result.beta.toFixed(2)}°`);
    return "success";
}

console.log(triangle(4, "leg", 8, "hypotenuse"));
console.log(triangle(8, "hypotenuse", 4, "leg"));
console.log(triangle(3, "leg", 45, "adjacent angle"));
console.log(triangle(4, "leg", 30, "opposite angle"));
console.log(triangle(10, "hypotenuse", 45, "angle"));
