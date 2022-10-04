const username = `User${new Date().getTime()}`;

const init = () => {
  if(!IVSPlayer.isPlayerSupported) {
    alert('Your browser does not support the IVS video player. Please try a different browser.')
  }
  
  const videoEl = document.getElementById('video-player');
  const streamUrl = 'https://3d26876b73d7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.913157848533.channel.rkCBS9iD1eyd.m3u8';
  const ivsPlayer = IVSPlayer.create();
  ivsPlayer.attachHTMLVideoElement(videoEl);
  ivsPlayer.load(streamUrl);
  ivsPlayer.play();

  ivsPlayer.addEventListener(IVSPlayer.PlayerState.PLAYING, () => {
    document.getElementById('submit-settings').removeAttribute('disabled')
  });
  
  const form = document.getElementById('settings-form');
  form.addEventListener('submit', (e) => {
    if (form.checkValidity()) {
      document.getElementById('settings-form').classList.add('d-none');
      document.getElementById('chat-container').classList.remove('d-none');
      initChat();
    }
    form.classList.add('was-validated')
    e.preventDefault();
    e.stopPropagation();
  })
  
  document.getElementById('submit-chat').addEventListener('click', () => {
    const msgInput = document.getElementById('chat-input');
    const payload = {
      "action": "SEND_MESSAGE",
      "content": stripHtml(msgInput.value),
      "attributes": {
        "username": username
      }
    }
    try {
      window.chatConnection.send(JSON.stringify(payload));
    }
    catch(e) {
      console.error(e);
    }
    msgInput.value = '';
    msgInput.focus();
  });
}

const initChat = () => {
  //get endpoint and token
  const endpoint = document.getElementById('chat-endpoint').value;
  const token = document.getElementById('chat-token').value;
  
  // create connection
  window.chatConnection = new WebSocket(endpoint, token); 

  // listen for incoming messages
  window.chatConnection.onmessage = (event) => {
    // parse the event data
    const data = JSON.parse(event.data);

    // append the incoming msg to the chat
    const msgHtml = `<div class="mb-2"><b class="text-primary">${data.Attributes.username}</b>: ${data.Content}</div>`;
    const chatContainer = document.getElementById('chat');
    chatContainer.innerHTML += msgHtml;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };
}

const stripHtml = (html) => {
  let doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

document.addEventListener('DOMContentLoaded', init);