document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const chatContainer = document.getElementById('chat-container');

    // Function to append messages to the chat
    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('p-2', 'my-2', 'rounded', 'shadow', 'max-w-md');
        
        if (sender === 'user') {
            messageElement.classList.add('bg-blue-500', 'text-white', 'self-end');
        } else {
            messageElement.classList.add('bg-gray-200', 'self-start');
        }

        messageElement.innerText = message;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;  // Auto scroll to bottom
    }

    // Function to send message to Flask backend and get response
    async function sendMessage() {
        const message = messageInput.value;
        if (!message) return;
        
        appendMessage('user', message);  // Append user's message
        messageInput.value = '';  // Clear input field

        const response = await fetch('/get_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        appendMessage('ai', data.message);  // Append AI's response
    }

    // Send message when the user clicks "Send"
    sendButton.addEventListener('click', sendMessage);

    // Send message when the user presses "Enter"
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
