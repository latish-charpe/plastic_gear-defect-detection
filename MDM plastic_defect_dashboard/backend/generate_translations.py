# generate_translations.py
# Generates comprehensive, elaborated translations for all 16 defects with bullet points across 6 languages.

import json
from pathlib import Path

TRANSLATIONS_DATA = {
  "broken": {
    "en": {
      "cause": "• Premature Demolding: Part was ejected before resin solidified below heat deflection temperature.\n• Concentrated Ejection Stress: Ejection pins exerted excessive localized mechanical force, causing brittle fracture.\n• Cavity Sticking & Undercuts: High cavity friction or inadequate draft angle gripped the gear teeth during mold opening.",
      "action": "• Extend Cooling Cycle: Increase cooling time by 2–4 seconds to ensure structural rigidity before ejection.\n• Regulate Ejection Speed & Force: Reduce forward hydraulic pin speed and verify uniform pin contact distribution.\n• Polish Cavity & Verify Draft: Inspect tooth cavities for burrs or scratches, and ensure a minimum 1.0° draft angle."
    },
    "hi": {
      "cause": "• समय से पहले डिमोल्डिंग: रेज़िन के पूरी तरह ठंडा और सख्त होने से पहले पार्ट को बाहर धकेल दिया गया।\n• अत्यधिक इजेक्शन दबाव: इजेक्शन पिनों ने बहुत अधिक स्थानीय बल लगाया जिससे प्लास्टिक टूट गया।\n• मोल्ड में चिपकना: मोल्ड कैविटी में ड्राफ्ट एंगल कम होने या सतह खुरदरी होने से गियर के दांत मोल्ड में अटक गए।",
      "action": "• कूलिंग समय बढ़ाएं: पार्ट को पूरी कठोरता देने के लिए कूलिंग साइकिल 2–4 सेकंड बढ़ाएं।\n• इजेक्शन गति और बल नियंत्रित करें: हाइड्रोलिक पिन की गति और दबाव को कम करें ताकि समान दबाव पड़े।\n• मोल्ड कैविटी पॉलिश करें: कैविटी से खरोंच हटाएं और कम से कम 1.0° ड्राफ्ट एंगल सुनिश्चित करें।"
    },
    "mr": {
      "cause": "• वेळेपूर्वी डिमोल्डिंग: रेझिन पूर्णपणे थंड आणि कडक होण्यापूर्वी पार्ट बाहेर ढकलला गेला.\n• जास्त इजेक्शन दाब: इजेक्शन पिन्सनी जास्त स्थानिक दाब दिल्याने पार्ट तुटला.\n• मोल्डमध्ये अडकणे: ड्राफ्ट अँगल कमी असल्यामुळे किंवा पृष्ठभाग खडबडीत असल्यामुळे गिअरचे दात मोल्डमध्ये अडकले.",
      "action": "• कूलिंग वेळ वाढवा: पार्ट पूर्णपणे घट्ट होण्यासाठी कूलिंग वेळ 2 ते 4 सेकंद वाढवा.\n• इजेक्शन वेग व दाब नियंत्रित करा: पिनचा वेग आणि हायड्रॉलिक दाब कमी करा जेणेकरून समान दाब बसेल.\n• मोल्ड पॉलिश करा: कॅव्हिटीमधील खडबडीतपणा दूर करा आणि किमान 1.0° ड्राफ्ट अँगल ठेवा."
    },
    "gu": {
      "cause": "• સમય પહેલાં ડિમોલ્ડિંગ: પ્લાસ્ટિક સંપૂર્ણ ઠંડું અને કઠણ થાય તે પહેલાં પાર્ટ બહાર ધકેલાયો.\n• વધુ પડતું ઇજેક્શન દબાણ: ઇજેક્શન પિનોએ વધુ પડતું કેન્દ્રિત દબાણ આપતાં પાર્ટ તૂટી ગયો.\n• મોલ્ડમાં ચોંટવું: ડ્રાફ્ટ એંગલ ઓછો હોવાથી ગિયરના દાંતા મોલ્ડમાં ફસાઈ ગયા.",
      "action": "• કૂલિંગ સમય વધારો: પાર્ટને મજબૂતી આપવા કૂલિંગ સમય 2–4 સેકન્ડ વધારો.\n• ઇજેક્શન ઝડપ અને બળ નિયંત્રિત કરો: હાઇડ્રોલિક પિનની ગતિ અને દબાણ ઘટાડો.\n• મોલ્ડ કેવિટી પોલિશ કરો: કેવિટીમાંથી ખંજવાળ દૂર કરો અને ન્યૂનતમ 1.0° ડ્રાફ્ટ એંગલ સુનિશ્ચિત કરો."
    },
    "de": {
      "cause": "• Vorzeitige Entformung: Das Teil wurde ausgeworfen, bevor der Kunststoff ausreichend erstarrt war.\n• Hohe Auswerferkraft: Konzentrierter mechanischer Druck der Auswerferstifte verursachte Bruch.\n• Entformungsklemmen: Geringe Entformungsschräge oder raue Kavität ließen die Verzahnung klemmen.",
      "action": "• Kühlzeit verlängern: Kühlzeit um 2–4 Sekunden erhöhen, um Formstabilität vor dem Auswerfen zu sichern.\n• Auswerfergeschwindigkeit drosseln: Vorlaufgeschwindigkeit und Hydraulikdruck der Stifte reduzieren.\n• Kavität polieren: Werkzeugoberfläche prüfen und mindestens 1,0° Entformungsschräge gewährleisten."
    },
    "es": {
      "cause": "• Desmoldeo prematuro: La pieza se expulsó antes de que la resina solidificara por debajo de la temperatura de deflexión.\n• Esfuerzo de expulsión concentrado: Los pines eyectores ejercieron fuerza excesiva causando fractura frágil.\n• Atascamiento en cavidad: Fricción excesiva o ángulo de desmoldeo insuficiente atraparon los dientes del engranaje.",
      "action": "• Extender tiempo de enfriamiento: Aumente el ciclo de enfriamiento en 2–4 segundos para lograr rigidez estructural.\n• Regular velocidad y fuerza de expulsión: Reduzca la velocidad hidráulica y verifique distribución uniforme de pines.\n• Pulir cavidad y verificar desmoldeo: Inspeccione rebabas y asegure un ángulo de desmoldeo mínimo de 1.0°."
    }
  },
  "bulge": {
    "en": {
      "cause": "• Premature Ejection: Part was removed while the molten core remained soft and under internal hydrostatic pressure.\n• Entrapped Gas Expansion: Trapped air and volatile gases expanded on the surface upon clamping pressure release.\n• Excessive Holding Pressure: Overpacking thick wall sections caused residual elastic spring-back after demolding.",
      "action": "• Increase In-Mold Cooling Time: Allow thicker sections adequate time to freeze solid before opening the mold.\n• Optimize Holding Pressure: Reduce second-stage packing pressure by 10–15% to prevent over-pressurization.\n• Clean & Deepen Mold Vents: Inspect and clean parting-line gas vents (0.02–0.04mm depth) to prevent air entrapment."
    },
    "hi": {
      "cause": "• समय से पहले पार्ट निकालना: पार्ट को तब निकाला गया जब उसका अंदरूनी हिस्सा अभी भी नरम और दबाव में था।\n• फंसी हुई गैस का फैलाव: मोल्ड खुलने पर फंसी हुई हवा और वाष्पशील गैसों ने सतह को फुला दिया।\n• अत्यधिक होल्डिंग प्रेशर: मोटे हिस्से में अत्यधिक प्लास्टिक भरने से डिमोल्डिंग के बाद उभार आया।",
      "action": "• मोल्ड कूलिंग समय बढ़ाएं: मोटे हिस्सों को मोल्ड खोलने से पहले ठोस रूप से जमने के लिए पर्याप्त समय दें।\n• होल्डिंग प्रेशर कम करें: अत्यधिक दबाव रोकने के लिए पैकिंग प्रेशर को 10–15% कम करें।\n• मोल्ड वेंट्स साफ करें: हवा निकलने वाले वेंट्स (0.02–0.04 मिमी) की जांच और सफाई करें।"
    },
    "mr": {
      "cause": "• वेळेपूर्वी पार्ट बाहेर काढणे: पार्टचा आतील भाग अजूनही मऊ आणि अंतर्गत दाबाखाली असताना बाहेर काढला गेला.\n• अडकलेल्या वायूचा विस्तार: मोल्ड उघडताच अडकलेल्या हवेमुळे पृष्ठभाग फुगला.\n• जास्त होल्डिंग प्रेशर: जाड भागामध्ये जास्त प्लास्टिक भरल्यामुळे पृष्ठभागावर फुगवटा आला.",
      "action": "• मोल्ड कूलिंग वेळ वाढवा: जाड भाग पूर्णपणे घट्ट होण्यासाठी अधिक वेळ द्या.\n• होल्डिंग प्रेशर कमी करा: पॅकिंग प्रेशर 10–15% ने कमी करा.\n• एअर व्हेंट्स स्वच्छ करा: मोल्डचे गॅस व्हेंट्स (0.02–0.04 मिमी) स्वच्छ करा."
    },
    "gu": {
      "cause": "• અકાળે પાર્ટ બહાર કાઢવો: અંદરનો ભાગ હજી નરમ અને દબાણ હેઠળ હતો ત્યારે પાર્ટ બહાર કઢાયો.\n• ફસાયેલા ગેસનો ફેલાવો: મોલ્ડ ખુલતા ફસાયેલી હવાને લીધે સપાટી ફૂલી ગઈ.\n• વધુ પડતું હોલ્ડિંગ પ્રેશર: જાડા ભાગોમાં વધુ પડતું મટીરીયલ ભરાવાથી સપાટી પર સોજો આવ્યો.",
      "action": "• કૂલિંગ સમય વધારો: જાડા વિભાગોને કઠણ થવા માટે વધુ સમય આપો.\n• હોલ્ડિંગ દબાણ ઘટાડો: પેકિંગ પ્રેશર 10–15% ઘટાડો.\n• એર વેન્ટ્સ સાફ કરો: મોલ્ડના ગેસ વેન્ટ્સ (0.02–0.04 મીમી) સાફ કરો."
    },
    "de": {
      "cause": "• Vorzeitige Entformung: Der Kern war noch schmelzflüssig und stand unter innerem Druck.\n• Eingeschlossene Gasexpansion: Eingeschlossene Luft dehnte sich beim Öffnen der Form aus.\n• Zu hoher Nachdruck: Überfüllung dicker Wandstärken führte zu elastischer Rückfederung.",
      "action": "• Werkzeugkühlzeit erhöhen: Den Kern dickwandiger Bereiche vollständig erstarren lassen.\n• Nachdruck optimieren: Nachdruck um 10–15% senken, um Überdruck zu vermeiden.\n• Entlüftungen reinigen: Trennebenen-Entlüftungen (0,02–0,04 mm) gründlich reinigen."
    },
    "es": {
      "cause": "• Expulsión prematura: La pieza se extrajo mientras el núcleo aún estaba fundido y bajo presión interna.\n• Expansión de gas atrapado: El aire atrapado se expandió en la superficie al abrir el molde.\n• Presión de mantenimiento excesiva: Sobrellenado en secciones gruesas causó rebote elástico.",
      "action": "• Aumentar tiempo de enfriamiento: Permita que las secciones gruesas solidifiquen por completo.\n• Optimizar presión de sostenimiento: Reduzca la presión de empaque en un 10–15%.\n• Limpiar venteos del molde: Inspeccione y limpie las ranuras de venteo (0.02–0.04 mm)."
    }
  },
  "burn": {
    "en": {
      "cause": "• Dieseling Effect: Air trapped in blind cavities was compressed at high velocity and superheated, scorching the plastic.\n• Excessive Melt Temperature: Cylinder barrel heating zones set above resin degradation thresholds.\n• High Shear Heating: Extreme injection speeds generated frictional overheating through narrow gates.",
      "action": "• Clear & Expand Air Vents: Clean clogged vent slots and add auxiliary vacuum venting at the final filling zone.\n• Profile Injection Velocity: Decelerate injection speed during the last 5–10% of cavity filling.\n• Lower Barrel Temperatures: Reduce nozzle and front cylinder zone temperatures by 5°C–10°C."
    },
    "hi": {
      "cause": "• डीजलिंग प्रभाव: कैविटी में फंसी हवा उच्च दबाव पर अत्यधिक गर्म हो गई और प्लास्टिक को जला दिया।\n• अत्यधिक मेल्ट तापमान: बैरल तापमान रेज़िन की सहनशीलता से अधिक निर्धारित था।\n• हाई शीयर हीटिंग: संकीर्ण गेट से बहुत तेज इंजेक्शन गति के कारण घर्षण से गर्मी उत्पन्न हुई।",
      "action": "• एयर वेंट्स साफ और चौड़े करें: बंद वेंट स्लॉट साफ करें और अंतिम भरने वाले क्षेत्र में वैक्यूम वेंटिंग जोड़ें।\n• इंजेक्शन गति नियंत्रित करें: कैविटी भरने के अंतिम 5–10% भाग में इंजेक्शन गति धीमी करें।\n• बैरल तापमान कम करें: नोजल और फ्रंट बैरल तापमान को 5°C–10°C घटाएं।"
    },
    "mr": {
      "cause": "• डिझेलिंग इफेक्ट: कॅव्हिटीमध्ये अडकलेली हवा जास्त दाबामुळे अत्यंत गरम झाली आणि प्लास्टिक जळाले.\n• जास्त मेल्ट तापमान: बॅरल तापमान मर्यादेपेक्षा जास्त ठेवले होते.\n• हाय शीअर हीटिंग: गेटमधून अतिशय वेगाने प्लास्टिक गेल्यामुळे घर्षणाने उष्णता निर्माण झाली.",
      "action": "• एअर व्हेंट्स स्वच्छ करा: बंद व्हेंट्स स्वच्छ करा आणि शेवटी व्हॅक्यूम व्हेंटिंग द्या.\n• इंजेक्शनचा वेग नियंत्रित करा: शेवटच्या 5–10% भरताना इंजेक्शनचा वेग कमी करा.\n• बॅरल तापमान कमी करा: नोझल आणि पुढील बॅरलचे तापमान 5°C–10°C ने कमी करा."
    },
    "gu": {
      "cause": "• ડીઝલિંગ અસર: કેવિટીમાં ફસાયેલી હવા અતિશય ગરમ થઈ ગઈ અને પ્લાસ્ટિકને બાળી નાખ્યું.\n• વધુ પડતું તાપમાન: બેરલનું તાપમાન રેઝિનની ક્ષમતા કરતાં વધુ હતું.\n• ઘર્ષણ ગરમી: સાંકડા ગેટમાંથી ખૂબ ઝડપથી મટીરીયલ જવાને કારણે ગરમી ઉત્પન્ન થઈ.",
      "action": "• એર વેન્ટ્સ સાફ કરો: ભરાયેલા વેન્ટ્સ સાફ કરો અને અંતિમ વિસ્તારમાં વેક્યુમ વેન્ટિંગ આપો.\n• ઇજેક્શન ઝડપ ધીમી કરો: ભરવાના છેલ્લા 5–10% ભાગમાં ગતિ ધીમી કરો.\n• બેરલ તાપમાન ઘટાડો: નોઝલ અને આગળના બેરલનું તાપમાન 5°C–10°C ઘટાડો."
    },
    "de": {
      "cause": "• Dieseleffekt: Eingeschlossene Luft wurde schlagartig komprimiert und verbrannte den Kunststoff.\n• Zu hohe Massetemperatur: Zylindertemperaturen über der Zersetzungsgrenze des Polymers.\n• Schererwärmung: Extreme Einspritzgeschwindigkeit erzeugte hohe Reibungswärme am Anschnitt.",
      "action": "• Entlüftungen reinigen und erweitern: Verstopfte Entlüftungskanäle am Fließwegende freimachen.\n• Einspritzprofil anpassen: Einspritzgeschwindigkeit auf den letzten 5–10% des Füllwegs reduzieren.\n• Zylindertemperatur senken: Düsen- und vordere Heizzonen um 5°C–10°C absenken."
    },
    "es": {
      "cause": "• Efecto diésel: El aire atrapado se comprimió a alta velocidad y se sobrecalentó, quemando el plástico.\n• Temperatura de masa excesiva: Zonas del barril configuradas por encima del límite de degradación.\n• Calentamiento por cizalladura: Velocidad de inyección extrema generó fricción excesiva en la compuerta.",
      "action": "• Limpiar y ampliar venteos: Despeje las ranuras obstruidas y agregue venteo al final del llenado.\n• Perfilar velocidad de inyección: Desacelere la velocidad durante el último 5–10% del llenado.\n• Bajar temperatura del barril: Reduzca las temperaturas de la boquilla y zonas frontales en 5°C–10°C."
    }
  },
  "damage": {
    "en": {
      "cause": "• Mold Clearance Collision: Part failed to fully drop or clear the mold space before clamp re-closure.\n• Robot Gripper Misalignment: Pneumatic take-out robot gripped gear teeth with excessive clamping pressure or offset angle.\n• Conveyor & Chute Impact: Parts collided hard against metal chute walls or accumulated roughly in collection bins.",
      "action": "• Synchronize Take-Out Robot: Recalibrate robot arm position sensors and clearance delay before mold closing.\n• Soften Gripper Force: Fit soft polyurethane suction cups and reduce pneumatic gripper cylinder pressure.\n• Add Cushioning Liners: Install high-density EVA foam dampening inside drop chutes and collection bins."
    },
    "hi": {
      "cause": "• मोल्ड से टकराना: मोल्ड दोबारा बंद होने से पहले पार्ट पूरी तरह नीचे नहीं गिरा या फंसा रहा।\n• रोबोट ग्रिपर की गड़बड़ी: रोबोट ने अत्यधिक दबाव या गलत कोण पर गियर को पकड़ा।\n• कन्वेयर या बिन में टक्कर: पार्ट धातु की सतहों या कलेक्शन बिन में एक-दूसरे से जोर से टकराए।",
      "action": "• रोबोट टाइमिंग सिंक्रोनाइज़ करें: रोबोट आर्म सेंसर और मोल्ड बंद होने के सुरक्षा समय को ठीक करें।\n• ग्रिपर दबाव कम करें: नरम पॉलीयूरेथेन सक्शन कप लगाएं और न्यूमेटिक दबाव कम करें।\n• पैडिंग लाइनर्स लगाएं: ड्रॉप शूट और कलेक्शन डिब्बे में ईवा फोम कुशनिंग लगाएं।"
    },
    "mr": {
      "cause": "• मोल्डशी धडक: मोल्ड पुन्हा बंद होण्यापूर्वी पार्ट पूर्णपणे खाली पडला नाही किंवा अडकला.\n• रोबोट ग्रिपरचा जास्त दाब: रोबोट आर्मने जास्त दाबाने किंवा चुकीच्या कोनात गिअर पकडला.\n• कलेक्शन बिनमध्ये आघात: पार्ट लोखंडी पृष्ठभागावर किंवा बिनमध्ये एकमेकांवर आदळले.",
      "action": "• रोबोट सिंक्रोनाइझ करा: रोबोट सेन्सर आणि मोल्ड बंद होण्यापूर्वीचा क्लिअरन्स तपासा.\n• ग्रिपर दाब कमी करा: मऊ पॉलीयुरेथेन सक्शन कप वापरा आणि न्यूमॅटिक दाब कमी करा.\n• कुशनिंग पॅडिंग लावा: ड्रॉप शूट आणि कलेक्शन बिनमध्ये मऊ फोम पॅडिंग लावा."
    },
    "gu": {
      "cause": "• મોલ્ડ અથડામણ: મોલ્ડ બંધ થતાં પહેલાં પાર્ટ પૂરેપૂરો નીચે ન પડ્યો.\n• રોબોટ ગ્રિપરનું વધુ દબાણ: રોબોટે વધુ પડતા દબાણ સાથે અથવા ખોટા ખૂણે પાર્ટ પકડ્યો.\n• કલેક્શન બિનમાં ટક્કર: પાર્ટ્સ એકબીજા સાથે અથવા મેટલ સપાટી સાથે જોરથી અથડાયા.",
      "action": "• રોબોટ ટાઇમિંગ સેટ કરો: રોબોટ આર્મ સેન્સર અને ક્લિયરન્સ સમય ફરીથી સેટ કરો.\n• ગ્રિપર પ્રેશર ઘટાડો: સોફ્ટ સક્શન કપ લગાવો અને પ્યુમેટિક દબાણ ઓછું કરો.\n• પેડિંગ લગાવો: ડ્રોપ શૂટ અને બિનમાં સોફ્ટ ફીણ પેડિંગ લગાવો."
    },
    "de": {
      "cause": "• Werkzeugkollision: Das Teil fiel vor dem Schließen des Werkzeugs nicht vollständig heraus.\n• Robotergreifer-Fehlstellung: Pneumatische Entnahmebacken griffen mit zu hoher Kraft oder Schiefstellung.\n• Fallschacht-Aufprall: Teile prallten ungedämpft auf Blechrutschen oder Auffangbehälter.",
      "action": "• Roboterentnahme synchronisieren: Positionssensoren und Freigabeverzögerung vor Werkzeugschluss kalibrieren.\n• Greiferkraft dämpfen: Weiche Polyurethan-Sauger einsetzen und Zylinderdruck reduzieren.\n• Dämpfungseinlagen anbringen: Rutschen und Sammelbehälter mit EVA-Schaumstoff auskleiden."
    },
    "es": {
      "cause": "• Colisión en molde: La pieza no cayó completamente antes del cierre del molde.\n• Desalineación del robot: La pinza neumática sujetó los dientes con fuerza excesiva o ángulo desviado.\n• Impacto en tolva: Las piezas chocaron contra canaletas metálicas o cayeron bruscamente en el contenedor.",
      "action": "• Sincronizar robot de extracción: Recalibre sensores de posición y retardo de seguridad antes del cierre.\n• Suavizar fuerza de pinza: Instale ventosas suaves de poliuretano y reduzca presión de agarre.\n• Agregar forros de amortiguación: Recubra tolvas y cajas de recolección con espuma EVA de alta densidad."
    }
  },
  "darkspot": {
    "en": {
      "cause": "• Resin Thermal Degradation: Polymer stagnated and carbonized inside barrel screw dead-spots or nozzle adapter.\n• Contaminated Raw Material: Airborne dust, foreign particles, or degraded regrind mixed in the feed hopper.\n• Hot Runner Thermal Hotspot: Thermocouple calibration drift causing localized overheating inside the manifold.",
      "action": "• Purge Cylinder & Screw: Run commercial chemical purging compound through the barrel to flush carbonized specks.\n• Screen Raw Materials: Use sealed hopper loaders with magnetic grates and avoid contaminated regrind pellets.\n• Calibrate Temperature Controllers: Inspect hot runner heater bands and recalibrate temperature probes."
    },
    "hi": {
      "cause": "• प्लास्टिक का जलना: बैरल स्क्रू या नोजल में फंसा प्लास्टिक जलकर काला हो गया।\n• कच्चा माल दूषित होना: हॉपर में धूल, विदेशी कण या खराब रीग्राइंड दाने मिल गए।\n• हॉट रनर में अत्यधिक गर्मी: थर्मोकपल खराबी के कारण हॉट रनर में अधिक तापमान हो गया।",
      "action": "• बैरल और स्क्रू पर्ज करें: जले हुए कणों को साफ करने के लिए केमिकल पर्जिंग कंपाउंड चलाएं।\n• रॉ मटेरियल की जांच करें: सीलबंद हॉपर और मैग्नेटिक जाली का उपयोग करें, गंदे दानों से बचें।\n• तापमान नियंत्रक कैलिब्रेट करें: हॉट रनर हीटर और तापमान जांच की जांच करें।"
    },
    "mr": {
      "cause": "• प्लास्टिक करपणे: बॅरल स्क्रू किंवा नोझलमध्ये अडकलेले प्लास्टिक करपून काळे झाले.\n• अस्वच्छ कच्चा माल: हॉपरमध्ये धूळ, बाहेरील कचरा किंवा खराब प्लास्टिक मिसळले.\n• हॉट रनरमध्ये जास्त उष्णता: थर्मोकपल खराब झाल्यामुळे एका जागी जास्त उष्णता निर्माण झाली.",
      "action": "• बॅरल पर्ज करा: करपलेले कण काढण्यासाठी केमिकल पर्जिंग कंपाउंड चालवा.\n• कच्चा माल तपासा: सीलबंद हॉपर आणि मॅग्नेटिक जाळी वापरा.\n• तापमान नियंत्रक तपासा: हॉट रनरचे हिटर्स आणि थर्मोकपल्स पुन्हा कॅलिब्रेट करा."
    },
    "gu": {
      "cause": "• પ્લાસ્ટિક બળવું: બેરલ સ્ક્રૂ અથવા નોઝલમાં પ્લાસ્ટિક બળીને કાળું પડી ગયું.\n• દૂષિત કાચો માલ: હોપરમાં ધૂળ અથવા બગડેલા દાણા ભળી ગયા.\n• હોટ રનરમાં અતિશય ગરમી: થર્મોકપલની ખામીને કારણે વધુ પડતી ગરમી પેદા થઈ.",
      "action": "• બેરલ પર્જ કરો: બળેલા કણો સાફ કરવા કેમિકલ પર્જિંગ કમ્પાઉન્ડ ચલાવો.\n• કાચો માલ ફિલ્ટર કરો: સીલ કરેલ હોપર અને મેગ્નેટિક ગ્રીડનો ઉપયોગ કરો.\n• તાપમાન નિયંત્રકો તપાસો: હોટ રનર હીટર્સ અને તાપમાન સેન્સર કેલિબ્રેટ કરો."
    },
    "de": {
      "cause": "• Thermische Zersetzung: Kunststoff verweilte zu lange an Totstellen der Schnecke und verkohlte.\n• Materialkontamination: Staub, Fremdkörper oder thermisch geschädigtes Mahlgut im Trichter.\n• Heißkanal-Hotspots: Fühlerdrift führte zu lokaler Überhitzung im Verteilerbalken.",
      "action": "• Plastifizierzylinder reinigen: Chemisches Reinigungsgranulat zur Entfernung von Schwarzsprenkeln einsetzen.\n• Materialkontrolle verschärfen: Geschlossene Förderanlagen mit Magnetabscheidern nutzen.\n• Temperaturregler kalibrieren: Heißkanal-Heizbänder und Thermoelemente überprüfen."
    },
    "es": {
      "cause": "• Degradación térmica: Polímero estancado se carbonizó en puntos muertos del husillo o boquilla.\n• Material contaminado: Polvo, partículas extrañas o molido degradado mezclados en la tolva.\n• Puntos calientes en colada caliente: Falla del termopar causando sobrecalentamiento localizado.",
      "action": "• Purgar cilindro y husillo: Pase compuesto de purga comercial para expulsar puntos negros carbonizados.\n• Filtrar materia prima: Use cargadores sellados con rejillas magnéticas y evite molido sucio.\n• Calibrar controladores: Inspeccione bandas calefactoras y recalibre sensores de temperatura."
    }
  },
  "dirt": {
    "en": {
      "cause": "• Ambient Dust Attraction: Electrostatic charge attracted shop-floor particulates onto open mold surfaces.\n• Ejector Lubricant Leaks: Excess grease or oil migrated from slide guides and ejector pins onto molding cavities.\n• Unsealed Hopper Feed: Material containers left uncovered near dusty processing machinery.",
      "action": "• Clean Cavity Surfaces: Wipe mold cavities and parting lines using lint-free cloths and mold cleaner spray.\n• Regulate Pin Lubrication: Switch to high-temperature food-grade/dry lubricants and wipe off surplus grease.\n• Cover Hoppers & Add Ionizers: Keep material lids tightly latched and mount anti-static air ionizers over mold zones."
    },
    "hi": {
      "cause": "• धूल का आकर्षण: स्थिर विद्युत के कारण हवा में उड़ती धूल मोल्ड सतह पर चिपक गई।\n• ग्रीस और तेल का रिसाव: इजेक्टर पिन या स्लाइडर से अतिरिक्त ग्रीस पार्ट कैविटी में आ गया।\n• खुला हॉपर: कच्चे माल का हॉपर खुला रहने से धूल अंदर चली गई।",
      "action": "• मोल्ड कैविटी साफ करें: लिंट-फ्री कपड़े और मोल्ड क्लीनर स्प्रे से कैविटी को पोंछें।\n• ग्रीस का प्रयोग सीमित करें: ड्राई लुब्रिकेंट का उपयोग करें और पिनों से अतिरिक्त ग्रीस हटाएं।\n• हॉपर ढकें और आयोनाइज़र लगाएं: हॉपर का ढक्कन बंद रखें और मोल्ड क्षेत्र पर एंटी-स्टेटिक ब्लोअर लगाएं।"
    },
    "mr": {
      "cause": "• धूळ चिकटणे: स्टॅटिक चार्जमुळे हवेतील धूळ उघड्या मोल्डच्या पृष्ठभागावर जमा झाली.\n• ग्रीस गळती: इजेक्शन पिन किंवा स्लाइडमधून जास्त ग्रीस कॅव्हिटीमध्ये आले.\n• उघडा हॉपर: कच्च्या मालाचा हॉपर उघडा राहिल्याने धूळ आत गेली.",
      "action": "• मोल्ड पृष्ठभाग स्वच्छ करा: लिंट-फ्री कापड आणि मोल्ड क्लिनरने कॅव्हिटी पुसून घ्या.\n• मर्यादित ग्रीस वापरा: ड्राय लुब्रिकंट वापरा आणि जास्तीचे ग्रीस पुसून काढा.\n• हॉपर झाकून ठेवा: हॉपरचे झाकण बंद ठेवा आणि अँटी-स्टॅटिक आयनायझर वापरा."
    },
    "gu": {
      "cause": "• ધૂળનું આકર્ષણ: સ્ટેટિક ચાર્જને લીધે હવામાંની ધૂળ મોલ્ડની સપાટી પર ચોંટી ગઈ.\n• ગ્રીસ લિકેજ: પિન અથવા સ્લાઇડરમાંથી વધારાનું ગ્રીસ કેવિટીમાં આવી ગયું.\n• ખુલ્લું હોપર: મટીરીયલ હોપર ખુલ્લું રહેવાથી ધૂળ અંદર ભળી ગઈ.",
      "action": "• કેવિટી સાફ કરો: લિન્ટ-ફ્રી કાપડ અને મોલ્ડ ક્લીનરથી કેવિટી લૂછી લો.\n• ગ્રીસ નિયંત્રિત કરો: ડ્રાય લ્યુબ્રિકન્ટ વાપરો અને વધારાનું ગ્રીસ સાફ કરો.\n• હોપર ઢાંકો: હોપરનું ઢાંકણું બંધ રાખો અને એન્ટી-સ્ટેટિક બ્લોઅર લગાવો."
    },
    "de": {
      "cause": "• Elektrostatische Staubanziehung: Statische Ladung zog Werkstattpartikel in das geöffnete Werkzeug.\n• Schmiermittel-Migration: Überschüssiges Fett von Auswerferstiften oder Schiebern trat in die Form.\n• Offene Materialtrichter: Rohstoffbehälter standen unverschlossen im staubigen Produktionsbereich.",
      "action": "• Kavitätenoberflächen reinigen: Formtrennungen und Konturen mit fusselfreien Tüchern reinigen.\n• Stiftschmierung regulieren: Auf hochtemperaturbeständige Trockenschmierstoffe umstellen.\n• Trichter verschließen & Ionisieren: Entionisierungs-Gebläse über dem Formbereich installieren."
    },
    "es": {
      "cause": "• Atracción electrostática de polvo: La carga estática atrajo partículas del taller a la cavidad abierta.\n• Fuga de lubricante: Grasa excesiva de pines eyectores o correderas migró hacia el molde.\n• Tolva descubierta: Contenedores de resina destapados cerca de áreas con polvo.",
      "action": "• Limpiar superficies de cavidad: Limpie cavidades con paños sin pelusa y limpiador de moldes.\n• Regular lubricación de pines: Use lubricantes secos de alta temperatura y retire excesos.\n• Tapar tolvas e ionizar: Instale sopladores antiestáticos ionizadores sobre el molde."
    }
  },
  "flash": {
    "en": {
      "cause": "• Insufficient Clamping Force: Peak cavity injection pressure exceeded machine clamp locking tonnage.\n• Over-Packing / Late V/P Transfer: Continued high injection pressure packed the mold beyond volumetric capacity.\n• Damaged Parting Line: Parting surfaces worn, dented, or deformed, leaving micro-gaps exceeding resin flash limit.",
      "action": "• Increase Clamp Tonnage: Ensure machine clamp rating safely exceeds projected part area multiplied by cavity pressure.\n• Adjust V/P Switchover Point: Transfer to hold pressure at 95% volumetric fill to eliminate cavity pressure spikes.\n• Inspect & Spot Mold Parting Face: Clean debris from parting surfaces; spot-grind or stone damaged mold lands."
    },
    "hi": {
      "cause": "• मोल्ड क्लैंपिंग फोर्स की कमी: इंजेक्शन का दबाव मशीन के मोल्ड लॉक करने की क्षमता से अधिक हो गया।\n• अत्यधिक पैकिंग / देर से स्विचओवर: पूरी कैविटी भरने के बाद भी बहुत अधिक दबाव बना रहा।\n• मोल्ड किनारों का घिसना: मोल्ड के पार्टिंग किनारों में गैप या घिसाव होने से प्लास्टिक बाहर रिस गया।",
      "action": "• क्लैंप फोर्स बढ़ाएं: मशीन की क्लैंप टनेज को कैविटी दबाव के सुरक्षित स्तर से ऊपर रखें।\n• वी/पी स्विचओवर पहले करें: 95% भराव पर ही होल्ड प्रेशर पर स्विच करें ताकि प्रेशर स्पाइक न बने।\n• मोल्ड पार्टिंग सतह ठीक करें: मोल्ड किनारों से कचरा साफ करें और घिसे किनारों की ग्राइंडिंग कराएं।"
    },
    "mr": {
      "cause": "• क्लॅम्पिंग फोर्स कमी असणे: इंजेक्शनचा दाब मशीनच्या मोल्ड लॉक करण्याच्या क्षमतेपेक्षा जास्त झाला.\n• ओव्हर पॅकिंग / उशिरा स्विचओव्हर: व्हॉल्यूमेट्रिक क्षमतेपेक्षा जास्त प्लास्टिक दाबले गेले.\n• मोल्ड कडांची झीज: मोल्डच्या जोडणीच्या कडा खराब झाल्यामुळे बारीक फटीतून प्लास्टिक बाहेर आले.",
      "action": "• क्लॅम्प टनेज वाढवा: मशीनचा क्लॅम्प फोर्स आवश्यक दाबापेक्षा जास्त ठेवा.\n• व्ही/पी स्विचओव्हर आधी करा: 95% भरल्यावर ताबडतोब पॅकिंग प्रेशरवर स्विच करा.\n• मोल्ड कडा दुरुस्त करा: मोल्डच्या कडा स्वच्छ करा आणि झिजलेल्या कडांची दुरुस्ती करा."
    },
    "gu": {
      "cause": "• ક્લેમ્પિંગ બળ ઓછું હોવું: ઈન્જેક્શન દબાણ મશીનના મોલ્ડ લોકીંગ ક્ષમતા કરતાં વધી ગયું.\n• ઓવર-પેકિંગ: કેવિટી ભરાઈ ગયા પછી પણ વધુ પડતું દબાણ ચાલુ રહ્યું.\n• મોલ્ડ કિનારીઓ ઘસાઈ જવી: મોલ્ડની સપાટીમાં ગેપ હોવાથી પ્લાસ્ટિક બહાર નીકળી ગયું.",
      "action": "• ક્લેમ્પ ટનેજ વધારો: મશીનનું ક્લેમ્પિંગ બળ કેવિટી દબાણ કરતા વધારે રાખો.\n• સ્વીચઓવર વહેલું કરો: 95% ભરાઈ ગયા પછી તરત જ હોલ્ડ પ્રેશર પર ટ્રાન્સફર કરો.\n• મોલ્ડ સપાટી સમારકામ કરો: મોલ્ડની ધાર સાફ કરો અને નુકસાન પામેલી સપાટી સરખી કરો."
    },
    "de": {
      "cause": "• Unzureichende Schließkraft: Der Werkzeuginnendruck überstieg die Zuhaltekraft der Maschine.\n• Überpackung / Später Umschaltpunkt: Die Form wurde über das Formnestvolumen hinaus überdrückt.\n• Beschädigte Trennebene: Verschleiß oder Schmutz auf den Dichtflächen führte zu Graten.",
      "action": "• Schließkraft erhöhen: Zuhaltekraft entsprechend der projizierten Fläche und Druckspitzen anheben.\n• Umschaltpunkt vorverlegen: Bei ca. 95% volumetrischer Füllung auf Nachdruck umschalten.\n• Trennebene tuschieren & reinigen: Werkzeugdichtflächen reinigen und Kanten nacharbeiten."
    },
    "es": {
      "cause": "• Fuerza de cierre insuficiente: La presión interna superó el tonelaje de bloqueo de la máquina.\n• Sobre-empaque / Cambio tardío: Se continuó inyectando alta presión más allá del volumen de la cavidad.\n• Línea de partición dañada: Desgaste o hendiduras en la partición permitieron el escape de plástico.",
      "action": "• Aumentar fuerza de cierre: Asegure que el tonelaje de cierre supere la fuerza de apertura del molde.\n• Adelantar cambio V/P: Transfiera a presión de sostenimiento al 95% del llenado volumétrico.\n• Inspeccionar cara de partición: Limpie residuos y rectifique rebabas en los sellos del molde."
    }
  },
  "flow": {
    "en": {
      "cause": "• Cold Melt Front: Polymer cooled too rapidly upon entering the cavity, causing hesitation and ripple lines.\n• Low Injection Velocity: Molten plastic flowed too slowly, allowing the advancing skin to solidify prematurely.\n• Inadequate Mold Temperature: Cooling water temperature set too cold for high-aspect gear geometry.",
      "action": "• Increase Melt & Mold Heat: Raise barrel heating zones by 5°C–10°C and increase mold temperature controller setpoint.\n• Accelerate Injection Speed: Increase injection fill speed to achieve continuous, high-shear laminate flow.\n• Enlarge Runner & Gate: Open runner diameters and gates to minimize pressure drop and melt hesitation."
    },
    "hi": {
      "cause": "• ठंडा मेल्ट फ्रंट: प्लास्टिक कैविटी में जाते ही बहुत तेजी से ठंडा हुआ जिससे लहरदार निशान बन गए।\n• धीमी इंजेक्शन गति: प्लास्टिक बहुत धीरे बहा जिससे आगे की परत समय से पहले जम गई।\n• मोल्ड का कम तापमान: गियर की बारीक संरचना के लिए मोल्ड बहुत ठंडा था।",
      "action": "• मेल्ट और मोल्ड तापमान बढ़ाएं: बैरल तापमान 5°C–10°C बढ़ाएं और मोल्ड का तापमान भी बढ़ाएं।\n• इंजेक्शन गति तेज करें: निरंतर और तेज प्रवाह प्राप्त करने के लिए इंजेक्शन गति बढ़ाएं।\n• गेट और रनर का आकार बढ़ाएं: दबाव के नुकसान को रोकने के लिए रनर और गेट को थोड़ा बड़ा करें।"
    },
    "mr": {
      "cause": "• थंड मेल्ट फ्रंट: प्लास्टिक आत जाताच लगेच थंड झाले, ज्यामुळे लाटांसारख्या रेषा पडल्या.\n• कमी इंजेक्शन वेग: प्लास्टिक खूप हळू वाहिल्यामुळे पुढचा थर वेळेआधीच घट्ट झाला.\n• मोल्डचे कमी तापमान: गिअरच्या आकारासाठी मोल्डचे पाणी खूप थंड होते.",
      "action": "• मेल्ट व मोल्ड तापमान वाढवा: बॅरलचे तापमान 5°C–10°C वाढवा आणि मोल्डचे तापमान वाढवा.\n• इंजेक्शनचा वेग वाढवा: प्लास्टिकचा सतत आणि वेगवान प्रवाह ठेवण्यासाठी गती वाढवा.\n• रनर आणि गेट मोठे करा: दाबातील घट कमी करण्यासाठी गेटचा आकार वाढवा."
    },
    "gu": {
      "cause": "• ઠંડુ પ્લાસ્ટિક: કેવિટીમાં પ્રવેશતા જ મટીરીયલ ઝડપથી ઠંડુ પડી ગયું અને વહેણના નિશાન બન્યા.\n• ધીમી ઇન્જેક્શન ઝડપ: પ્લાસ્ટિક ધીમેથી વહેવાથી આગળનું સ્તર વહેલું જામી ગયું.\n• મોલ્ડનું ઓછું તાપમાન: ગિયરની ડિઝાઇન માટે મોલ્ડનું તાપમાન ખૂબ ઓછું હતું.",
      "action": "• તાપમાન વધારો: બેરલનું તાપમાન 5°C–10°C વધારો અને મોલ્ડનું તાપમાન વધારો.\n• ઇન્જેક્શન સ્પીડ વધારો: ઝડપી અને સળંગ પ્રવાહ માટે ઇન્જેક્શનની ગતિ વધારો.\n• રનર અને ગેટ મોટા કરો: દબાણ ઘટી જતું રોકવા ગેટનું માપ થોડું મોટું કરો."
    },
    "de": {
      "cause": "• Erkaltende Schmelzfront: Der Kunststoff kühlte zu schnell ab, was zu Fließlinien und Erstarrungswellen führte.\n• Zu geringe Einspritzgeschwindigkeit: Die Fließfront stagnierte und erstarrte vorzeitig an der Werkzeugwand.\n• Zu niedrige Werkzeugtemperatur: Die Werkzeugoberfläche war zu kalt für dünne Zahnradgeometrien.",
      "action": "• Masse- und Werkzeugtemperatur anheben: Zylindertemperaturen um 5°C–10°C erhöhen und Werkzeugheizung steigern.\n• Einspritzgeschwindigkeit erhöhen: Schnellere Werkzeugfüllung zur Vermeidung von Schmelzestauung einstellen.\n• Anguss und Verteiler aufweiten: Fließquerschnitte vergrößern, um Druckverluste zu minimieren."
    },
    "es": {
      "cause": "• Frente de masa frío: El polímero se enfrió muy rápido al entrar, causando líneas de flujo onduladas.\n• Baja velocidad de inyección: El flujo lento permitió que la piel exterior solidificara prematuramente.\n• Temperatura de molde insuficiente: El agua de enfriamiento estaba demasiado fría para los dientes del engranaje.",
      "action": "• Elevar temperaturas de masa y molde: Aumente las zonas del barril en 5°C–10°C y suba la temperatura del molde.\n• Acelerar velocidad de inyección: Aumente la velocidad para lograr un flujo continuo y sin vacilaciones.\n• Ampliar canales y compuertas: Incremente dimensiones para reducir caída de presión."
    }
  },
  "hair": {
    "en": {
      "cause": "• Nozzle Drool / Stringing: High nozzle tip temperature prevented crisp melt freeze-off during mold separation.\n• Inadequate Screw Suck-Back: Insufficient decompression failed to relieve residual nozzle tip pressure after dosing.\n• High Melt Flow Index (MFI): Excessive fluidity or moisture in resin causing stringy discharge.",
      "action": "• Reduce Nozzle Temperature: Lower nozzle heater band setting by 5°C–10°C to harden melt at the orifice.\n• Increase Decompression (Suck-Back): Add 2–4mm of screw suck-back after screw rotation to draw back molten plastic.\n• Install Reverse-Taper Nozzle Tip: Fit shut-off or reverse-taper nozzle tips designed for clean sprue breakaway."
    },
    "hi": {
      "cause": "• नोजल से टपकना: नोजल का तापमान अधिक होने से मोल्ड खुलते समय प्लास्टिक के पतले धागे खिंच गए।\n• सक-बैक की कमी: स्क्रू डीकंप्रेशन कम होने से नोजल में बचा हुआ दबाव कम नहीं हुआ।\n• अत्यधिक तरलता: रेज़िन में नमी या अधिक मेल्ट फ्लो इंडेक्स के कारण तार जैसा खिंचाव हुआ।",
      "action": "• नोजल तापमान घटाएं: नोजल हीटर का तापमान 5°C–10°C कम करें।\n• स्क्रू सक-बैक बढ़ाएं: नोजल से प्लास्टिक को पीछे खींचने के लिए 2–4 मिमी डीकंप्रेशन बढ़ाएं।\n• रिवर्स-टेपर नोजल लगाएं: साफ अलगाव के लिए शट-ऑफ या रिवर्स-टेपर नोजल टिप लगाएं।"
    },
    "mr": {
      "cause": "• नोझलमधून गळणे: नोझलचे तापमान जास्त असल्याने मोल्ड उघडताना प्लास्टिकचे पातळ धागे तयार झाले.\n• स्क्रू सक-बॅक कमी असणे: डोझिंगनंतर नोझलमधील दाब कमी करण्यासाठी डीकंप्रेशन पुरेसे नव्हते.\n• प्लास्टिकचा जास्त पातळपणा: रेझिन खूप पातळ असल्याने तारेसारखे खेचले गेले.",
      "action": "• नोझल तापमान कमी करा: नोझल हिटरचे तापमान 5°C–10°C ने कमी करा.\n• स्क्रू सक-बॅक वाढवा: डोझिंगनंतर प्लास्टिक मागे ओढण्यासाठी 2–4 मिमी डीकंप्रेशन वाढवा.\n• शट-ऑफ नोझल टिप वापरा: प्लास्टिकची तार तुटण्यासाठी योग्य नोझल टिप लावा."
    },
    "gu": {
      "cause": "• નોઝલમાંથી ટીપાવું: નોઝલ તાપમાન વધુ હોવાથી મોલ્ડ ખુલતી વખતે તાર જેવા રેસા ખેંચાયા.\n• ઓછો સક-બેક: સ્ક્રૂ ડીકમ્પ્રેશન ઓછું હોવાથી નોઝલમાં દબાણ રહી ગયું.\n• વધુ પડતી તરલતા: પ્લાસ્ટિક વધુ પ્રવાહી હોવાને કારણે ખેંચાણ થયું.",
      "action": "• નોઝલ તાપમાન ઘટાડો: નોઝલ હીટરનું સેટિંગ 5°C–10°C ઘટાડો.\n• સ્ક્રૂ સક-બેક વધારો: ડોઝિંગ પછી 2–4 મીમી ડીકમ્પ્રેશન ઉમેરો.\n• શટ-ઓફ નોઝલ વાપરો: સ્વચ્છ અલગાવ માટે રિવર્સ-ટેપર નોઝલ ટિપ લગાવો."
    },
    "de": {
      "cause": "• Düsensabbern / Fadenziehen: Hohe Düsentemperatur verhinderte sauberen Schmelzabriß beim Öffnen.\n• Zu geringe Dekompression: Fehlender Schneckenrückzug baute den Restdruck vor der Düse nicht ab.\n• Zu hohe Fließfähigkeit: Zu hohe Schmelzeviskosität oder Feuchte führte zu Fädenbildung.",
      "action": "• Düsentemperatur absenken: Düsenheizband um 5°C–10°C reduzieren, um Erstarrung zu begünstigen.\n• Dekompression (Rückzug) erhöhen: 2–4 mm Schneckenrückzug nach dem Dosieren einstellen.\n• Verschlussdüse einsetzen: Nadelverschluss- oder Rückstromsperren-Düse für sauberen Abriss montieren."
    },
    "es": {
      "cause": "• Goteo en boquilla / Hilos: La alta temperatura de la boquilla impidió un corte limpio al abrir el molde.\n• Descompresión insuficiente: La falta de descompresión del husillo no liberó la presión residual.\n• Alta fluidez de la resina: Fluidez excesiva o humedad generaron desprendimiento en hilos.",
      "action": "• Reducir temperatura de boquilla: Baje la banda de la boquilla en 5°C–10°C para endurecer el orificio.\n• Aumentar descompresión (succión): Agregue 2–4 mm de retroceso del husillo después de dosificar.\n• Instalar boquilla con corte: Monte boquillas de obturación o cono invertido para desprendimiento limpio."
    }
  },
  "missing": {
    "en": {
      "cause": "• Inadequate Shot Dosing: Metering stroke set too short or non-return valve slipping, starving the cavity.\n• Broken Mold Inserts: Core pin, gear tooth insert, or ejector sleeve tip fractured and remained inside the mold.\n• Gate Obstruction: Cold slug or solidified foreign particle lodged inside the runner gate.",
      "action": "• Inspect Mold Cavity Immediately: Halt production and check mold inserts and core pins for physical breakage.\n• Increase Metering Stroke: Raise shot volume to maintain a consistent 3–6mm melt cushion.\n• Enlarge Cold Slug Wells: Deepen cold-slug wells at runner junctions to trap un-melted pellets before gates."
    },
    "hi": {
      "cause": "• शॉट की कमी: डोज़िंग स्ट्रोक कम था या नॉन-रिटर्न वॉल्व लीक होने से मोल्ड में पूरा माल नहीं पहुंचा।\n• मोल्ड का हिस्सा टूटना: कोर पिन या गियर के दांत का इंसर्ट टूटकर मोल्ड के अंदर ही रह गया।\n• गेट में रुकावट: ठंडा प्लास्टिक या बाहरी कण गेट के मुहाने पर फंस गया।",
      "action": "• तुरंत मोल्ड कैविटी की जांच करें: मशीन रोककर टूटे पिन या गियर इंसर्ट की जांच करें।\n• शॉट साइज़ बढ़ाएं: 3–6 मिमी कुशन बनाए रखने के लिए मीटरिंग स्ट्रोक बढ़ाएं।\n• कोल्ड स्लग वेल गहरा करें: बिना पिघले दानों को रोकने के लिए कोल्ड स्लग वेल बड़ा करें।"
    },
    "mr": {
      "cause": "• कमी शॉट व्हॉल्यूम: डोझिंग कमी होते किंवा नॉन-रिटर्न व्हॉल्व्ह निसटल्यामुळे कॅव्हिटीमध्ये प्लास्टिक कमी पडले.\n• मोल्डचा भाग तुटणे: कोर पिन किंवा गिअरच्या दाताचा तुकडा मोल्डमध्येच तुटून राहिला.\n• गेटमध्ये अडथळा: थंड प्लास्टिकचा खडा किंवा कचरा गेटमध्ये अडकला.",
      "action": "• लगेच मोल्ड तपासा: उत्पादन थांबवून मोल्डचे इन्सर्ट्स आणि पिन्स तुटले आहेत का ते तपासा.\n• शॉट साइझ वाढवा: 3–6 मिमी कुशन राहण्यासाठी मीटरिंग स्ट्रोक वाढवा.\n• कोल्ड स्लग वेल मोठे करा: न वितळलेले प्लास्टिक अडकवण्यासाठी रनर वेल मोठे करा."
    },
    "gu": {
      "cause": "• ઓછો શોટ વોલ્યુમ: ડોઝિંગ ઓછું હતું અથવા નોન-રીટર્ન વાલ્વ લિક થવાથી પ્લાસ્ટિક ઓછું પડ્યું.\n• મોલ્ડ ઇન્સર્ટ તૂટવું: કોર પિન અથવા ગિયર દાંતાનો ભાગ તૂટીને મોલ્ડમાં જ રહી ગયો.\n• ગેટ બ્લોક થવો: ઠંડુ મટીરીયલ અથવા કચરો ગેટમાં ફસાઈ ગયો.",
      "action": "• તરત જ મોલ્ડ તપાસો: ઉત્પાદન અટકાવીને તૂટેલા પિન અથવા દાંતાની તપાસ કરો.\n• શોટ સાઇઝ વધારો: 3–6 મીમી કુશન જાળવવા માટે મીટરિંગ વધારો.\n• કોલ્ડ સ્લગ વેલ મોટું કરો: ન ઓગળેલા પ્લાસ્ટિકને રોકવા માટે વેલ ઊંડું કરો."
    },
    "de": {
      "cause": "• Unterdosierung: Dosierweg zu kurz oder Rückstromsperre undicht, Kavität verhungert.\n• Werkzeugbruch: Kernstift, Zahnsegmenteinsatz oder Auswerferhülse im Werkzeug abgebrochen.\n• Anschnittverstopfung: Kaltstopfen oder Fremdkörper blockierte den Fließweg.",
      "action": "• Werkzeug sofort inspizieren: Produktion stoppen und Einsätze auf mechanischen Bruch prüfen.\n• Dosiervolumen erhöhen: Dosierweg vergrößern, um ein Restmassepolster von 3–6 mm zu sichern.\n• Kaltkavitäten vergrößern: Kaltkammervolumen vor dem Anschnitt vertiefen."
    },
    "es": {
      "cause": "• Dosificación insuficiente: Carrera de dosificación corta o válvula check con fugas, dejando la cavidad vacía.\n• Inserto de molde roto: Pin macho o inserto de diente de engranaje fracturado dentro del molde.\n• Obstrucción en compuerta: Tapón frío o partícula sólida atrapada en la entrada.",
      "action": "• Inspeccionar molde de inmediato: Detenga la máquina y verifique piezas o pines rotos.\n• Incrementar carrera de dosificación: Aumente el volumen para mantener un colchón de 3–6 mm.\n• Agrandar pozo de colada fría: Profundice los pozos de retención para atrapar polímero no fundido."
    }
  },
  "overflow": {
    "en": {
      "cause": "• Excessive Shot Volume: Dosing stroke too large, creating an excessive cushion that overfills the cavity.\n• Delayed Pressure Cut-Off: Injection stage pushed full hydraulic force into the cavity after volumetric fill was reached.\n• Inadequate Clamping Tonnage: Machine clamp deflected under dynamic hydraulic pressure peaks.",
      "action": "• Decrease Metering Stroke: Reduce shot size by 5–10% to establish an optimal 3–5mm melt cushion.\n• Advance V/P Switchover: Trigger holding pressure slightly earlier when cavity is 95% volumetrically filled.\n• Verify Clamping Tonnage: Verify machine tie-bar strain and increase mold clamp force."
    },
    "hi": {
      "cause": "• अत्यधिक शॉट साइज़: डोज़िंग स्ट्रोक बहुत अधिक था जिससे कैविटी क्षमता से अधिक भर गई।\n• देर से प्रेशर कट-ऑफ: कैविटी पूरी भरने के बाद भी बहुत देर तक पूरा इंजेक्शन दबाव लगा रहा।\n• क्लैंपिंग टनेज की कमी: भारी इंजेक्शन दबाव के कारण मशीन का क्लैंप थोड़ा खुल गया।",
      "action": "• मीटरिंग स्ट्रोक कम करें: सही 3–5 मिमी कुशन पाने के लिए शॉट साइज़ 5–10% कम करें।\n• स्विचओवर पहले करें: जब कैविटी 95% भर जाए तभी होल्डिंग प्रेशर पर स्विच करें।\n• क्लैंपिंग फोर्स बढ़ाएं: मशीन का क्लैंपिंग बल बढ़ाएं ताकि मोल्ड खुले नहीं।"
    },
    "mr": {
      "cause": "• जास्त शॉट व्हॉल्यूम: डोझिंग खूप जास्त असल्याने कॅव्हिटी क्षमतेपेक्षा जास्त भरली.\n• उशिरा प्रेशर कट-ऑफ: कॅव्हिटी भरल्यानंतरही बराच वेळ पूर्ण हायड्रॉलिक दाब चालू राहिला.\n• अपुरा क्लॅम्पिंग टनेज: प्रचंड दाबामुळे मोल्डचे भाग किंचित उघडले.",
      "action": "• मीटरिंग स्ट्रोक कमी करा: योग्य 3–5 मिमी कुशनसाठी शॉट साइझ 5–10% ने कमी करा.\n• व्ही/पी स्विचओव्हर आधी करा: 95% कॅव्हिटी भरल्यावर लगेच होल्डिंग प्रेशर लावा.\n• क्लॅम्पिंग टनेज वाढवा: मशीनचा क्लॅम्प फोर्स वाढवा जेणेकरून मोल्ड घट्ट बसेल."
    },
    "gu": {
      "cause": "• વધુ પડતો શોટ વોલ્યુમ: ડોઝિંગ વધુ હોવાથી કેવિટી ક્ષમતા કરતા વધુ ભરાઈ ગઈ.\n• દબાણ ઘટાડવામાં વિલંબ: કેવિટી ભરાયા પછી પણ પૂરતું દબાણ ચાલુ રહ્યું.\n• ક્લેમ્પિંગ ટનેજ ઓછું હોવું: ભારે દબાણને લીધે મોલ્ડ થોડું ખુલી ગયું.",
      "action": "• મીટરિંગ સ્ટ્રોક ઘટાડો: 3–5 મીમી કુશન જાળવવા માટે શોટ સાઇઝ 5–10% ઘટાડો.\n• સ્વીચઓવર વહેલું કરો: કેવિટી 95% ભરાય ત્યારે જ હોલ્ડ પ્રેશર પર ટ્રાન્સફર કરો.\n• ક્લેમ્પિંગ ફોર્સ વધારો: મોલ્ડ લોકીંગ ફોર્સ વધારો."
    },
    "de": {
      "cause": "• Überdosierung: Dosierhub zu groß, übermäßiges Massepolster überfüllte das Werkzeug.\n• Verzögerte Umschaltung: Voller Einspritzdruck stand nach Erreichen der volumetrischen Füllung an.\n• Schließkraft nachgiebig: Schließeinheit federte unter der Druckspitze elastisch auf.",
      "action": "• Dosierweg verringern: Schussgewicht um 5–10% senken, um 3–5 mm Polster einzustellen.\n• Umschaltpunkt vorverlegen: Bei 95% Füllgrad auf Nachdruck umschalten.\n• Zuhaltekraft prüfen: Schließkraft erhöhen und Holmdehnung kontrollieren."
    },
    "es": {
      "cause": "• Volumen de inyección excesivo: Carrera de dosificación sobredimensionada que sobrellenó la cavidad.\n• Corte de presión tardío: La máquina mantuvo toda la presión hidráulica tras completarse el llenado.\n• Tonelaje de cierre insuficiente: La unidad de cierre cedió ante los picos de presión dinámica.",
      "action": "• Reducir carrera de dosificación: Reduzca el tamaño del disparo en 5–10% para lograr 3–5 mm de colchón.\n• Adelantar conmutación V/P: Active la presión de sostenimiento al 95% del volumen de llenado.\n• Incrementar fuerza de cierre: Verifique el tonelaje y aumente la fuerza de bloqueo del molde."
    }
  },
  "perforation": {
    "en": {
      "cause": "• Severe Gas Trap / Air Void: Trapped air prevented converging melt fronts from joining, leaving a puncture hole.\n• Core Pin Penetration: Bent, misaligned, or oversized core pin poked through thin gear cross-sections.\n• Moisture Vaporization: High moisture content in hygroscopic polymer generated steam voids during injection.",
      "action": "• Dehumidify Raw Material: Pre-dry hygroscopic resin in a desiccant dryer according to resin specifications.\n• Add Venting at Weld-Lines: Install porous sintered steel vent plugs or deepen parting-line vents.\n• Inspect Core Pin Alignment: Check tool core pins for bending, runout, or misalignment."
    },
    "hi": {
      "cause": "• एयर ट्रैप या छेद: फंसी हवा के कारण पिघला प्लास्टिक आपस में जुड़ नहीं सका जिससे छेद रह गया।\n• कोर पिन का झुकना: मुड़ी या गलत संरेखित कोर पिन पतली दीवार के आर-पार निकल गई।\n• सामग्री में नमी: कच्चे माल में नमी के कारण भाप के बुलबुले बने और छेद बन गया।",
      "action": "• कच्चा माल अच्छी तरह सुखाएं: नमी सोखने वाले रेज़िन को ड्रायर में अनुशंसित समय तक सुखाएं।\n• वेंटिंग में सुधार करें: जहां छेद बना है वहां वेंटिंग प्लग लगाएं या वेंट्स गहरे करें।\n• कोर पिन की जांच करें: मुड़ी हुई कोर पिन की जांच करें और सीधा संरेखण सुनिश्चित करें।"
    },
    "mr": {
      "cause": "• एअर ट्रॅप / हवेचा फुगा: अडकलेल्या हवेमुळे वितळलेले प्लास्टिक एकत्र येऊ शकले नाही आणि छिद्र पडले.\n• कोर पिन वाकणे: वाकलेली किंवा चुकीच्या जागेवरील कोर पिन प्लास्टिकच्या भिंतीतून आरपार गेली.\n• कच्च्या मालातील ओलावा: प्लास्टिकमधील ओलाव्यामुळे वाफेचे बुडबुडे तयार होऊन छिद्र पडले.",
      "action": "• कच्चा माल वाळवा: डिह्युमिडिफायर ड्रायरमध्ये रेझिन पूर्णपणे वाळवून घ्या.\n• एअर व्हेंट्स वाढवा: जेथे छिद्र पडते तेथे व्हेंटिंग प्लग किंवा बारीक व्हेंट्स द्या.\n• कोर पिन तपासा: वाकलेल्या कोर पिन्स तपासा आणि बदलून घ्या."
    },
    "gu": {
      "cause": "• એર ટ્રેપ કાણું: ફસાયેલી હવાને લીધે પ્લાસ્ટિક એકબીજા સાથે જોડાઈ ન શક્યું અને કાણું પડી ગયું.\n• કોર પિન વળી જવી: વાંકી પિન પ્લાસ્ટિકની પાતળી દીવાલમાંથી આરપાર નીકળી ગઈ.\n• ભેજનું પ્રમાણ: મટીરીયલમાં ભેજ હોવાથી વરાળના પરપોટા બન્યા અને કાણું પડ્યું.",
      "action": "• કાચો માલ સૂકવો: ડ્રાયરમાં રેઝિનને ભલામણ કરેલ તાપમાને સારી રીતે સૂકવો.\n• વેન્ટિંગ સુધારો: જ્યાં કાણું પડે છે ત્યાં વેન્ટ પ્લગ ઉમેરો.\n• કોર પિન સીધી કરો: વાંકી પિન તપાસો અને યોગ્ય એલાઈનમેન્ટ સેટ કરો."
    },
    "de": {
      "cause": "• Starker Lufteinschluss: Eingeschlossene Luft verhinderte das Verschmelzen der Schmelzefronten.\n• Kernstift-Durchstich: Ein verbogener oder versetzter Kernstift durchdrang dünne Wandstärken.\n• Feuchtigkeitsblasen: Restfeuchte im Granulat erzeugte Dampfblasen und Perforationen.",
      "action": "• Rohmaterial vortrocknen: Hygroskopische Kunststoffe im Trockenlufttrockner gründlich trocknen.\n• Entlüftungen an Bindenähten: Sintermetall-Entlüftungseinsätze an den Fehlstellen einbauen.\n• Kernausrichtung prüfen: Kernstifte auf Rundlauf, Verbiegung und feste Führung kontrollieren."
    },
    "es": {
      "cause": "• Atrapamiento de gas severo: El aire atrapado impidió que los frentes de flujo fusionaran, dejando orificios.\n• Perforación por pin de núcleo: Un pin doblado o desalineado atravesó secciones delgadas.\n• Humedad en resina: Alto contenido de humedad generó bolsas de vapor que perforaron la pieza.",
      "action": "• Secar materia prima: Deshumidifique la resina en secador según las especificaciones del fabricante.\n• Agregar venteos en líneas de unión: Instale tapones de venteo sinterizados o profundice ranuras.\n• Inspeccionar pines de núcleo: Verifique alineación y sustituya pines doblados o flojos."
    }
  },
  "reverse": {
    "en": {
      "cause": "• Manual Loading Error: Machine operator inserted an asymmetrical insert or sleeve reversed or inverted into the mold.\n• Feeder Sensor Malfunction: Bowl feeder or robot vision orientation camera misread the component position.\n• Symmetrical Tool Nest: Mold cavity lacked mechanical Poka-Yoke indexing features.",
      "action": "• Implement Mechanical Poka-Yoke: Machine asymmetrical locator pins or step keys so parts only fit in one orientation.\n• Calibrate Vision / Proximity Sensors: Verify robot orientation sensors to abort cycle if part is reversed.\n• Visual Workplace Standards: Display clear color-coded orientation illustrations at the operator loading station."
    },
    "hi": {
      "cause": "• ऑपरेटर की गलती: ऑपरेटर ने इंसर्ट या पार्ट को मोल्ड में उल्टा रख दिया।\n• सेंसर की खराबी: रोबोट विज़न या फीडर सेंसर ने उल्टे पार्ट को सही मान लिया।\n• पोका-योक की कमी: मोल्ड में उल्टे पार्ट को रोकने वाला कोई लॉकिंग मैकेनिज्म नहीं था।",
      "action": "• पोका-योक लागू करें: मोल्ड में ऐसे पिन या स्लॉट बनाएं जिससे पार्ट सिर्फ सही दिशा में ही फिट हो सके।\n• विज़न सेंसर कैलिब्रेट करें: उल्टा पार्ट डिटेक्ट होते ही मशीन रोकने के लिए सेंसर सेट करें।\n• विजुअल गाइड लगाएं: ऑपरेटर के सामने सही दिशा दिखाने वाले रंगीन चित्र और बोर्ड लगाएं।"
    },
    "mr": {
      "cause": "• ऑपरेटरची चूक: ऑपरेटरने धातूचा इन्सर्ट मोल्डमध्ये उलटा ठेवला.\n• सेन्सरमधील बिघाड: रोबोट कॅमेऱ्याने किंवा सेन्सरने चुकीची दिशा ओळखली नाही.\n• पोका-योक नसणे: मोल्डमध्ये उलटा पार्ट बसण्यापासून रोखण्यासाठी खाच किंवा पिन नव्हती.",
      "action": "• मेकॅनिकल पोका-योक लावा: पार्ट फक्त एकाच योग्य दिशेने बसेल अशी पिन किंवा खाच बनवा.\n• सेन्सर्स कॅलिब्रेट करा: उलटा पार्ट येताच मशीन थांबेल अशी सेन्सर व्यवस्था करा.\n• व्हिज्युअल बोर्ड लावा: ऑपरेटरसमोर योग्य दिशा दर्शवणारे स्पष्ट मार्गदर्शक फलक लावा."
    },
    "gu": {
      "cause": "• ઓપરેટરની ભૂલ: ઓપરેટરે ઇન્સર્ટ મોલ્ડમાં ઊંધું મૂકી દીધું.\n• સેન્સરની ખામી: રોબોટ સેન્સર ઉલટો પાર્ટ ઓળખવામાં નિષ્ફળ રહ્યો.\n• પોકા-યોક ન હોવું: મોલ્ડમાં ઊંધો પાર્ટ બેસતો રોકવા માટે કોઈ મિકેનિકલ લોક નહોતું.",
      "action": "• પોકા-યોક પિન લગાવો: પાર્ટ ફક્ત એક જ સાચી દિશામાં બેસે તેવા અસમપ્રમાણ લોકીંગ બનાવો.\n• સેન્સર કેલિબ્રેટ કરો: ઊંધો પાર્ટ આવતા જ સાયકલ અટકી જાય તેવા સેન્સર સેટ કરો.\n• વિઝ્યુઅલ માર્ગદર્શિકા મૂકો: ઓપરેટર માટે યોગ્ય દિશા દર્શાવતા ચિત્રો લગાવો."
    },
    "de": {
      "cause": "• Manueller Einlegefehler: Bediener legte asymmetrische Einlegeteile seitenverkehrt ein.\n• Sensorfehllesung: Schwingförderer- oder Kameraausrichtung erkannte Bauteillage fehlerhaft.\n• Fehlendes Poka-Yoke: Werkzeugnest besaß keine mechanische Verdrehsicherung.",
      "action": "• Mechanisches Poka-Yoke nachrüsten: Asymmetrische Passstifte einfräsen, die falsche Lage unmöglich machen.\n• Lagesensoren kalibrieren: Abfrage-Sensoren programmieren, die bei Fehlstellung die Form sperren.\n• Visuelle Standards aushängen: Farbige Lagebeispiele direkt am Einlegeplatz anbringen."
    },
    "es": {
      "cause": "• Error de carga manual: El operador colocó el inserto invertido o al revés en la cavidad.\n• Falla de sensor de orientación: La cámara del robot o sensor de proximidad no detectó la inversión.\n• Falta de Poka-Yoke: El nido del molde carecía de pasadores mecánicos a prueba de error.",
      "action": "• Implementar Poka-Yoke mecánico: Mecanice pasadores asimétricos para que la pieza solo encaje en la posición correcta.\n• Calibrar sensores de visión: Configure sensores para abortar el ciclo si el inserto está invertido.\n• Estándar visual de trabajo: Coloque diagramas de orientación a color en el puesto del operador."
    }
  },
  "shortshot": {
    "en": {
      "cause": "• Insufficient Injection Pressure & Speed: Polymer froze before reaching the furthest gear tooth tips.\n• Undersized Metering Shot: Screw metering volume exhausted with 0mm cushion remaining.\n• Cold Mold or Low Melt Temperature: High resin viscosity caused excessive flow resistance through thin gear teeth.",
      "action": "• Increase Injection Pressure & Velocity: Raise primary fill pressure and injection speed to force melt into thin teeth.\n• Boost Metering Shot Size: Increase screw metering stroke to maintain a stable 4–6mm melt cushion.\n• Raise Barrel & Mold Temperatures: Increase front cylinder temperatures and mold temperature controller setpoint."
    },
    "hi": {
      "cause": "• कम इंजेक्शन दबाव और गति: प्लास्टिक दूर के गियर के दांतों तक पहुंचने से पहले ही जम गया।\n• कम शॉट वॉल्यूम: स्क्रू में प्लास्टिक खत्म हो गया और कुशन 0 मिमी बचा।\n• ठंडा मोल्ड या कम तापमान: प्लास्टिक का गाढ़ापन अधिक होने से वह पतले दांतों में पूरा नहीं भर पाया।",
      "action": "• इंजेक्शन दबाव और गति बढ़ाएं: पतले दांतों को भरने के लिए इंजेक्शन स्पीड और प्रेशर बढ़ाएं।\n• शॉट साइज़ बढ़ाएं: भरने के अंत में 4–6 मिमी कुशन बनाए रखने के लिए मीटरिंग स्ट्रोक बढ़ाएं।\n• मोल्ड और बैरल तापमान बढ़ाएं: नोजल और मोल्ड के तापमान में 5°C–10°C की वृद्धि करें।"
    },
    "mr": {
      "cause": "• कमी इंजेक्शन दाब व वेग: प्लास्टिक टोकापर्यंत पोहोचण्यापूर्वीच घट्ट झाले.\n• कमी शॉट व्हॉल्यूम: स्क्रू मधील प्लास्टिक संपले आणि कुशन 0 मिमी राहिले.\n• थंड मोल्ड किंवा कमी तापमान: प्लास्टिक घट्ट झाल्यामुळे दात्यांच्या बारीक भागात पोहोचले नाही.",
      "action": "• इंजेक्शन दाब आणि गती वाढवा: दात्यांचे बारीक कोपरे भरण्यासाठी गती आणि दाब वाढवा.\n• शॉट साइझ वाढवा: शेवटी 4–6 मिमी कुशन शिल्लक राहण्यासाठी डोझिंग वाढवा.\n• मोल्ड व बॅरल तापमान वाढवा: बॅरल आणि मोल्डचे तापमान वाढवून प्लास्टिकचा ओघ सुलभ करा."
    },
    "gu": {
      "cause": "• ઓછું ઇન્જેક્શન દબાણ અને ઝડપ: પ્લાસ્ટિક ગિયરના છેડા સુધી પહોંચે તે પહેલાં જ ઠંડુ થઈ ગયું.\n• ઓછો શોટ વોલ્યુમ: મટીરીયલ ખૂટી ગયું અને કુશન 0 મીમી રહ્યું.\n• ઠંડુ મોલ્ડ અથવા ઓછું તાપમાન: પ્લાસ્ટિક જાડું હોવાથી પાતળા દાંતા ભરાયા નહીં.",
      "action": "• ઇન્જેક્શન દબાણ અને ગતિ વધારો: પાતળા દાંતા ભરવા માટે ઝડપ અને દબાણ વધારો.\n• શોટ સાઇઝ વધારો: 4–6 મીમી કુશન જાળવવા માટે ડોઝિંગ સ્ટ્રોક વધારો.\n• તાપમાન વધારો: બેરલ અને મોલ્ડ તાપમાનમાં 5°C–10°C નો વધારો કરો."
    },
    "de": {
      "cause": "• Unzureichender Spritzdruck & Geschwindigkeit: Die Schmelze fror vor Erreichen der Zahnspitzen ein.\n• Unterdosierung: Dosierhub zu gering, Restmassepolster auf 0 mm abgefallen.\n• Kalte Form oder Schmelze: Hohe Viskosität bot zu viel Fließwiderstand in dünnen Zähnen.",
      "action": "• Einspritzdruck & -geschwindigkeit erhöhen: Fülldruck anheben, um dünnwandige Zahnspitzen zu füllen.\n• Dosiervolumen vergrößern: Schneckenhub erhöhen, um ein stabiles Polster von 4–6 mm zu sichern.\n• Masse- und Werkzeugtemperatur anheben: Zylindertemperaturen und Werkzeugthermostate erhöhen."
    },
    "es": {
      "cause": "• Presión y velocidad de inyección bajas: El polímero congeló antes de alcanzar las puntas de los dientes.\n• Volumen de inyección deficiente: El volumen se agotó quedando un colchón de 0 mm.\n• Molde frío o baja temperatura de masa: Alta viscosidad causó resistencia en los dientes delgados.",
      "action": "• Aumentar presión y velocidad de inyección: Incremente velocidad para llenar antes del congelamiento.\n• Aumentar carrera de dosificación: Suba el volumen para mantener un colchón estable de 4–6 mm.\n• Elevar temperaturas de cilindro y molde: Aumente la temperatura para reducir la viscosidad de la resina."
    }
  },
  "void": {
    "en": {
      "cause": "• Inadequate Holding Pressure: Insufficient packing pressure allowed volumetric shrinkage in thick gear sections.\n• Premature Gate Freeze: Gate froze shut before packing pressure could feed plastic into shrinking cores.\n• Rapid Surface Chilling: Outer skin chilled too fast while molten center contracted inward, pulling a vacuum void.",
      "action": "• Increase Hold Pressure & Time: Boost second-stage packing pressure and extend pack time until gate seals.\n• Enlarge Gate Cross-Section: Thicken gate dimensions to delay gate freeze-off and feed volumetric shrinkage.\n• Moderate Melt Temperature: Slightly reduce barrel melt temperature to decrease total volumetric shrinkage."
    },
    "hi": {
      "cause": "• होल्डिंग प्रेशर की कमी: मोटे हिस्सों में प्लास्टिक के सिकुड़ने की भरपाई के लिए दबाव कम था।\n• गेट का समय से पहले जमना: अंदरूनी हिस्से में प्लास्टिक पहुंचने से पहले ही गेट जम गया।\n• सतह का बहुत तेज ठंडा होना: बाहरी सतह जल्दी ठंडी हो गई और अंदर सिकुड़न से वैक्यूम बुलबुला बन गया।",
      "action": "• होल्डिंग प्रेशर और समय बढ़ाएं: पैकिंग प्रेशर बढ़ाएं और गेट सील होने तक होल्ड टाइम बढ़ाएं।\n• गेट का आकार बड़ा करें: गेट को थोड़ा मोटा करें ताकि वह जल्दी न जमे और प्लास्टिक की आपूर्ति बनी रहे।\n• मेल्ट तापमान थोड़ा कम करें: कुल सिकुड़न को कम करने के लिए बैरल तापमान हल्का घटाएं।"
    },
    "mr": {
      "cause": "• कमी होल्डिंग प्रेशर: जाड भागामध्ये प्लास्टिक आकुंचन पावल्यामुळे पोकळी निर्माण झाली.\n• गेट वेळेपूर्वी गोठणे: आत प्लास्टिक पोहोचण्याआधीच गेट गोठून बंद झाले.\n• पृष्ठभाग खूप वेगाने थंड होणे: बाहेरील थर वेगाने थंड झाला आणि आतील प्लास्टिक आकुंचन पावून पोकळी तयार झाली.",
      "action": "• होल्ड प्रेशर आणि वेळ वाढवा: पॅकिंग प्रेशर वाढवा आणि गेट सील होईपर्यंत वेळ द्या.\n• गेटचा आकार वाढवा: गेट जाड करा जेणेकरून ते लवकर गोठणार नाही.\n• मेल्ट तापमान थोडे कमी करा: आकुंचनाचे प्रमाण कमी करण्यासाठी बॅरल तापमान थोडे कमी करा."
    },
    "gu": {
      "cause": "• ઓછું હોલ્ડિંગ પ્રેશર: જાડા ભાગોમાં સંકોચન થવાને કારણે અંદર પોલાણ રહી ગયું.\n• ગેટ વહેલો જામી જવો: અંદર મટીરીયલ પહોંચે તે પહેલાં જ ગેટ સીલ થઈ ગયો.\n• સપાટી ઝડપથી ઠંડી થવી: બહારનું પડ ઝડપથી ઠંડુ થયું અને અંદર સંકોચનથી વેક્યુમ બન્યું.",
      "action": "• હોલ્ડ દબાણ અને સમય વધારો: પેકિંગ દબાણ વધારો અને ગેટ સીલ થાય ત્યાં સુધી દબાણ રાખો.\n• ગેટ સાઇઝ મોટી કરો: ગેટ થોડો જાડો કરો જેથી તે વહેલો ન જામે.\n• તાપમાન થોડું ઘટાડો: પ્લાસ્ટિકનું સંકોચન ઘટાડવા માટે તાપમાન સહેજ ઓછું કરો."
    },
    "de": {
      "cause": "• Unzureichender Nachdruck: Zu geringer Nachdruck glich die Volumenschwindung in dicken Zonen nicht aus.\n• Vorzeitige Anschnittversiegelung: Der Anschnitt fror ein, bevor Schmelze nachgedrückt werden konnte.\n• Schnelle Randschichtabkühlung: Feste Außenhaut hielt stand, während der flüssige Kern unter Lunkerbildung schrumpfte.",
      "action": "• Nachdruckhöhe & -zeit steigern: Nachdruck anheben und halten, bis der Anschnitt vollständig versiegelt ist.\n• Anschnittquerschnitt vergrößern: Anschnittdicke erhöhen, um das Einfrieren zu verzögern.\n• Massetemperatur moderat senken: Schmelzetemperatur leicht senken, um Gesamtschwindung zu verringern."
    },
    "es": {
      "cause": "• Presión de sostenimiento deficiente: Falta de empaque permitió contracción volumétrica en zonas gruesas.\n• Sellado prematuro de compuerta: La compuerta congeló antes de que la presión pudiera alimentar la masa.\n• Enfriamiento superficial brusco: La piel externa endureció mientras el centro líquido contrajo formando un vacío.",
      "action": "• Aumentar presión y tiempo de sostenimiento: Eleve la presión y manténgala hasta el sellado de compuerta.\n• Agrandar sección de compuerta: Engrose la compuerta para retrasar su congelamiento.\n• Moderar temperatura de masa: Reduzca ligeramente la temperatura para disminuir la contracción volumétrica."
    }
  },
  "white": {
    "en": {
      "cause": "• Ejection Stress Whitening: Ejector pins pushed against pliable plastic, causing localized molecular shear stress.\n• Inadequate Draft Angle: Cavity walls gripped gear perimeter tightly, resisting demolding.\n• Vacuum Sticking: Deep gear pockets created a vacuum lock against polished mold core steel.",
      "action": "• Extend Cooling Cycle: Allow more cooling time so the polymer achieves full stiffness before ejection.\n• Polish Ribs & Increase Draft: Increase draft angle to min 1.5° and polish draw surfaces in direction of draw.\n• Install Air Poppet Valves: Incorporate pneumatic poppet valves in cavity bottoms to break demolding vacuum."
    },
    "hi": {
      "cause": "• इजेक्शन स्ट्रेस व्हाइटनिंग: इजेक्टर पिनों ने नरम प्लास्टिक पर अत्यधिक दबाव डाला जिससे सफेद तनाव के निशान बन गए।\n• ड्राफ्ट एंगल की कमी: मोल्ड की दीवारें सीधी होने से गियर बाहर निकलने में अटक गया।\n• वैक्यूम लॉक: गहरे खांचों में हवा न होने से प्लास्टिक मोल्ड स्टील से चिपक गया।",
      "action": "• कूलिंग समय बढ़ाएं: पार्ट को इजेक्ट करने से पहले पूरी तरह कठोर होने के लिए अतिरिक्त कूलिंग समय दें।\n• ड्राफ्ट एंगल बढ़ाएं और पॉलिश करें: ड्राफ्ट एंगल कम से कम 1.5° करें और मोल्ड को निकासी की दिशा में पॉलिश करें।\n• एयर पॉप्पे वॉल्व लगाएं: मोल्ड से पार्ट आसानी से अलग करने के लिए हवा का वाल्व लगाएं।"
    },
    "mr": {
      "cause": "• जास्त इजेक्शन ताण: इजेक्शन पिनने मऊ प्लास्टिकवर जास्त दाब दिल्याने पांढरे डाग पडले.\n• ड्राफ्ट अँगल कमी असणे: कॅव्हिटीच्या भिंतींनी पार्ट घट्ट पकडल्याने तो सहजासहजी बाहेर आला नाही.\n• व्हॅक्यूम चिकटणे: खोल भागांमध्ये हवा अडकल्यामुळे पार्ट मोल्डला चिकटून राहिला.",
      "action": "• कूलिंग वेळ वाढवा: पार्ट पूर्णपणे कडक होण्यासाठी जास्त कूलिंग वेळ द्या.\n• ड्राफ्ट अँगल वाढवा आणि पॉलिश करा: ड्राफ्ट अँगल किमान 1.5° करा आणि मोल्ड पॉलिश करा.\n• एअर पॉप्पे वॉल्व्ह बसवा: डिमोल्डिंगमधील व्हॅक्यूम तोडण्यासाठी हवेचा व्हॉल्व्ह लावा."
    },
    "gu": {
      "cause": "• ઇજેક્શન તણાવના સફેદ નિશાન: પિનોએ નરમ પ્લાસ્ટિક પર વધુ દબાણ આપતાં સફેદ ડાઘા પડ્યા.\n• ડ્રાફ્ટ એંગલ ઓછો હોવો: મોલ્ડની દીવાલોએ પાર્ટને પકડી રાખ્યો હોવાથી બહાર કાઢવામાં મુશ્કેલી થઈ.\n• વેક્યુમ ચોંટવું: ઊંડા ભાગોમાં વેક્યુમ બનવાથી પ્લાસ્ટિક મોલ્ડ સાથે ચોંટી ગયું.",
      "action": "• કૂલિંગ સમય વધારો: પાર્ટ સંપૂર્ણ કઠણ થાય તે માટે કૂલિંગ સમય વધારો.\n• ડ્રાફ્ટ એંગલ વધારો અને પોલિશ કરો: ડ્રાફ્ટ એંગલ ન્યૂનતમ 1.5° કરો અને પોલિશ કરો.\n• એર પોપ્પે વાલ્વ લગાવો: મોલ્ડમાંથી પાર્ટ છૂટો પાડવા માટે એર વાલ્વ ઉમેરો."
    },
    "de": {
      "cause": "• Auswerfer-Weißbruch: Hohe Scherkräfte der Auswerferstifte überdehnten das noch weiche Polymergefüge.\n• Zu geringe Entformungsschräge: Kavitätswände klammerten das Zahnrad fest ein.\n• Vakuumbildung: Tiefe Rippen und Taschen saugten sich am polierten Werkzeugstahl fest.",
      "action": "• Kühlzeit verlängern: Das Bauteil vor dem Auswerfen vollständig abkühlen und versteifen lassen.\n• Entformungsschräge & Politur: Mindestens 1,5° Schräge vorsehen und in Entformungsrichtung polieren.\n• Belüftungsventile einbauen: Pneumatische Tellerventile im Boden einsetzen, um das Entformungsvakuum zu brechen."
    },
    "es": {
      "cause": "• Blanqueamiento por esfuerzo: Los eyectores empujaron contra plástico aún blando, provocando tensión molecular.\n• Ángulo de salida insuficiente: Las paredes del molde sujetaron fuertemente el engranaje resistiendo la expulsión.\n• Vacío en cavidad: Las cavidades profundas generaron un efecto ventosa contra el acero del molde.",
      "action": "• Extender tiempo de enfriamiento: Deje enfriar la pieza para que alcance rigidez total antes de expulsar.\n• Aumentar ángulo y pulir: Amplíe el ángulo a mínimo 1.5° y pula en dirección de salida.\n• Instalar válvulas de aire: Coloque válvulas neumáticas en el fondo para romper el vacío de desmoldeo."
    }
  }
}

