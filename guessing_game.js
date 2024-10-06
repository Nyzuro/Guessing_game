const readlineSync = require("readline-sync");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let nb_to_find = getRandomInt(100);
let nb_find;
let retry;
let tentatives = 1;
const yellow = "\x1b[0;33m";
const green = "\x1b[0;32m";
const red = "\x1b[0;31m";
const reset_red = "\x1b[0m";
const reset_green = "\x1b[0m";
const reset_yellow = "\x1b[0m";

function ask_nb() {
  console.log("-----------------------------------");
  nb_find = readlineSync.question("Trouve le nombre entre 1 et 100 : ");
  console.log("Vous avez dit " + yellow + nb_find + reset_yellow);
  console.log("-----------------------------------");
  check_nb();
}

ask_nb();

function check_nb() {
  const has_letter = /[a-zA-z!-/:-@[-~]/.test(nb_find);
  if (has_letter) {
    console.log(yellow + "Ecrivez un nombre s'il vous plait." + reset_yellow);
    return ask_nb();
  }

  if (nb_find != nb_to_find) {
    if (nb_find > 100) {
      console.log(
        yellow + "Le nombre doit etre entre 1 et 100." + reset_yellow
      );
    } else if (nb_find < nb_to_find) {
      console.log(
        "Le nombre a trouver est " + yellow + "plus grand." + reset_yellow
      );
    } else if (nb_find > nb_to_find) {
      console.log(
        "Le nombre a trouver est " + yellow + "plus petit." + reset_yellow
      );
    }
    tentatives++;
    if (tentatives > 10) {
      console.log(
        red +
          `Le nombre de tentatives est epuise (｡ŏ﹏ŏ), le nombre etait ${nb_to_find}.` +
          reset_red
      );
      retry = readlineSync.question(
        "Souhaitez vous recommencer avec un nouveau nombre? (Oui/Non) : "
      );
      if (retry === "Oui") {
        tentatives = 0;
        nb_to_find = getRandomInt(100);
        return ask_nb();
      } else if (retry === "Non") {
        return false;
      }
    }
    ask_nb();
  } else {
    console.log(
      green +
        `Bravo!, vous avez devine le bon nombre en ${tentatives} tentatives.` +
        reset_green
    );
    console.log("-----------------------------------");
  }
}
