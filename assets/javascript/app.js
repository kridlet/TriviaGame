var state = {
    AL: {
        name: "Alabama",
        capital: "Montgomery",
        abbreviation: "al",
    },
    AK: {
        name: "Alaska",
        capital: "Juneau",
        abbreviation: "ak",
    },
    AZ: {
        name: "Arizona",
        capital: "Phoenix",
        abbreviation: "az",
    },
    AR: {
        name: "Arkansas",
        capital: "Little Rock",
        abbreviation: "ar",
    },
    CA: {
        name: "California",
        capital: "Sacramento",
        abbreviation: "ca",
    },
    CO: {
        name: "Colorado",
        capital: "Denver",
        abbreviation: "co",
    },
    CT: {
        name: "Connecticut",
        capital: "Hartford",
        abbreviation: "ct",
    },
    DE: {
        name: "Delaware",
        capital: "Dover",
        abbreviation: "de",
    },
    FL: {
        name: "Florida",
        capital: "Tallahassee",
        abbreviation: "fl",
    },
    GA: {
        name: "Georgia",
        capital: "Atlanta",
        abbreviation: "ga",
    },
    HI: {
        name: "Hawaii",
        capital: "Honolulu",
        abbreviation: "hi",
    },
    ID: {
        name: "Idaho",
        capital: "Boise",
        abbreviation: "id",
    },
    IL: {
        name: "Illinois",
        capital: "Springfield",
        abbreviation: "il",
    },
    IN: {
        name: "Indiana",
        capital: "Indianapolis",
        abbreviation: "in",
    },
    IA: {
        name: "Iowa",
        capital: "Des Moines",
        abbreviation: "ia",
    },
    KS: {
        name: "Kansas",
        capital: "Topeka",
        abbreviation: "ks",
    },
    KY: {
        name: "Kentucky",
        capital: "Frankfort",
        abbreviation: "ky",
    },
    LA: {
        name: "Louisiana",
        capital: "Baton Rouge",
        abbreviation: "la",
    },
    ME: {
        name: "Maine",
        capital: "Augusta",
        abbreviation: "me",
    },
    MD: {
        name: "Maryland",
        capital: "Annapolis",
        abbreviation: "md",
    },
    MA: {
        name: "Massachusetts",
        capital: "Boston",
        abbreviation: "ma",
    },
    MI: {
        name: "Michigan",
        capital: "Lansing",
        abbreviation: "mi",
    },
    MN: {
        name: "Minnesota",
        capital: "Saint Paul",
        abbreviation: "mn",
    },
    MS: {
        name: "Mississippi",
        capital: "Jackson",
        abbreviation: "ms",
    },
    MO: {
        name: "Missouri",
        capital: "Jefferson City",
        abbreviation: "mo",
    },
    MT: {
        name: "Montana",
        capital: "Helana",
        abbreviation: "mt",
    },
    NE: {
        name: "Nebraska",
        capital: "Lincoln",
        abbreviation: "ne",
    },
    NV: {
        name: "Nevada",
        capital: "Carson City",
        abbreviation: "nv",
    },
    NH: {
        name: "New Hampshire",
        capital: "Concord",
        abbreviation: "nh",
    },
    NJ: {
        name: "New Jersey",
        capital: "Trenton",
        abbreviation: "nj",
    },
    NM: {
        name: "New Mexico",
        capital: "Santa Fe",
        abbreviation: "nm",
    },
    NY: {
        name: "New York",
        capital: "Albany",
        abbreviation: "ny",
    },
    NC: {
        name: "North Carolina",
        capital: "Raleigh",
        abbreviation: "nc",
    },
    ND: {
        name: "North Dakota",
        capital: "Bismarck",
        abbreviation: "nd",
    },
    OH: {
        name: "Ohio",
        capital: "Columbus",
        abbreviation: "oh",
    },
    OK: {
        name: "Oklahoma",
        capital: "Oklahoma City",
        abbreviation: "ok",
    },
    OR: {
        name: "Oregon",
        capital: "Salem",
        abbreviation: "or",
    },
    PA: {
        name: "Pennsylvania",
        capital: "Harrisburg",
        abbreviation: "pa",
    },
    RI: {
        name: "Rhode Island",
        capital: "Providence",
        abbreviation: "ri",
    },
    SC: {
        name: "South Carolina",
        capital: "Columbia",
        abbreviation: "sc",
    },
    SD: {
        name: "South Dakota",
        capital: "Pierre",
        abbreviation: "sd",
    },
    TN: {
        name: "Tennessee",
        capital: "Nashville",
        abbreviation: "tn",
    },
    TX: {
        name: "Texas",
        capital: "Austin",
        abbreviation: "tx",
    },
    UT: {
        name: "Utah",
        capital: "Salt Lake City",
        abbreviation: "ut",
    },
    VT: {
        name: "Vermont",
        capital: "Montpelier",
        abbreviation: "vt",
    },
    VA: {
        name: "Virginia",
        capital: "Richmond",
        abbreviation: "va",
    },
    WA: {
        name: "Washington",
        capital: "Olympia",
        abbreviation: "wa",
    },
    WV: {
        name: "West Virginia",
        capital: "Charleston",
        abbreviation: "wv",
    },
    WI: {
        name: "Wisconsin",
        capital: "Madison",
        abbreviation: "wi",
    },
    WY: {
        name: "Wyoming",
        capital: "Cheyenne",
        abbreviation: "wy",
    }
}

