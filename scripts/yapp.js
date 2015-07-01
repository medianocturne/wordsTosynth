
function sender(){

    var message = [];
    var message = document.getElementById("userInput").value;
    var captured =[];

        if (message.length < 50) {
                var total = message.split(" ");
                var split = total[0].split("");

                    if (message.indexOf(" ") !== -1){
                        var melody = total[1].split("");
                        melophone(melody);
                    };


                var cMajor = ['A','C', 'E', 'G','B'];
                var octave =  [2,3,4];

                    for (var i=0; i<split.length; i++){

                        split[i] = (split[i].charCodeAt(0) - 97) % 5;

                        var tone = noter(split[i]);
                        tone = tone + '3';

                        captured.push(tone);

                    };
                    player(captured);


            function noter(interval){
                var i = interval;
                return cMajor[i];
            };

        }

};

function player(captured) {
    var synth = new Tone.PolySynth(1, Tone.FMSynth);
    var delay = new Tone.PingPongDelay("4n", 0.4);
    var limiter = new Tone.Limiter(-.6);
    var verb = new Tone.Freeverb(.8, 500);
    var vol = new Tone.Volume(-20);


    var position = 0;

    synth.connect(limiter);
    limiter.connect(delay);
    delay.connect(verb);
    verb.toMaster();

    synth.chain(Tone.Master, vol);


        Tone.Transport.setInterval(function(time) {
            var note = captured[position++];
            position = position % captured.length;
            synth.triggerAttackRelease(note, 2, time, .5);

        }, .5);

        Tone.Transport.start();

}

var meloCaptured=[];
var melodyScale = ['C', 'D', 'E', 'A', 'F'];


function melophone(melody) {


    for (var i=0; i<melody.length; i++){

        melody[i] = (melody[i].charCodeAt(0) - 97) % 5;
        var noted = noter(melody[i]);
        noted = noted + '5';
        meloCaptured.push(noted);
        timer(meloCaptured);
        console.log(meloCaptured);
    }


    function timer(meloCaptured){

        for (var i = 0; i<=meloCaptured.length; i++){
            setInterval(meloPlayer, (meloCaptured, 4000));

        }
    }

    function noter(interval) {;
         var i = interval;
        return melodyScale[i];
    }

    function meloPlayer(notes){

        var meloSynth = new Tone.PluckSynth();
        var vol = new Tone.Volume(-20);

        var position = 0;

        meloCaptured.toMaster();


        Tone.Transport.setInterval(function(position) {
            var note = meloCaptured[position++];
            position = position % noted.length;
            meloSynth.triggerAttack()
            meloSynth.triggerRelease(.05);

        }, 4);

    }


}
