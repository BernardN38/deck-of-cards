// const mainContainter = $('#facts');
// const button = $('#get-card');
// let numberUrl = 'http://numbersapi.com/';

// function getNumberFacts(numbers = [ 1, 2, 3 ], type = 'trivia') {
// 	$.get(`${numberUrl}${[ ...numbers ]}/${type}?json`).then((res) => {
// 		res = JSON.parse(res);
// 		for (let fact in res) {
// 			mainContainter.append(`<p>${res[fact]}</p>`);
// 		}
// 	});
// }

// let cardUrl = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=';
// let deckId;
// function getDeck(callback) {
// 	$.get(`${cardUrl}${(deck_count = 1)}`).done((res) => {
// 		deckId = res['deck_id'];
// 		callback();
// 	});
// }

// function getCard(deck = deckId) {
// 	$.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`).then((res) => {
//         let imageUrl;
//         try {
// 		    imageUrl = res['cards'][0]['image'];
//             showCard(imageUrl);
//         } catch (err) {
//             console.log('done')
//         }
// 	});
// }

// function showCard(imageUrl) {
// 	let rotation = Math.random() * (30 - -30) + -30;
// 	mainContainter.append(`<img class='card' style='transform:rotate(${rotation}deg)'src='${imageUrl}'></img>`);
// }

// function handleClick() {
// 	if (!deckId) {
// 		getDeck(getCard);
// 	} else {
// 		getCard();
// 	}
// }

// $(button).on('click', handleClick);



















const mainContainter = $('#facts');
const button = $('#get-card');
let numberUrl = 'http://numbersapi.com/';

async function getNumberFacts(numbers = [ 1, 2, 3 ], type = 'trivia') {
	let res = await axios.get(`${numberUrl}${[ ...numbers ]}/${type}?json`)
		for (let fact in res) {
			mainContainter.append(`<p>${res[fact]}</p>`);
		}
        console.log(res)
}

let cardUrl = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=';
let deckId;

async function getDeck() {
	let res = await axios.get(`${cardUrl}${(deck_count = 1)}`)
    deckId = res.data.deck_id
}

async function getCard(deck = deckId) {
	let res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    return res.data.cards[0]
}

function showCard(imageUrl) {
	let rotation = Math.random() * (30 - -30) + -30;
	mainContainter.append(`<img class='card' style='transform:rotate(${rotation}deg)'src='${imageUrl}'></img>`);
}

async function handleClick() {
	if (!deckId) {
		await getDeck()
        let card = await getCard()
        showCard(card.image)
	} else {
		let card = await getCard()
        try {
        showCard(card.image)
        } 
        catch {
            console.log('No more cards')
        }
	}
}

$(button).on('click', handleClick);
