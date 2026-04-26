/**
 * 姓名汉字拆解数据 + 五格数理分析（前端版）
 * 浏览器端运行，无 Python 依赖
 */

// 汉字拆解数据库
export const CHAR_DB: Record<string, {
  radical: string;
  strokes: number;
  element: string;
  meaning: string;
}> = {
  "南": { radical: "十", strokes: 9, element: "火", meaning: "南方" },
  "曦": { radical: "日", strokes: 20, element: "火", meaning: "阳光，晨曦" },
  "李": { radical: "木", strokes: 7, element: "木", meaning: "李树，果实" },
  "王": { radical: "王", strokes: 4, element: "土", meaning: "君王，统领" },
  "张": { radical: "弓", strokes: 7, element: "火", meaning: "张弓，展开" },
  "刘": { radical: "文", strokes: 6, element: "火", meaning: "杀戮，兵器" },
  "陈": { radical: "阝", strokes: 7, element: "火", meaning: "陈列，陈旧" },
  "杨": { radical: "木", strokes: 7, element: "木", meaning: "杨树，扬起" },
  "赵": { radical: "走", strokes: 9, element: "火", meaning: "行走，赵国" },
  "黄": { radical: "黄", strokes: 11, element: "土", meaning: "黄色，土地" },
  "周": { radical: "口", strokes: 8, element: "金", meaning: "周全，四周" },
  "吴": { radical: "口", strokes: 7, element: "木", meaning: "吴国" },
  "徐": { radical: "彳", strokes: 10, element: "金", meaning: "缓慢，从容" },
  "孙": { radical: "子", strokes: 6, element: "水", meaning: "子孙，晚辈" },
  "胡": { radical: "月", strokes: 9, element: "土", meaning: "胡地，胡须" },
  "朱": { radical: "木", strokes: 6, element: "木", meaning: "红色，朱砂" },
  "高": { radical: "高", strokes: 10, element: "木", meaning: "高大，高处" },
  "林": { radical: "木", strokes: 8, element: "木", meaning: "树林，森林" },
  "何": { radical: "亻", strokes: 7, element: "木", meaning: "疑问，何等" },
  "郭": { radical: "阝", strokes: 10, element: "木", meaning: "城郭，外围" },
  "马": { radical: "马", strokes: 3, element: "火", meaning: "马匹" },
  "梁": { radical: "木", strokes: 11, element: "木", meaning: "房梁，桥" },
  "宋": { radical: "宀", strokes: 7, element: "金", meaning: "居住，宋朝" },
  "唐": { radical: "口", strokes: 10, element: "火", meaning: "唐朝，广大" },
  "郑": { radical: "阝", strokes: 8, element: "火", meaning: "郑重，郑州" },
  "谢": { radical: "讠", strokes: 12, element: "金", meaning: "感谢，凋谢" },
  "韩": { radical: "韦", strokes: 12, element: "水", meaning: "韩国，井垣" },
  "冯": { radical: "冫", strokes: 5, element: "水", meaning: "冯河，姓氏" },
  "于": { radical: "二", strokes: 3, element: "土", meaning: "在，于" },
  "董": { radical: "艹", strokes: 12, element: "木", meaning: "监督，董事" },
  "萧": { radical: "艹", strokes: 11, element: "木", meaning: "萧瑟，萧姓" },
  "程": { radical: "禾", strokes: 12, element: "火", meaning: "路程，程序" },
  "曹": { radical: "曰", strokes: 11, element: "金", meaning: "官署，朝代" },
  "袁": { radical: "土", strokes: 10, element: "土", meaning: "长衣貌" },
  "邓": { radical: "阝", strokes: 4, element: "火", meaning: "邓国" },
  "许": { radical: "讠", strokes: 6, element: "木", meaning: "允许，许愿" },
  "傅": { radical: "亻", strokes: 12, element: "水", meaning: "师傅，辅导" },
  "沈": { radical: "氵", strokes: 7, element: "水", meaning: "沉没，沈阳" },
  "曾": { radical: "曰", strokes: 12, element: "金", meaning: "曾经" },
  "彭": { radical: "彡", strokes: 12, element: "水", meaning: "鼓声" },
  "吕": { radical: "口", strokes: 6, element: "火", meaning: "吕律，姓氏" },
  "苏": { radical: "艹", strokes: 7, element: "木", meaning: "复苏，苏州" },
  "卢": { radical: "卜", strokes: 5, element: "火", meaning: "卢舍" },
  "蒋": { radical: "艹", strokes: 12, element: "木", meaning: "蒋姓" },
  "蔡": { radical: "艹", strokes: 14, element: "木", meaning: "蔡国" },
  "贾": { radical: "贝", strokes: 10, element: "火", meaning: "商人，贾姓" },
  "丁": { radical: "一", strokes: 2, element: "火", meaning: "钉子，壮丁" },
  "魏": { radical: "鬼", strokes: 17, element: "木", meaning: "魏国" },
  "薛": { radical: "艹", strokes: 16, element: "木", meaning: "草名" },
  "叶": { radical: "口", strokes: 5, element: "土", meaning: "叶子" },
  "阎": { radical: "门", strokes: 11, element: "木", meaning: "里巷门" },
  "余": { radical: "人", strokes: 7, element: "土", meaning: "剩余，我" },
  "潘": { radical: "氵", strokes: 15, element: "水", meaning: "淘米水" },
  "杜": { radical: "木", strokes: 7, element: "木", meaning: "杜树，杜绝" },
  "戴": { radical: "戈", strokes: 17, element: "火", meaning: "佩戴，爱戴" },
  "夏": { radical: "夂", strokes: 10, element: "火", meaning: "夏天，华夏" },
  "钟": { radical: "钅", strokes: 9, element: "金", meaning: "时钟，钟爱" },
  "汪": { radical: "氵", strokes: 7, element: "水", meaning: "汪洋" },
  "田": { radical: "田", strokes: 5, element: "土", meaning: "田地" },
  "任": { radical: "亻", strokes: 6, element: "金", meaning: "信任，任务" },
  "姜": { radical: "女", strokes: 9, element: "木", meaning: "生姜" },
  "范": { radical: "艹", strokes: 8, element: "木", meaning: "模范" },
  "方": { radical: "方", strokes: 4, element: "水", meaning: "方向" },
  "石": { radical: "石", strokes: 5, element: "金", meaning: "石头" },
  "姚": { radical: "女", strokes: 9, element: "土", meaning: "美丽" },
  "谭": { radical: "讠", strokes: 14, element: "火", meaning: "言谈" },
  "金": { radical: "金", strokes: 8, element: "金", meaning: "金属，黄金" },
  "陆": { radical: "阝", strokes: 7, element: "火", meaning: "陆地" },
  "白": { radical: "白", strokes: 5, element: "水", meaning: "白色" },
  "孔": { radical: "子", strokes: 4, element: "水", meaning: "洞穴" },
  "崔": { radical: "山", strokes: 11, element: "木", meaning: "高山" },
  "康": { radical: "广", strokes: 11, element: "木", meaning: "安康" },
  "毛": { radical: "毛", strokes: 4, element: "水", meaning: "毛发" },
  "秦": { radical: "禾", strokes: 10, element: "火", meaning: "秦国" },
  "江": { radical: "氵", strokes: 6, element: "水", meaning: "江河" },
  "史": { radical: "口", strokes: 5, element: "金", meaning: "历史" },
  "顾": { radical: "页", strokes: 10, element: "木", meaning: "照顾" },
  "龙": { radical: "龙", strokes: 5, element: "土", meaning: "龙，帝王" },
  "万": { radical: "一", strokes: 3, element: "木", meaning: "千万" },
  "雷": { radical: "雨", strokes: 13, element: "木", meaning: "雷电" },
  "钱": { radical: "钅", strokes: 10, element: "金", meaning: "金钱" },
  "易": { radical: "日", strokes: 8, element: "火", meaning: "容易" },
  "贺": { radical: "贝", strokes: 9, element: "水", meaning: "祝贺" },
  "武": { radical: "止", strokes: 8, element: "水", meaning: "武力" },
  "文": { radical: "文", strokes: 4, element: "水", meaning: "文章，文化" },
  "安": { radical: "宀", strokes: 6, element: "土", meaning: "安全，平安" },
  "明": { radical: "日", strokes: 8, element: "火", meaning: "光明，明日" },
  "华": { radical: "十", strokes: 6, element: "水", meaning: "中华，华丽" },
  "云": { radical: "二", strokes: 4, element: "水", meaning: "云彩" },
  "杰": { radical: "木", strokes: 8, element: "木", meaning: "杰出" },
  "伟": { radical: "亻", strokes: 6, element: "土", meaning: "伟大" },
  "强": { radical: "弓", strokes: 12, element: "木", meaning: "强大" },
  "志": { radical: "心", strokes: 7, element: "火", meaning: "意志" },
  "慧": { radical: "心", strokes: 15, element: "水", meaning: "智慧" },
  "泽": { radical: "氵", strokes: 8, element: "水", meaning: "恩泽" },
  "佳": { radical: "亻", strokes: 8, element: "木", meaning: "美好" },
  "丽": { radical: "一", strokes: 7, element: "火", meaning: "美丽" },
  "欣": { radical: "欠", strokes: 8, element: "木", meaning: "欣喜" },
  "宇": { radical: "宀", strokes: 6, element: "土", meaning: "宇宙" },
  "辰": { radical: "辰", strokes: 7, element: "土", meaning: "星辰" },
  "涵": { radical: "氵", strokes: 11, element: "水", meaning: "包容" },
  "博": { radical: "十", strokes: 12, element: "水", meaning: "博学" },
  "瑞": { radical: "王", strokes: 13, element: "金", meaning: "祥瑞" },
  "瑾": { radical: "王", strokes: 15, element: "火", meaning: "美玉" },
  "瑜": { radical: "王", strokes: 13, element: "金", meaning: "美玉" },
  "昊": { radical: "日", strokes: 8, element: "火", meaning: "广阔天空" },
  "俊": { radical: "亻", strokes: 9, element: "火", meaning: "英俊" },
  "仁": { radical: "亻", strokes: 4, element: "金", meaning: "仁爱" },
  "礼": { radical: "礻", strokes: 5, element: "火", meaning: "礼仪" },
  "智": { radical: "日", strokes: 12, element: "火", meaning: "智慧" },
  "信": { radical: "亻", strokes: 9, element: "金", meaning: "信用" },
  "雅": { radical: "隹", strokes: 12, element: "木", meaning: "优雅" },
  "乐": { radical: "丿", strokes: 5, element: "火", meaning: "快乐" },
  "成": { radical: "戈", strokes: 6, element: "金", meaning: "成功" },
  "思": { radical: "心", strokes: 9, element: "金", meaning: "思考" },
  "念": { radical: "心", strokes: 8, element: "火", meaning: "思念" },
  "晴": { radical: "日", strokes: 12, element: "火", meaning: "晴朗" },
  "朗": { radical: "月", strokes: 10, element: "火", meaning: "开朗" },
  "秀": { radical: "禾", strokes: 7, element: "金", meaning: "优秀" },
  "永": { radical: "水", strokes: 5, element: "土", meaning: "永远" },
  "天": { radical: "大", strokes: 4, element: "火", meaning: "天空" },
  "中": { radical: "丨", strokes: 4, element: "土", meaning: "中央" },
  "心": { radical: "心", strokes: 4, element: "火", meaning: "内心" },
};

