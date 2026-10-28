# ⚙️ Plastic Gear Surface Defect Detection & Quality Control System

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![YOLO11m](https://img.shields.io/badge/YOLO11m-Ultralytics-FF6F00.svg)](https://github.com/ultralytics/ultralytics)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0%2B-EE4C2C.svg)](https://pytorch.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An intelligent, end-to-end computer vision and industrial quality inspection platform designed specifically for **injection-molded plastic gears**. 

This system integrates a **fine-tuned YOLO11m detector**, **Grad-CAM explainable AI (XAI)**, a domain-specific **Polymer Engineering Expert System**, and **multilingual audio narration (Sarvam AI)** into an interactive, glassmorphic React dashboard.

---

## 🌟 Key Features

- 🎯 **High-Precision Defect Detection**: Powered by a custom-trained **YOLO11m** model operating at **832×832** resolution for micro-defect localization on tooth profiles, rims, and hubs.
- 🔍 **Explainable AI (Grad-CAM)**: Generates PyTorch gradient-weighted class activation maps overlaying the heatmaps directly on detected defect areas for transparent decision-making.
- 🧠 **Polymer Expert System**: Instantaneous diagnostics for **16 industrial defect classes**, offering root causes, injection machine parameter adjustments (temperature, pressure, speed, cooling time), and tooling remedies.
- 🌐 **Multilingual Voice Assistance**: Integrated with **Sarvam AI** and browser speech synthesis for audio narration in multiple languages (English, Hindi, German, Spanish, and regional Indian languages).
- ⚙️ **Part Geometry & Centroid Validation**: Ensures correct part orientation and centering before deep inspection via `gear_centroid.pt`.
- ⚡ **Full-Stack Industrial Dashboard**: Modern, responsive UI built with React + Vite + Tailwind CSS featuring live camera feed, drag-and-drop workspace, interactive defect encyclopedia, and one-click export.

---

## 🔬 Supported Defect Classes (16 Categories)

| # | Defect Class | Description | Typical Root Cause | Recommended Corrective Action |
|---|--------------|-------------|--------------------|--------------------------------|
| 1 | **Broken** | Cracked or snapped gear tooth, rim, or hub | Demolded before fully cooling; excessive ejector pin force | Increase cooling time; reduce ejection speed & force |
| 2 | **Bulge** | Swollen or raised bump on gear face or wall | Soft core during ejection; trapped pressure | Increase cooling duration; reduce holding pressure |
| 3 | **Burn** | Dark brown or black charred discoloration | Compressed trapped air (diesel effect); melt overheated | Clean and open air vents; lower melt temperature |
| 4 | **Damage** | Scratches, gouges, cuts, or handling dents | Rough ejection; robot gripper misaligned; bin impact | Realign robot gripper; add soft foam lining to collection bins |
| 5 | **Darkspot** | Small embedded black or discolored speck | Degraded polymer in nozzle barrel; dirty resin pellets | Purge machine barrel; verify virgin pellet cleanliness |
| 6 | **Dirt** | Foreign dust particles or oily grease marks | Mold cavity contamination; leaking ejector lubricant | Clean mold cavity; wipe grease from sliding ejector pins |
| 7 | **Flash** | Thin excess plastic web along parting line | Excessive injection pressure; worn parting line clamping | Increase clamp tonnage; reduce injection & pack pressure |
| 8 | **Flow** | Wavy ripples or flow lines along surface | Polymer melt chilled prematurely; injection rate too slow | Increase mold and melt temperature; boost injection speed |
| 9 | **Hair** | Fine stringing fibers or plastic threads | Nozzle drool upon mold opening | Lower nozzle tip temp; increase screw decompression suck-back |
| 10 | **Missing** | Incomplete tooth or broken mold feature | Insufficient shot volume; sheared mold core pin | Increase shot size; inspect tool inserts for broken teeth |
| 11 | **Overflow** | Substantial excess melt blown past boundary | Over-packing cavity; incorrect switchover point | Reduce shot size and holding pressure; verify clamp closure |
| 12 | **Perforation** | Unintended hole or wall puncture | Trapped air pockets; worn core pin puncture | Pre-dry raw material; refine venting; adjust fill speed |
| 13 | **Reverse** | Inverted orientation or backwards insert | Incorrect manual or robotic placement | Implement mechanical keying/poka-yoke; check feed tracks |
| 14 | **Shortshot** | Incomplete fill; unfilled teeth or rim | Cold melt; insufficient injection pressure or speed | Increase injection pressure, fill rate, and barrel temperature |
| 15 | **Void** | Internal vacuum bubbles or sink depressions | Low pack pressure during thick wall crystallization | Increase hold pressure and duration; optimize gate size |
| 16 | **White** | White stress blanching or ejector push marks | Extreme ejector friction against undercuts or draft angles | Increase mold draft angle; polish sidewalls; optimize cooling |

---

## 🏗️ Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────┐
│                   Vite + React UI                      │
│   (Upload Workspace • Grad-CAM Viewer • Voice Guide)   │
└───────────────────────────▲────────────────────────────┘
                            │ REST / Multipart HTTP
┌───────────────────────────▼────────────────────────────┐
│                  FastAPI Backend                       │
│  ┌───────────────────────┐   ┌──────────────────────┐  │
│  │ YOLO11m (832x832)     │   │ Grad-CAM Heatmaps    │  │
│  └───────────────────────┘   └──────────────────────┘  │
│  ┌───────────────────────┐   ┌──────────────────────┐  │
│  │ Polymer Expert System │   │ Sarvam AI / TTS      │  │
│  └───────────────────────┘   └──────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

- **Backend**: Python 3.9+, FastAPI, Ultralytics YOLO11, PyTorch, OpenCV, NumPy, Uvicorn
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, HTML5 Web Audio API
- **AI Models**:
  - `models/yolo11m_targeted_best.pt` — Custom YOLO11m weights trained on gear defect dataset
  - `models/gear_centroid.pt` — Part alignment and centroid localization
- **Services**: Sarvam AI API (neural translation & regional TTS)

---

## 📁 Repository Structure

```
.
├── MDM plastic_defect_dashboard/
│   ├── backend/
│   │   ├── main.py                     # FastAPI application & /analyze endpoints
│   │   ├── expert_system.py            # Polymer engineering diagnostic rules
│   │   ├── gradcam.py                  # PyTorch Grad-CAM hook generator
│   │   ├── part_validator.py           # Centroid and boundary validation
│   │   ├── sarvam_service.py           # Multilingual translation & TTS service
│   │   ├── requirements.txt            # Python dependencies
│   │   ├── start_server.bat            # Backend launch script
│   │   ├── outputs/                    # Processed inspection & heatmap artifacts
│   │   └── uploads/                    # Temporary upload staging area
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/             # UI Components (Analysis, Grad-CAM, Expert advice)
│   │   │   ├── constants/              # Defect metadata, translations, knowledgebase
│   │   │   ├── context/                # Language context provider
│   │   │   └── utils/                  # Speech narrator and client utilities
│   │   ├── package.json                # Frontend dependencies
│   │   ├── tailwind.config.js          # Tailwind CSS configuration
│   │   └── vite.config.js              # Vite configuration
│   ├── models/
│   │   ├── yolo11m_targeted_best.pt    # YOLO11m defect detection weights
│   │   └── gear_centroid.pt            # Centroid locator weights
│   └── run_dashboard.bat               # Dashboard startup script
├── run_dashboard.bat                   # Root one-click launcher
├── .gitignore                          # Version control exclusions
└── README.md                           # Project documentation
```

---

## 🚀 Quick Start

### Option A — One-Click Launch (Windows)
Double-click `run_dashboard.bat` in the root folder. This automatically:
1. Starts the FastAPI backend at `http://127.0.0.1:8000`
2. Starts the Vite React dashboard at `http://localhost:5173`
3. Launches your default web browser to the dashboard

---

### Option B — Manual Setup

#### 1. Backend Setup
```bash
# Navigate to backend directory
cd "MDM plastic_defect_dashboard/backend"

# (Optional) Create and activate virtual environment
python -m venv venv
venv\Scripts\activate   # Linux/macOS: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
*Backend API docs will be live at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)*

#### 2. Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd "MDM plastic_defect_dashboard/frontend"

# Install Node modules
npm install

# Start Vite development server
npm run dev
```
*Frontend interface will be available at: [http://localhost:5173](http://localhost:5173)*

---

## 📡 API Reference

### `POST /analyze`
Uploads an image for defect detection, Grad-CAM computation, and expert diagnostic evaluation.

- **Content-Type**: `multipart/form-data`
- **Form Field**: `file` (JPEG or PNG image)

#### Example Response:
```json
{
  "status": "success",
  "filename": "gear_sample.jpg",
  "model": "YOLO11m",
  "total_detections": 1,
  "main_defect": "darkspot",
  "main_confidence": 0.9614,
  "main_possible_cause": "Burnt plastic residue stuck in the machine nozzle...",
  "main_suggested_action": "Clean and purge the machine barrel, wipe nozzle tip...",
  "detections": [
    {
      "defect": "darkspot",
      "confidence": 0.9614,
      "box": [210, 185, 275, 240],
      "possible_cause": "Burnt plastic residue stuck in machine nozzle...",
      "suggested_action": "Clean and purge machine barrel..."
    }
  ],
  "detection_image": "detection_1790255613_b74d3d.jpg",
  "gradcam_generated": true,
  "gradcam_filename": "gradcam_1790255613_b74d3d.jpg"
}
```

### `GET /outputs/{filename}`
Retrieves annotated bounding box images or Grad-CAM heatmaps generated during analysis.

### `GET /health`
Returns system health, GPU/CPU availability, and model loaded status.

---

## 🔒 Configuration & Environment Variables

Copy `.env.example` in `MDM plastic_defect_dashboard/backend/` to `.env`:

```env
# Optional: Sarvam AI API Key for enhanced neural Indian language TTS
SARVAM_API_KEY=your_sarvam_api_key_here

# Inference Configuration
CONFIDENCE_THRESHOLD=0.25
IOU_THRESHOLD=0.45
INFERENCE_SIZE=832
```

---

## 👥 Authors & Acknowledgments

- **Latish Charpe** ([@latish-charpe](https://github.com/latish-charpe))
- Built with [Ultralytics YOLO](https://github.com/ultralytics/ultralytics), [FastAPI](https://fastapi.tiangolo.com/), and [React](https://react.dev/).
