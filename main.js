document.querySelectorAll("a.no-focus-outline").forEach((element) => {
	if (
		element.textContent !== "rating:e" && //
		element.textContent !== "extreme_content"
	)
		return;

	element.click();
});
