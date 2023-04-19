/**
 * 
 */

var trackingStatus = {
	selected: {
		explorers: [],
		hostiles: [[], [], [], []]
	},
	selectingHostileGroup: null,
	phase: "creating",
	animation: false
}

var explorers = {
		janus_draik: {
			card_id: "janus_draik-card"
		},
		espern_locarno: {
			card_id: "espern_locarno-card"
		},
		taddeus_the_purifier: {
			card_id: "taddeus_the_purifier-card"
		},
		pious_vorne: {
			card_id: "pious_vorne-card"
		},
		amallyn_shadowguide: {
			card_id: "amallyn_shadowguide-card"
		},
		dahyak_grekh: {
			card_id: "dahyak_grekh-card"
		},
		ur025: {
			card_id: "ur025-card"
		},
		rein_raus: {
			card_id: "rein_raus-card"
		},
		neyam_shai_murad: {
			card_id: "neyam_shai_murad-card"
		},
		aradia_madellan: {
			card_id: "aradia_madellan-card"
		},
		daedalosus: {
			card_id: "daedalosus-card"
		},
		gotfret_de_montbard: {
			card_id: "gotfret_de_montbard-card"
		}
}


var hostiles = {
		spindle_drones: {
			card_id: "spindle_drones-card",
			actions_id: "spindle_drones-actions",
			reinforcements_id: "small-reinforcements"
		},
		traitor_guardsmen: {
			card_id: "traitor_guardsmen-card",
			actions_id: "traitor_guardsmen-actions",
			reinforcements_id: "small-reinforcements"
		},
		negavolt_cultists: {
			card_id: "negavolt_cultists-card",
			actions_id: "negavolt_cultists-actions",
			reinforcements_id: "large-reinforcements"
		},
		ur_ghuls: {
			card_id: "ur_ghuls-card",
			actions_id: "ur_ghuls-actions",
			reinforcements_id: "small-reinforcements"
		},
		chaos_beastmen: {
			card_id: "chaos_beastmen-card",
			actions_id: "chaos_beastmen-actions",
			reinforcements_id: "large-reinforcements"
		},
		rogue_psykers: {
			card_id: "rogue_psykers-card",
			actions_id: "rogue_psykers-actions",
			reinforcements_id: "large-reinforcements"
		},
		chaos_space_marines: {
			card_id: "chaos_space_marines-card",
			actions_id: "chaos_space_marines-actions",
			reinforcements_id: "large-reinforcements"
		},
		obsidius_mallex: {
			card_id: "obsidius_mallex-card",
			actions_id: "obsidius_mallex-actions",
			reinforcements_id: "huge-reinforcements"
		},
		borewyrm: {
			card_id: "borewyrm-card",
			actions_id: "borewyrm-actions",
			reinforcements_id: "small-reinforcements"
		},
		ambull: {
			card_id: "ambull-card",
			actions_id: "ambull-actions",
			reinforcements_id: "huge-reinforcements"
		},
		ambull_enraged: {
			card_id: "ambull_enraged-card",
			actions_id: "ambull_enraged-actions",
			reinforcements_id: "huge-reinforcements"
		},
		traitor_commissar: {
			card_id: "traitor_commissar-card",
			actions_id: "traitor_commissar-actions",
			reinforcements_id: "large-reinforcements"
		},
		chaos_ogryn: {
			card_id: "chaos_ogryn-card",
			actions_id: "chaos_ogryn-actions",
			reinforcements_id: "huge-reinforcements"
		},
		cultists: {
			card_id: "cultists-card",
			actions_id: "cultists-actions",
			reinforcements_id: "small-reinforcements"
		},
		cultist_firebrand: {
			card_id: "cultist_firebrand-card",
			actions_id: "cultist_firebrand-actions",
			reinforcements_id: "large-reinforcements"
		},
		obsidius_mallex_empowered: {
			card_id: "obsidius_mallex_empowered-card",
			actions_id: "obsidius_mallex_empowered-actions",
			reinforcements_id: "huge-reinforcements"
		}
}
 
