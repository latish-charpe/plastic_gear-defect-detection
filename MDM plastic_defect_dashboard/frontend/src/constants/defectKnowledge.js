// defectKnowledge.js — Comprehensive Defect Knowledge Base for all 16 Plastic Gear Defect Classes
// Fully translated in English (en), Hindi (hi), Marathi (mr), and Gujarati (gu)

export const DEFECT_KNOWLEDGE_BASE = [
  {
    id: "broken",
    name: "Broken",
    category: "Mechanical & Tooling Defect",
    accentColor: "#3b82f6",
    translations: {
      en: {
        name: "Broken",
        description: "A gear tooth, outer rim, or center hub cracks, chips, or snaps off completely.",
        causes: [
          "Gear teeth stick inside the mold steel because of rough tool marks or a lack of release angle.",
          "High packing pressure squeezes too much plastic into the gear, creating heavy internal stress.",
          "The plastic material is brittle due to overheating or using too much regrind material.",
          "Ejector pins push unevenly, placing all mechanical force on a single tooth."
        ],
        avoid: [
          "Lower the holding pressure and holding time to stop over-packing the teeth.",
          "Add draft angle (0.5° to 1.0°) on the gear tooth profile and polish the mold surface in the draw direction.",
          "Slow down the ejector pin speed and make sure all ejector pins push together evenly.",
          "Use virgin plastic and keep regrind material below 15%."
        ]
      },
      hi: {
        name: "टूटा हुआ (Broken)",
        description: "गियर का दांत, बाहरी रिम या केंद्रीय हब टूट जाता है, चटक जाता है या पूरी तरह से अलग हो जाता है।",
        causes: [
          "खुरदरे टूल के निशानों या रिलीज एंगल की कमी के कारण गियर के दांत मोल्ड स्टील में चिपक जाते हैं।",
          "उच्च पैकिंग दबाव गियर में बहुत अधिक प्लास्टिक दबा देता है, जिससे भारी आंतरिक तनाव पैदा होता है।",
          "अत्यधिक गर्मी या बहुत अधिक रीग्राइंड सामग्री के उपयोग के कारण प्लास्टिक सामग्री भंगुर हो जाती है।",
          "इजेक्टर पिन असमान रूप से धक्का देते हैं, जिससे सारा यांत्रिक बल किसी एक दांत पर पड़ता है।"
        ],
        avoid: [
          "दांतों की ओवर-पैकिंग रोकने के लिए होल्डिंग प्रेशर और होल्डिंग समय कम करें।",
          "गियर टूथ प्रोफाइल पर ड्राफ्ट एंगल (0.5° से 1.0°) जोड़ें और ड्रा दिशा में मोल्ड सतह को पॉलिश करें।",
          "इजेक्टर पिन की गति धीमी करें और सुनिश्चित करें कि सभी इजेक्टर पिन एक समान धक्का दें।",
          "वर्जिन प्लास्टिक का उपयोग करें और रीग्राइंड सामग्री को 15% से नीचे रखें।"
        ]
      },
      mr: {
        name: "तुटलेला (Broken)",
        description: "गियरचा दात, बाहेरील रिम किंवा मध्यवर्ती हब क्रॅक होतो, तुटतो किंवा पूर्णपणे वेगळा होतो.",
        causes: [
          "खडबडीत टूल मार्क्स किंवा रिलीज अँगलच्या अभावामुळे गियरचे दात मोल्ड स्टीलमध्ये अडकतात.",
          "उच्च पॅकिंग दाबामुळे गियरमध्ये जास्त प्लास्टिक भरले जाते, ज्यामुळे अंतर्गत ताण निर्माण होतो.",
          "जास्त गरम झाल्यामुळे किंवा जास्त रीग्राइंड मटेरियल वापरल्यामुळे प्लास्टिक ठिसूळ होते.",
          "इजेक्टर पिन असमानपणे ढकलतात, ज्यामुळे सर्व यांत्रिक दाब एकाच दातावर येतो."
        ],
        avoid: [
          "दातांचे जास्त पॅकिंग रोखण्यासाठी होल्डिंग प्रेशर आणि होल्डिंग वेळ कमी करा.",
          "गियर टूथ प्रोफाइलवर ड्राफ्ट अँगल (0.5° ते 1.0°) जोडा आणि ड्रॉ दिशेने मोल्ड पृष्ठभाग पॉलिश करा.",
          "इजेक्टर पिनचा वेग कमी करा आणि सर्व इजेक्टर पिन एकाच वेळी समानपणे ढकलत असल्याची खात्री करा.",
          "व्हर्जिन प्लास्टिक वापरा आणि रीग्राइंड मटेरियल 15% पेक्षा कमी ठेवा."
        ]
      },
      gu: {
        name: "તૂટેલું (Broken)",
        description: "ગિયરનો દાંત, બહારની રીમ અથવા સેન્ટર હબ ક્રેક થાય છે, તૂટી જાય છે અથવા સંપૂર્ણપણે અલગ થઈ જાય છે.",
        causes: [
          "ખરબચડા ટૂલ માર્ક્સ અથવા ડ્રાફ્ટ એંગલના અભાવને કારણે ગિયરના દાંત મોલ્ડ સ્ટીલની અંદર ચોંટી જાય છે.",
          "ઊંચું પેકિંગ દબાણ ગિયરમાં વધુ પડતું પ્લાસ્ટિક ભરી દે છે, જેથી આંતરિક તણાવ ઊભો થાય છે.",
          "વધુ પડતી ગરમી અથવા વધુ રીગ્રાઇન્ડ મટિરિયલના ઉપયોગને કારણે પ્લાસ્ટિક બરડ થઈ જાય છે.",
          "ઇજેક્ટર પિન અસમાન રીતે દબાણ કરે છે, જેનાથી તમામ યાંત્રિક બળ એક જ દાંત પર આવે છે."
        ],
        avoid: [
          "દાંતના ઓવર-પેકિંગને રોકવા માટે હોલ્ડિંગ પ્રેશર અને હોલ્ડિંગ ટાઇમ ઘટાડો.",
          "ગિયર ટૂથ પ્રોફાઇલ પર ડ્રાફ્ટ એંગલ (0.5° થી 1.0°) ઉમેરો અને ડ્રો દિશામાં મોલ્ડ સપાટીને પોલિશ કરો.",
          "ઇજેક્ટર પિનની સ્પીડ ધીમી કરો અને ખાતરી કરો કે તમામ ઇજેક્ટર પિન સરખી રીતે દબાણ કરે છે.",
          "વર્જિન પ્લાસ્ટિકનો ઉપયોગ કરો અને રીગ્રાઇન્ડ મટિરિયલ 15% થી ઓછું રાખો."
        ]
      }
    }
  },
  {
    id: "bulge",
    name: "Bulge",
    category: "Cooling & Shrinkage Defect",
    accentColor: "#10b981",
    translations: {
      en: {
        name: "Bulge",
        description: "A swollen bump or raised, rounded bubble on the gear surface or hub wall.",
        causes: [
          "The cooling time is too short; the outer surface hardens, but the inside core is still soft and molten when the mold opens.",
          "The hot internal plastic expands outward once mold pressure is released.",
          "Packing pressure is too concentrated right in front of the gate."
        ],
        avoid: [
          "Increase cooling time by a few seconds so the center of the part freezes completely.",
          "Lower the mold cooling water temperature to draw heat out faster.",
          "Lower holding pressure to prevent excess melt concentration around the gate.",
          "Add cooling bubblers or baffles inside the mold core pin under the gear hub."
        ]
      },
      hi: {
        name: "उभार (Bulge)",
        description: "गियर की सतह या हब की दीवार पर उभरा हुआ उभार या फफोला।",
        causes: [
          "कूलिंग का समय बहुत कम है; बाहरी सतह सख्त हो जाती है, लेकिन मोल्ड खुलने पर आंतरिक कोर अभी भी नरम और पिघला हुआ होता है।",
          "मोल्ड का दबाव हटने पर गर्म आंतरिक प्लास्टिक बाहर की ओर फैलता है।",
          "गेट के ठीक सामने पैकिंग का दबाव बहुत अधिक केंद्रित होता है।"
        ],
        avoid: [
          "कूलिंग समय कुछ सेकंड बढ़ाएँ ताकि भाग का केंद्र पूरी तरह जम जाए।",
          "गर्मी को तेजी से बाहर निकालने के लिए मोल्ड कूलिंग पानी का तापमान कम करें।",
          "गेट के आसपास अतिरिक्त पिघले प्लास्टिक के जमाव को रोकने के लिए होल्डिंग प्रेशर कम करें।",
          "गियर हब के नीचे मोल्ड कोर पिन के अंदर कूलिंग बबलर या बैफल्स जोड़ें।"
        ]
      },
      mr: {
        name: "फुगवटा (Bulge)",
        description: "गियरच्या पृष्ठभागावर किंवा हबच्या भिंतीवर आलेला फुगवटा किंवा गोलाकार उंचवटा.",
        causes: [
          "कुलिंग वेळ खूप कमी आहे; बाहेरील पृष्ठभाग घट्ट होतो, परंतु मोल्ड उघडल्यावर आतील गाभा अजूनही मऊ आणि वितळलेला असतो.",
          "मोल्डचा दाब सोडल्यानंतर गरम आतील प्लास्टिक बाहेर पसरते.",
          "गेटच्या अगदी समोर पॅकिंगचा दाब जास्त केंद्रित असतो."
        ],
        avoid: [
          "कुलिंग वेळ काही सेकंद वाढवा जेणेकरून भागाचा मध्यभाग पूर्णपणे घट्ट होईल.",
          "उष्णता वेगाने बाहेर काढण्यासाठी मोल्ड कुलिंग पाण्याचे तापमान कमी करा.",
          "गेटभोवती जास्त वितळलेले प्लास्टिक जमा होण्यापासून रोखण्यासाठी होल्डिंग प्रेशर कमी करा.",
          "गियर हबखालील मोल्ड कोर पिनमध्ये कुलिंग बबलर किंवा बॅफल्स जोडा."
        ]
      },
      gu: {
        name: "સોજો / પરપોટો (Bulge)",
        description: "ગિયરની સપાટી અથવા હબની દીવાલ પર સોજો કે ફૂલેલો ગોળાકાર પરપોટો.",
        causes: [
          "કૂલિંગ સમય ઘણો ઓછો છે; બહારની સપાટી કઠણ થઈ જાય છે, પરંતુ મોલ્ડ ખુલતી વખતે અંદરનો ભાગ નરમ અને પીગળેલો હોય છે.",
          "મોલ્ડનું દબાણ ઘટતાં ગરમ આંતરિક પ્લાસ્ટિક બહારની તરફ ફેલાય છે.",
          "ગેટની બરાબર સામે પેકિંગ પ્રેશર વધુ કેન્દ્રિત હોય છે."
        ],
        avoid: [
          "કૂલિંગ સમય થોડી સેકન્ડ વધારો જેથી ભાગનો મધ્ય ભાગ સંપૂર્ણપણે જામી જાય.",
          "ગરમી ઝડપથી બહાર કાઢવા મોલ્ડ કૂલિંગ પાણીનું તાપમાન ઓછું કરો.",
          "ગેટની આસપાસ વધારાના પ્લાસ્ટિકને જમા થવાથી રોકવા હોલ્ડિંગ પ્રેશર ઘટાડો.",
          "ગિયર હબની નીચે મોલ્ડ કોર પિનની અંદર કૂલિંગ બબલર્સ અથવા બેફલ્સ ઉમેરો."
        ]
      }
    }
  },
  {
    id: "burn",
    name: "Burn",
    category: "Thermal & Venting Defect",
    accentColor: "#ef4444",
    translations: {
      en: {
        name: "Burn",
        description: "Dark brown or black charred burn spots on the plastic surface, especially at the tips of the teeth.",
        causes: [
          "Air inside the mold cavity gets trapped by the incoming melt and cannot escape. The rapidly compressed air creates extreme heat and scorches the plastic.",
          "Barrel and nozzle temperatures are set too high.",
          "Narrow gate size creates severe friction and shear heat."
        ],
        avoid: [
          "Slow down injection speed at the end of fill (fill fast at first, then slow down for the final 10%).",
          "Clean the mold air vents with a soft cloth and mold cleaner to clear away plastic residue.",
          "Deepen mold vents (0.015 mm to 0.03 mm depending on the plastic type).",
          "Lower barrel and nozzle temperatures to prevent thermal breakdown."
        ]
      },
      hi: {
        name: "जलन (Burn)",
        description: "प्लास्टिक की सतह पर गहरे भूरे या काले जले हुए निशान, विशेषकर दांतों के सिरों पर।",
        causes: [
          "मोल्ड कैविटी के अंदर की हवा पिघले प्लास्टिक के कारण फंस जाती है और बाहर नहीं निकल पाती। संपीड़ित हवा अत्यधिक गर्मी पैदा करके प्लास्टिक को जला देती है।",
          "बैरल और नोजल का तापमान बहुत अधिक सेट है।",
          "संकीर्ण गेट आकार के कारण घर्षण और अत्यधिक कतरनी गर्मी पैदा होती है।"
        ],
        avoid: [
          "भराव के अंत में इंजेक्शन की गति धीमी करें (पहले तेजी से भरें, फिर अंतिम 10% के लिए धीमा करें)।",
          "प्लास्टिक अवशेषों को हटाने के लिए मुलायम कपड़े और मोल्ड क्लीनर से मोल्ड एयर वेंट को साफ करें।",
          "मोल्ड वेंट को गहरा करें (प्लास्टिक प्रकार के आधार पर 0.015 मिमी से 0.03 मिमी)।",
          "थर्मल ब्रेकडाउन को रोकने के लिए बैरल और नोजल का तापमान कम करें।"
        ]
      },
      mr: {
        name: "जळणे (Burn)",
        description: "प्लास्टिकच्या पृष्ठभागावर, विशेषतः दातांच्या टोकांवर गडद तपकिरी किंवा काळे जळालेले डाग.",
        causes: [
          "मोल्ड कॅव्हिटीमधील हवा आत येणाऱ्या प्लास्टिकमुळे अडकते आणि बाहेर पडू शकत नाही. वेगाने संकुचित झालेली हवा तीव्र उष्णता निर्माण करून प्लास्टिक जाळते.",
          "बॅरल आणि नोझलचे तापमान खूप जास्त ठेवलेले असते.",
          "लहान गेट आकारामुळे तीव्र घर्षण आणि उष्णता निर्माण होते."
        ],
        avoid: [
          "फिलिंगच्या शेवटी इंजेक्शनचा वेग कमी करा (सुरुवातीला जलद भरा, नंतर शेवटच्या 10% साठी वेग कमी करा).",
          "प्लास्टिकचे अवशेष साफ करण्यासाठी मऊ कापड आणि मोल्ड क्लिनरने मोल्ड एअर व्हेंट्स स्वच्छ करा.",
          "मोल्ड व्हेंट्स खोल करा (प्लास्टिक प्रकारानुसार 0.015 मिमी ते 0.03 मिमी).",
          "थर्मल ब्रेकडाउन रोखण्यासाठी बॅरल आणि नोझलचे तापमान कमी करा."
        ]
      },
      gu: {
        name: "બર્ન / બળેલું (Burn)",
        description: "પ્લાસ્ટિકની સપાટી પર ઘેરા બદામી અથવા કાળા બળેલા ડાઘ, ખાસ કરીને દાંતના છેડા પર.",
        causes: [
          "મોલ્ડ કેવિટીની અંદરની હવા પ્લાસ્ટિક આવવાથી ફસાઈ જાય છે અને બહાર નીકળી શકતી નથી. દબાયેલી હવા તીવ્ર ગરમી પેદા કરીને પ્લાસ્ટિકને બાળી નાખે છે.",
          "બેરલ અને નોઝલનું તાપમાન વધુ પડતું ઊંચું સેટ કરેલું હોય છે.",
          "સાંકડી ગેટ સાઇઝ વધુ ઘર્ષણ અને હીટ પેદા કરે છે."
        ],
        avoid: [
          "ભરવાના અંતે ઇન્જેક્શનની ગતિ ધીમી કરો (શરૂઆતમાં ઝડપથી ભરો, પછી છેલ્લા 10% માટે ધીમી કરો).",
          "પ્લાસ્ટિકના અવશેષો સાફ કરવા નરમ કપડા અને મોલ્ડ ક્લીનરથી મોલ્ડ એર વેન્ટ્સ સાફ કરો.",
          "મોલ્ડ વેન્ટ્સ ઊંડા કરો (પ્લાસ્ટિકના પ્રકાર મુજબ 0.015 મીમી થી 0.03 મીમી).",
          "થર્મલ બ્રેકડાઉન રોકવા માટે બેરલ અને નોઝલનું તાપમાન ઓછું કરો."
        ]
      }
    }
  },
  {
    id: "damage",
    name: "Damage",
    category: "Handling & Part Removal Defect",
    accentColor: "#f59e0b",
    translations: {
      en: {
        name: "Damage",
        description: "Scratches, cuts, gouges, or dents on the finished gear surface or tooth profile.",
        causes: [
          "Robot gripper fingers squeeze the part too hard or slip during extraction.",
          "Parts hit hard steel conveyor edges, slide chutes, or drop too far into collection boxes.",
          "Operators handle parts roughly during trimming, sorting, or packing."
        ],
        avoid: [
          "Attach soft silicone or rubber pads to robot gripper fingers.",
          "Align robot takeout position precisely with the mold open stop position.",
          "Add soft foam cushioning on conveyor drop areas and keep drop heights under 150 mm.",
          "Pack gears into compartmentalized trays instead of dumping them together in bulk boxes."
        ]
      },
      hi: {
        name: "क्षति (Damage)",
        description: "तैयार गियर की सतह या टूथ प्रोफाइल पर खरोंच, कट, निशान या गड्ढे।",
        causes: [
          "रोबोट ग्रिपर फिंगर्स भाग को बहुत जोर से दबाते हैं या बाहर निकालते समय फिसल जाते हैं।",
          "पुर्जे स्टील कन्वेयर किनारों, स्लाइड च्यूट से टकराते हैं या संग्रह बक्से में बहुत ऊपर से गिरते हैं।",
          "ट्रिमिंग, छंटाई या पैकिंग के दौरान ऑपरेटर पुर्जों को लापरवाही से संभालते हैं।"
        ],
        avoid: [
          "रोबोट ग्रिपर उंगलियों पर मुलायम सिलिकॉन या रबर पैड लगाएं।",
          "रोबोट टेकआउट स्थिति को मोल्ड ओपन स्टॉप स्थिति के साथ सटीक रूप से संरेखित करें।",
          "कन्वेयर ड्रॉप क्षेत्रों पर सॉफ्ट फोम कुशनिंग लगाएं और ड्रॉप ऊंचाई 150 मिमी से कम रखें।",
          "गियरों को थोक बक्से में एक साथ डंप करने के बजाय डिब्बों वाली ट्रे में पैक करें।"
        ]
      },
      mr: {
        name: "नुकसान (Damage)",
        description: "तयार गियरच्या पृष्ठभागावर किंवा दातांवर ओरखडे, कट, खाचा किंवा खड्डे.",
        causes: [
          "रोबोट ग्रिपर बोटे भागाला खूप घट्ट दाबतात किंवा बाहेर काढताना निसटतात.",
          "भाग स्टील कन्व्हेयर कडा, स्लाइड शूटला धडकतात किंवा संकलन बॉक्समध्ये खूप उंचावरून पडतात.",
          "ट्रिमिंग, वर्गीकरण किंवा पॅकिंग दरम्यान कामगार भागांना निष्काळजीपणे हाताळतात."
        ],
        avoid: [
          "रोबोट ग्रिपर बोटांवर मऊ सिलिकॉन किंवा रबर पॅड लावा.",
          "रोबोट टेकआउट स्थिती मोल्ड ओपन स्टॉप स्थितीशी तंतोतंत जुळवून घ्या.",
          "कन्व्हेयर ड्रॉप भागात मऊ फोम कुशनिंग जोडा आणि पडण्याची उंची 150 मिमी पेक्षा कमी ठेवा.",
          "गियर्स मोठ्या बॉक्समध्ये एकत्र टाकण्याऐवजी कप्पे असलेल्या ट्रेमध्ये पॅक करा."
        ]
      },
      gu: {
        name: "નુકસાન / ડેમેજ (Damage)",
        description: "તૈયાર ગિયરની સપાટી અથવા દાંતની પ્રોફાઇલ પર સ્ક્રેચ, કાપ, ખાડા કે ડેન્ટ્સ.",
        causes: [
          "રોબોટ ગ્રિપર ફિંગર્સ ભાગને વધુ પડતા જોરથી દબાવે છે અથવા કાઢતી વખતે લપસી જાય છે.",
          "પાર્ટ્સ સ્ટીલ કન્વેયર કિનારીઓ સાથે અથડાય છે અથવા કલેક્શન બોક્સમાં વધુ ઊંચાઈથી પડે છે.",
          "ટ્રિમિંગ, સોર્ટિંગ કે પેકિંગ દરમિયાન ઓપરેટરો પાર્ટ્સને બેદરકારીથી હેન્ડલ કરે છે."
        ],
        avoid: [
          "રોબોટ ગ્રિપર ફિંગર્સ પર સોફ્ટ સિલિકોન અથવા રબર પેડ્સ લગાવો.",
          "રોબોટ ટેકઆઉટ પોઝિશનને મોલ્ડ ઓપન સ્ટોપ પોઝિશન સાથે બરાબર અલાઇન કરો.",
          "કન્વેયર ડ્રોપ વિસ્તારોમાં સોફ્ટ ફોમ કુશનિંગ ઉમેરો અને ડ્રોપ હાઇટ 150 મીમીથી ઓછી રાખો.",
          "ગિયર્સને બલ્ક બોક્સમાં એકસાથે ફેંકવાને બદલે ખાનાવાળી ટ્રેમાં પેક કરો."
        ]
      }
    }
  },
  {
    id: "darkspot",
    name: "Darkspot",
    category: "Material Contamination Defect",
    accentColor: "#8b5cf6",
    translations: {
      en: {
        name: "Darkspot",
        description: "Small black or dark brown specks embedded inside or on the surface of the plastic.",
        causes: [
          "Plastic gets stuck inside dead corners of the screw tip or check ring, burns over time, and flakes off into the melt stream.",
          "Contaminated regrind material or dirty factory air falling into an open hopper.",
          "High screw RPM and high back pressure generate excessive shear heat."
        ],
        avoid: [
          "Purge the barrel using a high-viscosity commercial purging compound.",
          "Do not leave the machine idling with hot heaters on; lower barrel temps if stopping production.",
          "Lower screw rotation speed (RPM) and back pressure to minimize shear degradation.",
          "Keep material hopper lids sealed and clean vacuum loader filters daily."
        ]
      },
      hi: {
        name: "डार्क स्पॉट (Darkspot)",
        description: "प्लास्टिक के अंदर या सतह पर छोटे काले या गहरे भूरे रंग के धब्बे।",
        causes: [
          "स्क्रू टिप या चेक रिंग के मृत कोनों में प्लास्टिक फंस जाता है, समय के साथ जलता है और पिघली धारा में गिर जाता है।",
          "दूषित रीग्राइंड सामग्री या खुले हॉपर में गिरने वाली कारखाने की गंदी हवा।",
          "उच्च स्क्रू आरपीएम और उच्च बैक प्रेशर अत्यधिक कतरनी गर्मी उत्पन्न करते हैं।"
        ],
        avoid: [
          "उच्च-चिपचिपापन वाले वाणिज्यिक पर्जिंग कंपाउंड का उपयोग करके बैरल को पर्ज करें।",
          "हीटर चालू रखकर मशीन को खाली न छोड़ें; उत्पादन बंद करने पर बैरल का तापमान कम करें।",
          "स्क्रू रोटेशन गति (RPM) और बैक प्रेशर कम करें ताकि कतरनी क्षरण न्यूनतम हो।",
          "सामग्री हॉपर के ढक्कन बंद रखें और वैक्यूम लोडर फिल्टर रोजाना साफ करें।"
        ]
      },
      mr: {
        name: "काळे डाग (Darkspot)",
        description: "प्लास्टिकच्या आत किंवा पृष्ठभागावर लहान काळे किंवा गडद तपकिरी डाग.",
        causes: [
          "स्क्रू टिप किंवा चेक रिंगच्या कोपऱ्यात प्लास्टिक अडकते, कालांतराने जळते आणि वितळलेल्या प्रवाहात मिसळते.",
          "दूषित रीग्राइंड मटेरियल किंवा उघड्या हॉपरमध्ये पडणारी अस्वच्छ हवा.",
          "जास्त स्क्रू आरपीएम आणि जास्त बॅक प्रेशरमुळे अतिरिक्त उष्णता निर्माण होते."
        ],
        avoid: [
          "उच्च-स्निग्धता व्यावसायिक पर्जिंग कंपाऊंड वापरून बॅरल स्वच्छ करा.",
          "हीटर्स चालू ठेवून मशीन निष्क्रिय ठेवू नका; उत्पादन थांबवल्यास बॅरल तापमान कमी करा.",
          "स्क्रू रोटेशन गती (RPM) आणि बॅक प्रेशर कमी करा.",
          "मटेरियल हॉपरचे झाकण बंद ठेवा आणि व्हॅक्यूम लोडर फिल्टर्स दररोज स्वच्छ करा."
        ]
      },
      gu: {
        name: "ડાર્ક સ્પોટ (Darkspot)",
        description: "પ્લાસ્ટિકની અંદર અથવા સપાટી પર નાના કાળા કે ઘેરા બદામી ટપકાં.",
        causes: [
          "સ્ક્રૂ ટીપ અથવા ચેક રિંગના ખૂણામાં પ્લાસ્ટિક ફસાઈ જાય છે, સમય જતાં બળી જાય છે અને ઓગળેલા પ્રવાહમાં ભળી જાય છે.",
          "દૂષિત રીગ્રાઇન્ડ મટિરિયલ અથવા ખુલ્લા હોપરમાં પડતી ફેક્ટરીની ધૂળવાળી હવા.",
          "ઊંચા સ્ક્રૂ આરપીએમ અને ઊંચા બેક પ્રેશરથી વધુ પડતી હીટ પેદા થાય છે."
        ],
        avoid: [
          "હાઇ-વિસ્કોસિટી કોમર્શિયલ પર્જિંગ કમ્પાઉન્ડનો ઉપયોગ કરીને બેરલ સાફ કરો.",
          "હીટર ચાલુ રાખીને મશીનને ખાલી ન છોડો; ઉત્પાદન બંધ કરતી વખતે બેરલનું તાપમાન ઓછું કરો.",
          "સ્ક્રૂ રોટેશન સ્પીડ (RPM) અને બેક પ્રેશર ઘટાડો.",
          "મટિરિયલ હોપરના ઢાંકણાં સીલ રાખો અને વેક્યૂમ લોડર ફિલ્ટર્સ દરરોજ સાફ કરો."
        ]
      }
    }
  },
  {
    id: "dirt",
    name: "Dirt",
    category: "Contamination & Cleanliness Defect",
    accentColor: "#ec4899",
    translations: {
      en: {
        name: "Dirt",
        description: "Loose dust particles, oil film, grease marks, or hand smudges on the gear surface.",
        causes: [
          "Ambient factory dust settles onto open mold faces between machine cycles.",
          "Too much grease on ejector pins leaks into the molding cavity.",
          "Raw material bags or hoppers are left uncovered."
        ],
        avoid: [
          "Wipe the mold cavity regularly with a clean, lint-free cloth and mold cleaner.",
          "Use minimal, high-temperature, food-grade grease on ejector pins and slides.",
          "Run the machine on continuous automatic mode to keep mold open times short.",
          "Keep all material storage containers, dryers, and hoppers covered at all times."
        ]
      },
      hi: {
        name: "धूल / तेल (Dirt)",
        description: "गियर की सतह पर धूल के कण, तेल की परत, ग्रीस के निशान या हाथों के धब्बे।",
        causes: [
          "मशीन चक्रों के बीच खुली मोल्ड सतहों पर कारखाने की धूल जम जाती है।",
          "इजेक्टर पिन पर बहुत अधिक ग्रीस मोल्ड कैविटी में रिस जाता है।",
          "कच्चे माल के बैग या हॉपर खुले छोड़ दिए जाते हैं।"
        ],
        avoid: [
          "एक साफ, लिंट-फ्री कपड़े और मोल्ड क्लीनर से मोल्ड कैविटी को नियमित रूप से पोंछें।",
          "इजेक्टर पिन और स्लाइड पर न्यूनतम, उच्च तापमान वाले फूड-ग्रेड ग्रीस का उपयोग करें।",
          "मोल्ड खुले रहने का समय कम रखने के लिए मशीन को निरंतर स्वचालित मोड पर चलाएं।",
          "सामग्री भंडारण कंटेनर, ड्रायर और हॉपर को हर समय ढककर रखें।"
        ]
      },
      mr: {
        name: "धूळ / घाण (Dirt)",
        description: "गियरच्या पृष्ठभागावर धुळीचे कण, तेलाचा थर, ग्रीसचे डाग किंवा हाताचे ठसे.",
        causes: [
          "मशीन सायकल दरम्यान उघड्या मोल्ड पृष्ठभागावर कारखान्यातील धूळ साचते.",
          "इजेक्टर पिनवरील जास्त ग्रीस मोल्ड कॅव्हिटीमध्ये गळते.",
          "कच्च्या मालाच्या पिशव्या किंवा हॉपर उघडे ठेवले जातात."
        ],
        avoid: [
          "स्वच्छ, लिंट-फ्री कापड आणि मोल्ड क्लिनरने मोल्ड कॅव्हिटी नियमितपणे पुसून घ्या.",
          "इजेक्टर पिन आणि स्लाइड्सवर कमीतकमी, उच्च-तापमान फूड-ग्रेड ग्रीस वापरा.",
          "मोल्ड उघडे राहण्याची वेळ कमी ठेवण्यासाठी मशीन सतत ऑटोमॅटिक मोडवर चालवा.",
          "सर्व मटेरियल कंटेनर, ड्रायर्स आणि हॉपर नेहमी झाकून ठेवा."
        ]
      },
      gu: {
        name: "ધૂળ / ગ્રીસ (Dirt)",
        description: "ગિયરની સપાટી પર ધૂળના કણો, ઓઇલ ફિલ્મ, ગ્રીસના ડાઘ અથવા હાથના નિશાન.",
        causes: [
          "મશીન સાયકલ વચ્ચે ખુલ્લી મોલ્ડ સપાટી પર ફેક્ટરીની ધૂળ જામી જાય છે.",
          "ઇજેક્ટર પિન પરનું વધુ પડતું ગ્રીસ મોલ્ડ કેવિટીમાં લીક થાય છે.",
          "કાચા માલની બેગ અથવા હોપર ખુલ્લા છોડી દેવામાં આવે છે."
        ],
        avoid: [
          "સ્વચ્છ, લિન્ટ-ફ્રી કાપડ અને મોલ્ડ ક્લીનરથી મોલ્ડ કેવિટી નિયમિતપણે સાફ કરો.",
          "ઇજેક્ટર પિન અને સ્લાઇડ્સ પર ન્યૂનતમ, હાઇ-ટેમ્પરેચર ફૂડ-ગ્રેડ ગ્રીસનો ઉપયોગ કરો.",
          "મોલ્ડ ખુલ્લો રહેવાનો સમય ઓછો રાખવા મશીનને સતત ઓટોમેટિક મોડ પર ચલાવો.",
          "તમામ મટિરિયલ સ્ટોરેજ કન્ટેનર, ડ્રાયર અને હોપર હંમેશા ઢાંકેલા રાખો."
        ]
      }
    }
  },
  {
    id: "flash",
    name: "Flash",
    category: "Clamping & Pressure Defect",
    accentColor: "#06b6d4",
    translations: {
      en: {
        name: "Flash",
        description: "A thin, unwanted excess film of plastic sticking out along the parting line or ejector pin edges.",
        causes: [
          "Clamping force (tonnage) is too low to resist internal injection pressure.",
          "Switching from injection speed to holding pressure happens too late (over-filling the cavity).",
          "Mold parting line surfaces are worn, dented, or contaminated with crushed plastic."
        ],
        avoid: [
          "Increase clamping tonnage on the machine.",
          "Set the V-P switchover earlier (switch when the cavity is 95% full by volume).",
          "Reduce injection pressure and holding pressure.",
          "Clean the parting faces and check surface contact using blue contact paste."
        ]
      },
      hi: {
        name: "फ्लैश (Flash)",
        description: "पार्टिंग लाइन या इजेक्टर पिन के किनारों पर चिपकी हुई प्लास्टिक की पतली, अवांछित अतिरिक्त परत।",
        causes: [
          "आंतरिक इंजेक्शन दबाव का विरोध करने के लिए क्लैम्पिंग बल (टनेज) बहुत कम है।",
          "इंजेक्शन गति से होल्डिंग दबाव पर स्विच बहुत देर से होता है (कैविटी का ओवर-फिलिंग)।",
          "मोल्ड पार्टिंग लाइन की सतहें घिसी, डेंटेड या कुचले हुए प्लास्टिक से दूषित हैं।"
        ],
        avoid: [
          "मशीन पर क्लैम्पिंग टनेज बढ़ाएँ।",
          "वी-पी स्विचओवर पहले सेट करें (जब कैविटी वॉल्यूम के अनुसार 95% भर जाए तब स्विच करें)।",
          "इंजेक्शन दबाव और होल्डिंग दबाव कम करें।",
          "पार्टिंग चेहरों को साफ करें और नीले संपर्क पेस्ट का उपयोग करके सतह संपर्क की जांच करें।"
        ]
      },
      mr: {
        name: "फ्लॅश (Flash)",
        description: "पार्टिंग लाइन किंवा इजेक्टर पिनच्या कडांवर बाहेर पडलेला प्लास्टिकचा पातळ, नको असलेला थर.",
        causes: [
          "अंतर्गत इंजेक्शन दाब रोखण्यासाठी क्लॅम्पिंग फोर्स (टनेज) खूप कमी आहे.",
          "इंजेक्शन स्पीडवरून होल्डिंग प्रेशरवर स्विच होण्यास उशीर होतो (कॅव्हिटी ओव्हर-फिलिंग).",
          "मोल्ड पार्टिंग लाइनचे पृष्ठभाग झिजलेले, डेंट पडलेले किंवा प्लास्टिकने दूषित झालेले असतात."
        ],
        avoid: [
          "मशीनवर क्लॅम्पिंग टनेज वाढवा.",
          "व्ही-पी स्विचओव्हर आधी सेट करा (जेव्हा कॅव्हिटी 95% भरेल तेव्हा स्विच करा).",
          "इंजेक्शनचा दाब आणि होल्डिंगचा दाब कमी करा.",
          "पार्टिंग फेसेस स्वच्छ करा आणि ब्लू कॉन्टॅक्ट पेस्ट वापरून संपर्क तपासा."
        ]
      },
      gu: {
        name: "ફ્લેશ (Flash)",
        description: "પાર્ટિંગ લાઇન અથવા ઇજેક્ટર પિનની કિનારીઓ પર પ્લાસ્ટિકનું પાતળું, અનિચ્છનીય વધારાનું પડ.",
        causes: [
          "આંતરિક ઇન્જેક્શન દબાણનો સામનો કરવા ક્લેમ્પિંગ ફોર્સ (ટનેજ) ખૂબ ઓછું છે.",
          "ઇન્જેક્શન સ્પીડથી હોલ્ડિંગ પ્રેશર પર સ્વિચ કરવામાં મોડું થાય છે (કેવિટીનું ઓવર-ફિલિંગ).",
          "મોલ્ડ પાર્ટિંગ લાઇન સપાટીઓ ઘસાયેલી, ડેન્ટ પડેલી અથવા કચડાયેલા પ્લાસ્ટિકથી દૂષિત છે."
        ],
        avoid: [
          "મશીન પર ક્લેમ્પિંગ ટનેજ વધારો.",
          "વી-પી સ્વિચઓવર વહેલું સેટ કરો (જ્યારે કેવિટી 95% ભરાય ત્યારે સ્વિચ કરો).",
          "ઇન્જેક્શન પ્રેશર અને હોલ્ડિંગ પ્રેશર ઘટાડો.",
          "પાર્ટિંગ ફેસ સાફ કરો અને બ્લુ કોન્ટેક્ટ પેસ્ટ વડે સપાટીનો સંપર્ક તપાસો."
        ]
      }
    }
  },
  {
    id: "flow",
    name: "Flow Marks",
    category: "Thermal & Velocity Defect",
    accentColor: "#22c55e",
    translations: {
      en: {
        name: "Flow Marks",
        description: "Wavy lines, rings, or ripple patterns visible on the flat face or teeth of the gear.",
        causes: [
          "The leading front of molten plastic cools too quickly as it touches cold mold steel.",
          "Injection fill speed is set too slow.",
          "Mold surface temperature is too cold."
        ],
        avoid: [
          "Increase injection fill speed so plastic enters and fills the teeth before cooling down.",
          "Raise mold temperature using a mold temperature controller (MTC).",
          "Increase melt temperature slightly to make the plastic flow more easily.",
          "Enlarge the cold slug well opposite the sprue so chilled plastic does not enter the gear teeth."
        ]
      },
      hi: {
        name: "फ्लो मार्क्स (Flow Marks)",
        description: "गियर की सपाट सतह या दांतों पर दिखाई देने वाली लहरदार रेखाएं, छल्ले या रिपल पैटर्न।",
        causes: [
          "ठंडा मोल्ड स्टील छूते ही पिघले प्लास्टिक का अगला सिरा बहुत तेजी से ठंडा हो जाता है।",
          "इंजेक्शन भरने की गति बहुत धीमी सेट है।",
          "मोल्ड सतह का तापमान बहुत ठंडा है।"
        ],
        avoid: [
          "इंजेक्शन भरने की गति बढ़ाएँ ताकि प्लास्टिक ठंडा होने से पहले दांतों में प्रवेश कर भर जाए।",
          "मोल्ड तापमान नियंत्रक (MTC) का उपयोग करके मोल्ड का तापमान बढ़ाएँ।",
          "प्लास्टिक को आसानी से बहने देने के लिए पिघलने का तापमान थोड़ा बढ़ाएँ।",
          "स्प्रू के विपरीत कोल्ड स्लग वेल को बड़ा करें ताकि ठंडा प्लास्टिक दांतों में न जाए।"
        ]
      },
      mr: {
        name: "फ्लो मार्क्स (Flow Marks)",
        description: "गियरच्या सपाट भागावर किंवा दातांवर दिसणाऱ्या लाटांसारख्या रेषा, वलये किंवा रिपल पॅटर्न.",
        causes: [
          "थंड मोल्ड स्टीलला स्पर्श केल्यावर वितळलेल्या प्लास्टिकचा पुढील भाग खूप लवकर थंड होतो.",
          "इंजेक्शन भरण्याचा वेग खूप कमी सेट केला आहे.",
          "मोल्ड पृष्ठभागाचे तापमान खूप थंड आहे."
        ],
        avoid: [
          "इंजेक्शन भरण्याचा वेग वाढवा जेणेकरून प्लास्टिक थंड होण्यापूर्वी दातांमध्ये भरेल.",
          "मोल्ड टेम्परेचर कंट्रोलर (MTC) वापरून मोल्डचे तापमान वाढवा.",
          "प्लास्टिक सहज वाहण्यासाठी मेल्ट तापमान किंचित वाढवा.",
          "स्प्रूच्या समोरील कोल्ड स्लग वेल मोठा करा जेणेकरून थंड प्लास्टिक दातांमध्ये जाणार नाही."
        ]
      },
      gu: {
        name: "ફ્લો માર્ક્સ (Flow Marks)",
        description: "ગિયરના સપાટ ભાગ અથવા દાંત પર દેખાતી લહેરાતી રેખાઓ, રિંગ્સ અથવા રિપલ પેટર્ન.",
        causes: [
          "ઠંડા મોલ્ડ સ્ટીલને અડતાં જ પીગળેલા પ્લાસ્ટિકનો આગળનો ભાગ ઝડપથી ઠંડો થઈ જાય છે.",
          "ઇન્જેક્શન ફિલ સ્પીડ ખૂબ ધીમી સેટ કરેલી છે.",
          "મોલ્ડ સપાટીનું તાપમાન ખૂબ ઠંડું છે."
        ],
        avoid: [
          "ઇન્જેક્શન ફિલ સ્પીડ વધારો જેથી પ્લાસ્ટિક ઠંડુ થાય તે પહેલાં દાંત ભરાઈ જાય.",
          "મોલ્ડ ટેમ્પરેચર કંટ્રોલર (MTC) નો ઉપયોગ કરીને મોલ્ડનું તાપમાન વધારો.",
          "પ્લાસ્ટિક સરળતાથી વહે તે માટે મેલ્ટ ટેમ્પરેચર સહેજ વધારો.",
          "સ્પ્રૂની સામે કોલ્ડ સ્લગ વેલ મોટો કરો જેથી ઠંડુ પ્લાસ્ટિક દાંતમાં ન જાય."
        ]
      }
    }
  },
  {
    id: "hair",
    name: "Hair (Stringing)",
    category: "Nozzle & Decompression Defect",
    accentColor: "#fb923c",
    translations: {
      en: {
        name: "Hair (Stringing)",
        description: "Very fine, hair-like plastic threads or fibers stuck to the sprue or gate area.",
        causes: [
          "Molten plastic drools out of the nozzle tip after the mold opens.",
          "The screw does not decompress (suck back) enough after dosing.",
          "Nozzle tip or hot runner gate temperature is too hot."
        ],
        avoid: [
          "Increase suck-back (decompression) distance and speed to pull melt back into the nozzle.",
          "Lower the nozzle heater temperature by 5°C to 10°C.",
          "Add a short cooling pause before screw rotation starts.",
          "Check nozzle alignment to ensure the machine nozzle matches the mold sprue bushing seat without leakage."
        ]
      },
      hi: {
        name: "हेयर / स्ट्रिंगिंग (Hair)",
        description: "स्प्रू या गेट क्षेत्र में चिपके हुए बहुत बारीक, बाल जैसे प्लास्टिक के धागे या रेशे।",
        causes: [
          "मोल्ड खुलने के बाद नोजल टिप से पिघला हुआ प्लास्टिक टपकता है।",
          "डोजिंग के बाद स्क्रू पर्याप्त रूप से डीकंप्रेस (सक बैक) नहीं करता है।",
          "नोजल टिप या हॉट रनर गेट का तापमान बहुत अधिक गर्म है।"
        ],
        avoid: [
          "पिघले प्लास्टिक को नोजल में वापस खींचने के लिए सक-बैक दूरी और गति बढ़ाएँ।",
          "नोजल हीटर का तापमान 5°C से 10°C तक कम करें।",
          "स्क्रू रोटेशन शुरू होने से पहले एक छोटा कूलिंग पॉज़ जोड़ें।",
          "नोजल संरेखण की जांच करें ताकि बिना रिसाव के मशीन नोजल मोल्ड स्प्रू बुशिंग सीट से मेल खाए।"
        ]
      },
      mr: {
        name: "हेअर / स्ट्रिंगिंग (Hair)",
        description: "स्प्रू किंवा गेट भागात अडकलेले अत्यंत बारीक, केसांसारखे प्लास्टिकचे धागे किंवा तंतू.",
        causes: [
          "मोल्ड उघडल्यानंतर नोझलच्या टोकातून वितळलेले प्लास्टिक गळते.",
          "डोसिंगनंतर स्क्रू पुरेसा डीकंप्रेस (सक बॅक) करत नाही.",
          "नोझल टिप किंवा हॉट रनर गेटचे तापमान खूप जास्त असते."
        ],
        avoid: [
          "वितळलेले प्लास्टिक नोझलमध्ये परत ओढण्यासाठी सक-बॅक अंतर आणि गती वाढवा.",
          "नोझल हीटरचे तापमान 5°C ते 10°C ने कमी करा.",
          "स्क्रू फिरणे सुरू होण्यापूर्वी थोडा कुलिंग ब्रेक जोडा.",
          "नोझल अलाइनमेंट तपासा जेणेकरून गळतीशिवाय मशीन नोझल मोल्ड बुशिंगशी जुळेल."
        ]
      },
      gu: {
        name: "હેર / સ્ટ્રિંગિંગ (Hair)",
        description: "સ્પ્રૂ અથવા ગેટ એરિયામાં ચોંટેલા ખૂબ જ ઝીણા, વાળ જેવા પ્લાસ્ટિકના તાંતણા કે રેસા.",
        causes: [
          "મોલ્ડ ખુલ્યા પછી નોઝલ ટીપમાંથી પીગળેલું પ્લાસ્ટિક ટપકે છે.",
          "ડોઝિંગ પછી સ્ક્રૂ પૂરતો ડીકમ્પ્રેસ (સક બેક) થતો નથી.",
          "નોઝલ ટીપ અથવા હોટ રનર ગેટનું તાપમાન ખૂબ ઊંચું છે."
        ],
        avoid: [
          "પીગળેલા પ્લાસ્ટિકને નોઝલમાં પાછું ખેંચવા સક-બેક અંતર અને સ્પીડ વધારો.",
          "નોઝલ હીટરનું તાપમાન 5°C થી 10°C ઘટાડો.",
          "સ્ક્રૂ ફરવાનું શરૂ થાય તે પહેલાં થોડો કૂલિંગ વિરામ ઉમેરો.",
          "નોઝલ અલાઇનમેન્ટ તપાસો જેથી લીકેજ વિના મશીન નોઝલ મોલ્ડ સ્પ્રૂ બુશિંગ સીટ સાથે બેસે."
        ]
      }
    }
  },
  {
    id: "missing",
    name: "Missing",
    category: "Tooling & Fill Defect",
    accentColor: "#dc2626",
    translations: {
      en: {
        name: "Missing",
        description: "A completely missing gear tooth, locator boss, or hole that did not form at all.",
        causes: [
          "A severe short-shot condition where plastic froze before reaching the tooth.",
          "The runner or gate is blocked by a piece of cold plastic, metal, or debris.",
          "A core pin or mold insert broke off and is missing from the tool."
        ],
        avoid: [
          "Increase the shot size (metering stroke) to ensure enough plastic volume.",
          "Increase injection speed and pressure.",
          "Open the mold and inspect feed channels to make sure gates and runners are completely clear.",
          "Inspect core pins and tooth inserts inside the mold to ensure none are broken."
        ]
      },
      hi: {
        name: "लापता भाग (Missing)",
        description: "पूरी तरह से गायब गियर टूथ, लोकेटर बॉस, या छेद जो बिल्कुल बना ही नहीं।",
        causes: [
          "एक गंभीर शॉर्ट-शॉट स्थिति जहाँ प्लास्टिक दांत तक पहुँचने से पहले ही जम गया।",
          "रनर या गेट ठंडे प्लास्टिक, धातु या मलबे के टुकड़े से अवरुद्ध है।",
          "एक कोर पिन या मोल्ड इन्सर्ट टूट गया है और टूल से गायब है।"
        ],
        avoid: [
          "पर्याप्त प्लास्टिक मात्रा सुनिश्चित करने के लिए शॉट का आकार (मीटरिंग स्ट्रोक) बढ़ाएँ।",
          "इंजेक्शन की गति और दबाव बढ़ाएँ।",
          "मोल्ड खोलें और फीड चैनलों का निरीक्षण करें ताकि गेट और रनर पूरी तरह साफ हों।",
          "मोल्ड के अंदर कोर पिन और टूथ इन्सर्ट का निरीक्षण करें ताकि कोई टूटा न हो।"
        ]
      },
      mr: {
        name: "गहाळ भाग (Missing)",
        description: "पूर्णपणे गहाळ झालेला गियरचा दात, लोकेटर बॉस किंवा भोक जे मुळीच तयार झाले नाही.",
        causes: [
          "गंभीर शॉर्ट-शॉट स्थिती जिथे प्लास्टिक दातापर्यंत पोहोचण्यापूर्वीच गोठले.",
          "रनर किंवा गेट थंड प्लास्टिक, धातू किंवा कचऱ्याने अडकले आहे.",
          "मोल्डमधील कोर पिन किंवा टूथ इन्सर्ट तुटून गहाळ झाले आहे."
        ],
        avoid: [
          "पुरेसे प्लास्टिक व्हॉल्यूम सुनिश्चित करण्यासाठी शॉट आकार वाढवा.",
          "इंजेक्शनचा वेग आणि दाब वाढवा.",
          "मोल्ड उघडून फीड चॅनेल तपासा जेणेकरून गेट्स आणि रनर्स पूर्णपणे मोकळे असतील.",
          "मोल्डमधील कोर पिन आणि टूथ इन्सर्ट तुटलेले नाहीत याची खात्री करा."
        ]
      },
      gu: {
        name: "ખૂટતો ભાગ (Missing)",
        description: "સંપૂર્ણપણે ખૂટતો ગિયર ટૂથ, લોકેટર બોસ અથવા હોલ જે બન્યો જ નથી.",
        causes: [
          "એક ગંભીર શોર્ટ-શોટ સ્થિતિ જ્યાં પ્લાસ્ટિક દાંત સુધી પહોંચતા પહેલા જ જામી ગયું.",
          "રનર અથવા ગેટ ઠંડા પ્લાસ્ટિક, મેટલ અથવા કચરાથી બ્લોક થઈ ગયો છે.",
          "મોલ્ડ કોર પિન અથવા ટૂલ ઇન્સર્ટ તૂટીને ગાયબ થઈ ગયો છે."
        ],
        avoid: [
          "પૂરતો પ્લાસ્ટિક વોલ્યુમ સુનિશ્ચિત કરવા શોટ સાઈઝ વધારો.",
          "ઇન્જેક્શન સ્પીડ અને પ્રેશર વધારો.",
          "મોલ્ડ ખોલીને ફીડ ચેનલ્સ તપાસો જેથી ગેટ્સ અને રનર્સ સંપૂર્ણપણે સાફ હોય.",
          "મોલ્ડની અંદર કોર પિન અને ટૂથ ઇન્સર્ટ્સ તપાસો કે કોઈ તૂટેલું નથી."
        ]
      }
    }
  },
  {
    id: "overflow",
    name: "Overflow",
    category: "Metering & Clamping Defect",
    accentColor: "#2563eb",
    translations: {
      en: {
        name: "Overflow",
        description: "A large, heavy burst of plastic escaping out of the mold cavity across the mold base.",
        causes: [
          "The machine injected way too much plastic (double-metering error).",
          "Clamping cylinder lost hydraulic pressure or toggle lock popped open during injection.",
          "Screw position sensor failed, causing the screw to drive forward continuously under maximum pressure."
        ],
        avoid: [
          "Set the correct shot size matching part weight plus runner weight.",
          "Set a strict injection pressure limit so the machine stops if pressure spikes.",
          "Calibrate the screw position sensor (linear transducer) to ensure reliable switchover.",
          "Inspect clamping hydraulics and toggle links to ensure the mold remains locked under peak pressure."
        ]
      },
      hi: {
        name: "ओवरफ्लो (Overflow)",
        description: "मोल्ड बेस के आर-पार मोल्ड कैविटी से बाहर निकलने वाला प्लास्टिक का भारी बहाव।",
        causes: [
          "मशीन ने बहुत अधिक प्लास्टिक इंजेक्ट किया (डबल-मीटरिंग त्रुटि)।",
          "क्लैम्पिंग सिलेंडर ने हाइड्रोलिक दबाव खो दिया या इंजेक्शन के दौरान टॉगल लॉक खुल गया।",
          "स्क्रू स्थिति सेंसर विफल रहा, जिससे स्क्रू अधिकतम दबाव में आगे बढ़ता रहा।"
        ],
        avoid: [
          "पार्ट वजन और रनर वजन से मेल खाने वाला सही शॉट आकार सेट करें।",
          "एक सख्त इंजेक्शन दबाव सीमा निर्धारित करें ताकि दबाव बढ़ने पर मशीन बंद हो जाए।",
          "विश्वसनीय स्विचओवर सुनिश्चित करने के लिए स्क्रू स्थिति सेंसर को कैलिब्रेट करें।",
          "क्लैम्पिंग हाइड्रोलिक्स और टॉगल लिंक का निरीक्षण करें ताकि चरम दबाव में मोल्ड बंद रहे।"
        ]
      },
      mr: {
        name: "ओव्हरफ्लो (Overflow)",
        description: "मोल्ड बेसवर मोल्ड कॅव्हिटीमधून बाहेर पडणारा प्लास्टिकचा मोठा, जाड थर.",
        causes: [
          "मशीनने प्रमाणापेक्षा जास्त प्लास्टिक इंजेक्ट केले (डबल-मीटरिंग एरर).",
          "क्लॅम्पिंग सिलिंडरचा हायड्रॉलिक दाब कमी झाला किंवा टॉगल लॉक इंजेक्शन दरम्यान उघडले.",
          "स्क्रू पोझिशन सेन्सर निकामी झाला, ज्यामुळे स्क्रू कमाल दाबाने सतत पुढे ढकलत राहिला."
        ],
        avoid: [
          "पार्टचे वजन आणि रनरचे वजन जुळणारा योग्य शॉट आकार सेट करा.",
          "इंजेक्शन दाब मर्यादा सेट करा जेणेकरून दाब वाढल्यास मशीन थांबेल.",
          "विश्वसनीय स्विचओव्हरसाठी स्क्रू पोझिशन सेन्सर कॅलिब्रेट करा.",
          "कमाल दाबाखाली मोल्ड घट्ट बंद राहील याची खात्री करण्यासाठी क्लॅम्पिंग हायड्रॉलिक्स तपासा."
        ]
      },
      gu: {
        name: "ઓવરફ્લો (Overflow)",
        description: "મોલ્ડ બેઝ પર મોલ્ડ કેવિટીમાંથી બહાર નીકળતો પ્લાસ્ટિકનો મોટો, ભારે ફેલાવો.",
        causes: [
          "મશીને વધુ પડતું પ્લાસ્ટિક ઇન્જેક્ટ કર્યું (ડબલ-મીટરિંગ ભૂલ).",
          "ક્લેમ્પિંગ સિલિન્ડરે હાઇડ્રોલિક દબાણ ગુમાવ્યું અથવા ઇન્જેક્શન દરમિયાન ટૉગલ લૉક ખુલી ગયું.",
          "સ્ક્રૂ પોઝિશન સેન્સર નિષ્ફળ થયું, જેથી સ્ક્રૂ મહત્તમ દબાણ હેઠળ સતત આગળ ધકેલાતો રહ્યો."
        ],
        avoid: [
          "પાર્ટ વજન અને રનર વજન સાથે મેળ ખાતી સાચી શોટ સાઈઝ સેટ કરો.",
          "સખત ઇન્જેક્શન પ્રેશર મર્યાદા સેટ કરો જેથી દબાણ વધતાં મશીન બંધ થઈ જાય.",
          "વિશ્વસનીય સ્વિચઓવર માટે સ્ક્રૂ પોઝિશન સેન્સર કેલિબ્રેટ કરો.",
          "ક્લેમ્પિંગ હાઇડ્રોલિક્સ તપાસો જેથી પીક પ્રેશર હેઠળ મોલ્ડ બંધ રહે."
        ]
      }
    }
  },
  {
    id: "perforation",
    name: "Perforation",
    category: "Ejection & Cooling Defect",
    accentColor: "#a855f7",
    translations: {
      en: {
        name: "Perforation",
        description: "An unwanted puncture hole or tear pushed through the plastic wall by an ejector pin.",
        causes: [
          "Ejector pins push forward while the plastic inside is still soft and hot.",
          "Ejector pins are too small in diameter, acting like sharp needles against the plastic.",
          "Ejection forward speed and hydraulic force are set too high."
        ],
        avoid: [
          "Increase mold cooling time so the gear is hard and solid before ejection begins.",
          "Lower ejector forward speed and pressure.",
          "Use larger ejector pins or a sleeve ejector around the center hub to spread out pushing force.",
          "Make sure ejector pin faces are completely flush with the mold cavity surface."
        ]
      },
      hi: {
        name: "परफोरेशन / छेद (Perforation)",
        description: "इजेक्टर पिन द्वारा प्लास्टिक की दीवार के आर-पार किया गया अवांछित छेद या फाड़।",
        causes: [
          "इजेक्टर पिन आगे धक्का देते हैं जबकि अंदर का प्लास्टिक अभी भी नरम और गर्म होता है।",
          "इजेक्टर पिन व्यास में बहुत छोटे होते हैं, जो प्लास्टिक पर नुकीली सुइयों की तरह काम करते हैं।",
          "इजेक्शन फॉरवर्ड गति और हाइड्रोलिक बल बहुत अधिक सेट हैं।"
        ],
        avoid: [
          "मोल्ड कूलिंग समय बढ़ाएँ ताकि इजेक्शन शुरू होने से पहले गियर कठोर और ठोस हो।",
          "इजेक्टर आगे की गति और दबाव कम करें।",
          "धक्का बल फैलाने के लिए केंद्र हब के चारों ओर बड़े इजेक्टर पिन या स्लीव इजेक्टर का उपयोग करें।",
          "सुनिश्चित करें कि इजेक्टर पिन के चेहरे मोल्ड कैविटी सतह के पूरी तरह समतल हों।"
        ]
      },
      mr: {
        name: "छिद्र पडणे (Perforation)",
        description: "इजेक्टर पिनमुळे प्लास्टिकच्या भिंतीला पडलेले नको असलेले भोक किंवा फाटलेला भाग.",
        causes: [
          "आतील प्लास्टिक अजूनही मऊ आणि गरम असताना इजेक्टर पिन पुढे ढकलतात.",
          "इजेक्टर पिनचा व्यास खूप लहान असतो, ज्यामुळे त्या सुईसारख्या काम करतात.",
          "इजेक्शनचा पुढे जाण्याचा वेग आणि हायड्रॉलिक जोर खूप जास्त ठेवला आहे."
        ],
        avoid: [
          "मोल्ड कुलिंग वेळ वाढवा जेणेकरून इजेक्शन सुरू होण्यापूर्वी गियर कडक आणि घट्ट होईल.",
          "इजेक्टरची पुढे जाण्याची गती आणि दाब कमी करा.",
          "दाब पसरवण्यासाठी मोठे इजेक्टर पिन किंवा स्लीव्ह इजेक्टर वापरा.",
          "इजेक्टर पिनचे तोंड मोल्ड कॅव्हिटीच्या पृष्ठभागाशी पूर्णपणे सपाट असल्याची खात्री करा."
        ]
      },
      gu: {
        name: "કાણું / છિદ્ર (Perforation)",
        description: "ઇજેક્ટર પિન દ્વારા પ્લાસ્ટિકની દીવાલમાં પડેલું અનિચ્છનીય કાણું કે છિદ્ર.",
        causes: [
          "અંદરનું પ્લાસ્ટિક હજુ નરમ અને ગરમ હોય ત્યારે જ ઇજેક્ટર પિન આગળ ધકેલે છે.",
          "ઇજેક્ટર પિનનો વ્યાસ ઘણો નાનો હોય છે, જેથી તે પ્લાસ્ટિક પર તીક્ષ્ણ સોયની જેમ દબાય છે.",
          "ઇજેક્શન ફોરવર્ડ સ્પીડ અને હાઇડ્રોલિક ફોર્સ ખૂબ વધારે સેટ કરેલા છે."
        ],
        avoid: [
          "મોલ્ડ કૂલિંગ સમય વધારો જેથી ઇજેક્શન શરૂ થાય તે પહેલાં ગિયર કઠણ અને મજબૂત બને.",
          "ઇજેક્ટર ફોરવર્ડ સ્પીડ અને પ્રેશર ઘટાડો.",
          "દબાણ ફેલાવવા માટે મોટા ઇજેક્ટર પિન અથવા સ્લીવ ઇજેક્ટરનો ઉપયોગ કરો.",
          "ખાતરી કરો કે ઇજેક્ટર પિનના ફેસ મોલ્ડ કેવિટીની સપાટી સાથે બરાબર ફ્લશ છે."
        ]
      }
    }
  },
  {
    id: "reverse",
    name: "Reverse",
    category: "Poka-Yoke & Assembly Defect",
    accentColor: "#14b8a6",
    translations: {
      en: {
        name: "Reverse",
        description: "A metal bushing, shaft, or asymmetrical gear insert molded in backwards or upside down.",
        causes: [
          "Operator loads the insert in the wrong direction during manual operation.",
          "The insert looks identical on both ends without clear visual markings.",
          "Robot loads the insert without verifying orientation."
        ],
        avoid: [
          "Add a mechanical foolproof pin (Poka-Yoke) in the mold core so the insert physically cannot seat backwards.",
          "Install an optical camera or proximity sensor to confirm correct orientation before mold close.",
          "Provide a pre-loading nesting jig on the operator bench that only accepts the insert in one direction."
        ]
      },
      hi: {
        name: "उलटा इन्सर्ट (Reverse)",
        description: "एक धातु बुशिंग, शाफ्ट, या असममित गियर इन्सर्ट जो पीछे या उलटा ढाला गया है।",
        causes: [
          "मैनुअल ऑपरेशन के दौरान ऑपरेटर गलत दिशा में इन्सर्ट लोड करता है।",
          "स्पष्ट दृश्य चिह्नों के बिना इन्सर्ट दोनों सिरों पर एक जैसा दिखता है।",
          "रोबोट अभिविन्यास की पुष्टि किए बिना इन्सर्ट लोड करता है।"
        ],
        avoid: [
          "मोल्ड कोर में एक मैकेनिकल फूलप्रूफ पिन (पोका-योक) जोड़ें ताकि इन्सर्ट शारीरिक रूप से उल्टा न बैठ सके।",
          "मोल्ड बंद होने से पहले सही अभिविन्यास की पुष्टि के लिए एक ऑप्टिकल कैमरा या प्रॉक्सिमिटी सेंसर स्थापित करें।",
          "ऑपरेटर बेंच पर एक प्री-लोडिंग नेस्टिंग जिग प्रदान करें जो केवल एक दिशा में इन्सर्ट स्वीकार करता है।"
        ]
      },
      mr: {
        name: "उलटा इन्सर्ट (Reverse)",
        description: "मेटल बुशिंग, शाफ्ट किंवा असममित गियर इन्सर्ट जो उलट किंवा उलटा मोल्ड केला गेला आहे.",
        causes: [
          "मॅन्युअल ऑपरेशन दरम्यान ऑपरेटर चुकीच्या दिशेने इन्सर्ट लोड करतो.",
          "स्पष्ट खुणा नसल्यामुळे इन्सर्ट दोन्ही बाजूंनी सारखाच दिसतो.",
          "रोबोट योग्य दिशा तपासल्याशिवाय इन्सर्ट लोड करतो."
        ],
        avoid: [
          "मोल्ड कोरमध्ये मेकॅनिकल पोका-योक पिन जोडा जेणेकरून इन्सर्ट उलट बसूच शकत नाही.",
          "मोल्ड बंद होण्यापूर्वी योग्य दिशा तपासण्यासाठी ऑप्टिकल कॅमेरा किंवा सेन्सर बसवा.",
          "ऑपरेटर बेंचवर प्री-लोडिंग जिग द्या जे इन्सर्ट फक्त एकाच दिशेने स्वीकारेल."
        ]
      },
      gu: {
        name: "ઊંધો ઇન્સર્ટ (Reverse)",
        description: "મેટલ બુશિંગ, શાફ્ટ અથવા અસમપ્રમાણ ગિયર ઇન્સર્ટ જે પાછળથી કે ઊંધો મોલ્ડ થયો છે.",
        causes: [
          "મેન્યુઅલ ઓપરેશન દરમિયાન ઓપરેટર ખોટી દિશામાં ઇન્સર્ટ લોડ કરે છે.",
          "સ્પષ્ટ વિઝ્યુઅલ માર્કિંગ વિના ઇન્સર્ટ બંને છેડે એકસરખો દેખાય છે.",
          "રોબોટ ઓરિએન્ટેશન ચકાસ્યા વિના ઇન્સર્ટ લોડ કરે છે."
        ],
        avoid: [
          "મોલ્ડ કોરમાં મિકેનિકલ ફૂલપ્રૂફ પિન (પોકા-યોકે) ઉમેરો જેથી ઇન્સર્ટ ઊંધો બેસી જ ન શકે.",
          "મોલ્ડ બંધ થાય તે પહેલાં સાચું ઓરિએન્ટેશન કન્ફર્મ કરવા ઓપ્ટિકલ કેમેરા કે સેન્સર ઇન્સ્ટોલ કરો.",
          "ઓપરેટર બેન્ચ પર પ્રી-લોડિંગ નેસ્ટિંગ જીગ આપો જે માત્ર એક જ દિશામાં ઇન્સર્ટ સ્વીકારે."
        ]
      }
    }
  },
  {
    id: "shortshot",
    name: "Shortshot",
    category: "Fill & Flow Defect",
    accentColor: "#eab308",
    translations: {
      en: {
        name: "Shortshot",
        description: "An incomplete gear where plastic stopped flowing before fully filling the tips of the teeth or rims.",
        causes: [
          "Shot volume (metering stroke) is too small.",
          "Injection fill speed or pressure is too low to force melt into thin tooth profiles.",
          "Air trapped at tooth tips creates back-pressure that blocks plastic flow.",
          "Mold or melt temperature is too low, causing plastic to freeze early.",
          "Screw check ring is worn out, allowing plastic to leak backward during injection."
        ],
        avoid: [
          "Increase shot size to leave a healthy cushion (3 mm to 5 mm).",
          "Increase injection speed and pressure to fill narrow teeth before freezing.",
          "Add and clean air vents at every single tooth tip to let trapped air out.",
          "Increase mold and barrel temperatures to improve fluidity.",
          "Inspect and replace the screw non-return check ring if cushion cannot be held."
        ]
      },
      hi: {
        name: "शॉर्ट-शॉट (Shortshot)",
        description: "एक अधूरा गियर जहाँ प्लास्टिक दांतों के सिरों या रिम को पूरी तरह भरने से पहले ही बहना बंद हो गया।",
        causes: [
          "शॉट वॉल्यूम (मीटरिंग स्ट्रोक) बहुत छोटा है।",
          "इंजेक्शन भरने की गति या दबाव पतले टूथ प्रोफाइल में पिघले प्लास्टिक को धकेलने के लिए बहुत कम है।",
          "दांतों के सिरों पर फंसी हवा बैक-प्रेशर बनाती है जो प्लास्टिक प्रवाह को रोकती है।",
          "मोल्ड या पिघल का तापमान बहुत कम है, जिससे प्लास्टिक जल्दी जम जाता है।",
          "स्क्रू चेक रिंग घिस गई है, जिससे इंजेक्शन के दौरान प्लास्टिक पीछे रिस जाता है।"
        ],
        avoid: [
          "एक स्वस्थ कुशन (3 मिमी से 5 मिमी) छोड़ने के लिए शॉट का आकार बढ़ाएँ।",
          "जमने से पहले संकीर्ण दांतों को भरने के लिए इंजेक्शन की गति और दबाव बढ़ाएँ।",
          "फंसी हुई हवा को बाहर निकालने के लिए हर एक दांत के सिरे पर एयर वेंट जोड़ें और साफ करें।",
          "तरलता में सुधार के लिए मोल्ड और बैरल का तापमान बढ़ाएँ।",
          "यदि कुशन बनाए नहीं रखा जा सकता है तो स्क्रू चेक रिंग का निरीक्षण करें और बदलें।"
        ]
      },
      mr: {
        name: "शॉर्ट-शॉट (Shortshot)",
        description: "अपूर्ण गियर जिथे प्लास्टिक दातांच्या किंवा कडांच्या टोकांपर्यंत पोहोचण्यापूर्वीच थांबले.",
        causes: [
          "शॉट व्हॉल्यूम (मीटरिंग स्ट्रोक) खूप लहान आहे.",
          "बारीक दातांमध्ये प्लास्टिक ढकलण्यासाठी इंजेक्शनचा वेग किंवा दाब खूप कमी आहे.",
          "दातांच्या टोकांवर अडकलेली हवा बॅक-प्रेशर निर्माण करते ज्यामुळे प्लास्टिक प्रवाह थांबतो.",
          "मोल्ड किंवा प्लास्टिकचे तापमान कमी असल्याने प्लास्टिक लवकर गोठते.",
          "स्क्रू चेक रिंग झिजल्यामुळे इंजेक्शन दरम्यान प्लास्टिक मागे गळते."
        ],
        avoid: [
          "योग्य कुशन (3 मिमी ते 5 मिमी) ठेवण्यासाठी शॉट आकार वाढवा.",
          "प्लास्टिक गोठण्यापूर्वी बारीक दात भरण्यासाठी इंजेक्शनचा वेग आणि दाब वाढवा.",
          "अडकलेली हवा बाहेर काढण्यासाठी प्रत्येक दाताच्या टोकावर एअर व्हेंट्स जोडा आणि स्वच्छ करा.",
          "प्रवाहीपणा सुधारण्यासाठी मोल्ड आणि बॅरलचे तापमान वाढवा.",
          "कुशन टिकत नसेल तर स्क्रू चेक रिंग तपासा आणि बदला."
        ]
      },
      gu: {
        name: "શોર્ટ-શોટ (Shortshot)",
        description: "અપૂર્ણ ગિયર જ્યાં પ્લાસ્ટિક દાંતના છેડા કે રિમ્સ સંપૂર્ણ ભરાય તે પહેલાં જ અટકી ગયું.",
        causes: [
          "શોટ વોલ્યુમ (મીટરિંગ સ્ટ્રોક) ઘણો નાનો છે.",
          "પાતળા દાંતમાં પ્લાસ્ટિક ધકેલવા માટે ઇન્જેક્શન સ્પીડ કે પ્રેશર પૂરતું નથી.",
          "દાંતના છેડે ફસાયેલી હવા બેક-પ્રેશર પેદા કરે છે જે પ્લાસ્ટિક પ્રવાહને રોકે છે.",
          "મોલ્ડ અથવા મેલ્ટ તાપમાન ઓછું હોવાથી પ્લાસ્ટિક વહેલું જામી જાય છે.",
          "સ્ક્રૂ ચેક રિંગ ઘસાઈ ગઈ છે, જેથી ઇન્જેક્શન દરમિયાન પ્લાસ્ટિક પાછળ લીક થાય છે."
        ],
        avoid: [
          "પૂરતો કુશન (3 થી 5 મીમી) જાળવવા શોટ સાઈઝ વધારો.",
          "પ્લાસ્ટિક જામી જાય તે પહેલાં સાંકડા દાંત ભરવા ઇન્જેક્શન સ્પીડ અને પ્રેશર વધારો.",
          "ફસાયેલી હવા બહાર કાઢવા દરેક દાંતના છેડે એર વેન્ટ્સ ઉમેરો અને સાફ કરો.",
          "પ્રવાહિતા વધારવા મોલ્ડ અને બેરલનું તાપમાન વધારો.",
          "જો કુશન ન જળવાય તો સ્ક્રૂ ચેક રિંગ તપાસો અને બદલો."
        ]
      }
    }
  },
  {
    id: "void",
    name: "Void",
    category: "Cooling & Volumetric Defect",
    accentColor: "#6366f1",
    translations: {
      en: {
        name: "Void",
        description: "A hollow vacuum bubble trapped inside thick sections (hub/rim) or a sunken surface dent.",
        causes: [
          "Plastic shrinks as it cools; thick sections cool from outside in, and shrinking material pulls apart to form a hollow vacuum center.",
          "Holding pressure is too low or stops before the gate freezes.",
          "Moisture or trapped gas inside raw plastic pellets creates bubbles during melting."
        ],
        avoid: [
          "Increase holding pressure and holding time to pack extra plastic until the gate freezes shut.",
          "Dry the raw plastic pellets thoroughly in a dehumidifying dryer according to material specs.",
          "Lower melt temperature slightly to reduce overall volumetric shrinkage.",
          "Add coring (hollowing) to thick gear hubs to keep wall thickness uniform."
        ]
      },
      hi: {
        name: "शून्य / वैक्यूम बुलबुला (Void)",
        description: "मोटे हिस्सों (हब/रिम) के अंदर फंसा हुआ खोखला वैक्यूम बुलबुला या सतह पर धंसा हुआ गड्ढा।",
        causes: [
          "ठंडा होने पर प्लास्टिक सिकुड़ता है; मोटे हिस्से बाहर से अंदर की ओर ठंडे होते हैं, और सिकुड़ती सामग्री अलग होकर खोखला वैक्यूम केंद्र बना देती है।",
          "होल्डिंग दबाव बहुत कम है या गेट जमने से पहले ही रुक जाता है।",
          "कच्चे प्लास्टिक छर्रों के अंदर नमी या फंसी हुई गैस पिघलने के दौरान बुलबुले बनाती है।"
        ],
        avoid: [
          "गेट जमने तक अतिरिक्त प्लास्टिक पैक करने के लिए होल्डिंग दबाव और होल्डिंग समय बढ़ाएँ।",
          "सामग्री विनिर्देशों के अनुसार कच्चे प्लास्टिक छर्रों को डिह्यूमिडिफाइंग ड्रायर में अच्छी तरह सुखाएं।",
          "समग्र वॉल्यूमेट्रिक संकोचन को कम करने के लिए पिघलने का तापमान थोड़ा कम करें।",
          "दीवार की मोटाई एक समान रखने के लिए मोटे गियर हब में कोरिंग (खोखलापन) जोड़ें।"
        ]
      },
      mr: {
        name: "पोकळी / बुडबुडा (Void)",
        description: "जाड भागांमध्ये (हब/रिम) अडकलेला पोकळ व्हॅक्यूम बुडबुडा किंवा पृष्ठभागावरील खड्डा.",
        causes: [
          "प्लास्टिक थंड होताना आकुंचन पावते; जाड भाग बाहेरून आत थंड होतात आणि आकुंचन पावणारे मटेरियल वेगळे होऊन पोकळ केंद्र तयार करते.",
          "होल्डिंग प्रेशर खूप कमी आहे किंवा गेट गोठण्यापूर्वीच थांबते.",
          "कच्च्या प्लास्टिकच्या दाण्यांमधील ओलावा वितळताना बुडबुडे तयार करतो."
        ],
        avoid: [
          "गेट बंद होईपर्यंत अतिरिक्त प्लास्टिक भरण्यासाठी होल्डिंग प्रेशर आणि होल्डिंग वेळ वाढवा.",
          "कच्च्या प्लास्टिकच्या दाण्यांना डिह्युमिडिफायिंग ड्रायरमध्ये पूर्णपणे वाळवा.",
          "आकुंचन कमी करण्यासाठी मेल्ट तापमान किंचित कमी करा.",
          "भिंतीची जाडी एकसमान ठेवण्यासाठी जाड गियर हबमध्ये कोरिंग करा."
        ]
      },
      gu: {
        name: "શૂન્યતા / પોલાણ (Void)",
        description: "જાડા ભાગો (હબ/રીમ) ની અંદર ફસાયેલો વેક્યૂમ પરપોટો અથવા સપાટી પર પડેલો ખાડો.",
        causes: [
          "ઠંડુ થતાં પ્લાસ્ટિક સંકોચાય છે; જાડા ભાગો બહારથી અંદર ઠંડા થાય છે, અને સંકોચાતી સામગ્રી ખેંચાઈને પોકળ વેક્યૂમ કેન્દ્ર બનાવે છે.",
          "હોલ્ડિંગ પ્રેશર ખૂબ ઓછું છે અથવા ગેટ સીલ થાય તે પહેલાં બંધ થઈ જાય છે.",
          "કાચા પ્લાસ્ટિક પેલેટ્સમાં ભેજ કે ગેસ ઓગળતી વખતે પરપોટા બનાવે છે."
        ],
        avoid: [
          "ગેટ સીલ થાય ત્યાં સુધી વધારાનું પ્લાસ્ટિક પેક કરવા હોલ્ડિંગ પ્રેશર અને હોલ્ડિંગ ટાઇમ વધારો.",
          "કાચા પ્લાસ્ટિક પેલેટ્સને ડીહ્યુમિડીફાઇંગ ડ્રાયરમાં સારી રીતે સૂકવો.",
          "સંકોચન ઘટાડવા મેલ્ટ ટેમ્પરેચર સહેજ ઓછું કરો.",
          "દીવાલની જાડાઈ એકસરખી રાખવા જાડા ગિયર હબમાં કોરિંગ ઉમેરો."
        ]
      }
    }
  },
  {
    id: "white",
    name: "White Marks (Stress Whitening)",
    category: "Stress & Demolding Defect",
    accentColor: "#94a3b8",
    translations: {
      en: {
        name: "White Marks (Stress Whitening)",
        description: "White discolored patches or ring marks on the plastic, especially right over ejector pins.",
        causes: [
          "Ejector pins push with heavy force against a part that is sticking tightly in the mold.",
          "Plastic material stretches beyond its elastic limit, creating microscopic cracks that look white.",
          "Lack of draft angle or over-packing makes the part grip the mold core tightly."
        ],
        avoid: [
          "Increase cooling time so the plastic becomes stiff and strong enough to handle ejection.",
          "Reduce holding/packing pressure so the gear does not shrink too tightly around the mold core.",
          "Lower ejector forward speed for a gentler push.",
          "Increase draft angles on inner cores and teeth, and polish the steel in the draw direction.",
          "Use larger ejector pins or sleeve rings to distribute ejection pressure over a wider surface area."
        ]
      },
      hi: {
        name: "व्हाइट मार्क्स (तनाव सफेदी)",
        description: "प्लास्टिक पर सफेद फीके धब्बे या रिंग के निशान, विशेषकर इजेक्टर पिन के ठीक ऊपर।",
        causes: [
          "इजेक्टर पिन मोल्ड में कसकर चिपके हुए भाग के खिलाफ भारी बल से धक्का देते हैं।",
          "प्लास्टिक सामग्री अपनी लोचदार सीमा से अधिक खिंचती है, जिससे सूक्ष्म दरारें बनती हैं जो सफेद दिखती हैं।",
          "ड्राफ्ट एंगल की कमी या ओवर-पैकिंग से पार्ट मोल्ड कोर को कसकर पकड़ लेता है।"
        ],
        avoid: [
          "कूलिंग समय बढ़ाएँ ताकि प्लास्टिक कठोर और इतना मजबूत हो जाए कि इजेक्शन को संभाल सके।",
          "होल्डिंग/पैकिंग दबाव कम करें ताकि गियर मोल्ड कोर के चारों ओर बहुत कसकर न सिकुड़े।",
          "हल्के धक्के के लिए इजेक्टर आगे की गति कम करें।",
          "आंतरिक कोर और दांतों पर ड्राफ्ट कोण बढ़ाएँ, और ड्रॉ दिशा में स्टील को पॉलिश करें।",
          "इजेक्शन दबाव को व्यापक सतह क्षेत्र पर वितरित करने के लिए बड़े इजेक्टर पिन या स्लीव रिंग का उपयोग करें।"
        ]
      },
      mr: {
        name: "पांढरे डाग (Stress Whitening)",
        description: "प्लास्टिकवर पडलेले पांढरे डाग किंवा रिंगच्या खुणा, विशेषतः इजेक्टर पिनच्या अगदी वर.",
        causes: [
          "मोल्डमध्ये घट्ट अडकलेल्या भागावर इजेक्टर पिन खूप दाबाने ढकलतात.",
          "प्लास्टिक लवचिक मर्यादेपलीकडे ताणले जाते, ज्यामुळे सूक्ष्म क्रॅक तयार होऊन पांढरे डाग दिसतात.",
          "ड्राफ्ट अँगलचा अभाव किंवा जास्त पॅकिंगमुळे पार्ट मोल्ड कोअरला घट्ट पकडून ठेवतो."
        ],
        avoid: [
          "कुलिंग वेळ वाढवा जेणेकरून प्लास्टिक कडक आणि इजेक्शन सहन करण्यास सक्षम होईल.",
          "होल्डिंग/पॅकिंग प्रेशर कमी करा जेणेकरून गियर मोल्ड कोअरभोवती जास्त घट्ट होणार नाही.",
          "हलक्या धक्क्यासाठी इजेक्टरचा वेग कमी करा.",
          "आतील कोअर आणि दातांवर ड्राफ्ट अँगल वाढवा आणि स्टील पॉलिश करा.",
          "इजेक्शन दाब पसरवण्यासाठी मोठे इजेक्टर पिन किंवा स्लीव्ह रिंग वापरा."
        ]
      },
      gu: {
        name: "વ્હાઇટ માર્ક્સ (Stress Whitening)",
        description: "પ્લાસ્ટિક પર સફેદ ડાઘ કે રિંગના નિશાન, ખાસ કરીને ઇજેક્ટર પિનની બરાબર ઉપર.",
        causes: [
          "મોલ્ડમાં ચુસ્તપણે ચોંટેલા ભાગ સામે ઇજેક્ટર પિન ભારે બળથી દબાણ કરે છે.",
          "પ્લાસ્ટિક સામગ્રી તેની સ્થિતિસ્થાપક મર્યાદા કરતાં વધુ ખેંચાય છે, જેથી માઇક્રો ક્રેક્સ સફેદ દેખાય છે.",
          "ડ્રાફ્ટ એંગલનો અભાવ અથવા ઓવર-પેકિંગથી ભાગ મોલ્ડ કોરને મજબૂત રીતે પકડી રાખે છે."
        ],
        avoid: [
          "કૂલિંગ સમય વધારો જેથી પ્લાસ્ટિક કઠણ અને ઇજેક્શન સહન કરવા માટે પૂરતું મજબૂત બને.",
          "હોલ્ડિંગ/પેકિંગ પ્રેશર ઘટાડો જેથી ગિયર મોલ્ડ કોરની આસપાસ વધુ ચુસ્ત ન સંકોચાય.",
          "ધીમા ધક્કા માટે ઇજેક્ટર ફોરવર્ડ સ્પીડ ઓછી કરો.",
          "અંદરના કોર અને દાંત પર ડ્રાફ્ટ એંગલ વધારો અને સ્ટીલને પોલિશ કરો.",
          "ઇજેક્શન દબાણ મોટા વિસ્તારમાં ફેલાવવા મોટી ઇજેક્ટર પિન અથવા સ્લીવ રિંગ્સ વાપરો."
        ]
      }
    }
  }
];

