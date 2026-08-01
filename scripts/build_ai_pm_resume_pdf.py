from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "谢文炳_AI项目经理_优化简历.pdf"

FONT_REGULAR = r"C:\Windows\Fonts\msyh.ttc"
FONT_BOLD = r"C:\Windows\Fonts\msyhbd.ttc"

INK = colors.HexColor("#1C2028")
MUTED = colors.HexColor("#666D7A")
ACCENT = colors.HexColor("#4069EE")
SOFT = colors.HexColor("#EEF3FF")


def register_fonts():
    pdfmetrics.registerFont(TTFont("MSYH", FONT_REGULAR))
    pdfmetrics.registerFont(TTFont("MSYH-Bold", FONT_BOLD))
    pdfmetrics.registerFontFamily("MSYH", normal="MSYH", bold="MSYH-Bold")


def bullet(prefix, body, style):
    return Paragraph(f'<font color="#4069EE">●</font> <b>{prefix}</b>{body}', style)


def role(title, meta, style):
    return Paragraph(f"<b>{title}</b><font color=\"#8A909C\">  |  {meta}</font>", style)


def section_block(title, items, heading_style):
    return [Paragraph(title, heading_style), *items]


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("MSYH", 7.2)
    canvas.setFillColor(colors.HexColor("#9A9FA8"))
    canvas.drawCentredString(A4[0] / 2, 7.5 * mm, "谢文炳 · AI 项目经理求职简历 · 2026")
    canvas.restoreState()


def build_pdf():
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=14.5 * mm,
        rightMargin=14.5 * mm,
        topMargin=12.5 * mm,
        bottomMargin=13.5 * mm,
        title="谢文炳 - AI项目经理求职简历",
        author="谢文炳",
        subject="AI项目经理 / AI内容项目经理",
    )

    name_style = ParagraphStyle(
        "Name",
        fontName="MSYH-Bold",
        fontSize=24,
        leading=27,
        textColor=INK,
        spaceAfter=1,
    )
    target_style = ParagraphStyle(
        "Target",
        fontName="MSYH-Bold",
        fontSize=10.8,
        leading=14,
        textColor=ACCENT,
        spaceAfter=2,
    )
    contact_style = ParagraphStyle(
        "Contact",
        fontName="MSYH",
        fontSize=8.8,
        leading=12,
        textColor=MUTED,
        spaceAfter=5,
    )
    heading_style = ParagraphStyle(
        "Heading",
        fontName="MSYH-Bold",
        fontSize=10.9,
        leading=14,
        textColor=ACCENT,
        spaceBefore=4.8,
        spaceAfter=2.6,
        keepWithNext=True,
    )
    body_style = ParagraphStyle(
        "Body",
        fontName="MSYH",
        fontSize=8.7,
        leading=12.3,
        textColor=INK,
        alignment=TA_LEFT,
        wordWrap="CJK",
    )
    role_style = ParagraphStyle(
        "Role",
        parent=body_style,
        fontSize=9.5,
        leading=13,
        spaceBefore=0.5,
        spaceAfter=2.2,
        keepWithNext=True,
    )
    bullet_style = ParagraphStyle(
        "Bullet",
        parent=body_style,
        leftIndent=4.5 * mm,
        firstLineIndent=-3.0 * mm,
        spaceAfter=1.7,
    )
    summary_style = ParagraphStyle(
        "Summary",
        parent=body_style,
        fontSize=8.9,
        leading=13.2,
        textColor=INK,
    )

    story = [
        Paragraph("谢文炳", name_style),
        Paragraph("AI 项目经理 / AI 内容项目经理（初级）", target_style),
        Paragraph("长沙  |  +86 181 5546 6798  |  wuzibx@foxmail.com", contact_style),
    ]

    story.append(Paragraph("职业概述", heading_style))
    summary = Paragraph(
        "工商管理本科，具备 AI 内容项目从 0 到 1 的独立执行经验。围绕 AI 短剧账号完成定位与选题、脚本拆解、生成式制作、发布运营和数据复盘，能够将模糊目标拆解为任务与交付物，并协调工具与内容流程推进交付。熟悉 ComfyUI、即梦、剪映、Photoshop 及抖音 / 小红书运营，希望从 AI 内容项目和 AI 应用项目切入项目管理岗位。",
        summary_style,
    )
    summary_box = Table([[summary]], colWidths=[doc.width], hAlign="LEFT")
    summary_box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                ("BOX", (0, 0), (-1, -1), 0, SOFT),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    story.extend([summary_box, Spacer(1, 1.5)])

    project_items = [
        role("AI 短剧账号 0-1 搭建与运营", "个人项目", role_style),
        bullet("项目规划：", "围绕账号定位、目标平台与内容方向拆解制作链路，建立“选题 - 脚本 - 出图 - 视频 - 剪辑 - 发布 - 复盘”的端到端流程。", bullet_style),
        bullet("AI 工作流：", "本地部署 ComfyUI，通过节点搭建文生图、图生视频工作流，并结合即梦等 AI 视频工具完成素材生产，提升内容制作效率。", bullet_style),
        bullet("交付推进：", "制定内容排期与素材清单，按节点推进脚本、画面、剪辑和发布，沉淀可复用的制作流程与模板。", bullet_style),
        bullet("数据迭代：", "围绕播放量、互动率等指标复盘选题、叙事节奏和视觉表现，持续优化内容策略。", bullet_style),
    ]
    story.extend(section_block("AI 项目实践", project_items, heading_style))

    campus_items = [
        role("学生会 · 大二实习干事", "2024.01 - 2025.07", role_style),
        bullet("活动执行：", "参与校园活动策划与落地，协助拆解任务、准备物料、跟进现场流程与协同事项，保障活动按计划完成。", bullet_style),
    ]
    story.extend(section_block("校园与组织经历", campus_items, heading_style))

    education_items = [
        role("湖南涉外经济学院 · 工商管理 · 本科", "预计 2026.06 毕业", role_style),
        bullet("竞赛经历：", "ERP 沙盘模拟大赛（2025.06），参与经营决策、资源配置与团队协作模拟。", bullet_style),
    ]
    story.extend(section_block("教育背景与竞赛", education_items, heading_style))

    skill_items = [
        bullet("项目管理：", "需求拆解、WBS 任务排期、里程碑跟踪、风险 / 问题清单、项目复盘；可编写基础 PRD、项目计划和周报。", bullet_style),
        bullet("AI 与内容：", "ComfyUI 本地部署与节点工作流、即梦、Prompt 设计、文生图 / 图生视频、AI 短剧脚本与全流程制作。", bullet_style),
        bullet("工具与平台：", "剪映、Photoshop、WPS / Office（Word、Excel、PPT）、飞书文档与多维表格基础；熟悉抖音、小红书内容运营。", bullet_style),
    ]
    story.extend(section_block("专业技能", skill_items, heading_style))

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUTPUT)


if __name__ == "__main__":
    build_pdf()
