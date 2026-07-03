import { Disease, Doctor, Child } from "./types";

export const diseasesData: Disease[] = [
  {
    id: "common-cold",
    name: "Common Cold",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAer203bjmwifQtv6hV5r1Scr_CnllndKs-gMhPa5iCGMSNDItWuAjTWA7MgJv3zGY28acaJWW8CmDckSaN7PFNO2wDICUKR-bBYYoWA7NDqCIuKS2RXqHFFOg3sY8xP6RhCRXprg9aDr6eqxYon7oK76V4QvlL13aBY7TMh2_yV40nqUTR0iFfSWCbtWE8GYmcUAkJYBSge_sfiaw2uwnheGfKtGpkXbLnFumQeoEvgPLBftCPFM15sl4scBkK2ILRNO-IKCeUNw_-",
    symptoms: [
      "Runny or stuffy nose (initially clear, then may become thick yellow or green)",
      "Sneezing, mild sore throat, and mild coughing",
      "Low-grade fever (usually under 38.3°C or 101°F)",
      "Decreased appetite and mild irritability",
      "Slightly swollen lymph nodes"
    ],
    whenToSeeDoctor: [
      "Fever rises above 38.5°C (101.3°F) in infants under 3 months, or lasts more than 3 days in older children",
      "Signs of breathing difficulty: rapid breathing, flared nostrils, or ribs pulling in (retractions)",
      "Extreme lethargy, unusual drowsiness, or continuous high-pitched crying",
      "Cold symptoms last more than 10 to 14 days without improvement",
      "Signs of ear pain (pulling at ears, crying when lying down)"
    ],
    riskFactors: [
      "Exposure to child care settings or siblings attending school",
      "Immature immune systems during infancy and toddlerhood",
      "Fall and winter seasons (increased indoor crowding)",
      "Exposure to secondhand tobacco smoke",
      "Poor hand hygiene practices"
    ],
    prevention: [
      "Wash hands frequently with soap and water for at least 20 seconds",
      "Teach children to cough or sneeze into their elbow or a tissue",
      "Clean and sanitize toys, doorknobs, and shared surfaces regularly",
      "Keep children away from individuals showing cold or flu-like symptoms",
      "Ensure recommended childhood immunizations (including annual flu shot) are up to date"
    ],
    homeCare: [
      "Ensure plenty of rest and sleep to support the immune system",
      "Offer frequent, small amounts of fluids (breast milk, formula, water, or warm broth)",
      "Use saline nasal drops and a bulb syringe to gently clear congested nasal passages",
      "Run a cool-mist humidifier in the child's bedroom to keep air moist",
      "Never give aspirin to children due to risk of Reye's syndrome; use paracetamol or ibuprofen if recommended by doctor"
    ],
    summary: "The common cold is a mild, self-limiting viral infection of the upper respiratory tract. It is extremely common in young children, who can have 6 to 10 colds per year as their immune systems develop."
  },
  {
    id: "chicken-pox",
    name: "Chicken pox",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAp6FCBz9gf_h5ZigBF5ox233FBkC3ny5LLj9VMAAIc2QphYot7EBONt_UZuRreuKitjfDU0AC6ISiFpKMaqPX_BzggRfmXXMltILS_S8P7B83x0LxuM1eCSasT24CYarNmiMYbjMSNN-gugzrKXueeU1Lhu5RLmZ24PRxoCXkAepyCdmZDT27ddH_CZV5TZrOUYk8kA0N_uNR3AigKMbo5LR4Ak5ffwozviNWZ2Q41M3qGi0EBVdrqpAyMYzZYE1Pm2PbKxXDh29xH",
    symptoms: [
      "Highly itchy rash that turns into fluid-filled blisters (vesicles), then crusts over",
      "Fever, headache, and fatigue starting 1 to 2 days before the rash appears",
      "Loss of appetite and overall feeling of being unwell (malaise)",
      "Spots appearing first on the chest, back, or face, then spreading across the body",
      "Ulcers in the mouth or throat, causing discomfort during feeding"
    ],
    whenToSeeDoctor: [
      "The rash spreads to one or both eyes, or becomes extremely red, swollen, or warm (signs of secondary bacterial infection)",
      "The child develops severe chest pain, shortness of breath, or a persistent high fever",
      "The child is extremely drowsy, confused, has difficulty walking, or has a stiff neck",
      "Any member of the household is immunocompromised or pregnant and exposed",
      "The child is under 4 weeks of age"
    ],
    riskFactors: [
      "Not being vaccinated with the varicella vaccine",
      "Attending school, daycare, or playgroups where outbreaks can spread rapidly",
      "Living with school-aged children who are unvaccinated",
      "Immature or weakened immune system",
      "Close personal contact with a symptomatic individual"
    ],
    prevention: [
      "The primary prevention is the Varicella (chickenpox) vaccine, usually given in two doses",
      "Isolate the infected child until all blisters have fully crusted over (usually 5 to 7 days)",
      "Practice meticulous hand hygiene and avoid sharing eating utensils or cups",
      "Clean toys and disinfect household items that have been in contact with blister fluids",
      "Keep fingernails short and clean to prevent scratching and spreading"
    ],
    homeCare: [
      "Apply cool, wet compresses or give lukewarm baths with colloidal oatmeal or baking soda every 3-4 hours",
      "Pat the skin dry gently instead of rubbing to avoid breaking blisters",
      "Apply calamine lotion to the itchy spots (avoiding the eyes and face if irritated)",
      "Keep child's fingernails short to prevent scratching and subsequent bacterial skin infections",
      "Feed soft, bland foods if the child has chickenpox sores in the mouth"
    ],
    summary: "Chickenpox is a highly contagious disease caused by the Varicella-Zoster Virus (VZV). It causes an itchy, blister-like rash, fever, and fatigue. While usually mild in healthy children, vaccine prevention is highly recommended."
  },
  {
    id: "asthma",
    name: "Asthma",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeN1msjvA1g7JM1DX7-YveFwb2tI78MC5vfAHuUxFNWQzgPU1kBybsbFh3ah7b5GgAGoiFqP-WBwf3ObHbOnOQZNSJJcDomeL2ZerpbhsaQUk6UwxU-Cwlv-elizdaXhWP4mKGyi-fNoBcTBcWtaIGYxDZfu_A9ZVVGzqrkL3QsvJcmIJbyV4tPiJ6iEgDo_8ZXPQiCDiiguNp6s5NSLd2LDTbNBnU25Q8nT1YLazHt4mzh40PQ71deVdsmeWr5RRnBCtnfE_x0BxQ",
    symptoms: [
      "Frequent, whistling, or wheezing sound when breathing out",
      "Persistent dry cough, which may worsen at night, during exercise, or in cold air",
      "Shortness of breath, rapid breathing, or visible effort to breathe",
      "Chest tightness or complaints that 'my chest feels funny'",
      "Fatigue, weakness during physical activities, or trouble sleeping due to coughing"
    ],
    whenToSeeDoctor: [
      "The child is struggling to breathe (flaring nostrils, skin pulling tightly around ribs/neck)",
      "The child has to stop midsentence to take a breath, or has difficulty speaking",
      "The child's chest and ribs pull inward deeply when inhaling",
      "The child's lips, gums, or fingernails appear blue, grey, or pale",
      "The rescue inhaler does not provide relief or symptoms worsen rapidly"
    ],
    riskFactors: [
      "Family history of asthma, eczema, or severe allergies (atopy)",
      "Frequent respiratory infections (bronchiolitis, RSV, or severe colds) during infancy",
      "Exposure to environmental tobacco smoke or air pollution",
      "History of allergies, such as hay fever or food allergies",
      "Low birth weight or premature birth"
    ],
    prevention: [
      "Identify and minimize exposure to triggers (dust mites, pet dander, mold, pollen, cold air)",
      "Maintain a strictly smoke-free environment for the child",
      "Keep indoor air clean by using high-quality HEPA filters and vacuuming regularly",
      "Ensure the child gets their annual flu vaccination and RSV preventative immunization if eligible",
      "Follow a personalized Asthma Action Plan created in partnership with your pediatrician"
    ],
    homeCare: [
      "Administer controller and quick-relief rescue medications exactly as prescribed using a spacer",
      "Keep the child calm and upright during mild coughing or wheezing episodes",
      "Monitor air quality forecasts and keep windows closed on high-pollen or high-pollution days",
      "Maintain a symptom journal to track triggers, rescue inhaler use, and peak flow readings",
      "Ensure childcare providers, school staff, and relatives know how to administer the child's inhaler"
    ],
    summary: "Asthma is a chronic condition that causes the airways to swell and narrow, leading to breathing difficulties, coughing, and wheezing. With correct diagnosis, trigger management, and treatment, children with asthma can lead active lives."
  },
  {
    id: "constipation",
    name: "Constipation",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRVsovJQTnq1y-YcJoJhdsD0cWybxUdLczBMFsaN6ihQbdZrs9XIcygKiPL9cVC2zuU9lX_yqv7s28lyGh2eRXU4nxMjLrW1fh7eOWbFWNy0zdzF59yvwrXjvaGbNlFWFp5e31_RKx8vLmAP4FwXOue7IrzqRUBk563gcHbRbIi65NOIoRt-AhBGptFs2w6Xbt2sLqIdGPV8eKkmml7PrdNi3Ks8BRzti26m8zTqmlq18AvCoVDWQrjwmgIwDQx2H3XwOJxWIYTdt5",
    symptoms: [
      "Fewer than three bowel movements per week",
      "Stools that are hard, dry, large, and difficult or painful to pass",
      "Abdominal pain, bloating, cramping, or mild swelling",
      "Traces of bright red blood on toilet paper or on the surface of the stool",
      "Soiling or staining of underwear (encopresis) due to liquid stool bypassing hard mass"
    ],
    whenToSeeDoctor: [
      "Constipation is accompanied by severe abdominal pain, vomiting, or abdominal swelling",
      "The child develops a high fever, loses weight, or experiences significant loss of appetite",
      "There is substantial blood in the stool or bleeding from the anus",
      "Constipation persists for more than two weeks despite dietary changes",
      "The child experiences painful, recurrent cracks or tears in the skin around the anus (anal fissures)"
    ],
    riskFactors: [
      "Diet low in high-fiber foods (fruits, vegetables, whole grains)",
      "Inadequate daily fluid or water intake",
      "Withholding bowel movements due to fear of pain, public restrooms, or stress",
      "Changes in routine, such as traveling, starting school, or illness",
      "Transitioning to solid foods or cow's milk too quickly in infancy"
    ],
    prevention: [
      "Incorporate high-fiber foods like pears, prunes, berries, beans, and whole-wheat cereals",
      "Encourage drinking plenty of water throughout the day",
      "Establish a consistent toilet routine (e.g., sitting on the toilet for 5-10 minutes after meals)",
      "Promote physical activity and active play, which helps stimulate normal bowel function",
      "Avoid excessive consumption of cow's milk and dairy, which can slow digestion in some children"
    ],
    homeCare: [
      "Gradually increase fiber intake over several days to avoid excessive gas and bloating",
      "Offer small cups of apple, pear, or prune juice (contains sorbitol, a natural stool softener)",
      "Encourage the child to sit on the potty with feet supported on a stool to optimize posture",
      "Provide gentle abdomen massage in a clockwise direction to stimulate bowel movement",
      "Never administer laxatives, enemas, or suppositories to children without consulting a pediatrician"
    ],
    summary: "Pediatric constipation is a very common issue characterized by hard, painful, or infrequent stools. It is most frequently behavioral or dietary, and can be resolved with dietary adjustments, fluid intake, and positive toileting habits."
  }
];

