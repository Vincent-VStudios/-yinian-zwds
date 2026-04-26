"""
tg_bot_handler.py — 一念紫微斗数 Telegram Bot 消息处理器
可以被OpenClaw的Telegram消息直接调用

Author: 崽儿虾 🦞
"""

import sys
import os
import re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from zwds_calc import generate_astrolabe, format_astrolabe, astrolabe_to_json
from ai_reader import create_chart_and_reading, read_astrolabe
from formats import (
    format_chart_for_telegram, build_tg_menu,
    get_star_info, STAR_ENCYCLOPEDIA
)


def parse_birth_input(text: str) -> dict:
    """
    解析用户输入的生辰信息
    
    支持格式:
    /zwds 2000-8-16 6 男
    /zwds 2000-8-16 6 男 综合
    /zwds 2000-8-16 6 男 三合
    /zwds_lunar 2000-7-17 6 男
    2000-8-16 6 男
    """
    text = text.strip()
    
    # 去掉命令前缀
    is_lunar = False
    for prefix in ["/zwds_lunar", "/zwdslunar", "zwds_lunar"]:
        if text.startswith(prefix):
            is_lunar = True
            text = text[len(prefix):].strip()
            break
    
    for prefix in ["/zwds ", "/zwds", "/z "] if not is_lunar else []:
        if text.startswith(prefix):
            text = text[len(prefix):].strip()
            break
    
    # 按空格分词
    parts = re.split(r'[\s,，]+', text)
    parts = [p for p in parts if p]
    
    if len(parts) < 3:
        return {"success": False, "error": "格式有误，请提供：日期 时辰 性别"}
    
    date_str = parts[0]
    hour_str = parts[1]
    gender = parts[2]
    school = "综合"
    if len(parts) >= 4 and parts[3] in ["三合", "飞星", "占验", "综合"]:
        school = parts[3]
    
    # 验证日期格式
    date_pattern = re.compile(r'^\d{4}[-/]\d{1,2}[-/]\d{1,2}$')
    if not date_pattern.match(date_str):
        return {"success": False, "error": "日期格式错误，请使用 YYYY-MM-DD 格式，如 2000-8-16"}
    
    # 验证时辰
    try:
        hour = int(hour_str)
        if hour < 0 or hour > 23:
            return {"success": False, "error": "时辰范围为 0-23"}
    except ValueError:
        return {"success": False, "error": f"时辰必须为数字 0-23，收到: {hour_str}"}
    
    # 验证性别
    if gender not in ["男", "女", "male", "female", "m", "f"]:
        return {"success": False, "error": f"性别请用 男/女，收到: {gender}"}
    
    gender_mapped = "男" if gender in ["男", "male", "m"] else "女"
    
    return {
        "success": True,
        "date": date_str.replace("/", "-"),
        "hour": hour,
        "gender": gender_mapped,
        "is_lunar": is_lunar,
        "school": school,
    }


def handle_zwds_command(text: str) -> str:
    """
    处理 /zwds 命令：排盘 + AI解读
    返回完整回复文本
    """
    parsed = parse_birth_input(text)
    if not parsed["success"]:
        return f"❌ {parsed['error']}\n\n试试 /zwds_help 查看使用说明"
    
    try:
        result = create_chart_and_reading(
            date_str=parsed["date"],
            hour=parsed["hour"],
            gender=parsed["gender"],
            is_lunar=parsed["is_lunar"],
            school=parsed["school"],
        )
        
        if not result["success"]:
            return f"❌ 排盘失败：{result['error']}"
        
        # Telegram格式输出
        chart_tg = format_chart_for_telegram(result["chart_json"])
        
        # 流派标注
        school_label = {
            "三合": "三合派",
            "飞星": "飞星派",
            "占验": "占验派",
            "综合": "三派合一",
        }.get(parsed["school"], "综合")
        
        output = (
            f"🔮 *一念紫微斗数 · {school_label}*\n"
            f"📅 {parsed['date']} 时{parsed['hour']} {parsed['gender']}\n"
            f"{'（农历' if parsed['is_lunar'] else ''}"
        )
        
        # 输出命盘（有字符上限）
        max_chars = 3800
        full_text = f"{chart_tg}\n\n💡 *提示*：回复「/read」获取AI解盘"
        
        if len(full_text) > max_chars:
            full_text = full_text[:max_chars] + "\n\n⋯ （命盘超出显示限制）"
        
        return full_text
        
    except Exception as e:
        return f"❌ 处理异常：{str(e)}"


def handle_read_command(chart_json: dict) -> str:
    """处理 /read 命令：用AI解盘"""
    if not chart_json or not chart_json.get("palaces"):
        return "❌ 请先排盘（/zwds），再使用 /read 解盘"
    
    prompt = read_astrolabe(chart_json)
    # 注：实际AI调用由OpenClaw框架处理
    # 这里返回结构化数据供框架读取
    return prompt


def handle_star_command(star_name: str) -> str:
    """处理 /star 命令：查询星曜"""
    if not star_name:
        stars = "、".join(list(STAR_ENCYCLOPEDIA.keys())[:7])
        stars += "\n" + "、".join(list(STAR_ENCYCLOPEDIA.keys())[7:])
        return f"⭐ *星曜百科*\n\n可查询：\n{stars}\n\n使用 /star 星名 查看详情"
    
    info = get_star_info(star_name)
    if info:
        return info
    return f"❌ 未找到星曜「{star_name}」"


def handle_help() -> str:
    """返回帮助文本"""
    return build_tg_menu()


def handle_about() -> str:
    """关于"""
    return (
        "🔮 *一念紫微斗数* v1.0\n\n"
        "三派合一的专业AI紫微斗数系统。\n\n"
        "**流派支持：**\n"
        "· 三合派（中州派体系）\n"
        "· 飞星派（钦天门体系）\n"
        "· 占验派（紫云体系）\n"
        "· 综合模式（三派融合）\n\n"
        "**功能：**\n"
        "· 紫微斗数排盘（准确率经过验证）\n"
        "· AI解盘（多视角深度分析）\n"
        "· 流年运势分析\n"
        "· 多语言支持（出海就绪）\n\n"
        "📜 *文化参考，理性看待*"
    )


if __name__ == "__main__":
    # 测试
    tests = [
        "/zwds 2000-8-16 6 男",
        "/zwds 2000-8-16 6 男 三合",
        "/zwds 2000-8-16 6 女 飞星",
        "/zwds_lunar 2000-7-17 6 男",
    ]
    for t in tests:
        print(f"\n{'='*50}")
        print(f"INPUT: {t}")
        print(f"PARSED: {parse_birth_input(t)}")