var menuStack = (function() {
	
	var stack = [];
	
	function nextMenu(menu, param) {
		if (stack.length > 0) {
			var previous = stack[stack.length - 1];
			hideElement(getElementById(previous.menu.divId));
			if (previous.menu.close) {
				previous.menu.close();
			}
		}
		var actual = {
			menu : menu,
			param: param
		}
		stack.push(actual);
		if (menu.open) {
			menu.open(param);
		}
		showElement(getElementById(menu.divId));
		return previous;
	}
	
	function previousMenu() {
		if (stack.length > 0) {
			var previous = stack.pop();
			hideElement(getElementById(previous.menu.divId));
			if (previous.menu.close) {
				previous.menu.close();
			}
		}
		if (stack.length > 0) {
			var actual = stack[stack.length - 1];
			if (actual.menu.close) {
				actual.menu.open();
			}
			showElement(getElementById(actual.menu.divId));
			return actual;
		}
	}
	
	return {
		next: nextMenu,
		previous: previousMenu,
	};
	
})();


var menus = { 
	create_game: {
		divId : "create_game",
		init: function () {
			
			document.querySelectorAll(".goBackButton").forEach(function(elem) {
				elem.addEventListener("click", function() {
					menuStack.previous();
				});
			});
			
			getElementById("createExplorersButton").addEventListener("click", function() {
				menuStack.next(menus.select_explorers);
			});
			
			getElementById("createHostiles1Button").addEventListener("click", function() {
				menuStack.next(menus.select_hostiles, 0);
			});
			
			getElementById("createHostiles2Button").addEventListener("click", function() {
				menuStack.next(menus.select_hostiles, 1);
			});
			
			getElementById("createHostiles3Button").addEventListener("click", function() {
				menuStack.next(menus.select_hostiles, 2);
			});
			
			getElementById("createHostiles4Button").addEventListener("click", function() {
				menuStack.next(menus.select_hostiles, 3);
			});

			getElementById("startGame").addEventListener("click", function() {
				menuStack.next(menus.tracking);
			});
			
		},
		open: function (param) {
			if (trackingStatus.selected.explorers.length > 0 && trackingStatus.selected.hostiles[0].length > 0) {
				getElementById("startGame").removeAttribute("disabled");
			} else {
				getElementById("startGame").setAttribute("disabled", "disabled");
			}
			
		},
		close: function() {
			
		}
	},
	
	select_explorers: {
		divId : "select_explorers",
		init: function() {

			getElementById("saveExplorersButton").addEventListener("click", function() {
				trackingStatus.selected.explorers.length = 0;
				var selectButtonHtml = getElementById("createExplorersButton").innerHTML.replaceAll("☒","☐");
				document.querySelectorAll("#select_explorers_cards>div>div:not(.card-deactivated)").forEach(function(elem) {
					trackingStatus.selected.explorers.push(elem.getAttribute("data-reference"));
					selectButtonHtml = selectButtonHtml.replace("☐","☒");
				});
				getElementById("createExplorersButton").innerHTML = selectButtonHtml;
				menuStack.previous();
			});
		},
		open: function(value) {
			createSelectableCards("explorers-cards", "select_explorers_cards", "saveExplorersButton", trackingStatus.selected.explorers, 2, 4);
		},
		close: function() {
			getElementById("select_explorers_cards").innerHTML = "";
		}
	},
	
	select_hostiles: {
		divId : "select_hostiles",
		init: function() {
			getElementById("saveHostilesButton").addEventListener("click", function() {
				var hostilesGroup = trackingStatus.selectingHostileGroup;
				trackingStatus.selected.hostiles[hostilesGroup].length = 0;
				var selectButtonHtml = getElementById("createHostiles" + (hostilesGroup + 1) +"Button").innerHTML.replaceAll("☒","☐");
				document.querySelectorAll("#select_hostiles_cards>div>div:not(.card-deactivated)").forEach(function(elem) {
					trackingStatus.selected.hostiles[hostilesGroup].push(elem.getAttribute("data-reference"));
					selectButtonHtml = selectButtonHtml.replace("☐","☒");
				});
				trackingStatus.selected.hostiles[hostilesGroup].push(hostilesGroup);
				getElementById("createHostiles" + (hostilesGroup + 1) +"Button").innerHTML = selectButtonHtml;
				menuStack.previous();
			});
		},
		open: function(value) {
			trackingStatus.selectingHostileGroup = value;
			createSelectableCards("hostiles-cards", "select_hostiles_cards", "saveHostilesButton", trackingStatus.selected.hostiles[value], value == 0 ? 1: 0, 3);
		},
		close: function() {
			trackingStatus.selectingHostileGroup = null;
			getElementById("select_hostiles_cards").innerHTML = "";
		}
	},
	
	tracking : {
		divId : "tracking",
		init: function() {
						
			getElementById("nextTrackingButton").addEventListener("click", function() {
				
				if (trackingStatus.animation) {
					return;
				}
				
				clearRollTableSections();
				var actualCard = switchToNextCardAndGet();
				
				if (trackingStatus.phase == "order") {
					trackingStatus.phase = "combat";
					disableOrder();
					activateCombatCard(actualCard);
				} else if (trackingStatus.phase == "combat") {
					if (actualCard) {
						activateCombatCard(actualCard);
					} else {
						trackingStatus.phase = "event";
						showEvent();
					}
				} else if (trackingStatus.phase == "event") {
					collectAndRerollCards();
				}
			});
			
			getElementById("reinforcementsButton").addEventListener("click", function() {
				
				if (trackingStatus.animation) {
					return;
				}
				
				clearRollTableSections();
				rollDice("dice_roll_value", putReinforcementsTable);

			});
			
			getElementById("actionButton").addEventListener("click", function() {
				
				if (trackingStatus.animation) {
					return;
				}
				
				clearRollTableSections();
				showElement(getElementById("dice_roll"));
				rollDice("dice_roll_value", putActionsTable);

			});
			
			getElementById("inspirationButton").addEventListener("click", function() {
				
				if (trackingStatus.animation) {
					return;
				}
				
				clearRollTableSections();
				showElement(getElementById("dice_roll"));
				rollDice("dice_roll_value", putInspirationTable);

			});
			
			getElementById("backTrackingButton").addEventListener("click", function() {
				
				if (trackingStatus.animation) {
					return;
				}
				
				if (trackingStatus.phase == "order") {
					return;
				}
				
				clearRollTableSections();
				var actualCard = switchToPreviousCardAndGet();
				
				if (trackingStatus.phase == "combat") {
					if (actualCard) {
						activateCombatCard(actualCard, true);
					} else {
						enableOrder();
						getElementById("backTrackingButton").setAttribute("disabled", "disabled");
						trackingStatus.phase = "order";
					}
				} else if (trackingStatus.phase == "event") {
					activateCombatCard(actualCard, true);
					trackingStatus.phase = "combat";
				}
			});
						
			getElementById("dice_roll").addEventListener("dblclick", function() {
				
				if (trackingStatus.animation) {
					return;
				}
				
				clearRollTableSections();
				rollDice("dice_roll_value");

			});
			
			
		},
		open: function(value) {
			trackingStatus.phase = "order";
			clearRollTableSections();
			enableOrderAndRerollCards();
		},
		close: function() {}
	
	}
}