var vectorMap = {
    map: 'usa_en',
    backgroundColor: '#a5bfdd',
    borderColor: '#818181',
    borderOpacity: 0.25,
    borderWidth: 1,
    //color: '#f4f3f0',
    enableZoom: false,
    hoverOpacity: .6,
    normalizeFunction: 'linear',
    selectedColor: '#c9dfaf',
    showTooltip: false,

    onRegionSelect: function (event, code, region) {
        event.preventDefault();

    },
    onRegionClick: function (event, code, region) {
        event.preventDefault();
        if (!game.disableClick) {
            game.disableClick = 1;
            game.evaluateAnswer(code, region);
        }
    },
    multiSelectRegion: false,
}

var game = {
    // initialize properties
    timerDuration: 6,
    started: 0,
    currentCorrect: '',
    currentCorrectAbbrv: '',
    currentCorrectCapital: '',
    timer: this.timerDuration,
    intervalId: 0,
    incorrectAnswers: 0,
    correctAnswers: 0,
    disableClick: 0,
    spentStates: [],
    questionsToAsk: 10,
    questionCounter: 0,

    resetGame: function (status) {
        // reset started bit
        this.started = 0;
        // set the modal message
        if (status==="start") {
            this.spentStates = [];
            html = 'Test your 7th-grade geography knowledge!<br><br>Click to play.';            
        } else {
            if (this.questionCounter >= Object.keys(state).length) {
                this.spentStates = [];
                html = "Correct States: " + this.correctAnswers + "<br><br>Incorrect States: " + this.incorrectAnswers + "<br><br>Click to play again.";
                this.correctAnswers  = 0;
                this.incorrectAnswers = 0;
            } else {
                html = "Correct States: " + this.correctAnswers + "<br><br>Incorrect States: " + this.incorrectAnswers + "<br><br>Click to continue playing.";
            }
        }
        this.incorrectAnswers = 0;
        this.correctAnswers = 0;
        // show the overlay and modal
        $("#overlay").show();
        $("#modal").html(html);
        $("#modal").show();
        // look for clicks
        $("#modal").click(function () {
            if (!game.started) {
                // when clicked, start the game, hide the modal and overlay, show the question
                game.started = 1;
                $("#overlay").hide();
                $("#modal").hide();
                $("#question").show();
                game.resetQuestion();
            }
        });

    },

    resetQuestion: function () {
        // reset question timer
        game.timer = game.timerDuration;
        // get array of state keys from state object
        keys = Object.keys(state);
        do {
            // generate a random number between 0 and the length og the keys array
            randomKey = Math.floor(Math.random() * keys.length);
        // while that random key is not in the spent array
        } while (game.spentStates.includes(randomKey) === true);
        // add the  key to the spent array
        game.spentStates.push(randomKey);
        // set the correct answers in the object
        game.currentCorrect = state[keys[randomKey]].name;
        game.currentCorrectAbbrv = state[keys[randomKey]].abbreviation;
        game.currentCorrectCapital = state[keys[randomKey]].capital;
        // display the question
        $("#question").html(state[keys[randomKey]].capital + " is the capital of which state?");
        // start the timer
        this.intervalId = setInterval(this.questionCountDown, 1000);
    },

    questionCountDown: function () {
        if (game.started === 1) {
            if (game.timer === 0) {
                game.disableClick = 1;
                game.evaluateAnswer("zz", "Timed Out");
            } else {
                game.timer--;
            }
        }
    },

    evaluateAnswer: function (code, region) {
        game.questionCounter++;
        var htmlAdd = "";
        // stop question timer
        clearInterval(game.intervalId);
        // initialize state color
        state_colors = {};
        state_code = game.currentCorrectAbbrv;
        // check if user choice is correct
        if (region === game.currentCorrect) {
            game.correctAnswers++;
            htmlAdd = "Yes! ";
            // set color of state
            state_colors[state_code] = 'green';
        } else {
            game.incorrectAnswers++;
            htmlAdd = "Nope. ";
            // set color of state
            state_colors[state_code] = 'red';
        }
        if (region==="Timed Out") {
            htmlAdd = "Time expired. ";
        }
        $('#vmap').vectorMap('set', 'colors', state_colors);
        //display answer/choice
        $("#answer").html(htmlAdd + game.currentCorrectCapital + " is the capital of " + game.currentCorrect);
        $("#answer").show();
        setTimeout(function () {
            $("#answer").hide();
            if (game.correctAnswers + game.incorrectAnswers === game.questionsToAsk) {
                game.resetGame();
            } else {
                game.resetQuestion();
            }
            game.disableClick = 0;
        }, 3000);
    },
}

$(document).ready(function () {
    $('#vmap').vectorMap(vectorMap);
    game.resetGame("start");
});