languages_code = '''// translations.js — Multi-language translations for Defect Causes, Actions, and UI Labels
// Supported languages: English (en), Hindi (hi), Marathi (mr), Gujarati (gu), German (de), Spanish (es)

export const LANGUAGES = [
  { code: "en", label: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "mr", label: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "gu", label: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "de", label: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Spanish", nativeName: "Español", flag: "🇪🇸" },
];

export const UI_TRANSLATIONS = {
  en: {
    possible_cause: "POSSIBLE CAUSE",
    suggested_action: "RECOMMENDED CORRECTION",
    other_detections: "Other Detected Defect Types",
    detected_defects: "Detected Defects",
    defect_summary: "Defect classification summary with occurrence counts, confidence, and corrective actions",
    instances: "Instances",
    instance: "Instance",
    translate_label: "Language",
  },
  hi: {
    possible_cause: "संभावित कारण (POSSIBLE CAUSE)",
    suggested_action: "सुझाया गया सुधार (RECOMMENDED CORRECTION)",
    other_detections: "अन्य मिले डिफेक्ट्स (Other Detections)",
    detected_defects: "डिटेक्ट किए गए डिफेक्ट्स (Detected Defects)",
    defect_summary: "डिफेक्ट वर्गीकरण विवरण, संख्या, कॉन्फिडेंस और सुधार सुझाव",
    instances: "स्थान",
    instance: "स्थान",
    translate_label: "भाषा चुनें",
  },
  mr: {
    possible_cause: "संभाव्य कारण (POSSIBLE CAUSE)",
    suggested_action: "सुचवलेली उपाययोजना (RECOMMENDED CORRECTION)",
    other_detections: "इतर आढळलेले दोष (Other Detections)",
    detected_defects: "शोधलेले दोष (Detected Defects)",
    defect_summary: "दोषांचे वर्गीकरण, संख्या, कॉन्फिडन्स आणि दुरुस्तीचे उपाय",
    instances: "ठिकाणे",
    instance: "ठिकाण",
    translate_label: "भाषा निवडा",
  },
  gu: {
    possible_cause: "સંભવિત કારણ (POSSIBLE CAUSE)",
    suggested_action: "સુચવેલ સુધારો (RECOMMENDED CORRECTION)",
    other_detections: "અન્ય મળેલા ખામીઓ (Other Detections)",
    detected_defects: "શોધાયેલ ખામીઓ (Detected Defects)",
    defect_summary: "ખામી વર્ગીકરણ સારાંશ, સંખ્યા, કોન્ફિડન્સ અને સુધારા પગલાં",
    instances: "જગ્યાઓ",
    instance: "જગ્યા",
    translate_label: "ભાષા પસંદ કરો",
  },
  de: {
    possible_cause: "MÖGLICHE URSACHE",
    suggested_action: "EMPFOHLENE MASSNAHME",
    other_detections: "Weitere erkannte Fehlertypen",
    detected_defects: "Erkannte Fehler",
    defect_summary: "Fehlerübersicht mit Häufigkeit, Konfidenz und Korrekturmaßnahmen",
    instances: "Stellen",
    instance: "Stelle",
    translate_label: "Sprache",
  },
  es: {
    possible_cause: "CAUSA PROBABLE",
    suggested_action: "CORRECCIÓN RECOMENDADA",
    other_detections: "Otros Tipos de Defectos Detectados",
    detected_defects: "Defectos Detectados",
    defect_summary: "Resumen de clasificación con recuentos, confianza y acciones correctivas",
    instances: "Instancias",
    instance: "Instancia",
    translate_label: "Idioma",
  },
};

export const DEFECT_TRANSLATIONS = '''

content = languages_code + json.dumps(TRANSLATIONS_DATA, ensure_ascii=False, indent=2) + ";\n\n"

content += '''export function getTranslatedDefectInfo(defectKey, lang = "en") {
  if (!defectKey) return null;
  const key = defectKey.toLowerCase().trim();
  const defectEntry = DEFECT_TRANSLATIONS[key];
  if (!defectEntry) return null;

  const translation = defectEntry[lang] || defectEntry["en"];
  return translation || null;
}
'''

out_path = Path("d:/Downloads/MDM plastic_defect_dashboard/frontend/src/constants/translations.js")
out_path.write_text(content, encoding="utf-8")
print(f"Generated translations.js successfully! Length: {len(content)} bytes")
