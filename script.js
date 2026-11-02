let name__ = ""
const socket = io("http://localhost:8000", { transports: ["websocket", "polling", "flashsocket"] });
let submit_button;
const query = document.querySelector(".text");

function user_joined_msg(name) {
    let element = document.createElement("div");
    element.innerText = `${name} joined the chat`;
    element.classList.add("user_msg");
    query.append(element);
}
function user_disconnect_msg(name) {
    let element = document.createElement("div");
    element.innerText = `${name} left the chat`;
    element.classList.add("user_msg");
    query.append(element);
}

function send_msg(msg) {
    let element = document.createElement("div");
    element.innerText = `You:${msg}`;
    element.classList.add("msg");
    element.classList.add("text2");
    query.append(element);
}

function receive_msg(name, msg) {
    let element = document.createElement("div");
    element.innerText = `${name}: ${msg}`;
    element.classList.add("msg");
    element.classList.add("text1");
    query.append(element);
}

function send_click(event = null) {
    try {
        event.preventDefault();
    } catch { }
    let mesg = document.getElementById("form-control");
    if (mesg.value === "") {
        return 0;
    }
    send_msg(mesg.value);
    socket.emit("send", [name__, mesg.value]);
    mesg.value = "";
}

function initialize_sockets() {
    console.log("hi")
    submit_button = document.getElementById("submit-btn");
    submit_button.addEventListener("click", (e) => {
        send_click(e);
    });

    document.onkeypress = (e) => {
        if (e.code === "Enter") {
            send_click();
        }
    };

    socket.on("recieve", (data) => {
        receive_msg(data[0], data[1]);
    });

    socket.on("user-joined", (name) => {
        user_joined_msg(name);
    });

    socket.on("user-disconnect", (name) => {
        user_disconnect_msg(name);
    });

    socket.emit('join', name__);
};

document.getElementById("name_button").addEventListener('click', ()=>{
    if (document.getElementById("name_input").value != null && document.getElementById("name_input").value.trim() === ""){
    }
    else{
        name__ = document.getElementById("name_input").value
        document.getElementById("name_bg").remove()
        initialize_sockets()
    }
})