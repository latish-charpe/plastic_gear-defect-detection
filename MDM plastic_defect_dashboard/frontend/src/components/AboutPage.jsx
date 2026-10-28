import { useMemo } from "react";
import { 
  Shield, 
  Cpu, 
  Eye, 
  Sparkles, 
  Wrench, 
  Languages, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Layers, 
  ArrowLeft, 
  ScanLine, 
  BookOpen, 
  Zap, 
  Activity, 
  Sliders, 
  HelpCircle,
  FileCheck,
  Flame,
  Clock,
  Compass
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function AboutPage({ onBackToInspection, onGoToCatalog, onStartInspection }) {
  const { language } = useLanguage();

  const content = useMemo(() => {
    const data = {
      en: {
        badge: "INDUSTRIAL AI QUALITY ASSURANCE",
        title: "Automated Plastic Gear Defect Inspection & Diagnosis Platform",
        subtitle: "An end-to-end intelligent computer vision and polymer engineering expert system designed for zero-defect injection-molded precision gear manufacturing.",
        btnInspect: "Launch Inspection",
        btnCatalog: "Defect Knowledge Base",
        btnBack: "Back to Dashboard",

        // Mission
        missionTitle: "Industrial Problem Statement & Project Mission",
        missionP1: "Precision injection-molded gears made from engineering polymers (POM, PA66, PEEK) are critical components in automotive steering actuators, medical fluid pumps, and aerospace robotics. Even microscopic defects—such as 0.1mm flash burrs, subtle weld lines, or tooth under-filling—cause high friction, catastrophic gear binding, or sudden mechanical failure.",
        missionP2: "Conventional manufacturing relies on manual visual inspection by human operators under magnifying lamps. This process is inherently bottlenecked by severe eye fatigue, subjective threshold inconsistencies, and sluggish cycle times (20–30 seconds per component). GearDefect AI transforms this workflow into an autonomous, sub-second (<1.2s) non-destructive visual diagnosis pipeline with real-time root cause analysis.",

        // How it works
        howTitle: "System Architecture & Processing Pipeline (How It Works)",
        howSubtitle: "A 5-stage automated visual computing and domain-expert knowledge pipeline.",
        steps: [
          {
            num: "01",
            title: "Optical Capture & Part Validation",
            icon: Eye,
            desc: "The uploaded camera frame undergoes pre-flight validation. The system analyzes edge morphology, contour circularity, and contrast distribution to verify the presence of a valid plastic gear before invoking heavy neural networks, preventing false triggers on irrelevant imagery."
          },
          {
            num: "02",
            title: "YOLO11m High-Resolution Neural Inference",
            icon: Cpu,
            desc: "Inference is executed at 832×832 pixel resolution using custom-trained Ultralytics YOLO11m weights. Multi-scale feature pyramids (FPN) localize defective teeth, hub cracks, and rim anomalies across 16 distinct defect classes with precise bounding coordinates and confidence scores."
          },
          {
            num: "03",
            title: "Grad-CAM Explainable AI (XAI) Verification",
            icon: Sparkles,
            desc: "To eliminate 'black-box' distrust on the manufacturing floor, Gradient-weighted Class Activation Mapping (Grad-CAM) computes gradient flows back into the final convolutional layer, projecting a vibrant jet heatmap that visually proves which pixels triggered the model's defect diagnosis."
          },
          {
            num: "04",
            title: "Polymer Processing Diagnostic Engine",
            icon: Wrench,
            desc: "Detected classes are instantly mapped into physical injection molding parameters. The system diagnoses thermodynamic and mechanical root causes (holding pressure, melt temperature, cycle time, mold cooling, venting) and delivers immediate corrective adjustment steps."
          },
          {
            num: "05",
            title: "Multilingual Technical Guidance (Indic Localization)",
            icon: Languages,
            desc: "To empower shop-floor operators across India, the diagnosis and tooling remedies are localized into English, Hindi, Marathi, and Gujarati with instant technical translation."
          }
        ],

        // Advantages
        advTitle: "Key Advantages & Industrial Strengths",
        advantages: [
          {
            title: "Automated Defect Detection",
            desc: "Detects plastic gear surface defects automatically from an input image using the trained YOLO11m model."
          },
          {
            title: "16 Defect Classes",
            desc: "The system supports detection of 16 plastic gear surface-defect classes."
          },
          {
            title: "Defect Localization using Bounding Boxes",
            desc: "Bounding boxes show the approximate location of each detected defect in the image."
          },
          {
            title: "Confidence-Based Detection",
            desc: "The system provides a confidence score for each detected defect, helping users understand the model's prediction strength."
          },
          {
            title: "Multiple Defects in One Image",
            desc: "The object-detection approach can identify multiple defect regions/classes within the same image."
          },
          {
            title: "Process Correction Suggestions",
            desc: "The rule-based system connects detected defects with possible causes and provides suggested process corrections."
          },
          {
            title: "Integrated Defect Diagnosis",
            desc: "Detection, defect information, possible cause, and recommended action are presented in a single dashboard."
          },
          {
            title: "Support for Quality Inspection",
            desc: "The system can assist QC inspectors, machine operators, and process engineers during preliminary defect identification and troubleshooting."
          }
        ],

        // Disadvantages & Mitigations
        disTitle: "System Limitations",
        disadvantages: [
          {
            title: "Dataset Limitation",
            limit: "Model is trained on a specific plastic gear dataset, so performance may vary on new products.",
            mitigation: ""
          },
          {
            title: "Lighting & Image Quality",
            limit: "Poor lighting, reflections, blur, or different camera angles can affect detection.",
            mitigation: ""
          },
          {
            title: "Some Defects Are Difficult to Detect",
            limit: "Performance is lower for certain defects such as burn, damage, dirt, and flash.",
            mitigation: ""
          },
          {
            title: "No Direct Machine Control",
            limit: "The system provides process correction suggestions but does not directly control the injection-molding machine.",
            mitigation: ""
          }
        ],

        // Tech specs table
        specsTitle: "System Specifications",
        specs: [
          { label: "Vision Backbone", val: "Ultralytics YOLO11m (PyTorch / CUDA)" },
          { label: "Input Resolution", val: "832 × 832 px (RGB high-fidelity)" },
          { label: "Inference Latency", val: "~450ms GPU / ~1100ms CPU" },
          { label: "Classes Supported", val: "16 Defect Classes + Non-Defective OK" },
          { label: "Interpretability", val: "Grad-CAM (Gradient Class Activation Maps)" },
          { label: "Language Support", val: "English, हिन्दी (Hindi), मराठी (Marathi), ગુજરાતી (Gujarati)" },
          { label: "Translation Engine", val: "Sarvam AI (Mayura Indic Model)" },
          { label: "Web Architecture", val: "FastAPI Backend + React / Vite / CSS Design System" }
        ]
      },

      hi: {
        badge: "औद्योगिक एआई गुणवत्ता आश्वासन प्रणाली",
        title: "स्वचालित प्लास्टिक गियर दोष निरीक्षण एवं निदान प्रणाली",
        subtitle: "इंजेक्शन-मोल्डेड प्रेसिजन प्लास्टिक गियर निर्माण में शून्य-दोष उत्पादन के लिए एक अत्याधुनिक कंप्यूटर विज़न और पॉलीमर इंजीनियरिंग विशेषज्ञ प्रणाली।",
        btnInspect: "निरीक्षण शुरू करें",
        btnCatalog: "दोष ज्ञानकोश देखें",
        btnBack: "डैशबोर्ड पर वापस जाएं",

        missionTitle: "औद्योगिक समस्या एवं परियोजना का उद्देश्य",
        missionP1: "इंजीनियरिंग पॉलिमर (POM, PA66, PEEK) से बने सटीक गियर ऑटोमोटिव स्टीयरिंग, मेडिकल पंप और रोबोटिक्स में अत्यंत महत्वपूर्ण होते हैं। केवल 0.1 मिमी का फ्लैश, सूक्ष्म दरार या दांत का अधूरा भरना भी पूरे गियर ट्रांसमिशन को जाम कर सकता है।",
        missionP2: "पारंपरिक विनिर्माण में मानव ऑपरेटरों द्वारा आवर्धक लेंस के नीचे मैन्युअल निरीक्षण किया जाता है। इसमें आंखों की थकान, असंगत निर्णय और अधिक समय (20-30 सेकंड प्रति गियर) लगता है। GearDefect AI इसे सब-सेकंड (<1.2s) स्वचालित डिजिटल निरीक्षण और तात्कालिक सुधारात्मक समाधान में बदल देता है।",

        howTitle: "प्रणाली वास्तुकला एवं कार्यप्रणाली (How It Works)",
        howSubtitle: "5-चरणीय स्वचालित विज़न कंप्यूटिंग और डोमेन-विशेषज्ञ ज्ञान पाइपलाइन।",
        steps: [
          {
            num: "01",
            title: "ऑप्टिकल कैप्चर एवं पुर्जा सत्यापन",
            icon: Eye,
            desc: "अपलोड की गई छवि का प्रारंभिक सत्यापन किया जाता है। सिस्टम भारी न्यूरल नेटवर्क चलाने से पहले यह पुष्टि करता है कि छवि में वास्तविक प्लास्टिक गियर मौजूद है, जिससे अमान्य छवियों पर समय नष्ट नहीं होता।"
          },
          {
            num: "02",
            title: "YOLO11m उच्च-रिज़ॉल्यूशन न्यूरल इन्फरेंस",
            icon: Cpu,
            desc: "832×832 पिक्सेल रिज़ॉल्यूशन पर कस्टम-प्रशिक्षित Ultralytics YOLO11m मॉडल द्वारा 16 अलग-अलग दोष श्रेणियों में सूक्ष्म दोषों, टूटे दांतों और दरारों की सटीक पहचान और बाउंडिंग बॉक्स तैयार किए जाते हैं।"
          },
          {
            num: "03",
            title: "Grad-CAM व्याख्यात्मक एआई (XAI) हीटमैप",
            icon: Sparkles,
            desc: "एआई के निर्णय पर ऑपरेटरों का विश्वास सुनिश्चित करने के लिए Grad-CAM हीटमैप तैयार करता है, जो जेट-कलर मैप द्वारा दिखाता है कि छवि के किन पिक्सेल के आधार पर दोष की पहचान की गई है।"
          },
          {
            num: "04",
            title: "पॉलीमर प्रोसेसिंग विशेषज्ञ प्रणाली",
            icon: Wrench,
            desc: "पहचाने गए दोषों को सीधे इंजेक्शन मोल्डिंग मशीन के भौतिक मापदंडों (होल्डिंग दबाव, तापमान, कूलिंग समय, ड्राफ्ट कोण) के साथ जोड़कर तुरंत सुधारात्मक उपाय प्रस्तुत किए जाते हैं।"
          },
          {
            num: "05",
            title: "बहुभाषी तकनीकी अनुवाद एवं मार्गदर्शन",
            icon: Languages,
            desc: "कारखाने के ऑपरेटरों की सुविधा के लिए सभी दोष विवरण और सुधारात्मक उपाय अंग्रेजी, हिन्दी, मराठी और गुजराती में प्रदर्शित किए जाते हैं।"
          }
        ],

        advTitle: "मुख्य लाभ एवं औद्योगिक विशेषताएं (Advantages)",
        advantages: [
          {
            title: "स्वचालित दोष पहचान",
            desc: "प्रशिक्षित YOLO11m मॉडल का उपयोग करके इनपुट छवि से प्लास्टिक गियर की सतह के दोषों को स्वचालित रूप से पहचानता है।"
          },
          {
            title: "16 दोष वर्ग",
            desc: "सिस्टम 16 प्लास्टिक गियर सतह दोष वर्गों की पहचान का समर्थन करता है।"
          },
          {
            title: "बाउंडिंग बॉक्स द्वारा दोष स्थानीयकरण",
            desc: "बाउंडिंग बॉक्स छवि में प्रत्येक पहचाने गए दोष का अनुमानित स्थान दर्शाते हैं।"
          },
          {
            title: "कॉन्फिडेंस-आधारित पहचान",
            desc: "सिस्टम प्रत्येक पहचाने गए दोष के लिए कॉन्फिडेंस स्कोर प्रदान करता है, जिससे उपयोगकर्ताओं को मॉडल की भविष्यवाणी की ताकत समझने में मदद मिलती है।"
          },
          {
            title: "एक छवि में कई दोष",
            desc: "ऑब्जेक्ट-डिटेक्शन दृष्टिकोण एक ही छवि में कई दोष क्षेत्रों/वर्गों की पहचान कर सकता है।"
          },
          {
            title: "प्रक्रिया सुधार सुझाव",
            desc: "नियम-आधारित प्रणाली पहचाने गए दोषों को संभावित कारणों से जोड़ती है और सुझाए गए प्रक्रिया सुधार प्रदान करती है।"
          },
          {
            title: "एकीकृत दोष निदान",
            desc: "पहचान, दोष जानकारी, संभावित कारण और अनुशंसित कार्रवाई एक ही डैशबोर्ड में प्रस्तुत की जाती है।"
          },
          {
            title: "गुणवत्ता निरीक्षण के लिए समर्थन",
            desc: "यह सिस्टम प्रारंभिक दोष पहचान और समस्या निवारण के दौरान QC निरीक्षकों, मशीन ऑपरेटरों और प्रक्रिया इंजीनियरों की सहायता कर सकता है।"
          }
        ],

        disTitle: "प्रणाली की सीमाएं",
        disadvantages: [
          {
            title: "डेटासेट की सीमा",
            limit: "मॉडल एक विशिष्ट प्लास्टिक गियर डेटासेट पर प्रशिक्षित है, इसलिए नए उत्पादों पर प्रदर्शन भिन्न हो सकता है।",
            mitigation: ""
          },
          {
            title: "प्रकाश व्यवस्था और छवि गुणवत्ता",
            limit: "खराब रोशनी, परावर्तन, धुंधलापन या अलग कैमरा कोण पहचान को प्रभावित कर सकते हैं।",
            mitigation: ""
          },
          {
            title: "कुछ दोषों का पता लगाना कठिन",
            limit: "बर्न, डैमेज, गंदगी और फ्लैश जैसे कुछ दोषों के लिए प्रदर्शन कम है।",
            mitigation: ""
          },
          {
            title: "मशीन पर सीधा नियंत्रण नहीं",
            limit: "सिस्टम प्रक्रिया सुधार सुझाव प्रदान करता है लेकिन इंजेक्शन-मोल्डिंग मशीन को सीधे नियंत्रित नहीं करता।",
            mitigation: ""
          }
        ],

        specsTitle: "तकनीकी विनिर्देश (Specifications)",
        specs: [
          { label: "विज़न बैकबोन", val: "Ultralytics YOLO11m (PyTorch / CUDA)" },
          { label: "इनपुट रिज़ॉल्यूशन", val: "832 × 832 px (RGB)" },
          { label: "इन्फरेंस गति", val: "~450ms GPU / ~1100ms CPU" },
          { label: "समर्थित श्रेणियां", val: "16 दोष श्रेणियां + सही पुर्जा (OK)" },
          { label: "व्याख्यात्मक प्रणाली", val: "Grad-CAM (Gradient Class Activation Maps)" },
          { label: "भाषा समर्थन", val: "English, हिन्दी (Hindi), मराठी (Marathi), ગુજરાતી (Gujarati)" },
          { label: "अनुवाद प्रणाली", val: "Sarvam AI (Mayura बहुभाषी मॉडल)" },
          { label: "वेब आर्किटेक्चर", val: "FastAPI Backend + React / Vite / CSS Design System" }
        ]
      },

      mr: {
        badge: "औद्योगिक एआय गुणवत्ता हमी प्रणाली",
        title: "स्वयंचलित प्लास्टिक गियर दोष तपासणी आणि निदान प्रणाली",
        subtitle: "इंजेक्शन-मोल्डेड प्रिसिजन प्लास्टिक गियर उत्पादनात शून्य-दोष उत्पादनासाठी अत्याधुनिक कॉम्प्युटर व्हिजन आणि पॉलिमर अभियांत्रिकी तज्ज्ञ प्रणाली.",
        btnInspect: "तपासणी सुरू करा",
        btnCatalog: "दोष ज्ञानकोश पहा",
        btnBack: "डॅशबोर्डवर परत जा",

        missionTitle: "औद्योगिक समस्या आणि प्रकल्पाचे उद्दिष्ट",
        missionP1: "अभियांत्रिकी पॉलिमर (POM, PA66, PEEK) पासून बनवलेले गियर्स ऑटोमोटिव्ह, वैद्यकीय पंप आणि रोबोटिक्समध्ये अत्यंत महत्त्वाचे असतात. 0.1 मिमीचा फ्लॅश किंवा दातातील सूक्ष्म क्रॅक देखील संपूर्ण गियर सिस्टीम निकामी करू शकतो.",
        missionP2: "पारंपरिक उत्पादनात मानवी ऑपरेटर भिंगाखाली प्रत्यक्ष डोळ्यांनी तपासणी करतात. यामुळे डोळ्यांचा थकवा, निर्णय क्षमतेतील तफावत आणि जास्त वेळ (20-30 सेकंद) लागतो. GearDefect AI या प्रक्रियेला सब-सेकंद (<1.2s) स्वयंचलित आणि अचूक डिजिटल तपासणीत रूपांतरित करते.",

        howTitle: "प्रणाली रचना आणि कार्यपद्धती (How It Works)",
        howSubtitle: "5-टप्प्यांची स्वयंचलित व्हिजन कॉम्प्युटिंग आणि डोमेन-तज्ज्ञ पाइपलाइन.",
        steps: [
          {
            num: "01",
            title: "ऑप्टिकल कॅप्चर आणि भाग पडताळणी",
            icon: Eye,
            desc: "प्रतिमा तपासण्यापूर्वी सिस्टीम हे तपासते की प्रतिमेत खरा प्लास्टिक गियर आहे की नाही, ज्यामुळे अनावश्यक वेळ वाचतो."
          },
          {
            num: "02",
            title: "YOLO11m हाय-रिझोल्यूशन न्यूरल इन्फरन्स",
            icon: Cpu,
            desc: "832×832 रिझोल्यूशनवर प्रशिक्षित YOLO11m मॉडेलद्वारे 16 वेगवेगळ्या दोषांची अचूक सीमा आणि वर्गीकरण ओळखले जाते."
          },
          {
            num: "03",
            title: "Grad-CAM पारदर्शक हीटमॅप (XAI)",
            icon: Sparkles,
            desc: "एआयने दोष का ओळखला हे दाखवण्यासाठी Grad-CAM रंगीत हीटमॅप तयार करतो, ज्यामुळे ऑपरेटरला निर्णय स्पष्टपणे समजतो."
          },
          {
            num: "04",
            title: "पॉलिमर मोल्डिंग तज्ज्ञ प्रणाली",
            icon: Wrench,
            desc: "दोष आढळल्यानंतर सिस्टीम थेट मोल्डिंग मशीनचे पॅरामीटर्स (दाब, तापमान, कुलिंग वेळ) दुरुस्त करण्याचे उपाय सांगते."
          },
          {
            num: "05",
            title: "स्थानिक भाषा आणि तांत्रिक भाषांतर",
            icon: Languages,
            desc: "कारखान्यातील कामगारांसाठी सर्व दोष माहिती आणि उपाय मराठी, इंग्रजी, हिंदी व गुजरातीमध्ये सहज समजण्यायोग्य स्वरूपात दिले जातात."
          }
        ],

        advTitle: "मुख्य फायदे आणि वैशिष्ट्ये (Advantages)",
        advantages: [
          {
            title: "स्वयंचलित दोष शोध",
            desc: "प्रशिक्षित YOLO11m मॉडेल वापरून इनपुट प्रतिमेतून प्लास्टिक गियरच्या पृष्ठभागावरील दोष आपोआप शोधतो."
          },
          {
            title: "16 दोष वर्ग",
            desc: "सिस्टम 16 प्लास्टिक गियर पृष्ठभाग दोष वर्गांची ओळख करण्याचे समर्थन करते."
          },
          {
            title: "बाउंडिंग बॉक्सद्वारे दोष स्थानिकीकरण",
            desc: "बाउंडिंग बॉक्स प्रतिमेतील प्रत्येक ओळखलेल्या दोषाचे अंदाजे स्थान दर्शवतात."
          },
          {
            title: "कॉन्फिडन्स-आधारित शोध",
            desc: "सिस्टम प्रत्येक ओळखलेल्या दोषासाठी कॉन्फिडन्स स्कोर प्रदान करते, ज्यामुळे वापरकर्त्यांना मॉडेलच्या अंदाजाची ताकद समजण्यास मदत होते."
          },
          {
            title: "एका प्रतिमेत अनेक दोष",
            desc: "ऑब्जेक्ट-डिटेक्शन दृष्टिकोन एकाच प्रतिमेत अनेक दोष क्षेत्रे/वर्ग ओळखू शकतो."
          },
          {
            title: "प्रक्रिया सुधारणा सूचना",
            desc: "नियम-आधारित सिस्टम ओळखलेल्या दोषांना संभाव्य कारणांशी जोडते आणि सुचवलेल्या प्रक्रिया सुधारणा प्रदान करते."
          },
          {
            title: "एकात्मिक दोष निदान",
            desc: "शोध, दोष माहिती, संभाव्य कारण आणि शिफारस केलेली कारवाई एकाच डॅशबोर्डमध्ये सादर केली जाते."
          },
          {
            title: "गुणवत्ता तपासणीसाठी समर्थन",
            desc: "हे सिस्टम प्राथमिक दोष ओळख आणि समस्यानिवारणादरम्यान QC निरीक्षक, मशीन ऑपरेटर आणि प्रक्रिया अभियंते यांना मदत करू शकते."
          }
        ],

        disTitle: "प्रणालीच्या मर्यादा",
        disadvantages: [
          {
            title: "डेटासेटची मर्यादा",
            limit: "मॉडेल एका विशिष्ट प्लास्टिक गियर डेटासेटवर प्रशिक्षित आहे, त्यामुळे नवीन उत्पादनांवर कामगिरी वेगळी असू शकते.",
            mitigation: ""
          },
          {
            title: "प्रकाशयोजना आणि प्रतिमा गुणवत्ता",
            limit: "खराब प्रकाश, परावर्तन, अस्पष्टता किंवा वेगळ्या कॅमेरा कोनामुळे शोधावर परिणाम होऊ शकतो.",
            mitigation: ""
          },
          {
            title: "काही दोष शोधणे कठीण",
            limit: "बर्न, डॅमेज, घाण आणि फ्लॅश यांसारख्या काही दोषांसाठी कामगिरी कमी आहे.",
            mitigation: ""
          },
          {
            title: "मशीनवर थेट नियंत्रण नाही",
            limit: "सिस्टम प्रक्रिया सुधारणा सूचना देते परंतु इंजेक्शन-मोल्डिंग मशीनवर थेट नियंत्रण ठेवत नाही.",
            mitigation: ""
          }
        ],

        specsTitle: "तांत्रिक तपशील (Specifications)",
        specs: [
          { label: "व्हिजन आर्किटेक्चर", val: "Ultralytics YOLO11m (PyTorch / CUDA)" },
          { label: "इनपुट रिझोल्यूशन", val: "832 × 832 px (RGB)" },
          { label: "इन्फरन्स गती", val: "~450ms GPU / ~1100ms CPU" },
          { label: "समर्थित दोष प्रकार", val: "16 Defect Classes + OK Part" },
          { label: "स्पष्टीकरण पद्धत", val: "Grad-CAM (Class Activation Maps)" },
          { label: "भाषा पर्याय", val: "English, हिन्दी (Hindi), मराठी (Marathi), ગુજરાતી (Gujarati)" },
          { label: "भाषांतर मॉडेल", val: "Sarvam AI (Mayura Indic Model)" },
          { label: "सॉफ्टवेअर स्टॅक", val: "FastAPI Backend + React / Vite / CSS Design System" }
        ]
      },

      gu: {
        badge: "ઔદ્યોગિક AI ગુણવત્તા ખાતરી સિસ્ટમ",
        title: "સ્વચાલિત પ્લાસ્ટિક ગિયર ખામી નિરીક્ષણ અને નિદાન પ્લેટફોર્મ",
        subtitle: "ઇન્જેક્શન-મોલ્ડેડ ચોકસાઇ પ્લાસ્ટિક ગિયર ઉત્પાદનમાં શૂન્ય-ખામી ઉત્પાદન માટે કમ્પ્યુટર વિઝન અને પોલિમર એન્જિનિયરિંગ નિષ્ણાત સિસ્ટમ.",
        btnInspect: "નિરીક્ષણ શરૂ કરો",
        btnCatalog: "ખામી જ્ઞાનકોશ જુઓ",
        btnBack: "ડેશબોર્ડ પર પાછા જાઓ",

        missionTitle: "ઔદ્યોગિક સમસ્યા અને પ્રોજેક્ટ મિશન",
        missionP1: "POM, PA66, PEEK જેવા એન્જિનિયરિંગ પ્લાસ્ટિકમાંથી બનેલા ગિયર ઓટોમોટિવ, તબીબી સાધનો અને રોબોટિક્સમાં અત્યંત મહત્ત્વપૂર્ણ છે. 0.1mm જેટલી નાની ફ્લેશ કે તિરાડ પણ સમગ્ર સિસ્ટમને જામ કરી શકે છે.",
        missionP2: "પરંપરાગત રીતે ઓપરેટરો બૃહદદર્શક કાચ નીચે જાતે તપાસ કરે છે, જેમાં આંખોનો થાક અને ઘણો સમય (20-30 સેકન્ડ) લાગે છે. GearDefect AI આ પ્રક્રિયાને સબ-સેકન્ડ (<1.2s) ડિજિટલ અને સચોટ સ્વચાલિત નિદાનમાં પરિવર્તિત કરે છે.",

        howTitle: "સિસ્ટમ આર્કિટેક્ચર અને કાર્યપદ્ધતિ (How It Works)",
        howSubtitle: "5-તબક્કાની સ્વચાલિત કમ્પ્યુટિંગ અને ઔદ્યોગિક જ્ઞાન પાઇપલાઇન.",
        steps: [
          {
            num: "01",
            title: "ઓપ્ટિકલ કેપ્ચર અને પાર્ટ વેરિફિકેશન",
            icon: Eye,
            desc: "ઇમેજ અપલોડ થતાં જ સિસ્ટમ ચકાસે છે કે તેમાં ખરેખર પ્લાસ્ટિક ગિયર છે કે નહીં, જેથી બિનજરૂરી સમય વેડફાય નહીં."
          },
          {
            num: "02",
            title: "YOLO11m હાઇ-રિઝોલ્યુશન ન્યુરલ ઇન્ફરન્સ",
            icon: Cpu,
            desc: "832×832 રિઝોલ્યુશન પર પ્રશિક્ષિત YOLO11m મોડેલ 16 વિવિધ ખામી વર્ગોમાં તૂટેલા દાંત, તિરાડો અને ખામીઓ ચોક્કસ શોધી કાઢે છે."
          },
          {
            num: "03",
            title: "Grad-CAM સમજૂતીત્મક હીટમેપ (XAI)",
            icon: Sparkles,
            desc: "AI એ આ નિર્ણય કેમ લીધો તે સાબિત કરવા Grad-CAM રંગીન હીટમેપ બનાવે છે, જેથી ઓપરેટરને ચોક્કસ પુરાવો મળે છે."
          },
          {
            num: "04",
            title: "પોલિમર પ્રોસેસિંગ નિષ્ણાત સિસ્ટમ",
            icon: Wrench,
            desc: "શોધાયેલ ખામીઓને આધારે સિસ્ટમ તરત જ મોલ્ડિંગ મશીનમાં પ્રેશર, તાપમાન અને કૂલિંગ સમય જેવા ફેરફારો સૂચવે છે."
          },
          {
            num: "05",
            title: "સ્થાનિક ભાષા અને તકનીકી અનુવાદ",
            icon: Languages,
            desc: "ફેક્ટરી ઓપરેટરો માટે તમામ માહિતી અને ઉપાયો ગુજરાતી, હિન્દી, મરાઠી અને અંગ્રેજીમાં લખીને સમજાવવામાં આવે છે."
          }
        ],

        advTitle: "મુખ્ય ફાયદાઓ અને વિશેષતાઓ (Advantages)",
        advantages: [
          {
            title: "સ્વચાલિત ખામી શોધ",
            desc: "પ્રશિક્ષિત YOLO11m મૉડેલ વાપરીને ઇનપુટ ઇમેજમાંથી પ્લાસ્ટિક ગિયરની સપાટીની ખામીઓ આપોઆપ શોધે છે."
          },
          {
            title: "16 ખામી વર્ગો",
            desc: "સિસ્ટમ 16 પ્લાસ્ટિક ગિયર સપાટી-ખામી વર્ગોની ઓળખ માટે સમર્થન આપે છે."
          },
          {
            title: "બાઉન્ડિંગ બૉક્સ દ્વારા ખામી સ્થાન-નિર્ધારણ",
            desc: "બાઉન્ડિંગ બૉક્સ ઇમેજમાં દરેક ઓળખાયેલ ખામીનું અંદાજિત સ્થાન દર્શાવે છે."
          },
          {
            title: "કૉન્ફિડન્સ-આધારિત શોધ",
            desc: "સિસ્ટમ દરેક ઓળખાયેલ ખામી માટે કૉન્ફિડન્સ સ્કૉર આપે છે, જે વપરાશકર્તાઓને મૉડેલની આગાહીની શક્તિ સમજવામાં મદદ કરે છે."
          },
          {
            title: "એક ઇમેજમાં અનેક ખામીઓ",
            desc: "ઑબ્જેક્ટ-ડિટેક્શન અભિગમ એ જ ઇમેજમાં અનેક ખામી ક્ષેત્રો/વર્ગો ઓળખી શકે છે."
          },
          {
            title: "પ્રક્રિયા સુધારણા સૂચનો",
            desc: "નિયમ-આધારિત સિસ્ટમ ઓળખાયેલ ખામીઓને સંભવિત કારણો સાથે જોડે છે અને સૂચવેલ પ્રક્રિયા સુધારણા પ્રદાન કરે છે."
          },
          {
            title: "સંકલિત ખામી નિદાન",
            desc: "શોધ, ખામી માહિતી, સંભવિત કારણ અને ભલામણ કરેલ કાર્ય એક જ ડૅશબોર્ડમાં રજૂ કરવામાં આવે છે."
          },
          {
            title: "ગુણવત્તા નિરીક્ષણ માટે સમર્થન",
            desc: "સિસ્ટમ પ્રારંભિક ખામી ઓળખ અને સમસ્યા-નિવારણ દરમ્યાન QC નિરીક્ષકો, મશીન ઓપરેટરો અને પ્રક્રિયા ઇજનેરોને સહાય કરી શકે છે."
          }
        ],

        disTitle: "સિસ્ટમ મર્યાદાઓ",
        disadvantages: [
          {
            title: "ડેટાસેટ મર્યાદા",
            limit: "મૉડેલ એક ચોક્કસ પ્લાસ્ટિક ગિયર ડેટાસેટ પર પ્રશિક્ષિત છે, તેથી નવા ઉત્પાદનો પર કામગીરી અલગ હોઈ શકે છે.",
            mitigation: ""
          },
          {
            title: "લાઇટિંગ અને ઇમેજ ગુણવત્તા",
            limit: "નબળી રોશની, પ્રતિબિંબ, અસ્પષ્ટતા અથવા અલગ કેમેરા કોણ શોધને અસર કરી શકે છે.",
            mitigation: ""
          },
          {
            title: "કેટલીક ખામીઓ શોધવી મુશ્કેલ",
            limit: "બર્ન, ડેમેજ, ગંદકી અને ફ્લૅશ જેવી કેટલીક ખામીઓ માટે કામગીરી ઓછી છે.",
            mitigation: ""
          },
          {
            title: "મશીન પર સીધો નિયંત્રણ નહીં",
            limit: "સિસ્ટમ પ્રક્રિયા સુધારણા સૂચનો આપે છે પરંતુ ઇન્જેક્શન-મોલ્ડિંગ મશીનને સીધી નિયંત્રિત કરતી નથી.",
            mitigation: ""
          }
        ],

        specsTitle: "ટેકનિકલ વિગતો (Specifications)",
        specs: [
          { label: "વિઝન બેકબોન", val: "Ultralytics YOLO11m (PyTorch / CUDA)" },
          { label: "ઇનપુટ રિઝોલ્યુશન", val: "832 × 832 px (RGB)" },
          { label: "ઇન્ફરન્સ સ્પીડ", val: "~450ms GPU / ~1100ms CPU" },
          { label: "સમર્થિત ખામી વર્ગો", val: "16 Defect Classes + OK Part" },
          { label: "સમજૂતી પદ્ધતિ", val: "Grad-CAM (Class Activation Maps)" },
          { label: "ભાષા સપોર્ટ", val: "English, हिन्दी (Hindi), मराठी (Marathi), ગુજરાતી (Gujarati)" },
          { label: "અનુવાદ મૉડેલ", val: "Sarvam AI (Mayura Indic Model)" },
          { label: "સોફ્ટવેર સ્ટેક", val: "FastAPI Backend + React / Vite / CSS Design System" }
        ]
      }
    };

    return data[language] || data.en;
  }, [language]);

  return (
    <div className="about-page">
      {/* Top Breadcrumb Nav */}
      <div className="defect-detail-nav">
        <button 
          onClick={onBackToInspection} 
          className="btn-secondary defect-detail-back-btn"
          aria-label="Back to Inspection"
        >
          <ArrowLeft size={16} style={{ marginRight: 6 }} />
          <span>{content.btnBack}</span>
        </button>

        <div className="defect-detail-nav-actions">
          <button 
            onClick={onGoToCatalog} 
            className="btn-ghost"
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "13px" }}
          >
            <BookOpen size={15} />
            <span>{content.btnCatalog}</span>
          </button>
          <button 
            onClick={onStartInspection} 
            className="btn-primary"
            style={{ padding: "6px 14px", fontSize: "13px" }}
          >
            <ScanLine size={15} style={{ marginRight: 6 }} />
            <span>{content.btnInspect}</span>
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="about-hero-card">
        <div className="about-hero-badge">
          <Shield size={14} style={{ marginRight: 6, color: "var(--teal)" }} />
          <span>{content.badge}</span>
        </div>
        <h1 className="about-hero-title">{content.title}</h1>
        <p className="about-hero-subtitle">{content.subtitle}</p>
      </div>

      {/* Mission & Problem Statement */}
      <div className="about-section-card">
        <div className="about-section-heading-wrap">
          <div className="about-section-icon" style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", color: "#2563eb" }}>
            <Compass size={20} />
          </div>
          <div>
            <h2 className="about-section-title">{content.missionTitle}</h2>
            <p className="about-section-sub">Zero-defect precision manufacturing for high-stakes mechanical assemblies</p>
          </div>
        </div>
        <div className="about-prose">
          <p>{content.missionP1}</p>
          <p>{content.missionP2}</p>
        </div>
      </div>

      {/* 5-Step Architecture / How it works */}
      <div className="about-section-card">
        <div className="about-section-heading-wrap">
          <div className="about-section-icon" style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#059669" }}>
            <Zap size={20} />
          </div>
          <div>
            <h2 className="about-section-title">{content.howTitle}</h2>
            <p className="about-section-sub">{content.howSubtitle}</p>
          </div>
        </div>

        <div className="about-pipeline-grid">
          {content.steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="about-pipeline-card">
                <div className="about-pipeline-top">
                  <span className="about-pipeline-num">{step.num}</span>
                  <div className="about-pipeline-icon-wrap">
                    <Icon size={18} />
                  </div>
                </div>
                <h3 className="about-pipeline-card-title">{step.title}</h3>
                <p className="about-pipeline-card-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column Grid: Advantages vs Disadvantages & Mitigations */}
      <div className="about-adv-dis-grid">
        {/* Column 1: Advantages */}
        <div className="about-section-card about-card--adv">
          <div className="about-section-heading-wrap">
            <div className="about-section-icon" style={{ backgroundColor: "rgba(22, 163, 74, 0.12)", color: "#16a34a" }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h2 className="about-section-title" style={{ color: "#15803d" }}>{content.advTitle}</h2>
              <p className="about-section-sub">Operational, quality, and economic benefits</p>
            </div>
          </div>

          <div className="about-points-stack">
            {content.advantages.map((item, idx) => (
              <div key={idx} className="about-point-card about-point-card--adv">
                <div className="about-point-header">
                  <CheckCircle2 size={16} style={{ color: "#16a34a", flexShrink: 0, marginTop: 2 }} />
                  <h3 className="about-point-heading">{item.title}</h3>
                </div>
                <p className="about-point-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Disadvantages & Mitigations */}
        <div className="about-section-card about-card--dis">
          <div className="about-section-heading-wrap">
            <div className="about-section-icon" style={{ backgroundColor: "rgba(239, 68, 68, 0.12)", color: "#dc2626" }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="about-section-title" style={{ color: "#b91c1c" }}>{content.disTitle}</h2>
              <p className="about-section-sub">Technical limitations and practical engineering countermeasures</p>
            </div>
          </div>

          <div className="about-points-stack">
            {content.disadvantages.map((item, idx) => (
              <div key={idx} className="about-point-card about-point-card--dis">
                <div className="about-point-header">
                  <XCircle size={16} style={{ color: "#dc2626", flexShrink: 0, marginTop: 2 }} />
                  <h3 className="about-point-heading">{item.title}</h3>
                </div>
                <p className="about-point-body" style={{ color: "var(--text-dark)", marginBottom: item.mitigation ? 8 : 0 }}>
                  {item.limit}
                </p>
                {item.mitigation && (
                  <div className="about-mitigation-box">
                    <Sparkles size={14} style={{ color: "#0284c7", flexShrink: 0, marginTop: 2 }} />
                    <span className="about-mitigation-text">{item.mitigation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Specifications Table */}
      <div className="about-section-card">
        <div className="about-section-heading-wrap">
          <div className="about-section-icon" style={{ backgroundColor: "rgba(139, 92, 246, 0.12)", color: "#7c3aed" }}>
            <Activity size={20} />
          </div>
          <div>
            <h2 className="about-section-title">{content.specsTitle}</h2>
            <p className="about-section-sub">Core hardware and software deployment architecture</p>
          </div>
        </div>

        <div className="about-specs-table-wrap">
          <table className="about-specs-table">
            <tbody>
              {content.specs.map((row, idx) => (
                <tr key={idx}>
                  <td className="about-spec-key">{row.label}</td>
                  <td className="about-spec-val">{row.val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="about-cta-banner">
        <div>
          <h3 className="about-cta-title">Ready to evaluate injection gear quality?</h3>
          <p className="about-cta-sub">Run an automated diagnostic check or browse the comprehensive 16-defect encyclopedia.</p>
        </div>
        <div className="about-cta-buttons">
          <button onClick={onGoToCatalog} className="btn-secondary">
            <BookOpen size={16} style={{ marginRight: 6 }} />
            <span>{content.btnCatalog}</span>
          </button>
          <button onClick={onStartInspection} className="btn-primary">
            <ScanLine size={16} style={{ marginRight: 6 }} />
            <span>{content.btnInspect}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
