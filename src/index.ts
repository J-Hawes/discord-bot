require("dotenv").config();

import { ExtendedClient } from "./client";

export const bot = new ExtendedClient();

bot.start();



