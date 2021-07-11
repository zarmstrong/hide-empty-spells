const debugHE = true;
let hideEmpty = false;
// message is the error message, level is the error level: 0 = info, 1 = warn, 2 = error
function log(message, level) {
	const logColor1 = "color: #7bf542"; //bright green
	const logColor2 = "color: #d8eb34"; //yellow green
	const logColor3 = "color: #ffffff"; //white
	const logColor4 = "color: #cccccc"; //gray
	// const logColor5 = "color: #cccccc"; //gray
	let color1, color2;

	if (level == 2)
		if (debugHE)
			console.log(
				"%cHeroVau.lt/Foundry Bridge | %ccheckUserToken: " +
					JSON.stringify(responseJSON),
				hvColor1,
				hvColor4
			);
}

Hooks.on("ready", async function () {
	game.settings.register("hide-empty-spells", "hideEmpty", {
		name: "hideempty",
		scope: "client",
		config: false,
		type: String,
		default: "false",
	});
});

Hooks.on("renderActorSheet", function (obj, html) {
	const actor = obj.actor;
	if (!(actor.data.type === "character")) return;
	hideEmpty = game.settings.get("hide-empty-spells", "hideEmpty");
	console.log("hideEmpty: " + hideEmpty);
	if (hideEmpty == 'true') {
		console.log("hiding all")
		addButton(html);
		hideEmptySpells(html);
	} else {
		console.log("showing all")
		addButton(html, 0);
		showEmptySpells(html);
	}
});

function addButton(html, hide = 1) {
	let title, fa, sheetID;
	hidetitle = "Hide Empty Spell Casting Entries";
	hidefa = "eye-slash";
	showtitle = "Show Empty Spell Casting Entries";
	showfa = "eye";

	sheetID = $(html).attr("id");
	let spellsPage = html.find(`[data-tab='spellbook']`);
	let button = $(spellsPage).find(`ol.singleColumn-list`);

	let newButton =
		'<li class="item inventory-header spellbook-header spellbook-empty" draggable="true"><div class="item-controls pf-bluelist pf-add-item-row"><a class="item-control spellcasting-create" id="showspells" title="' +
		hidetitle +
		'" ><i class="fas fa-' +
		hidefa +
		'"></i>' +
		hidetitle +
		"</a></div></li>";
	$(button).append(newButton);
	newButton =
		'<li class="item inventory-header spellbook-header spellbook-empty" draggable="true"><div class="item-controls pf-bluelist pf-add-item-row"><a class="item-control spellcasting-create" id="hidespells" title="' +
		showtitle +
		'" ><i class="fas fa-' +
		showfa +
		'"></i>' +
		showtitle +
		"</a></div></li>";
	$(button).append(newButton);
	if (hide == 1) {
		html.find("#showspells").hide();
	} else {
		html.find("#hidespells").hide();
	}
	$("#hidespells").on("click", function () {
		game.settings.set("hide-empty-spells", "hideEmpty", false);
		html.find("#hidespells").hide();
		html.find("#showspells").show();
		showEmptySpells(html);
	});
	$("#showspells").on("click", function () {
		game.settings.set("hide-empty-spells", "hideEmpty", true);
		html.find("#hidespells").show();
		html.find("#showspells").hide();
		hideEmptySpells(html);
	});
}

function hideEmptySpells(html) {
	let spellsPage = html.find(`[data-tab='spellbook']`);
	// console.log(spellsPage);
	let spellContainers = spellsPage.find(
		`[data-container-type="spellcastingEntry"]`
	);

	for (let x = 0; x < spellContainers.length; x++) {
		let spellBox = spellContainers[x];
		// console.log($(spellLevel).find('ol'))
		let spellcastingEntry = $(spellBox).find(
			"ol.inventory-list.directory-list"
		);

		for (let y = 0; y < spellcastingEntry.length; y++) {
			let spellLevel = $(spellcastingEntry).find(
				"li.item.inventory-header.spellbook-header"
			);
			for (let z = 0; z < spellLevel.length; z++) {
				let numSpells = $(spellLevel[z])
					.find("span.spell-max-input input")
					.val();

				if (numSpells == "0") {
					$(spellLevel[z]).hide();
					//hide other related ones:
					$(spellLevel[z])
						.nextUntil("item.inventory-header.spellbook-header")
						.hide();
				}
			}
		}
	}
}

function showEmptySpells(html) {
let spellsPage = html.find(`[data-tab='spellbook']`);
let spellContainers = spellsPage.find(
	`[data-container-type="spellcastingEntry"]`
);

for (let x = 0; x < spellContainers.length; x++) {
	let spellBox = spellContainers[x];
	let spellcastingEntry = $(spellBox).find(
		"ol.inventory-list.directory-list"
	);

	for (let y = 0; y < spellcastingEntry.length; y++) {
		let spellLevel = $(spellcastingEntry).find(
			"li.item.inventory-header.spellbook-header"
		);
		for (let z = 0; z < spellLevel.length; z++) {
			let numSpells = $(spellLevel[z])
				.find("span.spell-max-input input")
				.val();
				$(spellLevel[z]).show();
				$(spellLevel[z])
					.nextUntil("item.inventory-header.spellbook-header")
					.show();
			}
		}
	}
}
