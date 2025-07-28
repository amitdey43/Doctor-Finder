// utils/problemSpecialistMap.js

module.exports = [
  {
    keywords: [
      // Medical terms
      "fever", "cough", "cold", "flu", "sore throat", "runny nose", "congestion", "fatigue", "headache", "body ache", "back pain", "joint pain", "muscle pain", "nausea", "vomiting", "diarrhea", "constipation", "abdominal pain", "dizziness", "weight loss", "weight gain", "insomnia", "allergies", "hay fever", "rash", "dermatitis",
      // Layman terms
      "tummy ache", "upset stomach", "throwing up", "feeling sick", "poop problems", "stomach bug", "feeling tired", "can't sleep", "itchy skin", "skin irritation"
    ],
    specialist: "General Physician",
  },
  {
    keywords: [
      "chest pain", "chest tightness", "heart pain", "angina", "chest pressure", "palpitations", "heart racing", "irregular heartbeat", "shortness of breath", "dyspnea", "fatigue", "dizziness", "fainting", "syncope", "swollen legs", "swollen ankles", "edema", "high blood pressure", "hypertension", "rapid heartbeat", "tachycardia", "slow heartbeat", "bradycardia", "heart murmur", "arrhythmia", "heart attack symptoms", "radiating pain to arm", "radiating pain to jaw",
      // Layman terms
      "heart hurts", "heart skips", "can't catch breath", "breathing trouble", "puffy feet", "puffy legs", "blood pressure high"
    ],
    specialist: "Cardiologist",
  },
  {
    keywords: [
      "mole changes", "dark spot", "skin lesion", "melanoma warning sign", "acne", "pimples", "whiteheads", "blackheads", "cysts", "chronic acne", "stubborn acne", "rash", "hives", "urticaria", "eczema", "psoriasis", "dermatitis", "itching", "pruritus", "dry skin", "flaky skin", "redness", "scales", "scars", "keloids", "warts", "skin tags", "nail fungus", "ingrown nails", "brittle nails", "discolored nails", "hair loss", "alopecia", "thinning hair",
      // Layman terms
      "zit", "pimple", "skin bump", "skin itch", "dry patches", "itchy bumps"
    ],
    specialist: "Dermatologist",
  },
  {
    keywords: [
      "fever", "high fever", "persistent fever in infants", "earache", "ear pain", "ear infection", "sore throat", "cough", "runny nose", "nasal congestion", "vomiting", "diarrhea", "bloody diarrhea", "dehydration", "dry mouth", "few wet diapers", "persistent cough", "wheezing", "asthma", "shortness of breath", "pink eye", "conjunctivitis", "skin rash", "exanthems", "eczema", "bruising", "bleeding", "slow growth", "developmental delay", "ADHD", "hyperactivity", "behavior changes",
      // Layman terms
      "baby fever", "baby not eating", "baby throwing up", "baby rash", "kid breathing hard", "child wheezing"
    ],
    specialist: "Pediatrician",
  },
  {
    keywords: [
      "joint pain", "bone pain", "muscle pain", "back pain", "neck pain", "shoulder pain", "hip pain", "knee pain", "ankle pain", "foot pain", "leg pain", "arm pain", "arthritis", "osteoarthritis", "rheumatoid arthritis", "gout", "stiffness", "morning stiffness", "joint swelling", "sprain", "ligament tear", "strain", "muscle injury", "tendon injury", "dislocation", "fracture", "broken bone", "bruising", "backache", "sciatica", "herniated disc", "slipped disc", "osteoporosis", "reduced mobility",
      // Layman terms
      "hurt joints", "stiff joints", "can't move well", "bones hurt", "muscle ache"
    ],
    specialist: "Orthopedic",
  },
  {
    keywords: [
      "headache", "migraine", "severe headache", "chronic headache", "memory loss", "confusion", "disorientation", "cognitive decline", "dizziness", "vertigo", "fainting", "syncope", "seizures", "convulsions", "staring spells", "tremor", "shaking", "involuntary movements", "numbness", "tingling", "muscle weakness", "paralysis", "ataxia", "coordination loss", "stroke symptoms", "slurred speech", "facial droop", "arm weakness",
      // Layman terms
      "feel dizzy", "see spots", "body shakes", "can't move arm"
    ],
    specialist: "Neurologist",
  },
  { 
    keywords: [
      "hearing loss", "ear pain", "ear infection", "tinnitus", "ear ringing", "vertigo", "balance problems", "chronic sinus congestion", "runny nose", "nasal congestion", "sinus pressure", "nasal polyps", "allergies", "hay fever", "nosebleeds", "snoring", "sleep apnea", "chronic cough", "postnasal drip", "hoarseness", "persistent sore throat", "tonsillitis", "difficulty swallowing", "lump in throat", "neck lumps", "neck swelling",
      // Layman terms
      "blocked nose", "can't hear well", "ringing in ears", "throat hurts", "snore loud"
    ],
    specialist: "ENT Specialist",
  },
  { 
    keywords: [
      "abnormal periods", "painful periods", "heavy bleeding", "menorrhagia", "dysmenorrhea", "irregular bleeding", "spotting between periods", "postmenopausal bleeding", "pelvic pain", "pelvic pressure", "painful intercourse", "dyspareunia", "unusual vaginal discharge", "odor change", "color change", "vaginal itching", "vaginal burning", "yeast infection", "breast pain", "breast lumps", "fertility issues", "pregnancy issues", "menopause symptoms", "hot flashes", "night sweats", "vaginal dryness", "urinary symptoms", "UTI", "painful urination",
      // Layman terms
      "period cramps", "spotting", "upset tummy during period", "itch down there"
    ],
    specialist: "Gynecologist",
  },
  {
    keywords: [
      "depressed mood", "persistent sadness", "hopelessness", "anxiety", "excessive worry", "panic attacks", "obsessive thoughts", "compulsions", "OCD", "mania", "rapid mood swings", "bipolar", "insomnia", "hypersomnia", "sleep disturbances", "appetite changes", "weight loss", "weight gain", "fatigue", "irritability", "anger", "concentration problems", "social withdrawal", "hallucinations", "delusions", "paranoia", "self-harm thoughts", "suicidal",
      // Layman terms
      "feel sad", "can't sleep at night", "scared for no reason", "bad thoughts"
    ],
    specialist: "Psychiatrist",
  },
  {
    keywords: [
      "toothache", "dental pain", "tooth sensitivity", "cavities", "caries", "broken tooth", "chipped tooth", "loose tooth", "missing tooth", "receding gums", "swollen gums", "bleeding gums", "gingivitis", "abscess", "infection", "malocclusion", "bad bite", "jaw pain", "TMJ symptoms", "jaw clicking", "pain when opening", "dry mouth", "xerostomia", "bad breath", "halitosis", "mouth sores", "canker sores", "cold sores", "thrush", "oral yeast infection",
      // Layman terms
      "tooth hurts", "bleeding when I brush", "bad taste in mouth", "mouth sore"
    ],
    specialist: "Dentist",
  },
  {
    keywords: [
      "eye pain", "blurry vision", "vision loss", "red eye", "dry eyes", "itchy eye", "eye infection", "conjunctivitis",
      // Layman terms
      "can't see clearly", "eyes feel dry", "eye is red", "itchy eyes"
    ],
    specialist: "Ophthalmologist",
  },
  {
    keywords: [
      "diabetes", "high sugar", "low sugar", "thyroid", "hormone imbalance", "weight gain", "weight loss", "goiter", "pcos",
      // Layman terms
      "sugar too high", "sugar too low", "feeling shaky", "mood swings"
    ],
    specialist: "Endocrinologist",
  },
  {
    keywords: [
      "cough", "breathing difficulty", "asthma", "wheezing", "chronic cough", "lung infection", "bronchitis", "short breath",
      // Layman terms
      "can't breathe", "heavy breathing", "wheeze"
    ],
    specialist: "Pulmonologist",
  },
  {
    keywords: [
      "abdominal pain", "bloating", "gas", "constipation", "diarrhea", "acid reflux", "heartburn", "nausea", "vomiting", "indigestion", "IBS", "irritable bowel", "ulcers", "blood in stool", "fatty liver", "hepatitis",
      // Layman terms
      "stomach bloat", "belching", "burning chest", "gas pain"
    ],
    specialist: "Gastroenterologist",
  },
  {
    keywords: [
      "painful urination", "frequent urination", "blood in urine", "urinary retention", "kidney stones", "incontinence", "enlarged prostate", "erectile dysfunction", "testicular pain", "urinary tract infection",
      // Layman terms
      "pain when peeing", "peeing often", "peeing blood", "can't hold pee", "kidney pain", "pee"
    ],
    specialist: "Urologist",
  },
  {
    keywords: [
      "high creatinine", "swelling", "foamy urine", "high blood pressure", "kidney failure", "electrolyte imbalance", "chronic kidney disease",
      // Layman terms
      "kidney not working", "swollen feet/face", "blood pressure"
    ],
    specialist: "Nephrologist",
  },
  {
    keywords: [
      "joint stiffness", "chronic joint pain", "swelling in joints", "fatigue", "lupus", "rheumatoid arthritis", "autoimmune disorder", "unexplained inflammation",
      // Layman terms
      "joints swollen", "can't move joints", "joint pain"
    ],
    specialist: "Rheumatologist",
  },
  {
    keywords: [
      "anemia", "fatigue", "pale skin", "easy bruising", "bleeding disorders", "low platelet", "high platelet", "leukemia", "sickle cell",
      // Layman terms
      "tired all the time", "bruises easily", "looks pale"
    ],
    specialist: "Hematologist",
  },
  {
    keywords: [
      "unexplained weight loss", "persistent fatigue", "persistent pain", "swelling", "lump", "blood in stool", "blood in urine", "abnormal bleeding", "chronic cough", "suspicious mole",
      // Layman terms
      "lost weight without trying", "lump I can feel"
    ],
    specialist: "Oncologist",
  },
  {
    keywords: [
      "low libido", "premature ejaculation", "erectile dysfunction", "infertility", "hormone imbalance",
      // Layman terms
      "can't perform", "low sex drive"
    ],
    specialist: "Sexologist",
  },
  {
    keywords: [
      "appendicitis", "hernia", "gallstones", "gallbladder pain", "abdominal mass", "cyst", "lump", "abscess", "anal pain", "hemorrhoids", "piles", "fissure", "fistula", "wound", "surgical wound", "biopsy", "infection", "cut", "swelling",
      // Layman terms
      "belly hurts right side","stomach pain", "bumble in belly", "piles pain"
    ],
    specialist: "General Surgeon",
  }
];

