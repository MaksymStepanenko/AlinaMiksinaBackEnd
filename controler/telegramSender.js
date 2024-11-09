const TelegramBot = require("node-telegram-bot-api");

require("dotenv").config();

const token = process.env.token;
const chatId = process.env.chatId;

const bot = new TelegramBot(token, { polling: true });

const sendMessage = async (req, res) => {
  const data = req.body;
  function formatJson(jsonData) {
    return Object.entries(jsonData)
      .map(([key, value]) => {
        if (key === "----------") {
          return `${key}: ${value}`;
        }
        return `${key}: ${value ? value : "м"}`;
      })
      .join("\n");
  }

  const formattedData = formatJson(data);

  bot.sendMessage(chatId, formattedData);

  res.status(200).json({
    message: "OK",
  });
};

module.exports = sendMessage;