function getElementById(elemId) {
	var elem = document.getElementById(elemId);
	if (!elem) {
		console.warn("Element id " + elemId + " not found");
	}
	return elem;
}

function showElement(elem) {
	elem.style.setProperty("display", "");
}

function hideElement(elem) {
	elem.style.setProperty("display", "none", "important");
}

function getBlackstoneDiceRoll() {
	return Math.floor(Math.random() * 20) + 1;
}

function getActualCard() {
	
	var actualCards = document.querySelectorAll("#tracking_order .playable-card.card-actual");
	if (actualCards.length > 0) {
		return actualCards[0];
	}
	return null;
	
}

function switchToNextCardAndGet() {
	
	var actualCards = document.querySelectorAll("#tracking_order .playable-card.card-actual");
	if (actualCards.length > 0) {
		actualCards[0].classList.remove("card-actual");
		actualCards[0].classList.add("card-done");
	}

	var nextCards = document.querySelectorAll("#tracking_order .playable-card:not(.card-done)");
	if (nextCards.length > 0) {
		return nextCards[0];
	}
	
}

function switchToPreviousCardAndGet() {
	
	var actualCards = document.querySelectorAll("#tracking_order .playable-card.card-actual");
	if (actualCards.length > 0) {
		actualCards[0].classList.remove("card-actual");
		actualCards[0].classList.add("card-deactivated");
	}

	var nextCards = document.querySelectorAll("#tracking_order .playable-card:not(.card-deactivated)");
	if (nextCards.length > 0) {
		return nextCards[nextCards.length - 1];
	}
	
}

