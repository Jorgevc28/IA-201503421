function sleep(){
    return new Promise(resolve => setTimeout(resolve, 2000));
}

function dirtying(states){
    dirty_room = Math.random() * (100 - 1) + 1;
    // si el numero aleatorio es entre 1 y 50  - NO REALIZA NINGUNA ACCION - 50%

    if (dirty_room > 50 && dirty_room <= 65 && states[1]=='CLEAN'){ // ENSUCIA A - 15%
        states[1] = 'DIRTY'; 
        document.getElementById("log").innerHTML += '<br><b>Dirty Function:</b> ensucia habitacion A';
        return;
    }else if (dirty_room > 65 && dirty_room <= 80 && states[2]=='CLEAN'){ // ENSUCIA B - 15%
        states[2] = 'DIRTY'; 
        document.getElementById("log").innerHTML += '<br><b>Dirty Function:</b> ensucia habitacion B';
        return;
    }else if (dirty_room > 80 && dirty_room <= 100 && states[1]=='CLEAN' && states[2]=='CLEAN'){ // ENSUCIA AMBOS - 20%
        states[1] = 'DIRTY'; 
        states[2] = 'DIRTY'; 
        document.getElementById("log").innerHTML += '<br><b>Dirty Function:</b> ensucia habitacion A y B';
        return;
    }
    document.getElementById("log").innerHTML += '<br><b>Dirty Function:</b> permite flujo normal';
}

function state_count(states){
    document.getElementById('tr1').style.backgroundColor = "white";
    document.getElementById('tr2').style.backgroundColor = "white";
    document.getElementById('tr3').style.backgroundColor = "white";
    document.getElementById('tr4').style.backgroundColor = "white";
    document.getElementById('tr5').style.backgroundColor = "white";
    document.getElementById('tr6').style.backgroundColor = "white";
    document.getElementById('tr7').style.backgroundColor = "white";
    document.getElementById('tr8').style.backgroundColor = "white";

    if (states[0]=='A' && states[1]=='DIRTY' && states[2]=='DIRTY') {
        cont_E1++;
        document.getElementById("e1").innerHTML = cont_E1;
        document.getElementById('tr1').style.backgroundColor = "yellow";
    }else if (states[0]=='B' && states[1]=='DIRTY' && states[2]=='DIRTY') {
        cont_E2++;
        document.getElementById("e2").innerHTML = cont_E2;
        document.getElementById('tr2').style.backgroundColor = "yellow";
    }else if (states[0]=='A' && states[1]=='DIRTY' && states[2]=='CLEAN') {
        cont_E3++;
        document.getElementById("e3").innerHTML = cont_E3;
        document.getElementById('tr3').style.backgroundColor = "yellow";
    }else if (states[0]=='B' && states[1]=='DIRTY' && states[2]=='CLEAN') {
        cont_E4++;
        document.getElementById("e4").innerHTML = cont_E4;
        document.getElementById('tr4').style.backgroundColor = "yellow";
    }else if (states[0]=='A' && states[1]=='CLEAN' && states[2]=='DIRTY') {
        cont_E5++;
        document.getElementById("e5").innerHTML = cont_E5;
        document.getElementById('tr5').style.backgroundColor = "yellow";
    }else if (states[0]=='B' && states[1]=='CLEAN' && states[2]=='DIRTY') {
        cont_E6++;
        document.getElementById("e6").innerHTML = cont_E6;
        document.getElementById('tr6').style.backgroundColor = "yellow";
    }else if (states[0]=='A' && states[1]=='CLEAN' && states[2]=='CLEAN') {
        cont_E7++;
        document.getElementById("e7").innerHTML = cont_E7;
        document.getElementById('tr7').style.backgroundColor = "yellow";
    }else if (states[0]=='B' && states[1]=='CLEAN' && states[2]=='CLEAN') {
        cont_E8++;
        document.getElementById("e8").innerHTML = cont_E8;
        document.getElementById('tr8').style.backgroundColor = "yellow";
    }

    if (cont_E1 >= 2 && cont_E2 >= 2 && cont_E3 >= 2 && cont_E4 >= 2 && cont_E5 >= 2 && cont_E6 >= 2
        && cont_E7 >= 2 && cont_E8 >= 2){
            document.getElementById("log").innerHTML += '<br><b>Message: Todos los estados han registrado 2 o mas visitas</b>';
            document.getElementById("msg").innerHTML = '<b>Message: Todos los estados han registrado 2 o mas visitas</b>';
            return true;
        }
    return false;
}

function reflex_agent(location, state){
    if (state=='DIRTY') return 'CLEAN';
    else if (location=='A') return 'RIGHT';
    else if (location=='B') return 'LEFT'
}

async function test(states){ 
    if(state_count(states)) return;
    var location = states[0];
    var state = states[0] == 'A'? states[1]:states[2];
    var action = reflex_agent(location, state);
    document.getElementById("log").innerHTML += '<br><b>State</b> (Location:'.concat(location).concat(', RoomA:').concat(states[1]).concat(', RoomB:').concat(states[2]).concat(') | Action: ').concat(action);
    await sleep();
    if(action == 'CLEAN' && location == 'A') states[1] = 'CLEAN';
    else if (action == 'CLEAN' && location == 'B') states[2] = 'CLEAN';
    else if (action == 'RIGHT') states[0] = 'B';
    else if (action == 'LEFT') states[0] = 'A';
    dirtying(states);
    test(states);
}

var cont_E1 = 0;
var cont_E2 = 0;
var cont_E3 = 0;
var cont_E4 = 0;
var cont_E5 = 0;
var cont_E6 = 0;
var cont_E7 = 0;
var cont_E8 = 0;
var states = ['A', 'DIRTY', 'DIRTY']; // estadp inicial
test(states);

