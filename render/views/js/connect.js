$(document).ready(() => {
    const PORT = 3002;
    const socket = io(`http://localhost:${PORT}`);
    const user = $('.user').text();
    socket.emit('user connected', user);
    
    $(window).bind("beforeunload", () => {
        socket.emit('user disconnected', user); 
    });
});