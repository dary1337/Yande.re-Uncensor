
document.querySelectorAll('a.no-focus-outline').forEach(element => {
	if (element.textContent !== 'rating:e')
		return;
	
	element.click();
});
