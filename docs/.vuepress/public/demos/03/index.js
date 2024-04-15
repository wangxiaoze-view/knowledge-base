const tempStr = `路上只我一个人，背着手踱着。这一片天地好像是我的;我也像超出了平常旳自己，到了另一世界里。
    我爱热闹，也爱冷静;爱群居，也爱独处。像今晚上，一个人在这苍茫旳月下，什么都可以想，什么都可以不想，
    便觉是个自由的人。白天里一定要做的事，一定要说的话，现在都可不理。这是独处的妙处，我且受用这无边的荷香月色好了。`;

const textarea = utils.getDom("textarea[name=speech-text]");
textarea.value = utils.trim(tempStr);
const btn = utils.getDom("#speech-btn");
const btn2 = utils.getDom("#speech-btn--2");

btn.addEventListener("click", function () {
	const speechUtter = new window.SpeechSynthesisUtterance(textarea.value);
	window.speechSynthesis.speak(speechUtter);
});

const speechRecognition = new webkitSpeechRecognition();
console.log(speechRecognition, 11);
speechRecognition.lang = window.navigator.language || "en-US";
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.onresult = function (e) {
	utils.logger("可能会出现问题，可以使用其他浏览器");
	utils.logger(e);
};
speechRecognition.onerror = function (e) {
	utils.logger(e.error, "error");
};
btn2.addEventListener("click", function () {
	speechRecognition.start();
	setTimeout(() => {
		speechRecognition.stop();
	}, 5000);
});