function activateCombatCard(card, goingBack) {
	
	card.classList.add("card-actual");
	card.classList.remove("card-deactivated");
	card.classList.remove("card-done");
	if (card.parentNode.style.display == "none") {
		var slotId = card.parentNode.parentNode.id;
		document.querySelectorAll("#" + slotId + " .card-orderable").forEach(function(elem) {
			hideElement(elem);
		});
		var slotTotalCards = document.querySelectorAll("#" + slotId + " .playable-card").length;
		var slotDoneCards = document.querySelectorAll("#" + slotId + " .playable-card.card-done").length;
		if (goingBack) {
//			document.querySelectorAll("#" + slotId + " .extra-card-" + (slotDoneCards + 1)).forEach(function(elem) {
//				elem.classList.remove("card-done");
//				elem.classList.add("card-deactivated");
//			});
			document.querySelectorAll("#" + slotId + " .extra-card-" + (slotTotalCards - slotDoneCards - 1)).forEach(function(elem) {
				elem.classList.remove("card-done");
				elem.classList.add("card-deactivated");
			});
		} else {
//			document.querySelectorAll("#" + slotId + " .extra-card-" + slotDoneCards).forEach(function(elem) {
//				elem.classList.remove("card-deactivated");
//				elem.classList.add("card-done");
//			});
			document.querySelectorAll("#" + slotId + " .extra-card-" + (slotTotalCards - slotDoneCards)).forEach(function(elem) {
				elem.classList.remove("card-deactivated");
				elem.classList.add("card-done");
			});
		}		
		showElement(card.parentNode);
	}
	if (card.classList.contains("explorer-card")) {
		hideElement(getElementById("reinforcementsButton").parentNode);
		hideElement(getElementById("actionButton").parentNode);
		showElement(getElementById("inspirationButton").parentNode);
	} else if (card.classList.contains("hostile-card")) {
		showElement(getElementById("reinforcementsButton").parentNode);
		showElement(getElementById("actionButton").parentNode);
		hideElement(getElementById("inspirationButton").parentNode);
	}
	
}

function disableOrder() {
	
	document.querySelectorAll("#tracking_order .card-slot").forEach(function(elem) {
		elem.setAttribute("draggable", false);
	});
	document.querySelectorAll("#tracking_order .card").forEach(function(elem) {
		elem.classList.add("card-deactivated");
		elem.classList.remove("card-selected");
		elem.classList.remove("grow-anim");
		elem.classList.remove("shrink-anim");
	});
	getElementById("backTrackingButton").removeAttribute("disabled");	
	
}

function enableOrder() {
	
	hideElement(getElementById("reinforcementsButton").parentNode);
	hideElement(getElementById("actionButton").parentNode);
	hideElement(getElementById("inspirationButton").parentNode);
	document.querySelectorAll("#tracking_order .card").forEach(function(elem) {
		elem.classList.remove("card-done");
		elem.classList.remove("card-deactivated");
	});
	document.querySelectorAll("#tracking_order .card-slot").forEach(function(elem) {
		elem.setAttribute("draggable", true);
	});
	
}

function enableOrderAndRerollCards() {
	
	var cards = generateRandomCardOrder(trackingStatus.selected.explorers, trackingStatus.selected.hostiles);
	createOrderableCards(cards);
	enableOrder();
	
}

