"use strict";

if (!global.malakIntervals) global.malakIntervals = {};

const kingMessage = `𐎅𐏍🔴-ⵣ-👹𒉺-𖢣-𝙆-𐎅𐏍🔴-ⵣ-👹𒉺-𝙆-𐎅𐏍🔴-ⵣ-👹𒉺-𖢣-𝘼-𐎅𐏍🔴-ⵣ-👹𒉺-𖢣-𝙎-𐎅𐏍🔴-ⵣ-👹𒉺-𖢣-𝙊-𐎅𐏍🔴-ⵣ-👹𒉺-𖢣-𝙈-𐎅𐏍🔴-ⵣ-👹𒉺-𖢣-𝙊-𐎅𐏍🔴-ⵣ-👹𒉺𖢣-𝙆-𐎅𐏍🔴-ⵣ-👹𒉺-𖢣-𝙐-𐎅𐏍🔴-ⵣ-👹𒉺-𖢣-𝙍-𐎅𐏍🔴-ⵣ-👹𒉺-𖢣-𝘼-𐎅𐏍🔴-ⵣ-👹𒉺-𖢣-𝙂-𐎅𐏍🔴-ⵣ-👹𒉺-𖢣-𝙀-

       
 ➣🇦🇱 𝆺𝅥⃝𝗗𝗘𝗩𝗜𝗟 ۬༐ 𝗞𝗮𝗸𝘂🇦🇱𒁂 
  ‌                 ⏤͟͟͞͞🔴                         
     𝑺𝑶𝑼𝑳 𝑶𝑭 𝑨 𝑾𝑨𝑹𝑹𝑰𝑶𝑹     
 ‌ ‌     ─⃝͎̽𝙎𖤌˖𝘼ɵ⃪𝆭͜͡X͎𝆭̽ʌ𝆭⃟ɴ𝙄☠️𝆺𝅥⃝𝙈✬     
 ٛ  , 𝑪𝑹𝑶𝑾𝑺  ۬ ۬  ༐  𝗠𝗢𝗡𝗦𝗧𝗘𝗥𝗦`;

function randomInterval() {
  return Math.floor(Math.random() * (40000 - 30000 + 1)) + 30000;
}

function scheduleNext(api, threadID) {
  const delay = randomInterval();
  global.malakIntervals[threadID] = setTimeout(() => {
    if (!global.malakIntervals[threadID]) return;
    api.sendMessage(kingMessage, threadID);
    scheduleNext(api, threadID);
  }, delay);
}

module.exports = {
  name: "غراب",
  aliases: ["crow", "الغراب"],
  description: "يرسل رسالة الغراب الملك كل 30-40 ثانية.",
  usage: "غراب | غراب وقف",
  category: "الملاك",

  async execute({ api, event, args }) {
    const { threadID } = event;
    const sub = args[0];

    if (sub === "وقف" || sub === "stop") {
      if (global.malakIntervals[threadID]) {
        clearTimeout(global.malakIntervals[threadID]);
        delete global.malakIntervals[threadID];
        return api.sendMessage("تم إيقاف الغراب 👑🪽", threadID);
      } else {
        return api.sendMessage("الغراب غير مفعّل أصلاً!", threadID);
      }
    }

    if (global.malakIntervals[threadID]) {
      return api.sendMessage("الغراب مفعّل بالفعل! قل /غراب وقف لإيقافه.", threadID);
    }

    await api.sendMessage("تم تفعيل الغراب 🐦‍⬛👑\nسيرسل رسالته كل 30 إلى 40 ثانية.", threadID);
    scheduleNext(api, threadID);
  },
};
