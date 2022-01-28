const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["@", "#", "$", "%", "!", "~"];
const lowerCaseLetters = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

const upperCaseLetters = lowerCaseLetters.map((letter) => letter.toUpperCase());

const generatePassword = (length, hasSym, hasNum, hasLC, hasUC) => {
	let availCharacters = [
		...(hasSym ? symbols : []),
		...(hasNum ? numbers : []),
		...(hasUC ? upperCaseLetters : []),
		...(hasLC ? lowerCaseLetters : []),
	];

	if (length === 0 || availCharacters.length === 0) {
		return "";
	} else if (availCharacters.length > 0) {
		let password = "";

		for (let i = 1; i <= length; i++) {
			const toAdd =
				availCharacters[Math.floor(Math.random() * availCharacters.length)];
			password += toAdd;
		}

		return password;
	}
};

console.log(generatePassword(0, true, true, true, true));
