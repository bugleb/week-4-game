$(document).ready(function() {

	var game = {
		characters: {
			'Obi WanKenobi': {
				image: 'obi_wan_kenobi.jpg',
				hp: 100,
				power: 16
			},
			'Luke Skywalker': {
				image: 'luke_skywalker.jpg',
				hp: 120,
				power: 14
			},
			'Darth Sidious': {
				image: 'darth_sidious.jpg',
				hp: 140,
				power: 12
			},
			'Darth Maul': {
				image: 'darth_maul.jpg',
				hp: 160,
				power: 10
			}
		},
		yourCharacter: {
			name: '',
			power: 0
		},
		enemyCharacter: {
			name: '',
			power: 0
		},
		enemyCharactersList: [],
		needEnemy: true,
		needCharacter: true,
		displayCharacter: function(args) {
			const character = game.characters[args.name];
			$(args.where).append(`<span class="character ${args.class}" id="${args.name}">${args.name}
				<img src="assets/images/${character.image}" alt="${args.name}" class="character-image">
				<span id="${args.class}-hp">${character.hp}</span></span>`);
		},
		attack: function() {
			if (!game.needEnemy) {
				const yourAttackPower = game.yourCharacter.power + Math.floor(Math.random() * 21);
				const enemyHP = $('#enemy-hp').text();
				const resultEnemyHP = enemyHP - yourAttackPower;
				$('#enemy-hp').html((resultEnemyHP > 0) ? resultEnemyHP : 0);

				if (resultEnemyHP <= 0) {
					$('#enemy-character').empty();
					game.needEnemy = true;
				}

				const enemyAttackPower = game.enemyCharacter.power + Math.floor(Math.random() * 11);
				const yourHP = $('#friendly-hp').text();
				const resultYourHP = yourHP - enemyAttackPower;
				$('#friendly-hp').html((resultYourHP > 0) ? resultYourHP : 0);

				if (resultYourHP <= 0) {
					alert('Game Over! You Lost!');
				}
			}
		}
	}

	for (var character in game.characters) {
		game.displayCharacter({
			name: character,
			where: '#your-character',
			class: 'friendly'
		});
	}

	$('#your-character').on('click', 'span.character', function(e) {
		if (game.needCharacter) {
			if (!game.playing) {
				$('#your-character-header').html('Your Character');
				$('#your-character').empty();
				game.yourCharacter.name = e.currentTarget.id;
				game.yourCharacter.power = game.characters[game.yourCharacter.name].power;
				game.displayCharacter({
					name: game.yourCharacter.name,
					where: '#your-character',
					class: 'friendly'
				});

				$('#enemy-characters-header').html('Select an enemy character!');
				for (var character in game.characters) {
					if (character !== e.currentTarget.id) {
						game.displayCharacter({
							name: character,
							where: '#enemy-characters',
							class: 'enemy'
						});
					}
				}	
			}

			game.needCharacter = false;
		}
	});

	$('#enemy-characters').on('click', 'span.character', function(e) {
		if (game.needEnemy) {
			$('#attack-button-div').css('display', 'unset');
			$('#enemy-character-header').html('Enemy Character');
			game.enemyCharacter.name = e.currentTarget.id;
			game.enemyCharacter.power = game.characters[game.enemyCharacter.name].power;
			game.displayCharacter({
				name: game.enemyCharacter.name,
				where: '#enemy-character',
				class: 'enemy'
			});

			game.enemyCharactersList.push(game.enemyCharacter.name);

			$('#enemy-characters').empty();
			for (var character in game.characters) {
				if ($.inArray(character, game.enemyCharactersList) === -1 && character != game.yourCharacter.name) {
					game.displayCharacter({
						name: character,
						where: '#enemy-characters',
						class: 'enemy'
					});
				}
			}

			game.needEnemy = false;
		}
	});

	$('button').click(game.attack);
});