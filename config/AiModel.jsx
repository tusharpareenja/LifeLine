const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY||'AIzaSyAtkHnYknmYNvBovIyjSklVO8U_YvBodWA';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  
   // Function to get a medical overview for a patient (original code remains unchanged)
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate a 100-word medical overview for a patient with the following details:\n- Medications: Lisinopril 10mg daily, Albuterol inhaler as needed\n- Allergies: Penicillin (severe), Pollen (moderate)\n- Past Surgeries: Appendectomy (2015), Knee Arthroscopy (2018)\n\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "Mr./Ms. [Patient Name] is a [age]-year-old patient with a history of appendectomy (2015) and knee arthroscopy (2018).  Current medications include Lisinopril 10mg daily for blood pressure management and Albuterol inhaler PRN for respiratory symptoms.  The patient has a severe penicillin allergy and a moderate pollen allergy.  No significant cardiovascular, neurological, or gastrointestinal issues are noted in the record.  Regular monitoring of blood pressure and respiratory function is recommended.  Patient should carry their Albuterol inhaler and inform all healthcare providers of their penicillin allergy.\n"},
      ],
    },
  ],
});

// New function to get eligible subsidies for a patient based on Indian government schemes
export const subsidyChatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: `You are an expert on Indian government welfare schemes and subsidies.\n\nGiven patient data in JSON format, identify all applicable healthcare or financial support schemes provided by the central or state governments of India. Only include schemes for which the patient clearly qualifies based on the data. If uncertain, exclude them.\n\nReturn the result as a JSON object with the following structure:\n\n{\n  \"patient_details\": { ... },\n  \"eligible_subsidies\": [\n    {\n      \"subsidy_name\": \"Name of the scheme\",\n      \"provider\": \"Central Government / State Government / Other\",\n      \"subsidy_info\": \"Brief summary of the scheme (1-2 sentences).\",\n      \"application_link\": \"Official link or 'N/A'\"\n    }\n    // additional schemes\n  ]\n}`},
      ],
    },
    {
      role: "model",
      parts: [
        {text: `{
  "patient_details": {
    "name": "[Patient Name]",
    "dob": "[DOB]",
    "income": "[Income]",
    "medical_conditions": ["..."],
    "disability": "...",
    "employment_status": "...",
    "insurance_status": "..."
  },
  "eligible_subsidies": [
    {
      "subsidy_name": "Ayushman Bharat Yojana",
      "provider": "Central Government",
      "subsidy_info": "Covers up to Rs. 5 lakh per family per year for secondary and tertiary care hospitalization.",
      "application_link": "https://pmjay.gov.in"
    }
  ]
}`},
      ],
    },
  ],
});