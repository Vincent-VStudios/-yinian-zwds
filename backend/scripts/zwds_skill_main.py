"""
zwds_skill_main.py — 一念紫微斗数 OpenClaw Skill 入口
Telegram Bot命令处理和AI解盘

Author: 崽儿虾 🦞
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from tg_bot_handler import (
    parse_birth_input, handle_zwds_command,
    handle_star_command, handle_help, handle_about,
)
from zwds_calc import generate_astrolabe, format_astrolabe, astrolabe_to_json
from ai_reader import create_chart_and_reading, read_astrolabe
from formats import (
    format_chart_for_telegram, format_reading_for_telegram,
    STAR_ENCYCLOPEDIA,
)


class YinianZWDS:
    """一念紫微斗数 Skill 主入口"""
    
    def __init__(self):
        self.last_chart = None  # 缓存最后一次排盘结果
    
    def process_message(self, text: str) -> str:
        """
        处理用户消息主入口
        由OpenClaw框架自动调用
        """
        if not text or not text.strip():
            return ""
        
        text = text.strip()
        
        # 命令路由
        cmd_map = {
            "/zwds_help": self._help,
            "/zwdshelp": self._help,
            "/help": self._help,
            "/zwds_about": self._about,
            "/zwdsabout": self._about,
            "/about": self._about,
            "/zwds_stars": self._stars,
            "/zwdsstars": self._stars,
            "/stars": self._stars,
            "/z": self._zwds,
            "/read": self._read,
            "/zwds_lunar": self._zwds,
            "/zwdslunar": self._zwds,
        }
        
        for cmd, handler in cmd_map.items():
            if text.startswith(cmd):
                if cmd in ("/zwds_lunar", "/zwdslunar"):
                    return handler(text, is_lunar=True)
                
                if cmd in ("/read",):
                    return handler()
                
                if cmd in ("/zwds_stars", "/zwdsstars", "/stars"):
                    # 提取星名参数
                    rest = text[len(cmd):].strip()
                    return handler(rest)
                
                return handler()
        
        # /zwds 命令或直接输入生辰
        if text.startswith("/zwds"):
            return self._zwds(text)
        
        # 自动检测：看起来像生辰输入
        import re
        if re.match(r'^\d{4}[-/]\d{1,2}[-/]\d{1,2}\s+\d{1,2}\s+[男女]', text):
            return self._zwds(text)
        
        return ""
    
    def _zwds(self, text: str, is_lunar: bool = False) -> str:
        """处理排盘请求"""
        parsed = parse_birth_input(text)
        if not parsed["success"]:
            return f"❌ {parsed['error']}\n\n试试 /zwds_help 查看使用说明"
        
        try:
            result = create_chart_and_reading(
                date_str=parsed["date"],
                hour=parsed["hour"],
                gender=parsed["gender"],
                is_lunar=parsed.get("is_lunar", is_lunar),
                school=parsed["school"],
            )
            
            if not result["success"]:
                return f"❌ 排盘失败：{result['error']}"
            
            # 缓存
            self.last_chart = result["chart_json"]
            
            # Telegram格式
            chart_tg = format_chart_for_telegram(result["chart_json"])
            
            return (
                f"{chart_tg}\n\n"
                f"💡 输入 /read 获取AI解盘"
            )
            
        except Exception as e:
            return f"❌ 处理异常：{str(e)}"
    
    def _read(self) -> str:
        """AI解盘"""
        if not self.last_chart:
            return "❌ 请先排盘（/zwds），再使用 /read 解盘"
        return read_astrolabe(self.last_chart)
    
    def _help(self) -> str:
        return handle_help()
    
    def _about(self) -> str:
        return handle_about()
    
    def _stars(self, star_name: str = "") -> str:
        return handle_star_command(star_name)


# ====== 全局实例（供OpenClaw加载）======

yinian_zwds = YinianZWDS()


def handle_user_input(text: str) -> str:
    """OpenClaw调用的入口函数"""
    return yinian_zwds.process_message(text)


if __name__ == "__main__":
    # 快速测试
    handler = YinianZWDS()
    tests = [
        "/zwds 2000-8-16 6 男",
        "/zwds_help",
        "/zwds_stars 紫微",
        "/read",
    ]
    for t in tests:
        print(f"\n{'='*50}")
        print(f">>> {t}")
        result = handler.process_message(t)
        print(result)
