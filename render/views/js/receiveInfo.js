$(document).ready(() => {
    const PORT = 3002;
    const socket = io(`http://localhost:${PORT}`);
    socket.on('user connected', (data) => {
        console.log(data);
        $('.user-list').append(`<li>${data}</li>`);
    });
    socket.on('user disconnected', (data) => {
        $(`li:contains("${data}")`).remove();
    });
});