function collectAndRerollCards() {
	
	trackingStatus.animation = true;
	getElementById("backTrackingButton").setAttribute("disabled", "disabled");


	for (let i = 1; i <= 8; i++) {
		elem = document.getElementById("card-slot-" + i);
		if (elem) {
			elem.classList.add("collect-card-anim-" + i);			
		}
	}
	setTimeout(function() {
		trackingStatus.animation = false;
		enableOrderAndRerollCards();
		trackingStatus.phase = "order";
	}, 550);
	
}


function showEvent() {
	
	showElement(getElementById("dice_roll"));
	hideElement(getElementById("reinforcementsButton").parentNode);
	hideElement(getElementById("actionButton").parentNode);
	hideElement(getElementById("inspirationButton").parentNode);
	rollDice("dice_roll_value", putEventTable);

}

function clearRollTableSections() {
	
	clearPopOvers();
	getElementById("table_result_row").innerHTML = "";
	getElementById("dice_roll_value").innerHTML = "";
	
}

function generateRandomCardOrder(e, h) {
	
	var array = [];
	for (const i of e) {
		if (i) {
			array.push(explorers[i]);
		}
	}
	for (const i of h) {
		if (i.length > 0) {
			var ha = [];
			array.push(ha);
			for (const j of i) {
				if (typeof j === "number") {
					ha.push(j);
				} else {
					ha.push(hostiles[j]);
				}				
			}
		}
	}
	shuffle(array);
	return array;
	
}

function rollDice(resultId, callback) {
	
	trackingStatus.animation = true;

	// Between 16 and 22 rolls for the animation
	var rolls = 16 + Math.floor(Math.random() * 7);
	let i = 0
	for (; i < rolls; i++) {
		setTimeout(function() {
			var diceRoll = getBlackstoneDiceRoll();
			getElementById(resultId).innerHTML = diceRoll;
		}, i * 20);
	}
	// On more last roll to use as result
	setTimeout(function() {
		var diceRoll = getBlackstoneDiceRoll();
		getElementById(resultId).innerHTML = diceRoll;
		if (callback) {
			callback(diceRoll);
		}
		trackingStatus.animation = false;
	}, i * 20);

}

function putReinforcementsTable(diceRoll) {
	
	var reinforcementsTableId = hostiles[getActualCard().getAttribute("data-reference")].reinforcements_id;
	putTable(reinforcementsTableId, "table_result_row", diceRoll);
	
}

function putActionsTable(diceRoll) {
	
	var actionsTableId = hostiles[getActualCard().getAttribute("data-reference")].actions_id;
	putTable(actionsTableId, "table_result_row", diceRoll);
	
}

function putEventTable(diceRoll) {
	
	putTable("event-table", "table_result_row", diceRoll);
	
}

function putInspirationTable(diceRoll) {
	
	putTable("inspiration-roll-table", "table_result_row", diceRoll);
	
}

function putTable(idFrom, idTo, diceRoll) {
	
	var tableHtml = getElementById(idFrom).innerHTML;
	getElementById(idTo).innerHTML = tableHtml;
	var checkData = ";" + diceRoll + ";";
	var keptTr = true;
	var otherTr = null;
	document.querySelectorAll("#" + idTo + ">table>tbody>tr").forEach(function(elem) {
		var dataRoll = elem.getAttribute("data-rolls");
		if (dataRoll == "") {
			otherTr = elem;
		} else if (dataRoll.indexOf(checkData) >= 0) {
			keptTr = false;
		} else {
			elem.remove();
		}
	});
	if (!keptTr && otherTr != null) {
		otherTr.remove();
	}
	document.querySelectorAll("#" + idTo + ">table th, #" + idTo + ">table td").forEach(function(elem) {
		var key = elem.getAttribute("data-bs-content");
		if (key != null) {
			elem.setAttribute("data-bs-toggle", "popover");
			elem.setAttribute("data-bs-placement", "top");
			elem.setAttribute("data-bs-html", "true");
			if (key === "##") {
				key = "#" + elem.innerHTML.replaceAll(" ","_").replaceAll("&nbsp;","_");
			}
			if (key.startsWith("#")) {
				var data = document.querySelectorAll("#action-dictionary-table tr[data-key=\"" + key + "\"] td");
				if (data.length == 2) {
					elem.setAttribute("data-bs-title", data[0].innerHTML);
					elem.setAttribute("data-bs-content", data[1].innerHTML);
				} else {
					console.warn("Key not found '" + key + "'")
				}
			}
			new bootstrap.Popover(elem); 
		}
	});
	
}

