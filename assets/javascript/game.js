$(document).ready(function() {

	var game = {
		characters: {
			'Obi WanKenobi': {
				image: 'obi_wan_kenobi.jpg',
				hp: 100
			},
			'Luke Skywalker': {
				image: 'luke_skywalker.jpg',
				hp: 100
			},
			'Darth Sidious': {
				image: 'darth_sidious.jpg',
				hp: 100
			},
			'Darth Maul': {
				image: 'darth_maul.jpg',
				hp: 100
			}
		},
	}

	for (var character in game.characters) {
		$('#your-character').append(
			`<span class="character friendly" id="${character}">${character}<img src="assets/images/${game.characters[character].image}" alt="${character}" class="character-image">${game.characters[character].hp}</span>`);
	}

	$('.character').click(function(e) {
		console.log(e.currentTarget.id);
	});

});