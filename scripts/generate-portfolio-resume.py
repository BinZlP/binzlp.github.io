"""Build the public two-page resume with ReportLab.

Run with a Python environment that already provides reportlab:
    python scripts/generate-portfolio-resume.py

Only public resume copy belongs in this file. The default output is the static
download served by the portfolio. PDF timestamps/IDs are fixed for repeatable
builds; update UPDATED when the public copy changes.
"""

from functools import partial
from pathlib import Path
import argparse
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "public" / "portfolio" / "hyungseok-han-resume.pdf"
NAME = "Hyungseok Han"
ROLE = "AI Infrastructure & Platform Engineer"
UPDATED = "November 2026"
PORTFOLIO = "https://binzlp.github.io/portfolio/"
EMAIL = "dfafqfdaes159@gmail.com"
GITHUB = "https://github.com/BinZlP"
LINKEDIN = "https://www.linkedin.com/in/hyungseok-han-aba694196/"

INK = colors.HexColor("#161b22")
MUTED = colors.HexColor("#52615c")
GREEN = colors.HexColor("#047857")
BORDER = colors.HexColor("#dce7e1")

STYLES = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=30,
                           leading=34, textColor=INK, spaceAfter=5),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=12.4,
                           leading=17, textColor=GREEN, spaceAfter=9),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=9.1,
                              leading=13.3, textColor=MUTED, spaceAfter=8),
    "summary": ParagraphStyle("summary", fontName="Helvetica", fontSize=10.4,
                              leading=15.0, textColor=INK, spaceAfter=13),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=9.8,
                              leading=13, textColor=GREEN, spaceBefore=10,
                              spaceAfter=7),
    "employer": ParagraphStyle("employer", fontName="Helvetica-Bold", fontSize=12.4,
                               leading=16, textColor=INK),
    "date": ParagraphStyle("date", fontName="Helvetica", fontSize=9,
                           leading=13, textColor=MUTED),
    "job": ParagraphStyle("job", fontName="Helvetica", fontSize=10,
                          leading=14.2, textColor=MUTED, spaceAfter=6),
    "project": ParagraphStyle("project", fontName="Helvetica-Bold", fontSize=10.2,
                              leading=14, textColor=INK, spaceBefore=7,
                              spaceAfter=4),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.7,
                           leading=13.8, textColor=INK, spaceAfter=4,
                           alignment=TA_LEFT),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.7,
                             leading=13.8, textColor=INK, leftIndent=10,
                             firstLineIndent=-10, spaceAfter=4),
    "small": ParagraphStyle("small", fontName="Helvetica", fontSize=9.2,
                            leading=13.2, textColor=MUTED, spaceAfter=5),
}


def para(text, style="body"):
    return Paragraph(text, STYLES[style])


def link(url, label):
    return f'<link href="{escape(url, {chr(34): "&quot;"})}" color="#047857">{escape(label)}</link>'


def bullet(text):
    return para("- " + text, "bullet")


def section(title):
    return [para(title.upper(), "section"),
            HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=8)]


def employer(company, title, dates):
    heading = Table([[para(company, "employer"), para(dates, "date")]],
                    colWidths=[342, 145])
    heading.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return [heading, para(title, "job")]


def project(title, points):
    return KeepTogether([para(title, "project"), *[bullet(p) for p in points]])


def footer(pdf_canvas, doc):
    width, _ = A4
    pdf_canvas.saveState()
    pdf_canvas.setStrokeColor(BORDER)
    pdf_canvas.setLineWidth(0.5)
    pdf_canvas.line(54, 42, width - 54, 42)
    pdf_canvas.setFont("Helvetica", 8)
    pdf_canvas.setFillColor(MUTED)
    pdf_canvas.drawString(54, 28, f"{NAME}  |  {UPDATED}")
    label = f"binzlp.github.io/portfolio  |  {doc.page} / 2"
    pdf_canvas.drawRightString(width - 54, 28, label)
    pdf_canvas.linkURL(PORTFOLIO, (width - 229, 25, width - 54, 37), relative=0)
    pdf_canvas.restoreState()