// 五格吉凶判定（1-81数）
export const NUMBER_JIXIONG: Record<number, string> = {
  1: "大吉", 3: "大吉", 5: "大吉", 6: "大吉", 7: "大吉", 8: "大吉",
  11: "大吉", 13: "大吉", 15: "大吉", 16: "大吉", 17: "大吉", 18: "大吉",
  21: "大吉", 23: "大吉", 24: "大吉", 25: "大吉", 27: "大吉", 29: "大吉",
  31: "大吉", 32: "大吉", 33: "大吉", 35: "大吉", 37: "大吉", 39: "大吉",
  41: "大吉", 45: "大吉", 47: "大吉", 48: "大吉", 52: "大吉", 55: "大吉",
  57: "大吉", 58: "大吉", 61: "大吉", 63: "大吉", 65: "大吉", 67: "大吉",
  68: "大吉", 73: "大吉", 75: "大吉", 77: "大吉", 78: "大吉", 81: "大吉",
};

const ELEMENTS = ["金", "水", "木", "火", "土"];

export function elementRelation(e1: string, e2: string): string {
  if (e1 === e2) return "相同";
  const gen: Record<string, string> = { "金": "水", "水": "木", "木": "火", "火": "土", "土": "金" };
  const ke: Record<string, string> = { "金": "木", "木": "土", "土": "水", "水": "火", "火": "金" };
  if (gen[e1] === e2) return "相生";
  if (ke[e1] === e2) return "相克";
  return "—";
}