export const doctorsData: Doctor[] = [
  {
    id: "dr-miller",
    name: "Dr. Sarah Miller, MD",
    specialty: "General Pediatrician",
    experience: "12 Years Experience",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    availableSlots: ["09:00 AM", "10:30 AM", "11:15 AM", "02:00 PM", "03:30 PM"]
  },
  {
    id: "dr-chen",
    name: "Dr. James Chen, MD",
    specialty: "Pediatric Allergist & Pulmonologist",
    experience: "15 Years Experience",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    availableSlots: ["08:30 AM", "09:45 AM", "11:00 AM", "01:30 PM", "04:00 PM"]
  },
  {
    id: "dr-patel",
    name: "Dr. Ananya Patel, MD",
    specialty: "Developmental Pediatric Specialist",
    experience: "10 Years Experience",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300",
    availableSlots: ["10:00 AM", "11:30 AM", "02:30 PM", "03:45 PM", "04:30 PM"]
  },
  {
    id: "dr-rossi",
    name: "Dr. Marcus Rossi, MD",
    specialty: "Pediatric Gastroenterology Expert",
    experience: "18 Years Experience",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
    availableSlots: ["09:15 AM", "10:00 AM", "01:00 PM", "02:15 PM", "03:00 PM"]
  }
];

export const defaultChildren: Child[] = [
  {
    id: "child-1",
    name: "Emily Watson",
    birthDate: "2023-04-12",
    gender: "Female",
    weight: "12.4 kg",
    allergies: "Peanuts, Penicillin",
    bloodType: "O Positive",
    notes: "Active baby, loves carrots. Prone to mild eczema."
  },
  {
    id: "child-2",
    name: "Leo Watson",
    birthDate: "2025-01-05",
    gender: "Male",
    weight: "7.1 kg",
    allergies: "None known",
    bloodType: "A Positive",
    notes: "Exclusively breastfed, sleeping schedule improving."
  }
];