function clearPopOvers() {
	
	document.querySelectorAll(".popover").forEach(function(elem) {
		elem.remove();
	});
	
}

function clickCard(ev) {
	
	if (trackingStatus.phase != "order") {
		return;
	}
	var elemA = findCardParent(ev.target);
	if (elemA.classList.contains("card-selected")) {
		elemA.classList.remove("card-selected");
		elemA.classList.remove("shrink-anim");
		elemA.offsetHeight;
		elemA.classList.add("grow-anim");
	} else {
		var selected = document.querySelectorAll(".card-selected");
		if (selected.length > 0) {
			var elemB = selected[0];
			swapElements(elemA, elemB);
			elemB.classList.remove("card-selected");
			elemA.classList.remove("shrink-anim");
			elemB.classList.remove("shrink-anim");
			elemA.offsetHeight;
			elemA.classList.add("grow-anim");
			elemB.classList.add("grow-anim");

		} else {
			elemA.classList.add("card-selected");
			elemA.classList.remove("grow-anim");
			elemA.offsetHeight;
			elemA.classList.add("shrink-anim");
		}
	}
	
}
 
function overDropCard(ev) {
	ev.preventDefault();
	var elem = findCardParent(ev.target);
	elem.classList.add("card-over");
}

function leaveDropCard(ev) {
	ev.preventDefault();
	var elem = findCardParent(ev.target);
	elem.classList.remove("card-over");
}

function dragCard(ev) {
	ev.dataTransfer.setData("from-id", ev.target.id);
	ev.dataTransfer.effectAllowed = "move";
	var elem = findCardParent(ev.target);
	elem.classList.add("card-selected");
}

function dropCard(ev) {
	ev.preventDefault();
	var elemA = getElementById(ev.dataTransfer.getData("from-id"));
	var elemB = findCardParent(ev.target);
	swapElements(elemA, elemB);
	elemA.classList.remove("card-selected");
	elemB.classList.remove("card-over");
}

function findCardParent(elem) {
	while (!elem.classList.contains("card-slot")) {
	  elem = elem.parentNode;
	}
	return elem;
}

function createSelectableCards(idFrom, idTo, idButton, selected, minSelected, maxSelected) {
	
	var cardsHtml = "";
	
	document.querySelectorAll("#" + idFrom + ">div").forEach(function(elem) {
		cardsHtml += "<div class=\"col mb-2\">" + elem.innerHTML + "</div>";
	});
	
	
	getElementById(idTo).innerHTML = cardsHtml;
	
	
	document.querySelectorAll("#" + idTo + ">div>div").forEach(function(elem) {
		
		if (selected.indexOf(elem.getAttribute("data-reference")) == -1) {
			elem.classList.add("card-deactivated");
		}
		
		elem.addEventListener("click", function(evt) {
			clickSelectableCard(this, idTo, idButton, minSelected, maxSelected);
		});
	});
	if (selected.length >= minSelected && selected.length <= maxSelected) {
		getElementById(idButton).removeAttribute("disabled");
	} else {
		getElementById(idButton).setAttribute("disabled", "disabled");
	}
	
}

function clickSelectableCard(card, idTo, idButton, minSelected, maxSelected) {

	var selected = document.querySelectorAll("#" + idTo + ">div>div:not(.card-deactivated)").length;
	
	if (card.classList.contains("card-deactivated")) {
		if (selected < maxSelected) {
			card.classList.remove("card-deactivated");
			card.classList.remove("grow-anim");
			card.classList.remove("shake-anim");
			card.offsetHeight;
			card.classList.add("grow-anim");
			selected++;
		} else {
			card.classList.remove("shake-anim");
			card.offsetHeight;
			card.classList.add("shake-anim");

		}
	} else {
		card.classList.add("card-deactivated");
		card.classList.remove("grow-anim");
		card.classList.remove("shake-anim");
		card.offsetHeight;
		card.classList.add("grow-anim");
		selected--;
	}
	if (selected >= minSelected && selected <= maxSelected) {
		getElementById(idButton).removeAttribute("disabled");
	} else {
		getElementById(idButton).setAttribute("disabled", "disabled");
	}
	
}