export interface CharAnalysis {
  char: string;
  radical: string;
  strokes: number;
  element: string;
  meaning: string;
}

export interface WugeResult {
  tiange: { num: number; jixiong: string };
  renge: { num: number; jixiong: string };
  dige: { num: number; jixiong: string };
  waige: { num: number; jixiong: string };
  zongge: { num: number; jixiong: string };
  sancai: { re: string; de: string; relation: string };
}

export function analyzeName(name: string): {
  chars: CharAnalysis[];
  wuge: WugeResult | null;
  success: boolean;
} {
  if (!name || name.length < 2) return { chars: [], wuge: null, success: false };

  const chars: CharAnalysis[] = [];
  for (const c of name) {
    const info = CHAR_DB[c];
    if (info) {
      chars.push({
        char: c,
        radical: info.radical,
        strokes: info.strokes,
        element: info.element,
        meaning: info.meaning,
      });
    } else {
      chars.push({
        char: c,
        radical: "—",
        strokes: 8,
        element: "土",
        meaning: `汉字「${c}」`,
      });
    }
  }

  if (chars.length < 2) return { chars, wuge: null, success: false };

  // 五格
  const sStrokes = chars[0].strokes;
  const gStrokes = chars.slice(1).map(c => c.strokes);
  const zongge = chars.reduce((s, c) => s + c.strokes, 0);
  const tiange = sStrokes + 1;
  const renge = sStrokes + (gStrokes[0] || 0);
  const dige = gStrokes.length >= 2 ? gStrokes[0] + gStrokes[1] : (gStrokes[0] || 0) + 1;
  const waige = zongge - renge + 1;

  const jx = (n: number) => NUMBER_JIXIONG[n % 81] || "—";
  const re = chars[0]?.element || "土";
  const de = chars[1]?.element || "土";

  const wuge: WugeResult = {
    tiange: { num: tiange, jixiong: jx(tiange) },
    renge: { num: renge, jixiong: jx(renge) },
    dige: { num: dige, jixiong: jx(dige) },
    waige: { num: waige, jixiong: jx(waige) },
    zongge: { num: zongge, jixiong: jx(zongge) },
    sancai: { re, de, relation: elementRelation(re, de) },
  };

  return { chars, wuge, success: true };
}
