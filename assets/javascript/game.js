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
		yourCharacter: "",
		displayCharacter: function(args) {
			const character = game.characters[args.name];
			$(args.where).append(`<span class="character ${args.class}" id="${args.name}">${args.name}
				<img src="assets/images/${character.image}" alt="${args.name}" class="character-image">
				${character.hp}</span>`);
		}
	}

	for (var character in game.characters) {
		game.displayCharacter({
			name: character,
			where: '#characters',
			class: 'friendly'
		});
	}

	$('div#characters').on('click', 'span.character', function(e) {
		$('#characters').empty();

		const where = !game.yourCharacter ? '#your-character' : '#enemy-character';
		const classes = !game.yourCharacter ? 'friendly' : 'enemy';
		console.log(where + ' ' + classes);

		game.displayCharacter({
			name: e.currentTarget.id,
			where: where,
			class: classes
		});

		if (!game.yourCharacter) {
			for (var character in game.characters) {
				if (character !== e.currentTarget.id) {
					game.displayCharacter({
						name: character,
						where: '#characters',
						class: 'enemy'
					});
				}
			}
		}

		game.yourCharacter = e.currentTarget.id;
	});
});