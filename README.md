# 🌾 Kisan Pilot AI (किसान पायलट)
### *Safe Harvest. Smart Farming. Self-Reliant Kisan.*

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![WDRA Certified Network](https://img.shields.io/badge/Storage-WDRA%20Compliant-16a34a?style=flat)]()
[![Multilingual](https://img.shields.io/badge/Languages-EN%20%7C%20HI%20%7C%20MR-orange?style=flat)]()

**Kisan Pilot AI** is an all-in-one agricultural technology and rural commerce ecosystem built specifically for Indian farmers. It unites AI crop advisory, voice-first farm accounting, an agricultural shopping marketplace with 90-minute fast delivery, farm vehicle & machinery rental, and a nationwide network of WDRA-certified cold and ambient storage centers with live IoT telemetry.

---

## 🚀 Key Modules & Features

### 1. 🌾 Core AI Farm Intelligence & Advisory
* **📷 AI Crop Doctor**: Instant disease diagnosis from leaf photographs with organic and chemical treatment recommendations.
* **🎙️ Voice Khata (आवाज खाता)**: Hands-free voice ledger allowing farmers to speak in **Hindi** or **Marathi** to record agricultural expenses, sales, and credit.
* **🌦️ Hyper-Local Weather & Risk Radar**: 7-day predictive micro-climate forecasts with rainfall and pest vulnerability alerts.
* **🏪 Mandi Bajar Bhav**: Real-time mandi rates across APMC markets with historical crop price trends.
* **🏛️ PMFBY & Govt Schemes**: Direct access to Pradhan Mantri Fasal Bima Yojana guidelines, subsidies, and claim assistance.

---

### 2. 🛒 Krishi Shop & Marketplace
* **Wide Product Catalog**: Certified hybrid seeds, fertilizers (Nano Urea, DAP), bio-pesticides, irrigation tools, and farm essentials.
* **Dual Delivery System**:
  * ⚡ **Fast Delivery**: 90-minute hyper-local delivery from nearby agricultural stores.
  * 📦 **Normal Delivery**: Standard delivery at discounted freight charges.
* **Farmer-Friendly Checkout**: Cash on Delivery (COD), UPI, and net banking support with transparent breakdown and delivery estimates.

---

### 3. 🚜 Travel & Vehicle Rental (Farm Machinery Sharing)
Designed for farmers who need vehicles when their own equipment is unavailable, under maintenance, or during peak harvest:
* **Strictly 6 Dedicated Agricultural Equipment Categories**:
  1. 🚜 **Tractors** (Mahindra 575 DI, John Deere 5050 D 4WD)
  2. 🚛 **Lorries / Lowries** (Tata 1109 8-Ton, Eicher Pro 14ft Mandi Carrier)
  3. 🚜 **Trailers / Trolleys** (4-Wheel Double Hydraulic Tipping, 2-Wheel Single Axle)
  4. ⚙️ **Tractor Machines** (Shaktiman Rotavators, Multi-Crop Power Threshers)
  5. 🚁 **Fertilizer Spraying Drones** (Garuda 16L & IoTechWorld 10L with certified pilot)
  6. 💧 **Water Sprinklers** (50m High-Pressure Rain-Gun Systems, Mobile Diesel Pump Sets)
* **Flexible Durations**: Daily Rental, Monthly Rental, and Yearly Rental with instant cost estimates and confirmed Booking IDs.
* **Authentic Equipment Photos**: Dedicated photorealistic photography representing real Indian farm machinery.

---

### 4. 🏢 Safe Storage & Cold Chain (WDRA Network)
Connecting farmers to certified agricultural storage centers across India to reduce post-harvest losses:
* **Interactive India Locator**: Comprehensive state and district directory (Maharashtra, MP, Punjab, Gujarat, UP, and expanding).
* **Interactive Radar Map**: Visual map with real GPS coordinates, distance calculation from farmer's location, and Google Maps turn-by-turn navigation.
* **❄️ Cold Storage vs. 🌾 Warm Ambient Godowns**:
  * *Cold Storage*: Temperature-controlled chambers (0°C to 8°C, 85-95% RH) for grapes, potatoes, pomegranates, and perishables.
  * *Warm / Ambient Storage*: Scientifically ventilated, moisture-dunnaged godowns for onions, wheat, pulses, and soybean.
* **📡 Live IoT Telemetry**: Real-time chamber temperature (°C) and humidity (%) sensors with status alerts (*Optimal* / *Warning*).
* **Agronomist Crop Storage Guidance**: Agricultural science parameters for maximum storage life and prevention of sprouting/rot.
* **📄 Electronic Warehouse Receipts (e-NWR)**: Official printable booking slip with QR code verification and bank loan eligibility.
* **👨‍💼 Operator & Admin Portal**: Warehouse managers can manage chamber capacity, approve intake requests, and monitor IoT nodes.

---

### 5. 🌐 Multilingual & Farmer-First Accessibility
* Instant switching between **English**, **हिंदी (Hindi)**, and **मराठी (Marathi)**.
* High-contrast legible typography, simple agricultural icons, and touch-friendly controls.
* Road accessibility metrics for each center (distance from highway, entry road width, and 50–80 MT weighbridge capacity).

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 16 (Turbopack), React 19, TypeScript
* **Styling**: Tailwind CSS v4, Lucide React Icons, Framer Motion
* **Database & ORM**: Prisma, PostgreSQL (Supabase ready)
* **State & Architecture**: Context API, LocalStorage persistence, clean modular screens

---

## 📦 Getting Started

### Prerequisites
* Node.js 18+ or Node.js 20+
* npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rutvekladhi0-dot/kisanpilot-ai.git
   cd kisanpilot-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   *(Update your database credentials in `.env`)*

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 📂 Project Architecture

```
kisanpilot-ai/
├── public/
│   ├── images/
│   │   ├── rentals/      # Real authentic photos for 6 vehicle categories
│   │   ├── storage/      # Cold storage, grain warehouse & facility photos
│   │   └── ...           # Agricultural logos & icons
├── src/
│   ├── app/              # Next.js App Router (page.tsx, layout.tsx, globals.css)
│   ├── components/
│   │   ├── kisanpilot/
│   │   │   ├── KisanPilotApp.tsx      # Main application hub & router
│   │   │   └── screens/
│   │   │       ├── StorageCenterScreen.tsx   # WDRA Storage & IoT Radar
│   │   │       ├── VehicleRentalScreen.tsx   # Machinery & Vehicle Rental
│   │   │       ├── VoiceKhataScreen.tsx      # Voice-first ledger
│   │   │       ├── CropDoctorScreen.tsx      # AI plant diagnosis
│   │   │       └── ...
│   │   └── shop/                      # Krishi Shopping & Checkout components
│   ├── data/
│   │   ├── storageCenterData.ts       # Verified warehouse records & crop science
│   │   ├── indiaDistricts.ts          # All-India state & district directory
│   │   └── vehicleRentalData.ts       # Vehicle specifications & rental rates
│   ├── types/                         # TypeScript interfaces
│   └── lib/                           # Multilingual i18n & utilities
├── .env.example                       # Safe environment variables template
└── README.md
```

---

## 🤝 Contributing & License
Contributions, feedback, and issues are warmly welcomed!
Built with ❤️ for Indian farmers.
