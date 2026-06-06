"use strict";

const config = require("../config.json");

module.exports = {
  name: "مساعدة",
  aliases: ["help", "h", "اوامر", "أوامر", "cmds"],
  description: "عرض قائمة أوامر الغراب الأسود أو تفاصيل أمر معين.",
  usage: "مساعدة [اسم الأمر]",
  category: "عام",

  async execute({ api, event, args, commands }) {
    const prefix = config.prefix;

    const CATEGORY_AR = {
      "عام":       { icon: "🪶", label: "عام" },
      "General":   { icon: "🪶", label: "عام" },
      "Info":      { icon: "👁️", label: "معلومات" },
      "Utility":   { icon: "⚙️", label: "أدوات" },
      "Group":     { icon: "👥", label: "المجموعة" },
      "Fun":       { icon: "🎲", label: "ترفيه" },
      "Entertainment": { icon: "🎭", label: "ترفيه" },
      "الملاك":    { icon: "🔴", label: "الملاك" },
    };

    if (args[0]) {
      const name = args[0].toLowerCase().replace(/^\/+/, "");
      const cmd  = commands.get(name) ||
        [...new Set(commands.values())].find(c =>
          c.aliases?.includes(name) || c.name === name
        );
      if (!cmd) {
        return api.sendMessage(
          `🪶 الغراب لا يعرف هذا الأمر: "${name}"\nاكتب ${prefix}مساعدة لرؤية الأوامر.`,
          event.threadID
        );
      }
      const cat = CATEGORY_AR[cmd.category] || { icon: "🪶", label: cmd.category || "عام" };
      const lines = [
        ``,
        `𝕴𝖁𝕬𝕽 𝖁-𝟛  🐦‍⬛`,
        `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,
        `📖 الأمر       :  ${prefix}${cmd.name}`,
        `📝 الوصف       :  ${cmd.description}`,
        `${cat.icon} الفئة        :  ${cat.label}`,
        `📌 الاستخدام   :  ${prefix}${cmd.usage || cmd.name}`,
      ];
      if (cmd.aliases?.length) {
        lines.push(`🔁 الاختصارات  :  ${cmd.aliases.map(a => prefix + a).join("  │  ")}`);
      }
      if (cmd.adminOnly) lines.push(`🔒 يتطلب صلاحية مشرف`);
      if (cmd.groupOnly) lines.push(`👥 للمجموعات فقط`);
      lines.push(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`);
      return api.sendMessage(lines.join("\n"), event.threadID);
    }

    const unique     = [...new Set(commands.values())];
    const categories = {};

    for (const cmd of unique) {
      const rawCat = cmd.category || "عام";
      const info   = CATEGORY_AR[rawCat] || { icon: "🪶", label: rawCat };
      const key    = info.label;
      if (!categories[key]) categories[key] = { icon: info.icon, cmds: [] };
      categories[key].cmds.push(cmd.name);
    }

    const ORDER = ["عام", "معلومات", "أدوات", "المجموعة", "ترفيه", "الملاك"];
    const sorted = [
      ...ORDER.filter(k => categories[k]),
      ...Object.keys(categories).filter(k => !ORDER.includes(k)),
    ];

    const DIVIDER = "══════════════════════";
    const THIN    = "──────────────────────";

    let msg = "";
    msg += `\n`;
    msg += `𝕴𝖁𝕬𝕽  𝖁-𝟛  🐦‍⬛\n`;
    msg += `${DIVIDER}\n`;
    msg += `   غُرابُ الأوامر يَحكُم\n`;
    msg += `   جناحاه: القوة والعقل\n`;
    msg += `${DIVIDER}\n\n`;

    for (const cat of sorted) {
      const { icon, cmds } = categories[cat];
      msg += `${icon}  ⟦ ${cat} ⟧\n`;
      msg += `${THIN}\n`;
      for (const name of cmds) {
        msg += `   🔸 ${prefix}${name}\n`;
      }
      msg += `\n`;
    }

    msg += `${DIVIDER}\n`;
    msg += `🪶  اكتب ${prefix}مساعدة <أمر> للتفاصيل\n`;
    msg += `🐦‍⬛  ${config.bot.name}  │  الغراب الأسود\n`;
    msg += `${DIVIDER}`;

    api.sendMessage(msg, event.threadID);
  },
};
