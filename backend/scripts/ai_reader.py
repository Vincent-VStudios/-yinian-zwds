"""
ai_reader.py — 一念紫微斗数 AI解盘引擎
通过OpenClaw内置接口调用AI模型进行命盘解读

Author: 崽儿虾 🦞
"""

from typing import Optional, Dict, Any, List
from zwds_calc import (
    AstrolabeResult, generate_astrolabe, 
    astrolabe_to_json, format_astrolabe,
    compute_surrounded
)
from prompts import (
    SYSTEM_PROMPT_SANHE, SYSTEM_PROMPT_FEIXING,
    SYSTEM_PROMPT_ZHANYAN, SYSTEM_PROMPT_COMBINED,
    build_full_reading_prompt
)


def _school_system_prompt(school: str) -> str:
    """获取对应流派的系统提示词"""
    prompts = {
        "三合": SYSTEM_PROMPT_SANHE,
        "飞星": SYSTEM_PROMPT_FEIXING,
        "占验": SYSTEM_PROMPT_ZHANYAN,
        "综合": SYSTEM_PROMPT_COMBINED,
    }
    return prompts.get(school, SYSTEM_PROMPT_COMBINED)


def read_astrolabe(astro_data: AstrolabeResult, school: str = "综合") -> str:
    """
    使用AI解盘（通过OpenClaw内置能力）
    
    实际调用由OpenClaw的SKILL框架处理，本方法构造结构化数据
    供上层使用
    """
    if not astro_data:
        return ""

    data = astrolabe_to_json(astro_data)
    prompt = build_full_reading_prompt(data, school)

    return prompt


def create_chart_and_reading(
    date_str: str,
    hour: int,
    gender: str,
    is_lunar: bool = False,
    is_lunar_leap: bool = False,
    language: str = "zh-CN",
    school: str = "综合"
) -> Dict[str, Any]:
    """
    一站式：排盘 + 准备AI解读数据
    
    返回:
    {
        "success": bool,
        "chart_text": str,      # 格式化命盘文本
        "chart_json": dict,     # 命盘JSON数据
        "ai_prompt": str,       # AI解读提示词
        "error": str | None
    }
    """
    result = generate_astrolabe(
        date_str=date_str,
        hour=hour,
        gender=gender,
        is_lunar=is_lunar,
        is_lunar_leap=is_lunar_leap,
        language=language,
    )

    if not result:
        return {
            "success": False,
            "error": "排盘失败，请检查出生信息是否正确",
            "chart_text": "",
            "chart_json": {},
            "ai_prompt": "",
        }

    chart_text = format_astrolabe(result)
    chart_json = astrolabe_to_json(result)
    ai_prompt = read_astrolabe(result, school)

    # 三方四正
    if result.soul_index >= 0:
        sur = compute_surrounded(result.soul_index)
        chart_json["surrounding_palaces"] = [
            result.palaces[i].name_cn for i in sur
        ]

    return {
        "success": True,
        "error": None,
        "chart_text": chart_text,
        "chart_json": chart_json,
        "ai_prompt": ai_prompt,
        "school": school,
        "astrolabe_data": result,
    }


if __name__ == "__main__":
    # 测试
    data = create_chart_and_reading("2000-8-16", 6, "男")
    print(data["chart_text"])
    print("\n\n=== AI Prompt (截取前500字符) ===")
    print(data["ai_prompt"][:500])
    print(f"\n... (共{len(data['ai_prompt'])}字符)")
