// 初始化消息管道
const channel = createdChannels("test-open");
// 监听消息
channel.addEventListener("message", function (e) {
	console.log(e);
	utils.getDom("#post-message--tip").innerHTML = e.data.message;
});

// 模拟按钮在原有标签发送消息
utils.getDom("#send-btn").addEventListener("click", function (e) {
	// 首次打开新标签
	if (channel.listeners.size === 0) {
		window.open(`/demos/02/child.html?name=${e.target.innerText}`, "_blank");
	} else {
		// 在原有的标签页的基础上发送消息
		channel.postMessage({
			id: channel.id,
			message: e.target.innerHTML + "" + new Date().getTime(),
		});
	}
});
