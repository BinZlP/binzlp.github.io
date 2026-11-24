"""Build the public two-page resume with ReportLab.

Install the PDF and font tools, then regenerate the download:
    python -m pip install reportlab "fonttools[woff]"
    python scripts/generate-portfolio-resume.py

Only public resume copy belongs in this file. The default output is the static
download served by the portfolio. PDF timestamps/IDs are fixed for repeatable
builds; update UPDATED when the public copy changes.
"""

import argparse
from io import BytesIO
from pathlib import Path
from xml.sax.saxutils import escape, quoteattr

from fontTools.ttLib import TTFont as SourceFont
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "public" / "portfolio" / "hyungseok-han-resume.pdf"
NAME = "Hyungseok Han"
ROLE = "AI Infrastructure & Platform Engineer"
UPDATED = "November 2026"
PORTFOLIO = "https://binzlp.github.io/portfolio/"
EMAIL = "binzip.studio@gmail.com"
GITHUB = "https://github.com/BinZlP"
LINKEDIN = "https://www.linkedin.com/in/hyungseok-han-aba694196/"

INK = colors.HexColor("#0d0d0d")
MUTED = colors.HexColor("#4d4d4d")
ACCENT = colors.HexColor("#1d4ed8")
BORDER = colors.HexColor("#cfd5df")
MARGIN = 44
REGULAR = "Geist-Regular"
SEMIBOLD = "Geist-SemiBold"


def register_fonts():
    source = ROOT / "public" / "portfolio" / "fonts" / "geist-latin.woff2"
    with SourceFont(source, recalcTimestamp=False) as variable:
        for weight, name in [(400, REGULAR), (600, SEMIBOLD)]:
            instance = instantiateVariableFont(variable, {"wght": weight}, updateFontNames=True)
            instance.flavor = None
            stream = BytesIO()
            instance.save(stream)
            stream.seek(0)
            pdfmetrics.registerFont(TTFont(name, stream))


def style(name, size, leading, *, face=REGULAR, color=INK, **kwargs):
    return ParagraphStyle(name, fontName=face, fontSize=size, leading=leading,
                          textColor=color, **kwargs)


STYLES = {
    "name": style("name", 30, 34, face=SEMIBOLD, spaceAfter=3),
    "role": style("role", 13, 18, spaceAfter=5),
    "contact": style("contact", 9.2, 13, color=MUTED, spaceAfter=8),
    "summary": style("summary", 10, 14),
    "section": style("section", 13, 17, face=SEMIBOLD, color=ACCENT),
    "employer": style("employer", 16, 20, face=SEMIBOLD),
    "date": style("date", 9, 13, color=MUTED, alignment=TA_RIGHT),
    "job": style("job", 10.2, 14, face=SEMIBOLD, spaceAfter=3),
    "project": style("project", 10.5, 14, face=SEMIBOLD, spaceBefore=9, spaceAfter=2),
    "body": style("body", 9.9, 14.1),
    "bullet": style("bullet", 9.9, 14.1, leftIndent=12, bulletIndent=1,
                    bulletFontName=REGULAR, bulletFontSize=9, spaceAfter=2),
    "detail": style("detail", 9.4, 14, color=MUTED),
    "skill_label": style("skill label", 9.9, 14.1, face=SEMIBOLD),
}


def para(text, style="body"):
    return Paragraph(text, STYLES[style])


def link(url, label):
    return f'<link href={quoteattr(url)} color="#1d4ed8">{escape(label)}</link>'


def grid(rows, widths, **kwargs):
    return Table(rows, colWidths=widths, hAlign="LEFT", style=TableStyle([
        ("FONTNAME", (0, 0), (-1, -1), REGULAR),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]), **kwargs)


def section(title):
    label_width = pdfmetrics.stringWidth(title, SEMIBOLD, 13) + 12
    rule = HRFlowable(width="100%", thickness=0.6, color=BORDER, spaceBefore=0, spaceAfter=0)
    return grid([[para(title, "section"), rule]], [label_width, "*"],
                spaceBefore=16, spaceAfter=7)


