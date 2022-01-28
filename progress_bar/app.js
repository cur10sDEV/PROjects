const progressBar = document.querySelector("#progress-bar");
const section = document.querySelector("section");

const animateProgressBar = () => {
	let scrollDistance = -section.getBoundingClientRect().top;
	let totalDistance = Math.floor(
		section.getBoundingClientRect().height -
			document.documentElement.clientHeight
	);

	let scrollPercentage = Math.round((scrollDistance / totalDistance) * 100);

	if (scrollPercentage < 0) progressBar.style.width = `0%`;
	else if (scrollPercentage > 100) progressBar.style.width = `100%`;
	else progressBar.style.width = `${scrollPercentage}%`;
};

window.addEventListener("scroll", animateProgressBar);
