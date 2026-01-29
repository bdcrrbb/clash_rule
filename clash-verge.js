// Clash Verge Override Script - bbyy.ini equivalent
// Regional groups: 香港, 台湾, 新加坡, 美国, 欧洲, Others
// Each region has: Auto (url-test) + Manual (select)
// Plus: All proxies group (Auto + Manual)

function main(config) {
  // Define rule-providers (external rule lists)
  config["rule-providers"] = {
    "personalfix": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/bdcrrbb/clash_rule/main/personalfix.list",
      path: "./ruleset/personalfix.yaml",
      interval: 86400
    },
    "ai": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/AI.list",
      path: "./ruleset/ai.yaml",
      interval: 86400
    },
    "bilibili-hmt": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/BilibiliHMT.list",
      path: "./ruleset/bilibili-hmt.yaml",
      interval: 86400
    },
    "bilibili": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list",
      path: "./ruleset/bilibili.yaml",
      interval: 86400
    },
    "unban1": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/zsokami/ACL4SSR/main/UnBan1.list",
      path: "./ruleset/unban1.yaml",
      interval: 86400
    },
    "unban": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/UnBan.list",
      path: "./ruleset/unban.yaml",
      interval: 86400
    },
    "download": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Download.list",
      path: "./ruleset/download.yaml",
      interval: 86400
    },
    "banad": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list",
      path: "./ruleset/banad.yaml",
      interval: 86400
    },
    "googlecn": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/zsokami/ACL4SSR/main/GoogleCN.list",
      path: "./ruleset/googlecn.yaml",
      interval: 86400
    },
    "steamcn": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/SteamCN.list",
      path: "./ruleset/steamcn.yaml",
      interval: 86400
    },
    "microsoft": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Microsoft.list",
      path: "./ruleset/microsoft.yaml",
      interval: 86400
    },
    "proxygfw": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list",
      path: "./ruleset/proxygfw.yaml",
      interval: 86400
    },
    "chinadomain": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list",
      path: "./ruleset/chinadomain.yaml",
      interval: 86400
    },
    "chinacompanyip": {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaCompanyIp.list",
      path: "./ruleset/chinacompanyip.yaml",
      interval: 86400
    }
  };

  // Get proxy names from config
  const proxyNames = config.proxies?.map(p => p.name) || [];

  // Regional regex patterns
  const regions = {
    "香港": { emoji: "🇭🇰", regex: /香港|HK|Hong\s?Kong|Hongkong/i },
    "台湾": { emoji: "🇹🇼", regex: /台湾|台灣|TW|Taiwan|台北|新北|彰化|高雄/i },
    "新加坡": { emoji: "🇸🇬", regex: /新加坡|SG|Singapore|狮城|獅城/i },
    "美国": { emoji: "🇺🇸", regex: /美国|美國|US|USA|United\s?States|洛杉矶|硅谷|旧金山|西雅图|纽约|芝加哥|达拉斯|凤凰城|圣何塞|拉斯维加斯|波特兰|丹佛|亚特兰大|迈阿密/i },
    "欧洲": { emoji: "🇪🇺", regex: /欧洲|欧盟|EU|Europe|英国|UK|伦敦|London|德国|Germany|法兰克福|Frankfurt|法国|France|巴黎|Paris|荷兰|Netherlands|阿姆斯特丹|Amsterdam|瑞士|Switzerland|苏黎世|意大利|Italy|米兰|罗马|西班牙|Spain|马德里|瑞典|Sweden|斯德哥尔摩|挪威|Norway|奥斯陆|芬兰|Finland|赫尔辛基|丹麦|Denmark|哥本哈根|爱尔兰|Ireland|都柏林|波兰|Poland|华沙|比利时|Belgium|布鲁塞尔|奥地利|Austria|维也纳|葡萄牙|Portugal|里斯本|希腊|Greece|雅典|捷克|Czech|布拉格|匈牙利|Hungary|布达佩斯|罗马尼亚|Romania|保加利亚|Bulgaria|乌克兰|Ukraine|基辅/i },
    "其他": { emoji: "🌍", regex: null }
  };

  // Categorize proxies by region
  const regionProxies = {};
  for (const region of Object.keys(regions)) {
    regionProxies[region] = [];
  }

  proxyNames.forEach(name => {
    let matched = false;
    for (const [region, config] of Object.entries(regions)) {
      if (config.regex && config.regex.test(name)) {
        regionProxies[region].push(name);
        matched = true;
        break;
      }
    }
    if (!matched) {
      regionProxies["其他"].push(name);
    }
  });

  // Build regional proxy groups (Auto + Manual for each region)
  const regionalGroups = [];
  const autoRegionNames = [];
  const manualRegionNames = [];

  for (const [region, proxies] of Object.entries(regionProxies)) {
    if (proxies.length > 0) {
      const emoji = regions[region].emoji;
      const autoName = `${emoji} ${region}-Auto`;
      const manualName = `${emoji} ${region}-Select`;
      
      autoRegionNames.push(autoName);
      manualRegionNames.push(manualName);

      // Auto-select group (url-test)
      regionalGroups.push({
        name: autoName,
        type: "url-test",
        proxies: proxies,
        url: "http://www.gstatic.com/generate_204",
        interval: 300,
        tolerance: 50
      });

      // Manual select group
      regionalGroups.push({
        name: manualName,
        type: "select",
        proxies: proxies
      });
    }
  }

  // All proxies groups
  const allProxiesGroups = [
    {
      name: "🌐 全部节点-Auto",
      type: "url-test",
      proxies: proxyNames,
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50
    },
    {
      name: "🌐 全部节点-Select",
      type: "select",
      proxies: proxyNames
    }
  ];

  // Define proxy groups
  config["proxy-groups"] = [
    {
      name: "✈️ 起飞",
      type: "select",
      proxies: [
        "🌐 全部节点-Auto",
        "🌐 全部节点-Select",
        ...autoRegionNames,
        ...manualRegionNames
      ]
    },
    {
      name: "🤖 AI",
      type: "select",
      proxies: [
        "🇺🇸 美国-Auto",
        "🇺🇸 美国-Select",
        "🇸🇬 新加坡-Auto",
        "🇸🇬 新加坡-Select",
        "✈️ 起飞",
        ...autoRegionNames,
        ...manualRegionNames
      ].filter(p => autoRegionNames.includes(p) || manualRegionNames.includes(p) || p === "✈️ 起飞")
    },
    {
      name: "📺 B站",
      type: "select",
      proxies: [
        "DIRECT",
        "🇭🇰 香港-Auto",
        "🇭🇰 香港-Select",
        "🇹🇼 台湾-Auto",
        "🇹🇼 台湾-Select"
      ].filter(p => p === "DIRECT" || autoRegionNames.includes(p) || manualRegionNames.includes(p))
    },
    {
      name: "Ⓜ️ Microsoft",
      type: "select",
      proxies: ["DIRECT", "✈️ 起飞", ...autoRegionNames, ...manualRegionNames]
    },
    {
      name: "🛩️ 墙内",
      type: "select",
      proxies: ["DIRECT", "✈️ 起飞"]
    },
    {
      name: "💩 广告",
      type: "select",
      proxies: ["REJECT", "DIRECT"]
    },
    {
      name: "🌐 未知站点",
      type: "select",
      proxies: ["✈️ 起飞", "DIRECT", ...autoRegionNames, ...manualRegionNames]
    },
    // All proxies groups
    ...allProxiesGroups,
    // Regional groups (Auto + Manual)
    ...regionalGroups
  ];

  // Define rules (order matters!)
  config.rules = [
    "RULE-SET,personalfix,DIRECT",
    "RULE-SET,ai,🤖 AI",
    "RULE-SET,bilibili-hmt,📺 B站",
    "RULE-SET,bilibili,📺 B站",
    "RULE-SET,unban1,🛩️ 墙内",
    "RULE-SET,unban,🛩️ 墙内",
    "RULE-SET,download,🛩️ 墙内",
    "RULE-SET,banad,💩 广告",
    "RULE-SET,googlecn,🛩️ 墙内",
    "RULE-SET,steamcn,🛩️ 墙内",
    "RULE-SET,microsoft,Ⓜ️ Microsoft",
    "RULE-SET,proxygfw,✈️ 起飞",
    "RULE-SET,chinadomain,🛩️ 墙内",
    "RULE-SET,chinacompanyip,🛩️ 墙内",
    "GEOIP,CN,🛩️ 墙内",
    "MATCH,🌐 未知站点"
  ];

  return config;
}