def dated(title, dates, title_style, **kwargs):
    return grid([[para(title, title_style), para(dates, "date")]], ["*", 108], **kwargs)


def employer(company, title, dates):
    return [dated(company, dates, "employer"), para(title, "job")]


def project(title, points):
    bullets = [Paragraph(p, STYLES["bullet"], bulletText="•") for p in points]
    return KeepTogether([para(title, "project"), *bullets])


def footer(pdf_canvas, doc):
    width, _ = A4
    pdf_canvas.saveState()
    pdf_canvas.setStrokeColor(BORDER)
    pdf_canvas.setLineWidth(0.5)
    pdf_canvas.line(MARGIN, 40, width - MARGIN, 40)
    pdf_canvas.setFont(REGULAR, 8.2)
    pdf_canvas.setFillColor(MUTED)
    label = "binzlp.github.io/portfolio"
    pdf_canvas.drawString(MARGIN, 26, label)
    pdf_canvas.linkURL(PORTFOLIO, (MARGIN, 23, MARGIN + pdfmetrics.stringWidth(label, REGULAR, 8.2), 35))
    pdf_canvas.drawRightString(width - MARGIN, 26, f"{NAME}, {UPDATED}   |   {doc.page} / 2")
    pdf_canvas.restoreState()


def build(output):
    register_fonts()
    document = BytesIO()
    # SimpleDocTemplate's frame adds 6 pt of padding on all sides.
    doc = SimpleDocTemplate(
        document, pagesize=A4, leftMargin=MARGIN - 6, rightMargin=MARGIN - 6,
        topMargin=32, bottomMargin=47, title=f"{NAME} | {ROLE}",
        author=NAME, subject="Public professional resume",
        pageCompression=1, creator="ReportLab", invariant=1, initialFontName=REGULAR, lang="en-US",
    )
    story = [
        para(NAME, "name"), para(ROLE, "role"),
        para(" &nbsp; | &nbsp; ".join([
            link(f"mailto:{EMAIL}", EMAIL), link(GITHUB, "GitHub"),
            link(LINKEDIN, "LinkedIn"), link(PORTFOLIO, "Portfolio"),
        ]), "contact"),
        para("DevOps engineer specializing in cloud and on-premises infrastructure for LLM inference, "
             "developer platforms, and customer deployments. Background in distributed systems "
             "research, backend development, and production operations.", "summary"),
        section("Experience"),
        *employer("Nota AI", "DevOps Engineer", "Oct 2025 - Present"),
        para("Design and operate hybrid GPU infrastructure, internal AI platforms, and reusable "
             "deployment architectures for customers.", "body"),
        project("NetsPresso / Arm AI Model Optimizer", [
            "Designed Kubernetes deployments for AWS and on-premises customers. Separated CPU and "
            "GPU optimization jobs so each could scale independently to control GPU costs.",
            "Implemented cross-account delivery of container images and model assets on AWS. "
            "Coordinated two on-time customer deliveries, including Arm’s October 2026 early-access release.",
            "Automated SBOM and SCA reports in CI/CD for pre-release dependency reviews. "
            "Standardized validation and packaging within two days of code freeze.",
        ]),
        project("NetsPresso - hosted AWS migration and FTR", [
            "Redesigned and migrated the hosted service to a new AWS environment. "
            "The service passed the AWS Foundational Technical Review (FTR).",
        ]),
        project("GPU resource self-service platform", [
            "Built a FastAPI platform for self-service GPU provisioning on Proxmox. By November 2026, "
            "10+ teams were using it, with about 50 provisioning operations in the preceding month.",
            "Weekly time spent on host infrastructure requests in Jira and Slack fell from 40 "
            "engineer-hours before rollout to 8 in the latest measured week.",
        ]),
        project("Token Factory (LLM inference platform)", [
            "Built infrastructure to deploy and serve multiple LLMs. Compared serving designs by "
            "model size and architecture to reduce GPU cost per token and improve service margins.",
            "Co-developed a patch with the inference team that raised throughput from 93.3M to "
            "127.5M tokens/min in load tests. Integrated a fix for failures on client cancellation.",
        ]),
        project("EasyLLM - internal LLM gateway and serving platform", [
            "Built a Python/FastAPI platform for 70+ internal users with Kubernetes, MLflow, "
            "and LiteLLM. Automated model mirroring, vLLM/llama.cpp serving, and benchmarks.",
            "Unified commercial and open-weight model access with per-user budgets and "
            "isolated serving paths for restricted workloads.",
        ]),
        project("MCP-based internal app and document platform", [
            "Built and launched a FastAPI/MCP platform independently in October 2026. OpenFGA "
            "limits which apps an agent can call and which documents it can read on a user’s behalf.",
            "Ran text extraction and embedding generation inside the corporate network to keep "
            "sensitive document content in-house during indexing for hybrid search.",
        ]),
        PageBreak(),
        section("Experience"),
        *employer("goorm", "Infrastructure Engineer", "Feb 2023 - Oct 2025"),
        para("Designed and operated multi-region infrastructure for web IDEs and code judging, supporting "
             "thousands of concurrent code executions.", "body"),
        project("Reliability and developer productivity", [
            "Centralized logs from 10+ Kubernetes clusters in four regions. Used Kafka to decouple "
            "collection and processing from Elasticsearch and S3 storage.",
            "Cut average app build time by about 60% with Jenkins container builds and remote caching.",
            "Prototyped the Kubernetes architecture later adopted for code judging, with Kafka-based "
            "execution and replay plus storage failover.",
        ]),
        project("Sunrise - LLM-based infrastructure operations agent", [
            "Built a Python/AWS Bedrock agent with a Django interface. The team adopted it for "
            "natural-language operations across thousands of cloud resources.",
            "Modeled inspection, execution, and recovery as a state machine for AWS, Kubernetes, "
            "and Ansible agents. Scoped each operation to the user’s credentials.",
        ]),
        section("Research and speaking"),
        para("ScaleOPT: A Scalable Optimal Page Replacement Policy Simulator", "project"),
        para("First author, ACM SIGMETRICS 2025 &nbsp; | &nbsp; "
             + link("https://dl.acm.org/doi/10.1145/3700426", "Paper"), "detail"),
        para("Proposed a multicore-scalable simulator for optimal page replacement, connecting "
             "parallel data structures with systems performance evaluation.", "body"),
        para("Build with AI Seoul 2026 with Google DeepMind", "project"),
        para("Invited speaker, May 2026", "detail"),
        para("Presented the GPU self-service platform from five-day PoC to internal production, "
             "including design-document and testing practices for AI-assisted development.", "body"),
        section("Education"),
        dated("Seoul National University", "2021 - 2023", "job"),
        para("M.S., Computer Science and Engineering", "body"),
        para("Cache and distributed systems research, Distributed Computing Systems Lab", "detail"),
        dated("Kwangwoon University", "2017 - 2021", "job", spaceBefore=7),
        para("B.S., Software", "body"),
        section("Selected skills"),
        grid([[para(label, "skill_label"), para(values)] for label, values in [
            ("AI systems", "vLLM, llm-d, LMCache, LiteLLM, MLflow, MCP, retrieval systems"),
            ("Platforms", "Kubernetes, AWS, Proxmox/KVM, Terraform, Helm/Kustomize, Ansible"),
            ("Development", "Python, TypeScript/JavaScript, C/C++, FastAPI, Django, Next.js"),
            ("Operations", "Prometheus, Grafana, Loki, Elasticsearch, Kafka, Jenkins, GitOps"),
        ]], [82, "*"], minRowHeights=[19] * 4),
    ]
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    if doc.page != 2:
        raise RuntimeError(f"Expected a two-page public resume; produced {doc.page} pages.")
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_bytes(document.getvalue())
    print(output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    build(args.output)
