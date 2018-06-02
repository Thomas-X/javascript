import mongoose from "mongoose";
import Discord from 'discord.js';
import {commandParser} from "../constants";

export default class Bot {
    constructor(token) {
        this._client = new Discord.Client();
        this._client.login(token);
        this._client.on('ready', () => {
            console.log(`Logged in as ${this._client.user.tag}`)
        })
        mongoose.connect('mongodb://localhost:27017/discord-bot')
        this.clientMessageListener = (func) => this._client.on('message', func);
        this.listen();
        this._token = token;
    }

    listen() {
        try {
            this.clientMessageListener(async (msg) => {
                await commandParser(msg.content);
            })
        } catch (err) {
            console.log(err);
        }
    }

    get client() {
        return this._client;
    }

    get token() {
        return this._token;
    }
}