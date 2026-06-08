const { Client, GatewayIntentBits } = require("discord.js");

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const targetDate = new Date("2026-09-01T14:00:00Z");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

function getTimeLeft() {
  const now = new Date();
  const diff = SEASON_END - now;

  if (diff <= 0) return "ended";

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);

  return `${days}d-${hours}h`;
}

async function updateChannelName() {
  const channel = await client.channels.fetch(CHANNEL_ID);

  const timeLeft = getTimeLeft();

  await channel.setName(`r6-${timeLeft}`);

  console.log(`Updated: r6-${timeLeft}`);
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  updateChannelName();

  setInterval(updateChannelName, 10 * 60 * 1000);
});

client.login(TOKEN);