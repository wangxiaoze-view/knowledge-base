/**
 * @description         模拟消息id
 * @param name {string} message-name
 * @returns {string}
 */
function createdChannelsId(name) {
	const key = `channel-${name}`;
	let id = localStorage.getItem(key);
	!id && (id = 0);
	id++;
	localStorage.setItem(key, id.toString());
	return id;
}

/**
 * @description     模拟消息模板
 * @param message   消息
 * @param channel   channel
 * @param type      操作类型
 */
function sendMessage(message, channel, type) {
	channel.postMessage({
		id: channel.id,
		message,
		type,
	});
}

/**
 * @description    创建消息通道
 * @param name
 * @returns {BroadcastChannel}
 */
function createdChannels(name) {
	const channel = new BroadcastChannel(name);
	channel.id = createdChannelsId(name);
	// 监听消息队列
	channel.listeners = new Set();

	utils.logger("连接初始化中...");
	sendMessage("连接中", channel, "add");

	window.addEventListener("unload", () => {
		utils.logger("关闭连接...");
		sendMessage("关闭连接", channel, "close");
		channel.listeners.clear();
	});

	// 监听
	channel.addEventListener("message", e => {
		if (e.data.type === "add") {
			channel.listeners.add({
				id: e.data.id,
				message: e.data.message,
			});
		} else if (e.data.type === "close") {
			channel.listeners.clear();
		}
	});
	return channel;
}
