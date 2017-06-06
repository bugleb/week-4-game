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
		displayCharacter: function(args) {
			$(args.where).append(`<span class="character ${args.class}" id="${args.name}">${args.name}
				<img src="assets/images/${args.character.image}" alt="${args.name}" class="character-image">
				${args.character.hp}</span>`);
		}
	}

	for (var character in game.characters) {
		game.displayCharacter({
			name: character,
			character: game.characters[character],
			where: "#characters",
			class: "friendly"
		});
	}

	$('.character').click(function(e) {
		console.log(e.currentTarget.id);
	});

});