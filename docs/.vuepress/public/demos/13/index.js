const up = document.getElementById("upload");
up.addEventListener("change", function (e) {
	const file = e.target.files[0];
	const image = new Image();

	const reader = new FileReader();
	if (file) {
		reader.readAsDataURL(file);
	}
	reader.addEventListener("load", () => {
		image.src = reader.result;
		image.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = image.width;
			canvas.height = image.height;
			const ctx = canvas.getContext("2d");
			ctx.drawImage(image, 0, 0);
			const { data, width, height } = ctx.getImageData(
				0,
				0,
				image.width,
				image.height
			);
			render(data, width, height);
		};
	});
});

let str = "";
function render(data, width, height) {
	const w = 1;
	let shadow = [];
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			const d = (width * i + j) * 4;
			var r = data[0 + d];
			var g = data[1 + d];
			var b = data[2 + d];
			var a = data[3 + d];
			const color = `rgba(${r}, ${g}, ${b}, ${a === 255 ? 1 : a})`;
			shadow.push(`${j + w}px ${i * w}px ${color}`);
		}
	}

	str = `
          <style>
            .shawod {
              width: 1px;
              height: 1px;
              box-shadow: ${shadow.join(",")};
            }
          </style>          
          <div class="shawod"></div>
        `;

	document.querySelector("#result").innerHTML = str;

	up.value = "";
}

function download() {
	if (!str) return;
	const blob = new Blob([str], {
		type: "text/html",
	});
	const objectURL = URL.createObjectURL(blob);
	const aTag = document.createElement("a");
	aTag.href = objectURL;
	aTag.download = "测试.html";
	aTag.click();
	URL.revokeObjectURL(objectURL);
}
document.querySelector("#download").addEventListener("click", download);
