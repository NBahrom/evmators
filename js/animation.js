

const openWindow = document.querySelector('.click_active');
const openWindow2 = document.querySelector('.click_active2');
const container = document.querySelector('.inner__page_container');
const closeWindow = document.querySelector('.close__window');
const bodyInnerPage = document.querySelector('.page__inner');
const closeWindowtwo = document.querySelector('.close__window2');




openWindow.addEventListener('click', () => {
	container.classList.toggle('active');
	bodyInnerPage.classList.toggle('lock');
	closeWindowtwo.classList.toggle('active');
});



closeWindow.addEventListener('click', () => {
	container.classList.remove('active')
	bodyInnerPage.classList.remove('lock')
	closeWindowtwo.classList.remove('active')
});

closeWindowtwo.addEventListener('click', () => {
	container.classList.remove('active')
	bodyInnerPage.classList.remove('lock')
	closeWindowtwo.classList.remove('active')
});


openWindow2.addEventListener('click', () => {
	container.classList.toggle('active');
	bodyInnerPage.classList.toggle('lock');
	closeWindowtwo.classList.toggle('active');
});