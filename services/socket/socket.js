import socketIO from "socket.io-client";
import {
    environment
} from "../../environment/environment";
import {
    AsyncStorage
} from "react-native";

class SocketIO {

    constructor() {
        this.socket = null;
        this.userId = 0;
        this.isSocketConnected = false;
        this.url = `${environment.baseUrl}`;
    }

    setSocketConnection() {
        return new Promise(async (resolve, reject) => {
            if (!this.isSocketConnected) {
                this.isSocketConnected = true;
                this.userId = await AsyncStorage.getItem("_id");
                this.socket = socketIO(this.url, {
                    timeout: 10000,
                    jsonp: false,
                    transports: ["websocket"],
                    pfx: "-",
                    cert: "-",
                    ca: "-",
                    ciphers: "-",
                    perMessageDeflate: "-",
                });
                this.socket.on("connect", () => {
                    this.socketDetails();
                });
                this.listenSocketDetailsEmit();
                resolve(this.socket);
            } else {
                resolve(this.socket);
            }
        });

    }

    listenSocketDetailsEmit() {
        this.socket.on(`${this.userId}_socketDetailsEmit`, () => {
            this.isSocketConnected = true;
        });
    }

    async socketDetails() {
        this.socket.emit("socketDetails", {
            userId: this.userId,
            socketId: this.socket.id,
        });
    }

    getSocket() {
        return new Promise(async (resolve, reject) => {
            if (!this.socket) {
                this.socket = await this.setSocketConnection();
                resolve(this.socket);
            } else {
                resolve(this.socket);
            }
        })
    }
}

export const socketConnection = new SocketIO();