def build(output):
    output.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(output), pagesize=A4, leftMargin=48, rightMargin=48,
        topMargin=42, bottomMargin=57, title=f"{NAME} | {ROLE}",
        author=NAME, subject="Public professional resume",
        pageCompression=1, creator="ReportLab", invariant=1,
    )
    story = [
        para(NAME, "name"), para(ROLE, "role"),
        para(" &nbsp; | &nbsp; ".join([
            link(f"mailto:{EMAIL}", EMAIL), link(GITHUB, "GitHub"),
            link(LINKEDIN, "LinkedIn"), link(PORTFOLIO, "Portfolio"),
        ]), "contact"),
        para("I build AI infrastructure and developer platforms across cloud and on-premises "
             "environments. My work connects distributed-systems research with hands-on backend "
             "development, LLM inference, customer delivery, and production operations.", "summary"),
        *section("Experience"),
        *employer("Nota AI", "DevOps Engineer", "Oct 2025 - Present"),
        para("Design and operate hybrid GPU infrastructure, reusable customer deployment "
             "architectures, and internal platforms for AI workloads.", "body"),
        project("NetsPresso / Arm AI Model Optimizer", [
            "Designed and built Kubernetes service and deployment architecture for AWS and "
            "on-premises customers, standardizing Terraform and Helm/Kustomize configurations.",
            "Coordinated requirements, acceptance criteria, and two parallel customer deliveries; "
            "enabled final validation and packaging within two days after code freeze. The "
            "delivered system entered production as an early-access service in October 2026.",
            "Built customer observability and proposed trace-ID logging adopted by developers; "
            "support post-launch security response and operational stabilization.",
        ]),
        project("GPU resource self-service platform", [
            "Built a FastAPI/Next.js control plane for Proxmox GPU instance lifecycle, team quotas, "
            "and resource visibility; took a five-day PoC to internal production in approximately one month.",
            "Automated routine infrastructure support, recording three consecutive weeks without "
            "system-level support requests, excluding physical hardware failures.",
        ]),
        project("LLM inference platform and KV-cache optimization", [
            "Built inference platform foundations and evaluated KV-aware routing policies against "
            "model support and measured behavior; selected llm-d with approx-affinity routing.",
            "Contributed to LMCache offloading bottleneck analysis, performance patches, and "
            "request-cancellation crash investigation alongside other engineers.",
        ]),
        project("EasyLLM - internal LLM gateway and serving platform", [
            "Built a Python/FastAPI platform with Kubernetes, MLflow, and LiteLLM used by 70+ "
            "internal users; automated model mirroring, vLLM/llama.cpp serving, and benchmarks.",
            "Unified commercial and open-weight model access with per-user budgets and "
            "isolated serving paths for restricted workloads.",
        ]),
        PageBreak(),
        *section("Experience continued"),
        project("MCP-based internal app and document platform | Nota AI", [
            "Independently built and deployed a platform in October 2026 for permission-aware "
            "app discovery and document search by coding agents, using FastAPI, MCP, OpenFGA, "
            "and self-hosted hybrid retrieval.",
        ]),
        Spacer(1, 7),
        *employer("goorm", "Infrastructure Engineer", "Feb 2023 - Oct 2025"),
        para("Designed and operated multi-region production infrastructure for web IDE and "
             "code-judging platforms supporting thousands of concurrent code executions.", "body"),
        project("Reliability and developer productivity", [
            "Built centralized logging across 10+ Kubernetes clusters in four regions, using "
            "Kafka to decouple collection, processing, and Elasticsearch/S3 storage.",
            "Redesigned container build and remote-cache workflows in Jenkins, reducing "
            "application build time by approximately 60% on average.",
            "Prototyped a Kubernetes code-judging architecture with Kafka-based execution/replay "
            "and storage failover; the architecture was later incorporated into the product.",
        ]),
        project("Sunrise - LLM-based infrastructure operations agent", [
            "Built a Python/AWS Bedrock agent with a Django interface for natural-language "
            "operations across thousands of cloud resources; adopted as a team support tool.",
            "Modeled inspection, execution, and error recovery as a state machine with AWS, "
            "Kubernetes, and Ansible domain agents; constrained execution to user credentials.",
        ]),
        *section("Research and speaking"),
        para("<b>ScaleOPT: A Scalable Optimal Page Replacement Policy Simulator</b>", "body"),
        para("First author | ACM SIGMETRICS 2025 | "
             + link("https://dl.acm.org/doi/10.1145/3700426", "Paper"), "small"),
        para("Proposed a multicore-scalable simulator for optimal page replacement, connecting "
             "parallel data structures with systems performance evaluation.", "body"),
        para("<b>Build with AI Seoul 2026 with Google DeepMind</b> | Invited speaker, May 2026", "body"),
        para("Presented the GPU self-service platform from five-day PoC to internal production, "
             "including design-document and testing practices for AI-assisted development.", "body"),
        *section("Education"),
        para("<b>Seoul National University</b> | M.S., Computer Science and Engineering | 2021 - 2023", "body"),
        para("Distributed Computing Systems Lab; cache and distributed systems research.", "small"),
        para("<b>Kwangwoon University</b> | B.S., Software | 2017 - 2021", "body"),
        *section("Selected skills"),
        para("<b>AI systems:</b> vLLM, llm-d, LMCache, LiteLLM, MLflow, MCP, retrieval systems", "body"),
        para("<b>Platforms:</b> Kubernetes, AWS, Proxmox/KVM, Terraform, Helm/Kustomize, Ansible", "body"),
        para("<b>Development:</b> Python, TypeScript/JavaScript, C/C++, FastAPI, Django, Next.js", "body"),
        para("<b>Operations:</b> Prometheus, Grafana, Loki, Elasticsearch, Kafka, Jenkins, GitOps", "body"),
    ]
    doc.build(story, onFirstPage=footer, onLaterPages=footer,
              canvasmaker=partial(canvas.Canvas, invariant=1))
    if doc.page != 2:
        raise RuntimeError(f"Expected a two-page public resume; produced {doc.page} pages.")
    print(output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    build(args.output)
