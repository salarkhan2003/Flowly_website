# 📱 Flowly — On-Device Private Brain for Android

<p align="center">
  <img src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80" alt="Flowly Android Mockup" width="220" style="border-radius: 16px; margin: 12px;" referrerPolicy="no-referrer" />
</p>

> **"Your second brain. Offline. Secure. Android Native."**
> Flowly is an on-device digital notebook, task manager, and calendar suite engineered for maximum cognitive throughput, absolute data containment, and instant response times on your Android device.

---

## 🛠️ core manifesto: absolute custody

Most productivity software acts as a proxy for telemetry collection. **Flowly is different.** It has no sign-in screens, contains zero web trackers, and contacts zero central databases. 

1. **Direct Security Sandbox**: Your markdown vault and checklist indices inhabit your device's native SQLite storage container.
2. **Key-Locked AI Integration**: You supply your own Groq/Gemini API key. It resides strictly inside your phone's secure keystore, communicating directly with end-point inferences through private HTTPS tunnels.
3. **No Storage Fees**: By avoiding cloud database hosting completely, Flowly is free, lightweight, and remains yours under complete custody.

---

## ⚡ technical architecture

*   **Platform Target**: Native Android (Android SDK 31+, optimized specifically for mobile handsets).
*   **Database Subsystem**: Local SQLite with localized SHA-256 index hashes for privacy.
*   **Inference Model**: Direct memory access to local models (or direct token mapping with Groq-LLama-3.3-70B/Gemini 1.5).
*   **UI Foundation**: Pure high-performance React + lightweight Tailwind layers for an absolute **sub-5ms action delay (no lag)** on low-end and flagship processors alike.

---

## 📁 navigation walkthrough (mobile preview)

The application centers around a comfortable **bottom bar navigation system** optimized for native touch thumbs:

*   ☕ **Daily Brief**: Your morning telemetry briefing summarising core objectives and high-priority tasks compiled directly from local note caches before starting your day.
*   📝 **Notes Vault**: A raw markdown editing canvas with quick pin buttons, archives, and localized on-request AI text summaries.
*   ✔️ **Task Deck**: Inline task logs equipped with localized priority badges (High, Medium, Low) and custom date triggers.
*   📅 **Planner Matrix**: Compact grid calendar rendering system reflecting upcoming deadlines seamlessly.
*   🤖 **AI Assistant**: A secure Signal-style chat co-pilot that scans your stored indexes on-demand to create custom checklists or structure documents without leaking data.

---

## 🚀 getting started with flowly mobile

### 1️⃣ Download Android stable APK
Tap the **Download Android APK** button on our landing page to obtain the trusted `flowly-v1.0.2-stable.apk` bundle.

### 2️⃣ Sideload Installation
Authorize sideload installs for your Android browser or file manager:
```bash
Settings > Apps > Special app access > Install unknown apps > [Your Browser] > Allow
```
Open the `.apk` file and tap **Install**.

### 3️⃣ Add your inference keys
Upon first boot, paste your private token keys into your app settings. The keys remain encrypted on-device.

---

## 🗺️ future roadmap

*   [x] **Android Stable APK Release (Active Focus)**
*   [ ] iPhone / iOS client packaging (Upcoming)
*   [ ] macOS desktop terminal companion (Upcoming)
*   [ ] Windows Installer compilation (Upcoming)

---

<div align="center">
  <p>Licensed under the MIT Public Custody License. Zero trackers. Absolute privacy.</p>
</div>
