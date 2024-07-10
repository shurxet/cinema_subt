function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const messageId = generateUniqueId(); // Генерируем уникальный идентификатор для отправляемого сообщения

const roomName = 'test' // JSON.parse(document.getElementById('room-name').textContent);

const chatSocket = new WebSocket(
    `ws://${window.location.host}/ws/chat/${roomName}/`
);

chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    const chatLog = document.getElementById('chat-log');

    // Создаем контейнер сообщения
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');

    // Создаем блок для текста сообщения
    const messageTextBlock = document.createElement('div');
    messageTextBlock.textContent = data.message;
    messageTextBlock.classList.add('message-text');
    const senderClass = data.messageId === messageId ? 'outgoing' : 'incoming';
    messageTextBlock.classList.add(senderClass);
    messageContainer.appendChild(messageTextBlock);

    // Создаем блок для даты и времени
    const timestampBlock = document.createElement('span');
    timestampBlock.textContent = new Date().toLocaleString();
    const timestampClass = data.messageId === messageId ? 'timestamp-outgoing' : 'timestamp-incoming';
    timestampBlock.classList.add('timestamp', timestampClass);
    messageContainer.appendChild(timestampBlock);

    // Присвоим уникальный идентификатор сообщению
    // const messageId = data.messageId || generateUniqueId();
    // messageContainer.setAttribute('data-message-id', messageId);

    chatLog.appendChild(messageContainer);
    chatLog.scrollTop = chatLog.scrollHeight;
};


document.querySelector('#chat-message-input').focus();

document.querySelector('#chat-message-input').onkeyup = function (e) {
    if (e.key === 'Enter') {
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function (e) {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'message': message,
        'sender': 'user',
        'messageId': messageId,  // Передаем уникальный идентификатор
    }));
    messageInputDom.value = '';
};

// chat/js/chat.js
document.addEventListener('DOMContentLoaded', function () {
    const chatLog = document.getElementById('chat-log');
    chatLog.scrollTop = chatLog.scrollHeight;

    const observer = new MutationObserver(function () {
        chatLog.scrollTop = chatLog.scrollHeight;
    });

    observer.observe(chatLog, { childList: true });
});


const chatContainer = document.getElementById('chat-container');
const toggleDialogsBtn = document.getElementById('toggle-dialogs');

toggleDialogsBtn.addEventListener('click', function () {
    chatContainer.classList.toggle('closed');
});