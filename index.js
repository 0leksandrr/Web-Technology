function triangle(value1, type1, value2, type2) {
    console.log("Введіть два значення і їх типи. Доступні типи: leg, hypotenuse, adjacent angle, opposite angle, angle.");

    const DEG_TO_RAD = Math.PI / 180;
    const RAD_TO_DEG = 180 / Math.PI;

    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Помилка: введені некоректні типи. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }

    if (value1 <= 0 || value2 <= 0) {
        console.log("Помилка: значення повинні бути позитивними.");
        return "failed";
    }

    let a, b, c, alpha, beta;

    function solveFromLegAndHypotenuse(leg, hypotenuse) {
        if (leg >= hypotenuse) {
            console.log("Помилка: катет не може бути більший або рівний гіпотенузі.");
            return "failed";
        }
        c = hypotenuse;
        a = leg;
        b = Math.sqrt(c * c - a * a);
        alpha = Math.asin(a / c) * RAD_TO_DEG;
        beta = 90 - alpha;
        return "success";
    }

    function solveFromLegAndAdjacentAngle(leg, angle) {
        if (angle <= 0 || angle >= 90) {
            console.log("Помилка: кут повинен бути гострим.");
            return "failed";
        }
        alpha = angle;
        a = leg;
        c = a / Math.sin(alpha * DEG_TO_RAD);
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
        return "success";
    }

    function solveFromLegAndOppositeAngle(leg, angle) {
        if (angle <= 0 || angle >= 90) {
            console.log("Помилка: кут повинен бути гострим.");
            return "failed";
        }
        beta = angle;
        b = leg;
        c = b / Math.sin(beta * DEG_TO_RAD);
        a = Math.sqrt(c * c - b * b);
        alpha = 90 - beta;
        return "success";
    }

    function solveFromHypotenuseAndAngle(hypotenuse, angle) {
        if (angle <= 0 || angle >= 90) {
            console.log("Помилка: кут повинен бути гострим.");
            return "failed";
        }
        c = hypotenuse;
        alpha = angle;
        a = c * Math.sin(alpha * DEG_TO_RAD);
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
        return "success";
    }

    if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {
        if (type1 === "leg") return solveFromLegAndHypotenuse(value1, value2);
        else return solveFromLegAndHypotenuse(value2, value1);
    }

    if ((type1 === "leg" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "leg")) {
        if (type1 === "leg") return solveFromLegAndAdjacentAngle(value1, value2);
        else return solveFromLegAndAdjacentAngle(value2, value1);
    }

    if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) {
        if (type1 === "leg") return solveFromLegAndOppositeAngle(value1, value2);
        else return solveFromLegAndOppositeAngle(value2, value1);
    }

    if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) {
        if (type1 === "hypotenuse") return solveFromHypotenuseAndAngle(value1, value2);
        else return solveFromHypotenuseAndAngle(value2, value1);
    }

    console.log("Помилка: несумісна пара типів. Перечитайте інструкцію.");
    return "failed";
}

console.log(triangle(4, "leg", 8, "hypotenuse"));
console.log(triangle(8, "hypotenuse", 4, "leg"));
console.log(triangle(3, "leg", 45, "adjacent angle"));
console.log(triangle(4, "leg", 30, "opposite angle"));
console.log(triangle(10, "hypotenuse", 45, "angle"));
