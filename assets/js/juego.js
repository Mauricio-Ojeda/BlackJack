    const miModulo = (() => {
        'use strick';

        let deck = [];
        const tipos = ['C', 'D', 'H', 'S'];
        const especiales = ['A', 'J', 'Q', 'K'];

        let puntosJugador = 0,
            puntosComputadora = 0;


        //Referencias HTML

        const iniciarJuego = document.querySelector('#inciarJuego'),
            pedirCarta = document.querySelector('#pedirCarta'),
            detener = document.querySelector('#detener'),
            puntajes = document.querySelectorAll('small'),
            divJugadorCarta = document.querySelector('#jugador-cartas'),
            divComputadoraCarta = document.querySelector('#computadora-cartas');

        const startImagen = document.querySelectorAll('.carta'),
            results = document.querySelector('#results');

        // crea el maso de cartas
        const crearDeck = () => {

            for (let i = 2; i <= 10; i++) {
                for (let tipo of tipos) {
                    deck.push(i + tipo);
                }
            }

            for (let tipo of tipos) {
                for (let esp of especiales) {
                    deck.push(esp + tipo);
                }
            }

            // mezcla el maso de cartas
            deck = _.shuffle(deck);

        }

        crearDeck();

        const giveCard = () => {
            if (deck.length === 0) {
                throw 'No hay mas cartas';
            }

            const card = deck.shift();

            return card;

        }

        const valorCarta = (card) => {
            const valor = card.substring(0, card.length - 1);
            return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10 :
                valor * 1;

        }

        // computer turn

        const turnoComputadora = (puntosMinimos) => {

            do {
                const carta = giveCard();

                puntosComputadora += valorCarta(carta);

                puntajes[1].innerText = puntosComputadora;

                // remove image default
                startImagen[1].remove();

                // Create image of cards
                const imgCarta = document.createElement('img');
                imgCarta.src = `assets/cartas/${ carta }.png`;
                imgCarta.classList.add('carta');

                divComputadoraCarta.appendChild(imgCarta);


                if (puntosJugador > 21) {
                    break;
                }


            } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21)) {}

            if ((puntosJugador > puntosComputadora) || (puntosComputadora > 21)) {
                const textNode = document.createTextNode('GANASTE!!');
                results.replaceChild(textNode, results.firstElementChild);
            } else {
                const textNode = document.createTextNode('PERDISTE');
                results.replaceChild(textNode, results.firstElementChild);
            }
        }

        //eventos

        pedirCarta.addEventListener('click', () => {

            const carta = giveCard();

            puntosJugador += valorCarta(carta);

            puntajes[0].innerText = puntosJugador;

            // remove image default
            startImagen[0].remove();

            // Create image of cards
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`;
            imgCarta.classList.add('carta');


            divJugadorCarta.appendChild(imgCarta);

            if (puntosJugador > 21) {
                const textNode = document.createTextNode('PERDISTE');
                results.replaceChild(textNode, results.firstElementChild);
                pedirCarta.disabled = true;
                detener.disabled = true;
                turnoComputadora(puntosJugador);
            } else if (puntosJugador === 21) {
                pedirCarta.disabled = true;
                detener.disabled = true;
                turnoComputadora(puntosJugador);

            }            
        });


        detener.addEventListener('click', () => {
            pedirCarta.disabled = true;
            detener.disabled = true;

            turnoComputadora(puntosJugador);
        });



        // btn star play

        iniciarJuego.addEventListener('click', () => {
            location.reload();
        });

    })();
