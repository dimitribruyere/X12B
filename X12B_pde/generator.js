function generator() {

    this.stringSet1 = [];
    this.stringSet2 = [];
    this.editDistSet = [];
    this.computationTimeSet = [];

    this.generateStrings = function (howMany, length, similarity) {
        for (var i = 0; i < howMany; i++) {
            //var newString = this.createString(10); // TO CHANGE Hard-coded value TO CHANGE //
            //this.stringSet1.push(newString);
            //newString = this.createString(10); // TO CHANGE Hard-coded value TO CHANGE //
            //this.stringSet2.push(newString);
            this.createTheStrings(length, similarity);
        }
    }

    this.createTheStrings = function(length, similarity)
    {
        var string1 = "";
        var string2 = "";
        var alphabet = [];

        // // Alphabet generation :
        // for (var i = 0; i < 26; i++) {
        //   alphabet.push(String.fromCharCode(i+"a".charCodeAt(0)));
        // }
        for (var i = 0; i < 26; i++) {
            alphabet.push(String.fromCharCode(i + "A".charCodeAt(0)));
        }

        // String generation :
        for (var i = 0; i < length; i++) {
            var randomChar = random(alphabet);
            string1 += randomChar;
            var change = (Math.random() * 101) > similarity;
            if (change) {
                var type = Math.floor((Math.random() * 3) + 1);
                if (type == 1) //Subsitution
                {
                    var randomChar = random(alphabet);
                    string2 += randomChar;
                }
                if (type == 2) //Suppression
                {}
                if (type == 3) //Addition : we add to 
                {
                    string2 += randomChar;
                    var randomChar = random(alphabet);
                    string2 += randomChar;
                }
            }
            else {
                string2 += randomChar;
            }
        }
        this.stringSet1.push(string1);
        this.stringSet2.push(string2);
    }

    this.showStrings = function () {
        var results = "";
        for (var i = 0; i < this.stringSet1.length; i++) {
            timerStart = new Date();
            computeAlgo = classic(this.stringSet1[i], this.stringSet2[i]);
            timerEnd = new Date();
            var editDist = computeAlgo.ed;
            computationTime = timerEnd - timerStart;
            this.computationTimeSet[i] = computationTime;
            this.editDistSet[i] = editDist;
            results += this.stringSet1[i] + " || " + this.stringSet2[i] + " || editDist : " + editDist + " || time : " + computationTime;
            results += "<br>";
        }
        document.getElementById("reponse").innerHTML = results;
    }

    this.createString = function (StringLength) {
        var string = "";
        var alphabet = [];

        // Alphabet generation :
        for (var i = 0; i < 26; i++) {
            alphabet.push(String.fromCharCode(i + "a".charCodeAt(0)));
        }
        for (var i = 0; i < 26; i++) {
            alphabet.push(String.fromCharCode(i + "A".charCodeAt(0)));
        }

        // String generation :
        for (var i = 0; i < StringLength; i++) {
            var randomChar = random(alphabet);
            string += randomChar;
        }
        return string;
    }
}
