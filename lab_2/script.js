(function() {
    var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

    for (var i = 0; i < names.length; i++) {
        var firstLetter = names[i].charAt(0).toLowerCase();

        if (firstLetter === 'j') {
            speakGoodBye(names[i]);
        } else {
            speakHello(names[i]);
        }
    }

    console.log("\n--- Додатковий функціонал: Селекція за унікальними літерами ---");
    for (var j = 0; j < names.length; j++) {
        var uniqueLetters = new Set(names[j].toLowerCase()).size;

        if (uniqueLetters > 4) {
            speakHello(names[j]);
        } else {
            speakGoodBye(names[j]); 
        }
    }
})();
