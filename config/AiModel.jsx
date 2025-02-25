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
  
  
   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a 100-word medical overview for a patient with the following details:\\n- Medications: Lisinopril 10mg daily, Albuterol inhaler as needed\\n- Allergies: Penicillin (severe), Pollen (moderate)\\n- Past Surgeries: Appendectomy (2015), Knee Arthroscopy (2018)\\n\n"},
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
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());