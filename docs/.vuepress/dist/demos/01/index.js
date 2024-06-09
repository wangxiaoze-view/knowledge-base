const openEyeDropper = async () => {
	try {
		const dropper = new EyeDropper();
		const result = await dropper.open();
		utils.getDom(".color-bg").style.backgroundColor = result.sRGBHex;
		utils.getDom(".color-txt").textContent = result.sRGBHex;
	} catch (error) {
		alert("该设备不支持或者已取消!");
	}
};

utils.getDom("#btn-color").addEventListener("click", openEyeDropper);