function createOrderableCards(cards) {

	trackingStatus.animation = true
	var cardsHtml = "";
	var index = 0;
	var populated = Math.max(Math.min(cards.length, 8), 6);
	cards.forEach(function(unit) {
		index++;
		cardsHtml += "<div class=\"draw-card-anim-" + index + " card-slot card-slot-populated-" + populated + " gx-1\" id=\"card-slot-" + index + "\"";
		cardsHtml += " onClick=\"clickCard(event)\" ondragstart=\"dragCard(event)\" ondrop=\"dropCard(event)\" ondragover=\"overDropCard(event)\" ondragleave=\"leaveDropCard(event)\">";
		if (unit instanceof Array) {
			let indexGroup = unit.length - 1;
			cardsHtml += createOrderableCard(unit[0].card_id, true).replace("<span class=\"card-group-indicator\">", "<span class=\"card-group-indicator\">" + (unit[indexGroup] + 1));

			for (let i = 1; i < indexGroup; i++) {
				cardsHtml += createOrderableCard(unit[i].card_id, false).replace("<span class=\"card-group-indicator\">", "<span class=\"card-group-indicator\">" + (unit[indexGroup] + 1));
			}
			cardsHtml += "<div class=\"extra-cards\">";

			for (let i = indexGroup - 1; i > 0; i--) {
				cardsHtml += "<div class=\"card hostile-card extra-card-" + i +" rounded-3 shadow-sm\"></div>";
			}
			cardsHtml += "</div>";

			
		} else {
			cardsHtml += createOrderableCard(unit.card_id, true);
		}
		cardsHtml += "</div>";
	});
	getElementById("tracking_order").innerHTML = cardsHtml;
	setTimeout(function() {
		trackingStatus.animation = false;
		for (let i = 1; i <= 8; i++) {
			elem = getElementById("card-slot-" + i);
			if (elem) {
				elem.classList.remove("draw-card-anim-" + i);
			}
		}
	}, 550);
	
}


function createOrderableCard(card, visible) {
	
	var cardHtml = "";
	cardHtml += "<div id=\""+ card +"-orderable\" class=\"card-orderable\"";
	if (!visible) {
		cardHtml += " style=\"display: none;\"";
	}
	cardHtml += ">";
	cardHtml += getElementById(card).innerHTML;
	cardHtml += "</div>";
	return cardHtml;
	
}


function swapElements(obj1, obj2) {
    // create marker element and insert it where obj1 is
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);

    // move obj1 to right before obj2
    obj2.parentNode.insertBefore(obj1, obj2);

    // move obj2 to right before where obj1 used to be
    temp.parentNode.insertBefore(obj2, temp);

    // remove temporary marker node
    temp.parentNode.removeChild(temp);
}

function shuffle(array) {
	let currentIndex = array.length,  randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
	return array;
}

getElementById("menu_new_game").addEventListener('click', function(event) {
	event.preventDefault();
	while (menuStack.previous()) {
		
	}
	menuStack.next(menus.create_game);

});

getElementById("menu_fullscreen").addEventListener('click', function(event) {
	
	event.preventDefault();
	if (document.fullscreenElement != null) {
		document.exitFullscreen();
	} else {
		var docElm = document.documentElement;
		if (docElm.requestFullscreen) {
			docElm.requestFullscreen();
		} else if (docElm.msRequestFullscreen) {
			docElm.msRequestFullscreen();
		} else if (docElm.mozRequestFullScreen) {
			docElm.mozRequestFullScreen();
		} else if (docElm.webkitRequestFullScreen) {
			docElm.webkitRequestFullScreen();
		}
	}

});




Object.values(menus).forEach(function (menu) {
	if (menu.init) {
		menu.init();
	}
});

menuStack.next(menus.create_game);
