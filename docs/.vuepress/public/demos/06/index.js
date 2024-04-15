const items = utils.getDom(".box-container .item", true);

const activeName = "item-active";
function removeClass(name = activeName) {
	items.forEach(item => item.classList.remove(name));
}
items.forEach(item => {
	item.addEventListener("click", function () {
		removeClass();
		item.classList.add(activeName);
	});
});