export function getDefectKnowledge(defectId, lang = "en") {
  if (!defectId) return null;
  const key = defectId.toLowerCase().trim();
  const entry = DEFECT_KNOWLEDGE_BASE.find(
    (d) => d.id.toLowerCase() === key || d.name.toLowerCase() === key
  );
  if (!entry) return null;

  const validLang = ["en", "hi", "mr", "gu"].includes(lang) ? lang : "en";
  const tr = entry.translations[validLang] || entry.translations.en;
  // Clean natural narration for each language without mixed-language artifacts
  const cleanSpeechName = validLang === "en"
    ? tr.name
    : (tr.name || "").replace(/\s*\([A-Za-z0-9\s&_\-—/]+\)/g, "").trim();

  let narrationText = "";
  if (validLang === "hi") {
    narrationText = `${cleanSpeechName}। ${tr.description} मुख्य कारण: ${tr.causes.slice(0, 2).join("। ")}। रोकथाम और उपाय: ${tr.avoid.slice(0, 2).join("। ")}।`;
  } else if (validLang === "mr") {
    narrationText = `${cleanSpeechName}. ${tr.description} मुख्य कारणे: ${tr.causes.slice(0, 2).join(". ")}. कसे टाळावे: ${tr.avoid.slice(0, 2).join(". ")}.`;
  } else if (validLang === "gu") {
    narrationText = `${cleanSpeechName}. ${tr.description} મુખ્ય કારણો: ${tr.causes.slice(0, 2).join(". ")}. કેવી રીતે બચવું: ${tr.avoid.slice(0, 2).join(". ")}.`;
  } else {
    narrationText = `${cleanSpeechName}. ${tr.description} Key causes: ${tr.causes.slice(0, 2).join(". ")}. Key remedies: ${tr.avoid.slice(0, 2).join(". ")}.`;
  }

  return {
    id: entry.id,
    canonicalName: entry.name,
    category: entry.category,
    accentColor: entry.accentColor,
    name: tr.name || entry.name,
    description: tr.description,
    causes: tr.causes || [],
    avoid: tr.avoid || [],
    narrationText
  };
}
