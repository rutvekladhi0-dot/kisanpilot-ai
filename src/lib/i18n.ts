export type Language = 'en' | 'hi' | 'mr';

export interface Translations {
  // Language Selection
  chooseYourLanguage: string;
  languageSubtitle: string[];
  marathi: string;
  hindi: string;
  english: string;

  // Profile Setup
  setupProfile: string;
  setupProfileSubtitle: string;
  farmerName: string;
  farmerNamePlaceholder: string;
  villageName: string;
  villageNamePlaceholder: string;
  farmSize: string;
  lessThanOneAcre: string;
  oneToFiveAcres: string;
  fiveToTenAcres: string;
  moreThanTenAcres: string;
  mainCrop: string;
  selectCrop: string;
  cropWheat: string;
  cropRice: string;
  cropCotton: string;
  cropSoybean: string;
  cropSugarcane: string;
  cropTomato: string;
  cropOnion: string;
  cropOther: string;
  saveAndContinue: string;
  back: string;
  nameRequired: string;
  villageRequired: string;

  // Dashboard
  welcomeBack: string;
  exploreFeatures: string;
  village: string;
  farmSizeLabel: string;
  farmStatus: string;
  good: string;
  aiChatbot: string;
  aiChatbotDesc: string;
  myFarm: string;
  myFarmDesc: string;
  cropDoctor: string;
  cropDoctorDesc: string;
  weather: string;
  weatherDesc: string;
  farmInsights: string;
  farmInsightsDesc: string;
  smartAlerts: string;
  smartAlertsDesc: string;
  changeLanguage: string;
  settings: string;
  dashboard: string;
  yourPersonalAi: string;
  smarterDecisions: string;
  tagline: string;

  // Chatbot
  aiAssistant: string;
  typeMessage: string;
  send: string;
  backToDashboard: string;
  quickSuggestions: string;
  suggestion1: string;
  suggestion2: string;
  suggestion3: string;
  suggestion4: string;

  // Chatbot responses
  waterResponse: string;
  yellowLeavesResponse: string;
  pestResponse: string;
  fertilizerResponse: string;
  weatherResponse: string;
  defaultResponse: string;

  // Crop Doctor
  cropDoctorTitle: string;
  cropDoctorSubtitle: string;
  uploadPhoto: string;
  uploadPhotoDesc: string;
  analyzeCrop: string;
  analyzing: string;
  cropHealthScore: string;
  possibleObservation: string;
  recommendations: string;
  rec1: string;
  rec2: string;
  rec3: string;
  rec4: string;
  analyzeAnother: string;
  mildNutrientStress: string;

  // Weather
  weatherTitle: string;
  currentWeather: string;
  temperature: string;
  condition: string;
  partlyCloudy: string;
  humidity: string;
  wind: string;
  rainChance: string;
  fiveDayForecast: string;
  farmingAdvice: string;
  rainAdvice: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;

  // My Farm
  myFarmTitle: string;
  farmDetails: string;
  editProfile: string;
  saveChanges: string;
  cancel: string;
  cropHealth: string;
  soilMoisture: string;
  irrigationStatus: string;
  moderate: string;
  onTrack: string;
  farmStatusSection: string;

  // Insights
  insightsTitle: string;
  cropHealthScore2: string;
  soilMoisture2: string;
  irrigationEfficiency: string;
  aiInsights: string;
  insight1: string;
  insight2: string;
  insight3: string;
  insight4: string;
  insight5: string;
  insight6: string;
  generateInsight: string;

  // Alerts
  alertsTitle: string;
  rainExpected: string;
  monitorSoil: string;
  checkPestSigns: string;
  fertilizerReminder: string;
  markAsRead: string;
  markAllAsRead: string;
  noUnreadAlerts: string;

  // Settings
  settingsTitle: string;
  changeLanguageOption: string;
  editProfileOption: string;
  resetData: string;
  resetConfirm: string;
  confirmReset: string;
  cancelReset: string;

  // Voice Khata
  voiceKhata: string;
  voiceKhataDesc: string;
  addEntry: string;
  entryType: string;
  incomeLabel: string;
  expenseLabel: string;
  category: string;
  amount: string;
  description: string;
  date: string;
  totalIncome: string;
  totalExpense: string;
  netProfit: string;
  recentEntries: string;
  noEntries: string;
  catLabour: string;
  catFertilizer: string;
  catSeeds: string;
  catPesticides: string;
  catIrrigation: string;
  catTransport: string;
  catCropSale: string;
  catOther: string;
  deleteEntry: string;
  saveEntry: string;

  // Farm Economics
  farmEconomics: string;
  farmEconomicsDesc: string;
  seasonEconomics: string;
  incomeVsExpense: string;
  categoryBreakdown: string;
  totalSpend: string;
  totalEarned: string;
  netReturn: string;

  // Bajar Bhav (Market Prices)
  bajarBhav: string;
  bajarBhavDesc: string;
  commodity: string;
  minPrice: string;
  maxPrice: string;
  modalPrice: string;
  priceSource: string;
  lastUpdated: string;
  priceTrend: string;
  trendingUp: string;
  trendingDown: string;
  stable: string;
  transportCost: string;
  estNetReturn: string;
  calculateReturn: string;
  marketAdvice: string;

  // Risk Radar
  riskRadar: string;
  riskRadarDesc: string;
  rainRisk: string;
  waterStressRisk: string;
  diseaseRisk: string;
  heatRisk: string;
  costRisk: string;
  insuranceReady: string;
  low: string;
  medium: string;
  high: string;
  riskAdvice: string;

  // What-If Simulator
  whatIfSimulator: string;
  whatIfDesc: string;
  compareCrops: string;
  estimatedProfit: string;
  estimatedCost: string;
  recommendation: string;
  simulate: string;
  cropA: string;
  cropB: string;
  selectCropA: string;
  selectCropB: string;
  investmentPerAcre: string;
  expectedYield: string;
  marketPricePer: string;
  cropAProfit: string;
  cropBProfit: string;
  betterChoice: string;

  // PMFBY Schemes
  pmfbySchemes: string;
  pmfbyDesc: string;
  schemeInfo: string;
  eligibility: string;
  requiredDocs: string;
  deadlines: string;
  officialPortal: string;
  pmfbyTitle: string;
  pmfbyDesc2: string;
  cropInsurance: string;
  kisanCreditCard: string;
  subsidySchemes: string;
  applyOnline: string;
  viewDetails: string;
  pmfbyNote: string;

  // Farm Goals
  farmGoals: string;
  farmGoalsDesc: string;
  seasonalTarget: string;
  currentProgress: string;
  remainingAmount: string;
  setGoal: string;
  editGoal: string;
  goalAmount: string;
  onTrackMsg: string;
  behindMsg: string;

  // Next Best Action
  nextBestAction: string;
  nextBestActionDesc: string;
  priorityAction: string;
  reason: string;
  weatherContext: string;
  action1: string;
  action1Reason: string;
  action2: string;
  action2Reason: string;
  action3: string;
  action3Reason: string;

  // Enhanced Dashboard
  farmBriefing: string;
  riskSummary: string;
  quickActions: string;

  // Voice Khata Mic
  tapToSpeak: string;
  listening: string;
  voiceError: string;
  couldNotHear: string;
  recordingStopped: string;
  voiceDetected: string;
  speakNow: string;

  // Monthly Photo Tracker
  monthlyPhotoTracker: string;
  monthlyPhotoTrackerDesc: string;
  week1: string;
  week2: string;
  week3: string;
  week4: string;
  takePhoto: string;
  photoTaken: string;
  noPhotoYet: string;
  scheduledDate: string;
  capturePhoto: string;
  photoHistory: string;
  photosThisMonth: string;
  monthlyProgress: string;
  allPhotosDone: string;
  photosRemaining: string;
  viewPhotoTracker: string;
  cropGrowthTimeline: string;

  // AI Decision Explainer (Simulator)
  aiDecisionExplainer: string;
  aiDecisionDesc: string;
  yourCrop: string;
  whyThisDecision: string;
  aiConfidence: string;
  marketAnalysis: string;
  riskFactors: string;
  seasonContext: string;
  getAiAnalysis: string;
  aiReasonTitle: string;
  aiReasonDetail: string;
  investmentDetails: string;
  expectedYieldDetails: string;
  marketPriceDetails: string;
  waterRequirement: string;
  soilSuitability: string;
  bestPractice: string;
  disclaimer: string;

  // Expert Consultation
  expertConsultation: string;
  expertConsultationDesc: string;
  consultExpert: string;
  expertSpecialty: string;
  expertAvailable: string;
  callExpert: string;
  expertNote: string;
  bookConsultation: string;

  // Krushi Kendra
  nearbyKrushiKendra: string;
  krushiKendraDesc: string;
  krushiKendraAddress: string;
  krushiKendraPhone: string;
  krushiKendraHours: string;
  krushiKendraServices: string;
  krushiKendraList: string;
  findNearest: string;
  directions: string;

  // Farm Memory
  farmMemory: string;
  farmMemoryDesc: string;
  tellUsAboutFarm: string;
  soilType: string;
  soilTypePlaceholder: string;
  irrigationSource: string;
  irrigationSourcePlaceholder: string;
  farmingExperience: string;
  farmingExperiencePlaceholder: string;
  ownOrLeased: string;
  ownLand: string;
  leasedLand: string;
  lastCrop: string;
  lastCropPlaceholder: string;
  expectedHarvestMonth: string;
  expectedHarvestPlaceholder: string;
  livestockCount: string;
  livestockCountPlaceholder: string;
  fertilizerBrand: string;
  fertilizerBrandPlaceholder: string;
  seedSource: string;
  seedSourcePlaceholder: string;
  saveFarmMemory: string;
  farmMemorySaved: string;
  editFarmMemory: string;
  soilLoamy: string;
  soilClay: string;
  soilSandy: string;
  soilBlack: string;
  soilRed: string;
  irrigationWell: string;
  irrigationCanal: string;
  irrigationRain: string;
  irrigationDrip: string;
  seedSourceLocal: string;
  seedSourceGovt: string;
  seedSourcePrivate: string;
  seedSourceOwn: string;
  farmMemoryComplete: string;
  farmMemorySection: string;
  yearOfFarming: string;

  // Farmer Photo
  changePhoto: string;
  uploadPhotoLabel: string;
  removePhoto: string;
  takeSelfie: string;
  profilePhoto: string;

  // Chatbot Voice
  voiceChat: string;
  voiceChatDesc: string;
  tapMicToTalk: string;
  listeningChat: string;
  voiceMessageSent: string;
  startVoiceChat: string;
  stopVoiceChat: string;

  // Season Score Card
  seasonScoreCard: string;
  seasonScoreCardDesc: string;
  currentSeason: string;
  seasonPerformance: string;
  overallScore: string;
  seasonCropHealth: string;
  irrigationScore: string;
  pestManagementScore: string;
  soilHealthScore: string;
  profitScore: string;
  timelyActionsScore: string;
  excellent: string;
  seasonGood: string;
  average: string;
  needsImprovement: string;
  seasonHighlights: string;
  seasonAlerts: string;
  chatHelpResponse?: string;
  rabiSeason: string;
  kharifSeason: string;
  seasonTip: string;
  seasonBreakdown: string;
  scoreOutOf: string;
  viewSeasonCard: string;
  downloadScorecardPdf: string;
  downloadScorecardDesc: string;
  shareScorecard: string;
  pdfGenerating: string;
  copiedToClipboard: string;
  shareNotSupported: string;
  scorecardGeneratedDate: string;
  poweredBy: string;

  // Last Season Review
  lastSeasonReview: string;
  lastSeasonReviewDesc: string;
  lastSeasonCrop: string;
  lastSeasonCropPlaceholder: string;
  lastSeasonCropWheat: string;
  lastSeasonCropCotton: string;
  lastSeasonCropSoybean: string;
  lastSeasonCropRice: string;
  lastSeasonCropSugarcane: string;
  lastSeasonCropOnion: string;
  lastSeasonCropOther: string;
  lastSeasonYield: string;
  lastSeasonYieldPlaceholder: string;
  lastSeasonIncome: string;
  lastSeasonIncomePlaceholder: string;
  lastSeasonExpense: string;
  lastSeasonExpensePlaceholder: string;
  lastSeasonMajorProblem: string;
  lastSeasonMajorProblemPlaceholder: string;
  problemPest: string;
  problemWater: string;
  problemMarket: string;
  problemDisease: string;
  problemWeather: string;
  problemLabor: string;
  problemNone: string;
  lastSeasonPestIssue: string;
  lastSeasonPestIssuePlaceholder: string;
  lastSeasonSatisfaction: string;
  lastSeasonSatisfactionPlaceholder: string;
  satisfactionVerySatisfied: string;
  satisfactionSatisfied: string;
  satisfactionNeutral: string;
  satisfactionDissatisfied: string;
  satisfactionVeryDissatisfied: string;
  lastSeasonLesson: string;
  lastSeasonLessonPlaceholder: string;
  lastSeasonCropDamage: string;
  lastSeasonCropDamagePlaceholder: string;

  // Voice Chat in Chatbot
  micButton: string;
  stopTalking: string;

  // Enhanced Chatbot Responses
  suggestion5: string;
  suggestion6: string;
  suggestion7: string;
  suggestion8: string;
  chatGreeting: string;
  chatThankYou: string;
  chatFarmStatusResponse: string;
  chatFarmStatusDefault: string;
  chatTransactionResponse: string;
  chatTransactionNoData: string;
  chatSoilResponse: string;
  chatSeedResponse: string;
  chatHarvestResponse: string;
  chatInsuranceResponse: string;
  chatLoanResponse: string;
  chatSubsidyResponse: string;
  chatOrganicResponse: string;
  chatDiseaseResponse: string;
  chatMarketResponse: string;
  chatNextActionResponse: string;
  chatScorecardResponse: string;
  chatWeedResponse: string;
  chatTechResponse: string;
  chatCropRotationResponse: string;
  // Family Members
  familyMembers: string;
  familyMembersDesc: string;
  addMember: string;
  memberName: string;
  memberNamePlaceholder: string;
  memberRelation: string;
  memberPhone: string;
  memberPhonePlaceholder: string;
  saveMember: string;
  cancelMember: string;
  removeMember: string;
  sharedWith: string;
  maxMembersReached: string;
  relationWife: string;
  relationSon: string;
  relationDaughter: string;
  relationFather: string;
  relationMother: string;
  relationBrother: string;
  relationOther: string;
  selectRelation: string;
  memberAdded: string;
  memberRemoved: string;
  voiceSmartParsing: string;
  voiceParsed: string;
  currentMonth: string;
  pastMonth: string;
  manageFamilyMembers: string;
}

const en: Translations = {
  chooseYourLanguage: 'Choose Your Language',
  languageSubtitle: [
    'Smarter farming decisions, at the right time.',
  ],
  marathi: 'Marathi – मराठी',
  hindi: 'Hindi – हिंदी',
  english: 'English – English',

  setupProfile: 'Setup Your Farm Profile',
  setupProfileSubtitle: 'Tell us about your farm so we can help you better.',
  farmerName: 'Farmer Name',
  farmerNamePlaceholder: 'Enter your name',
  villageName: 'Village Name',
  villageNamePlaceholder: 'Enter village name',
  farmSize: 'Farm Size',
  lessThanOneAcre: 'Less than 1 acre',
  oneToFiveAcres: '1–5 acres',
  fiveToTenAcres: '5–10 acres',
  moreThanTenAcres: 'More than 10 acres',
  mainCrop: 'Main Crop',
  selectCrop: 'Select crop',
  cropWheat: 'Wheat',
  cropRice: 'Rice',
  cropCotton: 'Cotton',
  cropSoybean: 'Soybean',
  cropSugarcane: 'Sugarcane',
  cropTomato: 'Tomato',
  cropOnion: 'Onion',
  cropOther: 'Other',
  saveAndContinue: 'Save & Continue',
  back: 'Back',
  nameRequired: 'Farmer name is required',
  villageRequired: 'Village name is required',

  welcomeBack: 'Welcome back',
  exploreFeatures: 'Explore KisanPilot Features',
  village: 'Village',
  farmSizeLabel: 'Farm Size',
  farmStatus: 'Farm Status',
  good: 'Good',
  aiChatbot: 'AI Chatbot',
  aiChatbotDesc: 'Ask your farming questions',
  myFarm: 'My Farm',
  myFarmDesc: 'View & edit farm details',
  cropDoctor: 'Crop Doctor',
  cropDoctorDesc: 'Diagnose crop health',
  weather: 'Weather',
  weatherDesc: 'Local weather updates',
  farmInsights: 'Farm Insights',
  farmInsightsDesc: 'AI-powered analytics',
  smartAlerts: 'Smart Alerts',
  smartAlertsDesc: 'Important notifications',
  changeLanguage: 'Change Language',
  settings: 'Settings',
  dashboard: 'Dashboard',
  yourPersonalAi: 'Your Personal AI Co-Pilot for Farming',
  smarterDecisions: 'Smarter farming decisions, at the right time.',
  tagline: 'Your Personal AI Co-Pilot for Farming',

  aiAssistant: 'KisanPilot AI Assistant',
  typeMessage: 'Type your farming question...',
  send: 'Send',
  backToDashboard: 'Back to Dashboard',
  quickSuggestions: 'Quick Suggestions',
  suggestion1: 'When should I water my crop?',
  suggestion2: 'How can I improve soil health?',
  suggestion3: 'What should I do if leaves turn yellow?',
  suggestion4: 'How can I protect my crop from pests?',
  waterResponse: '💧 **Irrigation Guidance:** Water your crops early in the morning or late evening to reduce evaporation. Check soil moisture by inserting your finger 2-3 inches into the soil — if it feels dry, it\'s time to water. Generally, most crops need 1-2 inches of water per week. During flowering and fruiting stages, increase watering frequency. Use drip irrigation for better water efficiency.',
  yellowLeavesResponse: '🍂 **Yellow Leaves — Possible Causes:**\n\n1. **Nutrient Deficiency:** Lack of nitrogen, iron, or magnesium can cause yellowing. Check if older leaves or newer leaves are affected.\n2. **Overwatering:** Roots may be suffocating. Check for waterlogged soil.\n3. **Pest or Disease:** Look for spots, webs, or insects on the leaves.\n4. **Natural Aging:** Bottom leaves naturally yellow as the plant grows.\n\n**Suggestion:** Check the soil drainage, inspect leaves closely for pests, and consider a soil test.',
  pestResponse: '🐛 **Pest Management:**\n\n1. **Identify the pest:** Look closely at leaves, stems, and soil for insects or damage signs.\n2. **Monitor regularly:** Check your crops every 2-3 days for early signs.\n3. **Natural methods:** Use neem oil spray, introduce beneficial insects like ladybugs.\n4. **Integrated Pest Management (IPM):** Combine cultural, biological, and chemical methods.\n5. **Consult local expert:** If the infestation is severe, consult an agricultural expert for targeted treatment.',
  fertilizerResponse: '🧪 **Fertilizer & Nutrient Guidance:**\n\n1. **Soil Testing:** Get your soil tested at a local lab to know exact nutrient levels.\n2. **Balanced NPK:** Use fertilizers with balanced Nitrogen, Phosphorus, and Potassium ratios.\n3. **Organic Options:** Consider compost, vermicompost, or farmyard manure for long-term soil health.\n4. **Micronutrients:** Don\'t forget zinc, iron, and boron — deficiency shows in leaf color.\n5. **Application Timing:** Apply fertilizers during active growth phases for best absorption.',
  weatherResponse: '🌦 **Weather & Farming:**\n\nBased on the current forecast, plan your farming activities accordingly:\n\n- If rain is expected (30%+ chance), delay irrigation.\n- High humidity increases fungal disease risk — ensure proper spacing.\n- Wind above 20 km/h may damage tall crops — consider windbreaks.\n- Plan spraying on calm, dry days for best results.\n- Monitor soil temperature — most crops germinate best above 15°C.',
  defaultResponse: '🌱 I\'m your KisanPilot AI assistant. I can help you with crop care, irrigation, pests, soil health, and farming decisions. Ask me anything about your farm!',

  cropDoctorTitle: 'Crop Doctor',
  cropDoctorSubtitle: 'Upload a photo of your crop for AI-powered health analysis',
  uploadPhoto: 'Upload Crop Photo',
  uploadPhotoDesc: 'Take a photo or select from gallery',
  analyzeCrop: 'Analyze Crop',
  analyzing: 'Analyzing your crop with AI…',
  cropHealthScore: 'Crop Health Score',
  possibleObservation: 'Possible Observation',
  recommendations: 'Recommendations',
  rec1: 'Check soil nutrient levels',
  rec2: 'Monitor leaf discoloration',
  rec3: 'Ensure proper irrigation',
  rec4: 'Consult a local agricultural expert for confirmation',
  analyzeAnother: 'Analyze Another Image',
  mildNutrientStress: 'Mild signs of nutrient stress detected.',

  weatherTitle: 'Weather & Farm Forecast',
  currentWeather: 'Current Weather',
  temperature: 'Temperature',
  condition: 'Condition',
  partlyCloudy: 'Partly Cloudy',
  humidity: 'Humidity',
  wind: 'Wind',
  rainChance: 'Rain Chance',
  fiveDayForecast: '5-Day Forecast',
  farmingAdvice: 'Farming Advice',
  rainAdvice: 'Rain is possible this week. Avoid unnecessary irrigation before rainfall.',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',

  myFarmTitle: 'My Farm',
  farmDetails: 'Farm Details',
  editProfile: 'Edit Profile',
  saveChanges: 'Save Changes',
  cancel: 'Cancel',
  cropHealth: 'Crop Health',
  soilMoisture: 'Soil Moisture',
  irrigationStatus: 'Irrigation Status',
  moderate: 'Moderate',
  onTrack: 'On Track',
  farmStatusSection: 'Farm Status',

  insightsTitle: 'Farm Insights',
  cropHealthScore2: 'Crop Health',
  soilMoisture2: 'Soil Moisture',
  irrigationEfficiency: 'Irrigation Efficiency',
  aiInsights: 'AI Insights',
  insight1: 'Your crop health is currently stable. Continue regular monitoring.',
  insight2: 'Consider monitoring soil moisture in the next 2 days.',
  insight3: 'Weather conditions may affect irrigation planning this week.',
  insight4: 'Crop growth rate is above average for this season. Great job!',
  insight5: 'Pest risk is low this week due to dry conditions.',
  insight6: 'Consider applying organic compost to boost long-term soil health.',
  generateInsight: 'Generate New Insight',

  alertsTitle: 'Smart Alerts',
  rainExpected: 'Rain expected in your area within the next 48 hours.',
  monitorSoil: 'Monitor soil moisture levels — recent dry spell detected.',
  checkPestSigns: 'Check crop leaves for early signs of pest infestation.',
  fertilizerReminder: 'Fertilizer planning reminder — schedule soil testing.',
  markAsRead: 'Mark as Read',
  markAllAsRead: 'Mark All as Read',
  noUnreadAlerts: 'No unread alerts! Your farm is all caught up.',

  settingsTitle: 'Settings',
  changeLanguageOption: 'Change Language',
  editProfileOption: 'Edit Farmer Profile',
  resetData: 'Reset Demo Data',
  resetConfirm: 'This will clear all your saved data and return to the language selection screen. Are you sure?',
  confirmReset: 'Confirm Reset',
  cancelReset: 'Cancel',

  // Voice Khata
  voiceKhata: 'Voice Khata',
  voiceKhataDesc: 'Voice-based farm accounting',
  addEntry: 'Add Entry',
  entryType: 'Entry Type',
  incomeLabel: 'Income',
  expenseLabel: 'Expense',
  category: 'Category',
  amount: 'Amount',
  description: 'Description',
  date: 'Date',
  totalIncome: 'Total Income',
  totalExpense: 'Total Expense',
  netProfit: 'Net Profit',
  recentEntries: 'Recent Entries',
  noEntries: 'No entries yet',
  catLabour: 'Labour',
  catFertilizer: 'Fertilizer',
  catSeeds: 'Seeds',
  catPesticides: 'Pesticides',
  catIrrigation: 'Irrigation',
  catTransport: 'Transport',
  catCropSale: 'Crop Sale',
  catOther: 'Other',
  deleteEntry: 'Delete',
  saveEntry: 'Save Entry',

  // Farm Economics
  farmEconomics: 'Farm Economics',
  farmEconomicsDesc: 'Income, expense & profit tracking',
  seasonEconomics: 'Season Economics',
  incomeVsExpense: 'Income vs Expense',
  categoryBreakdown: 'Category Breakdown',
  totalSpend: 'Total Spending',
  totalEarned: 'Total Earned',
  netReturn: 'Net Return',

  // Bajar Bhav (Market Prices)
  bajarBhav: 'Market Prices',
  bajarBhavDesc: 'Live mandi prices & trends',
  commodity: 'Commodity',
  minPrice: 'Min Price',
  maxPrice: 'Max Price',
  modalPrice: 'Modal Price',
  priceSource: 'Source',
  lastUpdated: 'Last Updated',
  priceTrend: 'Price Trend',
  trendingUp: 'Trending Up',
  trendingDown: 'Trending Down',
  stable: 'Stable',
  transportCost: 'Transport Cost',
  estNetReturn: 'Estimated Net Return',
  calculateReturn: 'Calculate Net Return',
  marketAdvice: 'Market data is for reference. Verify with local mandi.',

  // Risk Radar
  riskRadar: 'Risk Radar',
  riskRadarDesc: 'Monitor farm risks',
  rainRisk: 'Rain Risk',
  waterStressRisk: 'Water Stress',
  diseaseRisk: 'Disease Risk',
  heatRisk: 'Heat Risk',
  costRisk: 'Cost Risk',
  insuranceReady: 'Insurance Readiness',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  riskAdvice: 'Risk-based farming advice',

  // What-If Simulator
  whatIfSimulator: 'What-If Simulator',
  whatIfDesc: 'Compare crop decisions',
  compareCrops: 'Compare Crops',
  estimatedProfit: 'Estimated Profit',
  estimatedCost: 'Estimated Cost',
  recommendation: 'Recommendation',
  simulate: 'Simulate',
  cropA: 'Crop A',
  cropB: 'Crop B',
  selectCropA: 'Select Crop A',
  selectCropB: 'Select Crop B',
  investmentPerAcre: 'Investment per Acre',
  expectedYield: 'Expected Yield',
  marketPricePer: 'Market Price per Quintal',
  cropAProfit: 'Crop A Profit',
  cropBProfit: 'Crop B Profit',
  betterChoice: 'Better Choice',

  // PMFBY Schemes
  pmfbySchemes: 'PMFBY & Schemes',
  pmfbyDesc: 'Insurance & govt schemes',
  schemeInfo: 'Scheme Information',
  eligibility: 'Eligibility',
  requiredDocs: 'Required Documents',
  deadlines: 'Deadlines',
  officialPortal: 'Official Portal',
  pmfbyTitle: 'Pradhan Mantri Fasal Bima Yojana',
  pmfbyDesc2: 'Crop insurance by Government of India',
  cropInsurance: 'Crop Insurance',
  kisanCreditCard: 'Kisan Credit Card',
  subsidySchemes: 'Subsidy Schemes',
  applyOnline: 'Apply Online',
  viewDetails: 'View Details',
  pmfbyNote: 'Insurance does not guarantee claim. Verify with official sources.',

  // Farm Goals
  farmGoals: 'Farm Goals',
  farmGoalsDesc: 'Track seasonal income targets',
  seasonalTarget: 'Seasonal Income Target',
  currentProgress: 'Current Progress',
  remainingAmount: 'Remaining Amount',
  setGoal: 'Set Goal',
  editGoal: 'Edit Goal',
  goalAmount: 'Goal Amount (₹)',
  onTrackMsg: 'You are on track to meet your goal!',
  behindMsg: 'You are behind your target. Review expenses.',

  // Next Best Action
  nextBestAction: 'Next Best Action',
  nextBestActionDesc: 'AI-suggested priority action',
  priorityAction: 'Priority Action',
  reason: 'Reason',
  weatherContext: 'Weather Context',
  action1: 'Monitor soil moisture levels',
  action1Reason: 'Rain expected Thursday. Check soil before and after rainfall.',
  action2: 'Apply second dose of fertilizer',
  action2Reason: 'Crop is in active growth phase. Balanced NPK now will boost yield.',
  action3: 'Check crop leaves for early pest signs',
  action3Reason: 'Warm, humid conditions increase pest risk this week.',

  // Enhanced Dashboard
  farmBriefing: 'Farm Briefing',
  riskSummary: 'Risk Summary',
  quickActions: 'Quick Actions',

  // Voice Khata Mic
  tapToSpeak: 'Tap to Speak',
  listening: 'Listening...',
  voiceError: 'Voice not supported',
  couldNotHear: 'Could not hear. Try again.',
  recordingStopped: 'Recording stopped',
  voiceDetected: 'Voice detected!',
  speakNow: 'Speak now...',

  // Monthly Photo Tracker
  monthlyPhotoTracker: 'Monthly Photo Tracker',
  monthlyPhotoTrackerDesc: 'Track crop growth with 4 photos every month',
  week1: 'Week 1',
  week2: 'Week 2',
  week3: 'Week 3',
  week4: 'Week 4',
  takePhoto: 'Take Photo',
  photoTaken: 'Photo Taken',
  noPhotoYet: 'No photo yet',
  scheduledDate: 'Scheduled Date',
  capturePhoto: 'Capture Crop Photo',
  photoHistory: 'Photo History',
  photosThisMonth: 'Photos This Month',
  monthlyProgress: 'Monthly Progress',
  allPhotosDone: 'All 4 photos captured this month!',
  photosRemaining: 'photos remaining',
  viewPhotoTracker: 'View Photo Tracker',
  cropGrowthTimeline: 'Crop Growth Timeline',

  // AI Decision Explainer (Simulator)
  aiDecisionExplainer: 'AI Decision Explainer',
  aiDecisionDesc: 'Understand why AI recommends this farming decision',
  yourCrop: 'Your Crop',
  whyThisDecision: 'Why This Decision?',
  aiConfidence: 'AI Confidence',
  marketAnalysis: 'Market Analysis',
  riskFactors: 'Risk Factors',
  seasonContext: 'Season Context',
  getAiAnalysis: 'Get AI Analysis',
  aiReasonTitle: 'AI Reasoning',
  aiReasonDetail: 'Detailed reasoning behind this recommendation',
  investmentDetails: 'Investment Details',
  expectedYieldDetails: 'Expected Yield',
  marketPriceDetails: 'Market Price Analysis',
  waterRequirement: 'Water Requirement',
  soilSuitability: 'Soil Suitability',
  bestPractice: 'Best Practice',
  disclaimer: 'This is AI-generated advice. Consult a local expert for critical decisions.',

  // Expert Consultation
  expertConsultation: 'Expert Consultation',
  expertConsultationDesc: 'Connect with agricultural experts for personalized advice',
  consultExpert: 'Consult an Expert',
  expertSpecialty: 'Specialty',
  expertAvailable: 'Available Now',
  callExpert: 'Call Expert',
  expertNote: 'Experts available Mon-Sat, 9AM-6PM',
  bookConsultation: 'Book Consultation',

  // Krushi Kendra
  nearbyKrushiKendra: 'Nearby Krushi Kendra',
  krushiKendraDesc: 'Agricultural input centers near you for seeds, fertilizers & pesticides',
  krushiKendraAddress: 'Address',
  krushiKendraPhone: 'Phone',
  krushiKendraHours: 'Hours',
  krushiKendraServices: 'Services',
  krushiKendraList: 'Agricultural Centers Near You',
  findNearest: 'Find Nearest Center',
  directions: 'Get Directions',

  // Farm Memory
  farmMemory: 'Farm Memory',
  farmMemoryDesc: 'Tell us about your farm in detail',
  tellUsAboutFarm: 'Tell us about your farm',
  soilType: 'Soil Type',
  soilTypePlaceholder: 'e.g. Loamy, Black, Sandy',
  irrigationSource: 'Irrigation Source',
  irrigationSourcePlaceholder: 'e.g. Well, Canal, Drip',
  farmingExperience: 'Farming Experience',
  farmingExperiencePlaceholder: 'e.g. 15 years',
  ownOrLeased: 'Land Ownership',
  ownLand: 'Own Land',
  leasedLand: 'Leased Land',
  lastCrop: 'Last Harvested Crop',
  lastCropPlaceholder: 'e.g. Cotton, Wheat',
  expectedHarvestMonth: 'Expected Harvest Month',
  expectedHarvestPlaceholder: 'e.g. March 2025',
  livestockCount: 'Livestock Count',
  livestockCountPlaceholder: 'e.g. 2 cows, 5 goats',
  fertilizerBrand: 'Preferred Fertilizer Brand',
  fertilizerBrandPlaceholder: 'e.g. IFFCO, Tata Kisan',
  seedSource: 'Seed Source',
  seedSourcePlaceholder: 'e.g. Local market, Govt. center',
  saveFarmMemory: 'Save Farm Memory',
  farmMemorySaved: 'Farm memory saved!',
  editFarmMemory: 'Edit Farm Memory',
  soilLoamy: 'Loamy',
  soilClay: 'Clay',
  soilSandy: 'Sandy',
  soilBlack: 'Black (Regur)',
  soilRed: 'Red Soil',
  irrigationWell: 'Well/Borewell',
  irrigationCanal: 'Canal',
  irrigationRain: 'Rainfed Only',
  irrigationDrip: 'Drip Irrigation',
  seedSourceLocal: 'Local Market',
  seedSourceGovt: 'Govt. Center',
  seedSourcePrivate: 'Private Dealer',
  seedSourceOwn: 'Own Saved Seeds',
  farmMemoryComplete: 'Your farm profile is complete!',
  farmMemorySection: 'Farm Details',
  yearOfFarming: 'years of farming',

  // Farmer Photo
  changePhoto: 'Change Photo',
  uploadPhotoLabel: 'Upload or take a photo',
  removePhoto: 'Remove Photo',
  takeSelfie: 'Take Selfie',
  profilePhoto: 'Profile Photo',

  // Chatbot Voice
  voiceChat: 'Voice Chat',
  voiceChatDesc: 'Talk to AI Assistant',
  tapMicToTalk: 'Tap mic to talk',
  listeningChat: 'Listening... speak now',
  voiceMessageSent: 'Voice message sent',
  startVoiceChat: 'Start voice chat',
  stopVoiceChat: 'Stop voice chat',

  // Season Score Card
  seasonScoreCard: 'Season Score Card',
  seasonScoreCardDesc: 'Track your seasonal farming performance',
  currentSeason: 'Current Season',
  seasonPerformance: 'Season Performance',
  overallScore: 'Overall Score',
  seasonCropHealth: 'Crop Health',
  irrigationScore: 'Irrigation',
  pestManagementScore: 'Pest Management',
  soilHealthScore: 'Soil Health',
  profitScore: 'Profitability',
  timelyActionsScore: 'Timely Actions',
  excellent: 'Excellent',
  seasonGood: 'Good',
  average: 'Average',
  needsImprovement: 'Needs Improvement',
  seasonHighlights: 'Season Highlights',
  seasonAlerts: 'Season Alerts',
  rabiSeason: 'Rabi 2025-26',
  kharifSeason: 'Kharif 2025',
  seasonTip: 'Season Tip',
  seasonBreakdown: 'Score Breakdown',
  scoreOutOf: '/100',
  viewSeasonCard: 'View Season Card',
  downloadScorecardPdf: 'Download Scorecard PDF',
  downloadScorecardDesc: 'Save your season performance report',
  shareScorecard: 'Share',
  pdfGenerating: 'Generating PDF...',
  copiedToClipboard: 'Copied to clipboard!',
  shareNotSupported: 'Share not supported',
  scorecardGeneratedDate: 'Generated on',
  poweredBy: 'Powered by KisanPilot AI',

  // Last Season Review
  lastSeasonReview: 'Last Season Review',
  lastSeasonReviewDesc: 'Tell us about your previous farming season',
  lastSeasonCrop: 'Last Season Crop',
  lastSeasonCropPlaceholder: "Select last season's crop",
  lastSeasonCropWheat: 'Wheat',
  lastSeasonCropCotton: 'Cotton',
  lastSeasonCropSoybean: 'Soybean',
  lastSeasonCropRice: 'Rice',
  lastSeasonCropSugarcane: 'Sugarcane',
  lastSeasonCropOnion: 'Onion',
  lastSeasonCropOther: 'Other',
  lastSeasonYield: 'Yield per Acre',
  lastSeasonYieldPlaceholder: 'e.g. 15 quintals/acre',
  lastSeasonIncome: 'Total Income',
  lastSeasonIncomePlaceholder: 'e.g. ₹50,000',
  lastSeasonExpense: 'Total Expense',
  lastSeasonExpensePlaceholder: 'e.g. ₹25,000',
  lastSeasonMajorProblem: 'Major Problem Faced',
  lastSeasonMajorProblemPlaceholder: 'Select main problem',
  problemPest: 'Pest Attack',
  problemWater: 'Water Shortage',
  problemMarket: 'Low Market Price',
  problemDisease: 'Crop Disease',
  problemWeather: 'Weather Damage',
  problemLabor: 'Labor Shortage',
  problemNone: 'No Major Problem',
  lastSeasonPestIssue: 'Pest/Disease Details',
  lastSeasonPestIssuePlaceholder: 'Which pest or disease?',
  lastSeasonSatisfaction: 'Satisfaction Level',
  lastSeasonSatisfactionPlaceholder: 'How satisfied were you?',
  satisfactionVerySatisfied: 'Very Satisfied',
  satisfactionSatisfied: 'Satisfied',
  satisfactionNeutral: 'Neutral',
  satisfactionDissatisfied: 'Dissatisfied',
  satisfactionVeryDissatisfied: 'Very Dissatisfied',
  lastSeasonLesson: 'Key Learning',
  lastSeasonLessonPlaceholder: 'What did you learn from last season?',
  lastSeasonCropDamage: 'Crop Damage %',
  lastSeasonCropDamagePlaceholder: 'e.g. 10%',

  // Voice Chat in Chatbot
  micButton: 'Mic',
  stopTalking: 'Stop',

  // Enhanced Chatbot Responses
  suggestion5: 'What is my current month transaction?',
  suggestion6: 'Show me everything about my farm',
  suggestion7: 'Who are my family members?',
  suggestion8: 'What are the risks for my farm?',
  chatGreeting: '🌱 Namaste! I\'m your KisanPilot AI assistant. I can help with crop care, irrigation, pest management, market prices, insurance, and much more. Ask me anything about your farm!',
  chatThankYou: '🙏 You\'re welcome! Happy farming! If you need any more help, I\'m always here.',
  chatFarmStatusResponse: '🌾 **Farm Status Report:**\n\n✅ **Last Crop:** {crop}\n🧪 **Soil Type:** {soil}\n😊 **Last Season Satisfaction:** {satisfaction}\n\n📊 Overall, your farm appears to be in stable condition. Keep monitoring your crops regularly and maintain proper irrigation. For a detailed score, check the Season Score Card feature!',
  chatFarmStatusDefault: '🌾 Your farm status looks stable based on current conditions. To get a personalized report, please fill in your Farm Memory details first. Go to the Farm Memory section from the dashboard to set up your farm profile.',
  chatTransactionResponse: '💰 **Last Month Transaction Summary:**\n\n💵 **Total Income:** {income} ({incCount} entries)\n💸 **Total Expense:** {expense} ({expCount} entries)\n📊 **{netLabel}:** {net}\n📝 **Total Transactions:** {total}\n\n💡 Tip: Check the Voice Khata feature for detailed entry-by-entry records and category breakdowns.',
  chatTransactionNoData: '📝 No transactions found for last month. Start adding your income and expense entries using the **Voice Khata** feature! You can add entries by voice or manually. This will help you track your farm economics.',
  chatSoilResponse: '🧪 **Soil Health Guide:**\n\n1. **Get a soil test done** at your nearest Krushi Kendra or agriculture office — it costs only ₹50-200.\n2. **Check pH level** — most crops prefer 6.0-7.5 pH.\n3. **Add organic matter** — compost, vermicompost, or farmyard manure improves soil structure.\n4. **Crop rotation** prevents soil depletion.\n5. **Avoid excess chemical fertilizers** — they degrade soil health over time.\n6. **Mulching** helps retain moisture and prevents erosion.\n\n💡 Healthy soil = Healthy crops = Better income!',
  chatSeedResponse: '🌱 **Seed & Sowing Guide:**\n\n1. **Always buy certified seeds** from Govt. centers or authorized dealers.\n2. **Treat seeds** before sowing — use Trichoderma or Carbendazim solution.\n3. **Check sowing season** — each crop has an ideal window (e.g., Wheat: Oct-Nov, Cotton: Jun-Jul).\n4. **Seed rate matters** — follow recommended seed rate per acre for optimum plant population.\n5. **Seed depth** — sow at the right depth (generally 3-5 cm for most crops).\n6. **Maintain spacing** for proper aeration and sunlight.\n\n📅 Check with your local agriculture office for the current season\'s recommended varieties.',
  chatHarvestResponse: '🌾 **Harvest Readiness Guide:**\n\n1. **Grain moisture** should be below 14% for most crops.\n2. **Color change** — leaves turn yellow/brown when crop matures.\n3. **Grain hardness** — bite test: if grain is hard, it\'s ready.\n4. **Days after flowering** — Wheat: ~120 days, Cotton: ~160 days, Rice: ~110 days.\n5. **Weather window** — plan harvest during clear, dry weather.\n6. **Post-harvest** — dry grains properly before storage to avoid fungal growth.\n\n💡 Harvesting at the right time maximizes quality and market price!',
  chatInsuranceResponse: '🛡 **Crop Insurance & Schemes:**\n\n**PMFBY (Pradhan Mantri Fasal Bima Yojana):**\n• Premium: Only 2% for Kharif, 1.5% for Rabi crops\n• Covers: Natural calamities, pests, diseases\n• Apply through: Your local bank or CSC center\n• Deadline: Before sowing season starts\n\n**Kisan Credit Card (KCC):**\n• Loan up to ₹3 lakh at 4% interest (subsidized)\n• Covers crop, animal husbandry, and fishery\n• Apply at any nationalized bank\n\n💡 Visit the PMFBY & Schemes section for full details and eligibility!',
  chatLoanResponse: '🏦 **Loan & Credit Options:**\n\n**Kisan Credit Card (KCC):**\n• Up to ₹3 lakh at 4% interest\n• No collateral needed for loans up to ₹1.6 lakh\n• Repayment: After harvest\n\n**Crop Loan:**\n• Available from nationalized banks & cooperative banks\n• Interest subvention: 2% prompt repayment discount\n\n**Government Subsidies:**\n• Interest subsidy up to 3% on crop loans\n• Processing fee waiver in some states\n\n📞 Visit your nearest bank branch with Aadhaar card and land records.',
  chatSubsidyResponse: '🏛 **Government Schemes for Farmers:**\n\n1. **PM-KISAN** — ₹6,000/year direct income support\n2. **PMFBY** — Crop insurance at low premium\n3. **Soil Health Card Scheme** — Free soil testing\n4. **e-NAM** — Online national agriculture market\n5. **PM Krishi Sinchai Yojana** — Irrigation subsidy\n6. **Kisan Credit Card** — Low-interest crop loan\n\n📱 Register at: pmkisan.gov.in or visit your nearest CSC center for assistance.',
  chatOrganicResponse: '🌿 **Organic Farming Guide:**\n\n**Benefits:** Better soil health, premium market prices, sustainable farming.\n\n**Getting Started:**\n1. **Composting** — Turn crop residue + cow dung into nutrient-rich compost\n2. **Vermicompost** — Use earthworms for faster decomposition\n3. **Neem-based pesticides** — Natural pest control\n4. **Cow urine (Gomutra)** — Acts as growth promoter & pest deterrent\n5. **Green manuring** — Grow dhaincha/sunhemp and plow back into soil\n6. **Crop rotation** — Alternate legumes with cereals\n\n💰 Organic produce fetches 20-40% premium price in markets!',
  chatDiseaseResponse: '🦠 **Disease Management:**\n\n**Common Crop Diseases:**\n• **Blight** (potato/tomato) — Brown spots, spreading rapidly\n• **Rust** (wheat) — Orange-brown pustules on leaves\n• **Powdery Mildew** — White powder on leaves\n• **Root Rot** — Wilting, yellowing from base\n\n**Prevention:**\n1. Use disease-resistant seed varieties\n2. Maintain proper spacing for air circulation\n3. Avoid waterlogging — improves root health\n4. Apply Trichoderma or Pseudomonas as preventive spray\n5. Remove and destroy infected plants immediately\n\n⚠️ For severe infection, consult your nearest Krushi Kendra.',
  chatMarketResponse: '🏪 **Market Price Guide:**\n\n📊 Check the **Market Prices (Bajar Bhav)** feature for live mandi prices.\n\n**Tips for Better Prices:**\n1. **Timing matters** — Prices often drop right after harvest season\n2. ** graded produce** — Get your crop graded for better rates\n3. **Multiple mandis** — Compare prices across nearby mandis\n4. **Direct selling** — Skip middlemen for better margins\n5. **e-NAM portal** — Sell online at national level\n6. **Storage** — If prices are low, store and sell later\n\n💡 Check transport costs before choosing a distant mandi!',
  chatNextActionResponse: '✨ **Recommended Action for Today:**\n\n📋 **Priority 1:** Check soil moisture levels — use the finger test (insert 2-3 inches into soil).\n📋 **Priority 2:** Walk through your field and check for early pest signs on leaves.\n📋 **Priority 3:** Review weather forecast — plan irrigation accordingly.\n\n💡 For personalized AI recommendations, check the **Next Best Action** feature on your dashboard!',
  chatScorecardResponse: '🏆 **Season Score Card:**\n\n📊 Your season performance is tracked across 6 key metrics:\n• Crop Health\n• Irrigation Management\n• Pest Management\n• Soil Health\n• Profitability\n• Timely Actions\n\nCheck the **Season Score Card** feature to see your detailed scores, highlights, alerts, and download a PDF report!',
  chatWeedResponse: '🌿 **Weed Management:**\n\n**Types of Weeds:**\n• **Grassy weeds** — resemble crop seedlings\n• **Broadleaf weeds** — wider leaves, easier to identify\n• **Sedges** — triangular stems, thrive in wet soil\n\n**Control Methods:**\n1. **Manual weeding** — First 30 days after sowing is critical\n2. **Hoeing** — Loosens soil + removes weeds\n3. **Mulching** — Blocks weed seed germination\n4. **Herbicide** — Use recommended pre-emergence herbicide if needed\n\n💡 Timely weeding in the first month can increase yield by 15-25%!',
  chatTechResponse: '🚜 **Modern Farming Technology:**\n\n**Available Technologies:**\n1. **Drones** — Crop health monitoring, spraying pesticides over large areas\n2. **Soil moisture sensors** — Real-time irrigation planning\n3. **Mobile apps** — Weather alerts, market prices, expert advice\n4. **Solar pumps** — Cost-effective irrigation solution\n5. **Micro-irrigation** — Drip/sprinkler for water efficiency\n6. **AI advisory** — Like KisanPilot! Smart farming decisions\n\n💰 Government subsidies (up to 50%) available for drip irrigation and solar pumps!',
  chatCropRotationResponse: '🔄 **Crop Rotation Guide:**\n\n**Why Rotate?** Prevents soil depletion, breaks pest cycles, improves yield.\n\n**Recommended Rotations:**\n• **Year 1:** Cereal (Wheat/Rice)\n• **Year 2:** Legume (Gram/Soybean) — fixes nitrogen naturally\n• **Year 3:** Cash crop (Cotton/Sugarcane)\n• **Year 4:** Oilseed (Groundnut/Mustard)\n\n**Benefits:**\n✅ 10-20% yield improvement\n✅ Reduced fertilizer need by 25%\n✅ Fewer pest problems\n✅ Better soil structure\n\n💡 Legumes in rotation can save ₹2,000-4,000/acre in fertilizer costs!',
  chatHelpResponse: '🤖 **I can help you with:**\n\n💧 **Irrigation** — When and how much to water\n🐛 **Pest Management** — Identify and control pests\n🧪 **Fertilizer** — NPK guidance and schedules\n🌦 **Weather** — Farming advice based on weather\n💰 **Transactions** — View your monthly income/expense\n🌾 **Farm Status** — Overall farm health check\n🌱 **Seeds & Sowing** — Best practices for planting\n🛡 **Insurance** — PMFBY and KCC details\n🏪 **Market Prices** — Mandi rates and selling tips\n🌿 **Organic Farming** — Chemical-free methods\n📉 **Loan & Subsidy** — Government schemes\n\nJust type or ask your question — in English, Hindi, or Marathi!',
  familyMembers: '👨‍👩‍👧‍👦 Family Members',
  familyMembersDesc: 'Share farm details with your family members',
  addMember: '+ Add Member',
  memberName: 'Name',
  memberNamePlaceholder: 'Enter family member name',
  memberRelation: 'Relation',
  memberPhone: 'Phone',
  memberPhonePlaceholder: 'Enter phone number',
  saveMember: 'Save',
  cancelMember: 'Cancel',
  removeMember: 'Remove',
  sharedWith: 'Shared with {count} members',
  maxMembersReached: 'Maximum 4 members allowed',
  relationWife: 'Wife',
  relationSon: 'Son',
  relationDaughter: 'Daughter',
  relationFather: 'Father',
  relationMother: 'Mother',
  relationBrother: 'Brother',
  relationOther: 'Other',
  selectRelation: 'Select relation',
  memberAdded: 'Member added successfully!',
  memberRemoved: 'Member removed',
  voiceSmartParsing: 'Smart Voice',
  voiceParsed: 'Parsed: ₹{amount} - {type} - {category}',
  currentMonth: 'Current Month',
  pastMonth: 'Past Month',
  manageFamilyMembers: 'Manage your family members',
};

const hi: Translations = {
  chooseYourLanguage: 'अपनी भाषा चुनें',
  languageSubtitle: [
    'खेती के लिए सही समय पर स्मार्ट निर्णय।',
  ],
  marathi: 'Marathi – मराठी',
  hindi: 'Hindi – हिंदी',
  english: 'English – English',

  setupProfile: 'अपना खेत प्रोफ़ाइल सेट करें',
  setupProfileSubtitle: 'हमें अपने खेत के बारे में बताएं ताकि हम आपकी बेहतर मदद कर सकें।',
  farmerName: 'किसान का नाम',
  farmerNamePlaceholder: 'अपना नाम दर्ज करें',
  villageName: 'गाँव का नाम',
  villageNamePlaceholder: 'गाँव का नाम दर्ज करें',
  farmSize: 'खेत का आकार',
  lessThanOneAcre: '1 एकड़ से कम',
  oneToFiveAcres: '1–5 एकड़',
  fiveToTenAcres: '5–10 एकड़',
  moreThanTenAcres: '10 एकड़ से अधिक',
  mainCrop: 'मुख्य फसल',
  selectCrop: 'फसल चुनें',
  cropWheat: 'गेहूं',
  cropRice: 'चावल',
  cropCotton: 'कपास',
  cropSoybean: 'सोयाबीन',
  cropSugarcane: 'गन्ना',
  cropTomato: 'टमाटर',
  cropOnion: 'प्याज',
  cropOther: 'अन्य',
  saveAndContinue: 'सहेजें और जारी रखें',
  back: 'वापस',
  nameRequired: 'किसान का नाम आवश्यक है',
  villageRequired: 'गाँव का नाम आवश्यक है',

  welcomeBack: 'वापसी पर स्वागत है',
  exploreFeatures: 'किसानपायलट सुविधाएं देखें',
  village: 'गाँव',
  farmSizeLabel: 'खेत का आकार',
  farmStatus: 'खेत की स्थिति',
  good: 'अच्छी',
  aiChatbot: 'AI चैटबॉट',
  aiChatbotDesc: 'अपने खेती के सवाल पूछें',
  myFarm: 'मेरा खेत',
  myFarmDesc: 'खेत का विवरण देखें और संपादित करें',
  cropDoctor: 'फसल डॉक्टर',
  cropDoctorDesc: 'फसल की सेहत की जांच करें',
  weather: 'मौसम',
  weatherDesc: 'स्थानीय मौसम अपडेट',
  farmInsights: 'खेत अंतर्दृष्टि',
  farmInsightsDesc: 'AI संचालित विश्लेषण',
  smartAlerts: 'स्मार्ट अलर्ट',
  smartAlertsDesc: 'महत्वपूर्ण सूचनाएं',
  changeLanguage: 'भाषा बदलें',
  settings: 'सेटिंग्स',
  dashboard: 'डैशबोर्ड',
  yourPersonalAi: 'खेती के लिए आपका व्यक्तिगत AI सहायक',
  smarterDecisions: 'खेती के लिए सही समय पर स्मार्ट निर्णय।',
  tagline: 'खेती के लिए सही समय पर स्मार्ट निर्णय।',

  aiAssistant: 'किसानपायलट AI सहायक',
  typeMessage: 'अपना खेती का सवाल टाइप करें...',
  send: 'भेजें',
  backToDashboard: 'डैशबोर्ड पर वापस',
  quickSuggestions: 'त्वरित सुझाव',
  suggestion1: 'मुझे अपनी फसल को कब पानी देना चाहिए?',
  suggestion2: 'मैं मिट्टी की सेहत कैसे सुधार सकता हूं?',
  suggestion3: 'पत्तियां पीली होने पर मुझे क्या करना चाहिए?',
  suggestion4: 'मैं अपनी फसल की सुरक्षा कीटों से कैसे करूं?',
  waterResponse: '💧 **सिंचाई मार्गदर्शन:** फसलों को सुबह जल्द या शाम को देर में पानी दें ताकि वाष्पीकरण कम हो। मिट्टी की नमी की जांच करने के लिए अपनी उंगली 2-3 इंच मिट्टी में डालें — अगर सूखी लगे तो पानी देने का समय है। अधिकांश फसलों को प्रति सप्ताह 1-2 इंच पानी की जरूरत होती है। ड्रिप सिंचाई का उपयोग बेहतर दक्षता के लिए करें।',
  yellowLeavesResponse: '🍂 **पीली पत्तियां — संभावित कारण:**\n\n1. **पोषक तत्व की कमी:** नाइट्रोजन, आयरन या मैग्नीशियम की कमी पीलेपन का कारण हो सकती है।\n2. **ज्यादा पानी:** जड़ें दम घोंट रही हों सकती हैं। पानी भरे मिट्टी की जांच करें।\n3. **कीट या रोग:** पत्तियों पर धब्बे, जाल या कीटों की जांच करें।\n4. **प्राकृतिक उम्र बढ़ना:** निचली पत्तियां स्वाभाविक रूप से पीली होती हैं।\n\n**सुझाव:** मिट्टी की जल निकासी की जांच करें, कीटों के लिए पत्तियों की निकटता से जांच करें।',
  pestResponse: '🐛 **कीट प्रबंधन:**\n\n1. **कीट की पहचान करें:** पत्तियों, तनों और मिट्टी पर कीटों या नुकसान के चिन्हों की जांच करें।\n2. **नियमित निगरानी:** हर 2-3 दिन में फसलों की जांच करें।\n3. **प्राकृतिक तरीके:** नीम ऑयल स्प्रे का उपयोग करें, लेडीबग जैसे लाभकारी कीट प्रस्तुत करें।\n4. **समन्वित कीट प्रबंधन (IPM):** सांस्कृतिक, जैविक और रासायनिक तरीकों को मिलाएं।\n5. **स्थानीय विशेषज्ञ से परामर्श करें:** संक्रमण गंभीर हो तो कृषि विशेषज्ञ से मिलें।',
  fertilizerResponse: '🧪 **उर्वरक और पोषक तत्व मार्गदर्शन:**\n\n1. **मिट्टी परीक्षण:** स्थानीय प्रयोगशाला में मिट्टी का परीक्षण करवाएं।\n2. **संतुलित NPK:** नाइट्रोजन, फॉस्फोरस और पोटैशियम के संतुलित अनुपात वाले उर्वरकों का उपयोग करें।\n3. **जैविक विकल्प:** कम्पोस्ट, वर्मीकम्पोस्ट या गोबर खाद पर विचार करें।\n4. **सूक्ष्म पोषक तत्व:** जिंक, आयरन और बोरॉन न भूलें।\n5. **उर्वरक का समय:** सक्रिय विकास चरणों के दौरान उर्वरक डालें।',
  weatherResponse: '🌦 **मौसम और खेती:**\n\nवर्तमान पूर्वानुमान के आधार पर अपनी खेती गतिविधियों की योजना बनाएं:\n\n- बारिश की उम्मीद हो तो सिंचाई टालें।\n- उच्च नमी फंगल रोग का जोखिम बढ़ाती है।\n- 20 किमी/घंटा से अधिक हवा लंबी फसलों को नुकसान पहुंचा सकती है।\n- शांत, सूखे दिनों पर छिड़काव की योजना बनाएं।\n- अधिकांश फसलें 15°C से ऊपर अच्छी तरह अंकुरित होती हैं।',
  defaultResponse: '🌱 मैं आपका किसानपायलट AI सहायक हूं। मैं फसल देखभाल, सिंचाई, कीट, मिट्टी की सेहत और खेती के निर्णयों में आपकी मदद कर सकता हूं। अपने खेत के बारे में कुछ भी पूछें!',

  cropDoctorTitle: 'फसल डॉक्टर',
  cropDoctorSubtitle: 'AI आधारित स्वास्थ्य विश्लेषण के लिए फसल की तस्वीर अपलोड करें',
  uploadPhoto: 'फसल की तस्वीर अपलोड करें',
  uploadPhotoDesc: 'तस्वीर लें या गैलरी से चुनें',
  analyzeCrop: 'फसल का विश्लेषण करें',
  analyzing: 'AI से आपकी फसल का विश्लेषण हो रहा है…',
  cropHealthScore: 'फसल स्वास्थ्य स्कोर',
  possibleObservation: 'संभावित निरीक्षण',
  recommendations: 'सिफारिशें',
  rec1: 'मिट्टी में पोषक तत्व का स्तर जांचें',
  rec2: 'पत्तियों के रंग बदलने पर नजर रखें',
  rec3: 'उचित सिंचाई सुनिश्चित करें',
  rec4: 'पुष्टि के लिए स्थानीय कृषि विशेषज्ञ से मिलें',
  analyzeAnother: 'दूसरी तस्वीर विश्लेषण करें',
  mildNutrientStress: 'हल्के पोषक तत्व तनाव के संकेत पाए गए।',

  weatherTitle: 'मौसम और खेत पूर्वानुमान',
  currentWeather: 'वर्तमान मौसम',
  temperature: 'तापमान',
  condition: 'स्थिति',
  partlyCloudy: 'आंशिक बादल',
  humidity: 'नमी',
  wind: 'हवा',
  rainChance: 'बारिश की संभावना',
  fiveDayForecast: '5 दिन का पूर्वानुमान',
  farmingAdvice: 'खेती सलाह',
  rainAdvice: 'इस हफ्ते बारिश संभव है। बारिश से पहले अनावश्यक सिंचाई से बचें।',
  monday: 'सोमवार',
  tuesday: 'मंगलवार',
  wednesday: 'बुधवार',
  thursday: 'गुरुवार',
  friday: 'शुक्रवार',

  myFarmTitle: 'मेरा खेत',
  farmDetails: 'खेत का विवरण',
  editProfile: 'प्रोफ़ाइल संपादित करें',
  saveChanges: 'परिवर्तन सहेजें',
  cancel: 'रद्द करें',
  cropHealth: 'फसल स्वास्थ्य',
  soilMoisture: 'मिट्टी की नमी',
  irrigationStatus: 'सिंचाई स्थिति',
  moderate: 'मध्यम',
  onTrack: 'ठीक है',
  farmStatusSection: 'खेत की स्थिति',

  insightsTitle: 'खेत अंतर्दृष्टि',
  cropHealthScore2: 'फसल स्वास्थ्य',
  soilMoisture2: 'मिट्टी की नमी',
  irrigationEfficiency: 'सिंचाई दक्षता',
  aiInsights: 'AI अंतर्दृष्टि',
  insight1: 'आपकी फसल की सेहत वर्तमान में स्थिर है। नियमित निगरानी जारी रखें।',
  insight2: 'अगले 2 दिनों में मिट्टी की नमी की निगरानी पर विचार करें।',
  insight3: 'इस हफ्ते मौसम की स्थितियां सिंचाई योजना को प्रभावित कर सकती हैं।',
  insight4: 'फसल की वृद्धि दर इस मौसम के लिए औसत से अधिक है। बहुत अच्छे!',
  insight5: 'सूखी स्थितियों के कारण इस हफ्ते कीट जोखिम कम है।',
  insight6: 'दीर्घकालिक मिट्टी की सेहत बढ़ाने के लिए जैविक कम्पोस्ट लगाने पर विचार करें।',
  generateInsight: 'नई अंतर्दृष्टि उत्पन्न करें',

  alertsTitle: 'स्मार्ट अलर्ट',
  rainExpected: 'अगले 48 घंटों में आपके क्षेत्र में बारिश की उम्मीद है।',
  monitorSoil: 'मिट्टी की नमी स्तर की निगरानी करें — हाल की सूखी अवधि पाई गई।',
  checkPestSigns: 'फसल की पत्तियों पर कीट संक्रमण के शुरुआती लक्षणों की जांच करें।',
  fertilizerReminder: 'उर्वरक योजना अनुस्मारक — मिट्टी परीक्षण निर्धारित करें।',
  markAsRead: 'पढ़ा गया चिन्हित करें',
  markAllAsRead: 'सभी पढ़े गए चिन्हित करें',
  noUnreadAlerts: 'कोई अनपढ़ अलर्ट नहीं! आपका खेत अपडेट है।',

  settingsTitle: 'सेटिंग्स',
  changeLanguageOption: 'भाषा बदलें',
  editProfileOption: 'किसान प्रोफ़ाइल संपादित करें',
  resetData: 'डेमो डेटा रीसेट करें',
  resetConfirm: 'यह आपका सारा डेटा मिटा देगा और भाषा चयन स्क्रीन पर लौट जाएगा। क्या आप सुनिश्चित हैं?',
  confirmReset: 'रीसेट की पुष्टि करें',
  cancelReset: 'रद्द करें',

  // Voice Khata
  voiceKhata: 'वॉइस खाता',
  voiceKhataDesc: 'आवाज़ आधारित खेत लेखांकन',
  addEntry: 'प्रविष्टि जोड़ें',
  entryType: 'प्रविष्टि प्रकार',
  incomeLabel: 'आय',
  expenseLabel: 'खर्चा',
  category: 'श्रेणी',
  amount: 'राशि',
  description: 'विवरण',
  date: 'तारीख',
  totalIncome: 'कुल आय',
  totalExpense: 'कुल खर्चा',
  netProfit: 'शुद्ध लाभ',
  recentEntries: 'हाल की प्रविष्टियाँ',
  noEntries: 'अभी कोई प्रविष्टि नहीं',
  catLabour: 'मजदूरी',
  catFertilizer: 'उर्वरक',
  catSeeds: 'बीज',
  catPesticides: 'कीटनाशक',
  catIrrigation: 'सिंचाई',
  catTransport: 'परिवहन',
  catCropSale: 'फसल बिक्री',
  catOther: 'अन्य',
  deleteEntry: 'हटाएं',
  saveEntry: 'प्रविष्टि सहेजें',

  // Farm Economics
  farmEconomics: 'खेत अर्थव्यवस्था',
  farmEconomicsDesc: 'आय, खर्चा और लाभ ट्रैकिंग',
  seasonEconomics: 'मौसम अर्थव्यवस्था',
  incomeVsExpense: 'आय बनाम खर्चा',
  categoryBreakdown: 'श्रेणी विवरण',
  totalSpend: 'कुल खर्च',
  totalEarned: 'कुल आय',
  netReturn: 'शुद्ध लाभ',

  // Bajar Bhav (Market Prices)
  bajarBhav: 'बाजार भाव',
  bajarBhavDesc: 'लाइव मंडी भाव और रुझान',
  commodity: 'कमोडिटी',
  minPrice: 'न्यूनतम भाव',
  maxPrice: 'अधिकतम भाव',
  modalPrice: 'मॉडल भाव',
  priceSource: 'स्रोत',
  lastUpdated: 'अंतिम अपडेट',
  priceTrend: 'भाव रुझान',
  trendingUp: 'बढ़ रहा',
  trendingDown: 'घट रहा',
  stable: 'स्थिर',
  transportCost: 'परिवहन लागत',
  estNetReturn: 'अनुमानित शुद्ध लाभ',
  calculateReturn: 'शुद्ध लाभ गणना',
  marketAdvice: 'बाजार डेटा संदर्भ के लिए है। स्थानीय मंडी से सत्यापित करें।',

  // Risk Radar
  riskRadar: 'जोखिम रडार',
  riskRadarDesc: 'खेत जोखिम पर नजर रखें',
  rainRisk: 'बारिश जोखिम',
  waterStressRisk: 'जल तनाव',
  diseaseRisk: 'रोग जोखिम',
  heatRisk: 'गर्मी जोखिम',
  costRisk: 'लागत जोखिम',
  insuranceReady: 'बीमा तैयारी',
  low: 'कम',
  medium: 'मध्यम',
  high: 'उच्च',
  riskAdvice: 'जोखिम आधारित खेती सलाह',

  // What-If Simulator
  whatIfSimulator: 'क्या-यदि सिम्युलेटर',
  whatIfDesc: 'फसल निर्णयों की तुलना',
  compareCrops: 'फसलों की तुलना',
  estimatedProfit: 'अनुमानित लाभ',
  estimatedCost: 'अनुमानित लागत',
  recommendation: 'सिफारिश',
  simulate: 'सिम्युलेट करें',
  cropA: 'फसल अ',
  cropB: 'फसल ब',
  selectCropA: 'फसल अ चुनें',
  selectCropB: 'फसल ब चुनें',
  investmentPerAcre: 'प्रति एकड़ निवेश',
  expectedYield: 'अपेक्षित उपज',
  marketPricePer: 'प्रति क्विंटल बाजार भाव',
  cropAProfit: 'फसल अ लाभ',
  cropBProfit: 'फसल ब लाभ',
  betterChoice: 'बेहतर विकल्प',

  // PMFBY Schemes
  pmfbySchemes: 'पीएमएफबीवाई और योजनाएं',
  pmfbyDesc: 'बीमा और सरकारी योजनाएं',
  schemeInfo: 'योजना जानकारी',
  eligibility: 'पात्रता',
  requiredDocs: 'आवश्यक दस्तावेज',
  deadlines: 'समय सीमा',
  officialPortal: 'आधिकारिक पोर्टल',
  pmfbyTitle: 'प्रधानमंत्री फसल बीमा योजना',
  pmfbyDesc2: 'भारत सरकार द्वारा फसल बीमा',
  cropInsurance: 'फसल बीमा',
  kisanCreditCard: 'किसान क्रेडिट कार्ड',
  subsidySchemes: 'सब्सिडी योजनाएं',
  applyOnline: 'ऑनलाइन आवेदन',
  viewDetails: 'विवरण देखें',
  pmfbyNote: 'बीमा दावे की गारंटी नहीं देता। आधिकारिक स्रोतों से सत्यापित करें।',

  // Farm Goals
  farmGoals: 'खेत लक्ष्य',
  farmGoalsDesc: 'मौसमिक आय लक्ष्य ट्रैक करें',
  seasonalTarget: 'मौसमिक आय लक्ष्य',
  currentProgress: 'वर्तमान प्रगति',
  remainingAmount: 'शेष राशि',
  setGoal: 'लक्ष्य सेट करें',
  editGoal: 'लक्ष्य संपादित करें',
  goalAmount: 'लक्ष्य राशि',
  onTrackMsg: 'आप अपने लक्ष्य को पूरा करने के रास्ते पर हैं!',
  behindMsg: 'आप अपने लक्ष्य से पीछे हैं। खर्चों की समीक्षा करें।',

  // Next Best Action
  nextBestAction: 'अगला सर्वोत्तम कार्य',
  nextBestActionDesc: 'AI-सुझावित प्राथमिक कार्य',
  priorityAction: 'प्राथमिक कार्य',
  reason: 'कारण',
  weatherContext: 'मौसम संदर्भ',
  action1: 'मिट्टी की नमी स्तर की निगरानी करें',
  action1Reason: 'गुरुवार को बारिश की उम्मीद। बारिश से पहले और बाद मिट्टी जांचें।',
  action2: 'उर्वरक की दूसरी खुराक डालें',
  action2Reason: 'फसल सक्रिय विकास चरण में है। अभी संतुलित NPK उपज बढ़ाएगी।',
  action3: 'फसल की पत्तियों में कीट के शुरुआती लक्षण जांचें',
  action3Reason: 'गर्म, नमी वाली स्थितियां इस हफ्ते कीट जोखिम बढ़ाती हैं।',

  // Enhanced Dashboard
  farmBriefing: 'खेत संक्षिप्त जानकारी',
  riskSummary: 'जोखिम सारांश',
  quickActions: 'त्वरित कार्य',

  // Voice Khata Mic
  tapToSpeak: 'बोलने के लिए टैप करें',
  listening: 'सुन रहा है...',
  voiceError: 'आवाज़ समर्थित नहीं',
  couldNotHear: 'सुनाई नहीं दिया। फिर कोशिश करें।',
  recordingStopped: 'रिकॉर्डिंग बंद',
  voiceDetected: 'आवाज़ पहचाना गया!',
  speakNow: 'अभी बोलें...',

  // Monthly Photo Tracker
  monthlyPhotoTracker: 'मासिक फोटो ट्रैकर',
  monthlyPhotoTrackerDesc: 'हर महीने 4 फोटो से फसल की वृद्धि ट्रैक करें',
  week1: 'सप्ताह 1',
  week2: 'सप्ताह 2',
  week3: 'सप्ताह 3',
  week4: 'सप्ताह 4',
  takePhoto: 'फोटो लें',
  photoTaken: 'फोटो लिया गया',
  noPhotoYet: 'अभी तक कोई फोटो नहीं',
  scheduledDate: 'निर्धारित तारीख',
  capturePhoto: 'फसल का फोटो लें',
  photoHistory: 'फोटो इतिहास',
  photosThisMonth: 'इस महीने के फोटो',
  monthlyProgress: 'मासिक प्रगति',
  allPhotosDone: 'इस महीने सभी 4 फोटो लिए गए!',
  photosRemaining: 'फोटो बाकी',
  viewPhotoTracker: 'फोटो ट्रैकर देखें',
  cropGrowthTimeline: 'फसल वृद्धि समयरेखा',

  // AI Decision Explainer
  aiDecisionExplainer: 'AI निर्णय व्याख्याता',
  aiDecisionDesc: 'समझें AI ने यह खेती निर्णय क्यों अनुशंसित किया',
  yourCrop: 'आपकी फसल',
  whyThisDecision: 'यह निर्णय क्यों?',
  aiConfidence: 'AI विश्वास',
  marketAnalysis: 'बाजार विश्लेषण',
  riskFactors: 'जोखिम कारक',
  seasonContext: 'मौसम संदर्भ',
  getAiAnalysis: 'AI विश्लेषण प्राप्त करें',
  aiReasonTitle: 'AI तर्क',
  aiReasonDetail: 'इस सिफारिश के पीछे विस्तृत तर्क',
  investmentDetails: 'निवेश विवरण',
  expectedYieldDetails: 'अपेक्षित उपज',
  marketPriceDetails: 'बाजार भाव विश्लेषण',
  waterRequirement: 'पानी की आवश्यकता',
  soilSuitability: 'मिट्टी उपयुक्तता',
  bestPractice: 'सर्वोत्तम अभ्यास',
  disclaimer: 'यह AI-जनित सलाह है। महत्वपूर्ण निर्णयों के लिए स्थानीय विशेषज्ञ से परामर्श करें।',

  // Expert Consultation
  expertConsultation: 'विशेषज्ञ परामर्श',
  expertConsultationDesc: 'व्यक्तिगत सलाह के लिए कृषि विशेषज्ञों से जुड़ें',
  consultExpert: 'विशेषज्ञ से परामर्श करें',
  expertSpecialty: 'विशेषता',
  expertAvailable: 'अभी उपलब्ध',
  callExpert: 'विशेषज्ञ को कॉल करें',
  expertNote: 'विशेषज्ञ सोम-शनि, सुबह 9-शाम 6 बजे उपलब्ध',
  bookConsultation: 'परामर्श बुक करें',

  // Krushi Kendra
  nearbyKrushiKendra: 'निकटतम कृषि केंद्र',
  krushiKendraDesc: 'बीज, उर्वरक और कीटनाशक के लिए आपके पास कृषि इनपुट केंद्र',
  krushiKendraAddress: 'पता',
  krushiKendraPhone: 'फोन',
  krushiKendraHours: 'समय',
  krushiKendraServices: 'सेवाएं',
  krushiKendraList: 'आपके पास कृषि केंद्र',
  findNearest: 'निकटतम केंद्र खोजें',
  directions: 'दिशा-निर्देश प्राप्त करें',

  // Farm Memory
  farmMemory: 'खेत स्मृति',
  farmMemoryDesc: 'अपने खेत के बारे में विस्तार से बताएं',
  tellUsAboutFarm: 'अपने खेत के बारे में बताएं',
  soilType: 'मिट्टी का प्रकार',
  soilTypePlaceholder: 'जैसे दोमट, काली, बलुई',
  irrigationSource: 'सिंचाई का स्रोत',
  irrigationSourcePlaceholder: 'जैसे कुआं, नहर, ड्रिप',
  farmingExperience: 'खेती का अनुभव',
  farmingExperiencePlaceholder: 'जैसे 15 वर्ष',
  ownOrLeased: 'ज़मीन का स्वामित्व',
  ownLand: 'अपनी ज़मीन',
  leasedLand: 'किराये की ज़मीन',
  lastCrop: 'पिछली कटाई फसल',
  lastCropPlaceholder: 'जैसे कपास, गेहूं',
  expectedHarvestMonth: 'अपेक्षित कटाई का महीना',
  expectedHarvestPlaceholder: 'जैसे मार्च 2025',
  livestockCount: 'पशुओं की संख्या',
  livestockCountPlaceholder: 'जैसे 2 गाय, 5 बकरी',
  fertilizerBrand: 'पसंदीदा उर्वरक ब्रांड',
  fertilizerBrandPlaceholder: 'जैसे इफ्को, टाटा किसान',
  seedSource: 'बीज का स्रोत',
  seedSourcePlaceholder: 'जैसे स्थानीय बाजार, सरकारी केंद्र',
  saveFarmMemory: 'खेत स्मृति सहेजें',
  farmMemorySaved: 'खेत स्मृति सहेजी गई!',
  editFarmMemory: 'खेत स्मृति संपादित करें',
  soilLoamy: 'दोमट',
  soilClay: 'चिकनी मिट्टी',
  soilSandy: 'बलुई',
  soilBlack: 'काली (रेगुर)',
  soilRed: 'लाल मिट्टी',
  irrigationWell: 'कुआं/बोरवेल',
  irrigationCanal: 'नहर',
  irrigationRain: 'केवल बारिश पर निर्भर',
  irrigationDrip: 'ड्रिप सिंचाई',
  seedSourceLocal: 'स्थानीय बाजार',
  seedSourceGovt: 'सरकारी केंद्र',
  seedSourcePrivate: 'प्राइवेट डीलर',
  seedSourceOwn: 'अपने बचाए बीज',
  farmMemoryComplete: 'आपका खेत प्रोफ़ाइल पूरा है!',
  farmMemorySection: 'खेत विवरण',
  yearOfFarming: 'वर्ष की खेती',

  // Farmer Photo
  changePhoto: 'फोटो बदलें',
  uploadPhotoLabel: 'फोटो अपलोड करें या लें',
  removePhoto: 'फोटो हटाएं',
  takeSelfie: 'सेल्फी लें',
  profilePhoto: 'प्रोफ़ाइल फोटो',

  // Chatbot Voice
  voiceChat: 'वॉइस चैट',
  voiceChatDesc: 'AI सहायक से बात करें',
  tapMicToTalk: 'बोलने के लिए माइक टैप करें',
  listeningChat: 'सुन रहा है... बोलें',
  voiceMessageSent: 'वॉइस मैसेज भेजा गया',
  startVoiceChat: 'वॉइस चैट शुरू करें',
  stopVoiceChat: 'वॉइस चैट बंद करें',

  // Season Score Card
  seasonScoreCard: 'सीज़न स्कोर कार्ड',
  seasonScoreCardDesc: 'अपनी मौसमी खेती प्रदर्शन ट्रैक करें',
  currentSeason: 'वर्तमान मौसम',
  seasonPerformance: 'मौसम प्रदर्शन',
  overallScore: 'कुल स्कोर',
  seasonCropHealth: 'फसल स्वास्थ्य',
  irrigationScore: 'सिंचाई',
  pestManagementScore: 'कीट प्रबंधन',
  soilHealthScore: 'मिट्टी स्वास्थ्य',
  profitScore: 'लाभपरकता',
  timelyActionsScore: 'समय पर कार्य',
  excellent: 'उत्कृष्ट',
  seasonGood: 'अच्छा',
  average: 'औसत',
  needsImprovement: 'सुधार आवश्यक',
  seasonHighlights: 'मौसम की उपलब्धियां',
  seasonAlerts: 'मौसम अलर्ट',
  rabiSeason: 'रबी 2025-26',
  kharifSeason: 'खरीफ 2025',
  seasonTip: 'मौसम सुझाव',
  seasonBreakdown: 'स्कोर विवरण',
  scoreOutOf: '/100',
  viewSeasonCard: 'सीज़न कार्ड देखें',
  downloadScorecardPdf: 'स्कोरकार्ड PDF डाउनलोड करें',
  downloadScorecardDesc: 'अपना मौसमी प्रदर्शन रिपोर्ट सेव करें',
  shareScorecard: 'शेयर करें',
  pdfGenerating: 'PDF बना रहा है...',
  copiedToClipboard: 'क्लिपबोर्ड पर कॉपी हो गया!',
  shareNotSupported: 'शेयर समर्थित नहीं है',
  scorecardGeneratedDate: 'तैयार किया गया',
  poweredBy: 'KisanPilot AI द्वारा संचालित',

  // Last Season Review
  lastSeasonReview: 'पिछले मौसम की समीक्षा',
  lastSeasonReviewDesc: 'अपने पिछले खेती मौसम के बारे में बताएं',
  lastSeasonCrop: 'पिछले मौसम की फसल',
  lastSeasonCropPlaceholder: 'पिछले मौसम की फसल चुनें',
  lastSeasonCropWheat: 'गेहूं',
  lastSeasonCropCotton: 'कपास',
  lastSeasonCropSoybean: 'सोयाबीन',
  lastSeasonCropRice: 'चावल',
  lastSeasonCropSugarcane: 'गन्ना',
  lastSeasonCropOnion: 'प्याज',
  lastSeasonCropOther: 'अन्य',
  lastSeasonYield: 'प्रति एकड़ उपज',
  lastSeasonYieldPlaceholder: 'जैसे 15 क्विंटल/एकड़',
  lastSeasonIncome: 'कुल आय',
  lastSeasonIncomePlaceholder: 'जैसे ₹50,000',
  lastSeasonExpense: 'कुल खर्च',
  lastSeasonExpensePlaceholder: 'जैसे ₹25,000',
  lastSeasonMajorProblem: 'प्रमुख समस्या',
  lastSeasonMajorProblemPlaceholder: 'मुख्य समस्या चुनें',
  problemPest: 'कीट का हमला',
  problemWater: 'पानी की कमी',
  problemMarket: 'कम बाजार भाव',
  problemDisease: 'फसल रोग',
  problemWeather: 'मौसम का नुकसान',
  problemLabor: 'मजदूरों की कमी',
  problemNone: 'कोई बड़ी समस्या नहीं',
  lastSeasonPestIssue: 'कीट/रोग विवरण',
  lastSeasonPestIssuePlaceholder: 'कौन सा कीट या रोग?',
  lastSeasonSatisfaction: 'संतुष्टि स्तर',
  lastSeasonSatisfactionPlaceholder: 'आप कितने संतुष्ट थे?',
  satisfactionVerySatisfied: 'बहुत संतुष्ट',
  satisfactionSatisfied: 'संतुष्ट',
  satisfactionNeutral: 'सामान्य',
  satisfactionDissatisfied: 'असंतुष्ट',
  satisfactionVeryDissatisfied: 'बहुत असंतुष्ट',
  lastSeasonLesson: 'मुख्य सीख',
  lastSeasonLessonPlaceholder: 'पिछले मौसम से आपने क्या सीखा?',
  lastSeasonCropDamage: 'फसल नुकसान %',
  lastSeasonCropDamagePlaceholder: 'जैसे 10%',

  // Voice Chat in Chatbot
  micButton: 'माइक',
  stopTalking: 'बंद करें',

  // Enhanced Chatbot Responses
  suggestion5: 'इस महीने का लेनदेन क्या है?',
  suggestion6: 'मेरे खेत के बारे में सब कुछ बताएं',
  suggestion7: 'मेरे परिवार के सदस्य कौन हैं?',
  suggestion8: 'मेरे खेत के जोखिम क्या हैं?',
  chatGreeting: '🌱 नमस्ते! मैं आपका किसानपायलट AI सहायक हूं। मैं फसल देखभाल, सिंचाई, कीट प्रबंधन, बाजार भाव, बीमा और बहुत कुछ में आपकी मदद कर सकता हूं। अपने खेत के बारे में कुछ भी पूछें!',
  chatThankYou: '🙏 आपका स्वागत है! खुश किसानी! अगर आपको और मदद चाहिए तो मैं हमेशा यहीं हूं।',
  chatFarmStatusResponse: '🌾 **खेत स्थिति रिपोर्ट:**\n\n✅ **पिछली फसल:** {crop}\n🧪 **मिट्टी का प्रकार:** {soil}\n😊 **पिछले मौसम की संतुष्टि:** {satisfaction}\n\n📊 समग्र रूप से, आपका खेत स्थिर स्थिति में प्रतीत हो रहा है। नियमित निगरानी जारी रखें और उचित सिंचाई बनाए रखें। विस्तृत स्कोर के लिए सीज़न स्कोर कार्ड देखें!',
  chatFarmStatusDefault: '🌾 वर्तमान स्थितियों के आधार पर आपकी खेत स्थिति स्थिर दिखती है। व्यक्तिगत रिपोर्ट प्राप्त करने के लिए कृपया पहले अपनी खेत स्मृति विवरण भरें। डैशबोर्ड से खेत स्मृति सेक्शन पर जाएं।',
  chatTransactionResponse: '💰 **पिछले महीने का लेनदेन सारांश:**\n\n💵 **कुल आय:** {income} ({incCount} प्रविष्टियां)\n💸 **कुल खर्च:** {expense} ({expCount} प्रविष्टियां)\n📊 **{netLabel}:** {net}\n📝 **कुल लेनदेन:** {total}\n\n💡 सुझाव: विस्तृत रिकॉर्ड के लिए वॉइस खाता फीचर देखें।',
  chatTransactionNoData: '📝 पिछले महीने कोई लेनदेन नहीं मिला। **वॉइस खाता** फीचर से अपनी आय और खर्च प्रविष्टियां जोड़ें!',
  chatSoilResponse: '🧪 **मिट्टी स्वास्थ्य गाइड:**\n\n1. नजदीकी कृषि केंद्र पर **मिट्टी परीक्षण** करवाएं — ₹50-200 लागत।\n2. **pH स्तर** जांचें — अधिकांश फसलें 6.0-7.5 pH पसंद करती हैं।\n3. **जैविक पदार्थ** जोड़ें — कम्पोस्ट या गोबर खाद।\n4. **फसल रोटेशन** मिट्टी की क्षरण रोकता है।\n5. अधिक रासायनिक खत से बचें।\n\n💡 स्वस्थ मिट्टी = स्वस्थ फसल = बेहतर आय!',
  chatSeedResponse: '🌱 **बीज और बुवाई गाइड:**\n\n1. हमेशा **प्रमाणित बीज** खरीदें।\n2. बुवाई से पहले **बीज उपचार** करें।\n3. **बुवाई का मौसम** देखें — गेहूं: अक्टूबर-नवंबर।\n4. सही **बीज दर** बनाए रखें।\n5. सही **गहराई** पर बोएं।\n6. उचित **दूरी** बनाए रखें।',
  chatHarvestResponse: '🌾 **कटाई तैयारी गाइड:**\n\n1. **अनाज की नमी** 14% से कम होनी चाहिए।\n2. **रंग बदलाव** — पत्तियां पीली/भूरी होती हैं।\n3. **अनाज कठोरता** — दांत से काटकर जांचें।\n4. **फूलने के बाद दिन** — गेहूं: ~120 दिन।\n5. **मौसम** — साफ, शुष्क मौसम में कटाई करें।\n6. भंडारण से पहले **अनाज सूखा करें**।',
  chatInsuranceResponse: '🛡 **फसल बीमा और योजनाएं:**\n\n**PMFBY:**\n• प्रीमियम: खरीफ 2%, रबी 1.5%\n• कवर: प्राकृतिक आपदा, कीट, रोग\n• बुवाई से पहले आवेदन करें\n\n**किसान क्रेडिट कार्ड:**\n• ₹3 लाख तक 4% ब्याज पर\n\n💡 पूरी जानकारी के लिए PMFBY & Schemes सेक्शन देखें!',
  chatLoanResponse: '🏦 **ऋण विकल्प:**\n\n**किसान क्रेडिट कार्ड:**\n• ₹3 लाख तक 4% ब्याज\n• ₹1.6 लाख तक बिना जमानत\n\n**सरकारी सब्सिडी:**\n• फसल ऋण पर 2% ब्याज सब्सिडी\n\n📞 आधार कार्ड और भूमि रिकॉर्ड लेकर बैंक जाएं।',
  chatSubsidyResponse: '🏛 **किसानों के लिए सरकारी योजनाएं:**\n\n1. **PM-KISAN** — साल में ₹6,000 सीधी आय सहायता\n2. **PMFBY** — कम प्रीमियम पर फसल बीमा\n3. **मिट्टी स्वास्थ्य कार्ड** — मुफ्त मिट्टी परीक्षण\n4. **e-NAM** — ऑनलाइन राष्ट्रीय कृषि बाजार\n5. **PM कृषि सिंचाई योजना** — सिंचाई सब्सिडी\n\n📱 pmkisan.gov.in पर रजिस्टर करें।',
  chatOrganicResponse: '🌿 **जैविक खेती गाइड:**\n\n**फायदे:** बेहतर मिट्टी, प्रीमियम भाव, सस्टेनेबल खेती।\n\n1. **कम्पोस्ट** — फसल अवशेष + गोबर से बनाएं\n2. **वर्मीकम्पोस्ट** — एर्थवर्म से तेज़ी से बनाएं\n3. **नीम आधारित कीटनाशक** — प्राकृतिक कीट नियंत्रण\n4. **हरी खाद** — धैंचा/सूरजमुखी उगाकर मिट्टी में गलाएं\n5. **फसल रोटेशन** — दलहन और अनाज बारी-बारी लगाएं\n\n💰 जैविक उत्पाद 20-40% अधिक भाव पर बिकता है!',
  chatDiseaseResponse: '🦠 **रोग प्रबंधन:**\n\n**सामान्य फसल रोग:**\n• **ब्लाइट** — भूरे धब्बे\n• **रस्ट** — सुनहरे-भूरे दाने\n• **पाउडरी मिल्ड्यू** — सफेद पाउडर\n• **रूट रॉट** — पत्तियां पीली\n\n**रोकथाम:**\n1. रोग प्रतिरोधी किस्में उपयोग करें\n2. उचित दूरी बनाए रखें\n3. जल जमाव से बचें\n4. ट्राइकोडर्मा स्प्रे करें\n5. संक्रमित पौधे हटाएं',
  chatMarketResponse: '🏪 **बाजार भाव गाइड:**\n\n**बेहतर भाव के टिप्स:**\n1. समय सही चुनें — कटाई के बाद भाव गिरता है\n2. **ग्रेडिंग** कराएं — बेहतर दर मिलते हैं\n3. कई **मंडियों** में भाव तुलना करें\n4. **e-NAM पोर्टल** पर ऑनलाइन बेचें\n5. भाव कम हो तो **भंडारण** करें\n\n💡 बाजार भाव सुविधा के लिए Market Prices फीचर देखें!',
  chatNextActionResponse: '✨ **आज के लिए अनुशंसित कार्य:**\n\n📋 **प्राथमिकता 1:** मिट्टी की नमी जांचें।\n📋 **प्राथमिकता 2:** फसल की पत्तियों पर कीट के संकेत देखें।\n📋 **प्राथमिकता 3:** मौसम पूर्वानुमान देखें।\n\n💡 व्यक्तिगत सुझाव के लिए **Next Best Action** फीचर देखें!',
  chatScorecardResponse: '🏆 **सीज़न स्कोर कार्ड:**\n\n📊 6 मुख्य मैट्रिक्स पर आपका प्रदर्शन ट्रैक किया जाता है:\n• फसल स्वास्थ्य, सिंचाई, कीट प्रबंधन\n• मिट्टी स्वास्थ्य, लाभपरकता, समय पर कार्य\n\n**Season Score Card** फीचर देखें और PDF डाउनलोड करें!',
  chatWeedResponse: '🌿 **खरपतवार प्रबंधन:**\n\n**नियंत्रण विधियां:**\n1. **मैन्युअल निराई** — बुवाई के बाद पहले 30 दिन महत्वपूर्ण\n2. **कुदाल** — मिट्टी ढीली + खरपतवार हटाता है\n3. **मल्चिंग** — खरपतवार अंकुरण रोकता है\n4. **शाकनाशी** — सिफारिशित हर्बिसाइड\n\n💡 समय पर निराई से उपज 15-25% बढ़ सकती है!',
  chatTechResponse: '🚜 **आधुनिक खेती तकनीक:**\n\n1. **ड्रोन** — फसल स्वास्थ्य निगरानी, कीटनाशक छिड़काव\n2. **मिट्टी नमी सेंसर** — रियल-टाइम सिंचाई\n3. **मोबाइल ऐप्स** — मौसम, बाजार, सलाह\n4. **सोलर पंप** — सस्ती सिंचाई\n5. **माइक्रो सिंचाई** — ड्रिप/स्प्रिंकलर\n\n💰 सरकारी सब्सिडी ड्रिप और सोलर पंप पर!',
  chatCropRotationResponse: '🔄 **फसल रोटेशन गाइड:**\n\n**लाभ:** मिट्टी सुधार, कीट चक्र तोड़ें, उपज बढ़ाएं।\n\n**सुझावित रोटेशन:**\n• **साल 1:** अनाज (गेहूं/चावल)\n• **साल 2:** दलहन (चना/सोयाबीन)\n• **साल 3:** नकदी फसल (कपास/गन्ना)\n• **साल 4:** तिलहन (मूंगफली/सरसों)\n\n✅ 10-20% उपज वृद्धि, 25% कम खर्चा!',
  chatHelpResponse: '🤖 **मैं इनमें मदद कर सकता हूं:**\n\n💧 सिंचाई | 🐛 कीट प्रबंधन | 🧪 खत\n🌦 मौसम | 💰 लेनदेन | 🌾 खेत स्थिति\n🌱 बीज | 🛡 बीमा | 🏪 बाजार भाव\n🌿 जैविक खेती | 📉 ऋण और सब्सिडी\n\nअंग्रेजी, हिंदी या मराठी में पूछें!',
  familyMembers: '👨‍👩‍👧‍👦 परिवार के सदस्य',
  familyMembersDesc: 'अपने परिवार के सदस्यों के साथ खेत का विवरण साझा करें',
  addMember: '+ सदस्य जोड़ें',
  memberName: 'नाम',
  memberNamePlaceholder: 'परिवार के सदस्य का नाम दर्ज करें',
  memberRelation: 'रिश्ता',
  memberPhone: 'फोन',
  memberPhonePlaceholder: 'फोन नंबर दर्ज करें',
  saveMember: 'सहेजें',
  cancelMember: 'रद्द करें',
  removeMember: 'हटाएं',
  sharedWith: '{count} सदस्यों के साथ साझा किया',
  maxMembersReached: 'अधिकतम 4 सदस्य अनुमत हैं',
  relationWife: 'पत्नी',
  relationSon: 'बेटा',
  relationDaughter: 'बेटी',
  relationFather: 'पिता',
  relationMother: 'माता',
  relationBrother: 'भाई',
  relationOther: 'अन्य',
  selectRelation: 'रिश्ता चुनें',
  memberAdded: 'सदस्य जोड़ा गया!',
  memberRemoved: 'सदस्य हटाया गया',
  voiceSmartParsing: 'स्मार्ट वॉइस',
  voiceParsed: 'पार्स: ₹{amount} - {type} - {category}',
  currentMonth: 'वर्तमान महीना',
  pastMonth: 'पिछला महीना',
  manageFamilyMembers: 'अपने परिवार के सदस्य प्रबंधित करें',
};

const mr: Translations = {
  chooseYourLanguage: 'आपली भाषा निवडा',
  languageSubtitle: [
    'किसानांसाठी स्मार्ट निर्णय, योग्य वेळी.',
  ],
  marathi: 'Marathi – मराठी',
  hindi: 'Hindi – हिंदी',
  english: 'English – English',

  setupProfile: 'तुमचे शेत प्रोफाइल सेट करा',
  setupProfileSubtitle: 'आम्ही तुम्हाला चांगल्या प्रकारे मदत करू शकू यासाठी आपल्या शेताबद्दल सांगा.',
  farmerName: 'शेतकऱ्याचे नाव',
  farmerNamePlaceholder: 'आपले नाव लिहा',
  villageName: 'गावाचे नाव',
  villageNamePlaceholder: 'गावाचे नाव लिहा',
  farmSize: 'शेताचे आकार',
  lessThanOneAcre: '1 एकरपेक्षा कमी',
  oneToFiveAcres: '1–5 एकर',
  fiveToTenAcres: '5–10 एकर',
  moreThanTenAcres: '10 एकरपेक्षा जास्त',
  mainCrop: 'मुख्य पीक',
  selectCrop: 'पीक निवडा',
  cropWheat: 'गहू',
  cropRice: 'तांदूळ',
  cropCotton: 'कापूस',
  cropSoybean: 'सोयाबीन',
  cropSugarcane: 'ऊस',
  cropTomato: 'टोमॅटो',
  cropOnion: 'कांदा',
  cropOther: 'इतर',
  saveAndContinue: 'जतन करा आणि पुढे जा',
  back: 'मागे',
  nameRequired: 'शेतकऱ्याचे नाव आवश्यक आहे',
  villageRequired: 'गावाचे नाव आवश्यक आहे',

  welcomeBack: 'पुन्हा स्वागत आहे',
  exploreFeatures: 'किसानपायलट वैशिष्ट्ये शोधा',
  village: 'गाव',
  farmSizeLabel: 'शेताचे आकार',
  farmStatus: 'शेताची स्थिती',
  good: 'चांगली',
  aiChatbot: 'AI चॅटबॉट',
  aiChatbotDesc: 'तुमचे शेतीचे प्रश्न विचारा',
  myFarm: 'माझे शेत',
  myFarmDesc: 'शेताची माहिती पहा आणि संपादित करा',
  cropDoctor: 'पीक डॉक्टर',
  cropDoctorDesc: 'पिकाच्या आरोग्याची तपासणी करा',
  weather: 'हवामान',
  weatherDesc: 'स्थानिक हवामान अपडेट',
  farmInsights: 'शेत अंतर्दृष्टी',
  farmInsightsDesc: 'AI आधारित विश्लेषण',
  smartAlerts: 'स्मार्ट अलर्ट',
  smartAlertsDesc: 'महत्त्वाच्या सूचना',
  changeLanguage: 'भाषा बदला',
  settings: 'सेटिंग्ज',
  dashboard: 'डॅशबोर्ड',
  yourPersonalAi: 'शेतीसाठी तुमचा वैयक्तिक AI सहायक',
  smarterDecisions: 'किसानांसाठी स्मार्ट निर्णय, योग्य वेळी.',
  tagline: 'शेतीसाठी योग्य वेळी स्मार्ट निर्णय.',

  aiAssistant: 'किसानपायलट AI सहायक',
  typeMessage: 'तुमचा शेतीचा प्रश्न टाइप करा...',
  send: 'पाठवा',
  backToDashboard: 'डॅशबोर्डवर परत जा',
  quickSuggestions: 'द्रुत सूचना',
  suggestion1: 'माझ्या पिकाला कधी पाणी द्यावे?',
  suggestion2: 'मी मातीचे आरोग्य कसे सुधारू शकतो?',
  suggestion3: 'पाने पिवळी झाल्यास मला काय करावे?',
  suggestion4: 'मी माझ्या पिकाचे कीड-मुक्यांपासून संरक्षण कसे करू?',
  waterResponse: '💧 **सिंचाई मार्गदर्शन:** पिकांना पहाटे लवकर किंवा संध्याकाळी उशिरा पाणी द्यावे जेणेकरून बाष्पीभवन कमी होईल. मातीची ओलावा तपासण्यासाठी तुमची बोटे मातीत 2-3 इंच घाला — जर कोरडी वाटत असेल तर पाणी देण्याची वेळ आली आहे. बहुतेक पिकांना दर आठवड्याला 1-2 इंच पाणी हवे असते. ड्रिप सिंचाई वापरा.',
  yellowLeavesResponse: '🍂 **पिवळी पाने — संभाव्य कारणे:**\n\n1. **पोषक तत्वांची कमी:** नायट्रोजन, लोह किंवा मॅग्नेशियमची कमी पिवळेपणाचे कारण असू शकते.\n2. **जास्त पाणी:** मुळे दम चोकून आहेत. पाणी साचलेली माती तपासा.\n3. **कीड किंवा रोग:** पानांवर डाग, जाळे किंवा कीड तपसा.\n4. **नैसर्गिक वाढ:** खालची पाने नैसर्गिकरित्या पिवळी होतात.\n\n**सूचना:** मातीची पाण्याची निकास तपसा, कीडीसाठी पानांची बारीक तपासणी करा.',
  pestResponse: '🐛 **कीट व्यवस्थापन:**\n\n1. **कीड ओळखा:** पानां, खेकड्यांवर आणि मातीत कीड किंवा नुकसानाचे चिन्ह तपसा.\n2. **नियमित निरीक्षण:** दर 2-3 दिवसांत पिकांची तपासणी करा.\n3. **नैसर्गिक पद्धती:** नीम तेल स्प्रे वापरा, लेडीबग सारखे उपयुक्त कीड आणा.\n4. **एकत्रित कीट व्यवस्थापन (IPM):** सांस्कृतिक, जैविक आणि रासायनिक पद्धती एकत्र करा.\n5. **स्थानिक तज्ञांशी सल्ला घ्या:** संक्रमण गंभीर असल्यास कृषी तज्ञांशी भेटा.',
  fertilizerResponse: '🧪 **खत आणि पोषक तत्व मार्गदर्शन:**\n\n1. **माती चाचणी:** स्थानिक प्रयोगशाळेत मातीची चाचणी करा.\n2. **संतुलित NPK:** नायट्रोजन, फॉस्फरस आणि पोटॅशियमच्या संतुलित प्रमाणाची खते वापरा.\n3. **जैविक पर्याय:** कम्पोस्ट, वर्मीकम्पोस्ट किंवा शेळी खाद वापरा.\n4. **सूक्ष्म पोषक तत्वे:** झिंक, लोह आणि बोरॉन विसरू नका.\n5. **खतांचा वेळ:** सक्रिय वाढीच्या टप्प्यात खते टाका.',
  weatherResponse: '🌦 **हवामान आणि शेती:**\n\nवर्तमान अंदाजानुसार तुमच्या शेती कृतींचे नियोजन करा:\n\n- पावसाची शक्यता असल्यास सिंचाई विलंबित करा.\n- उच्च ओलावा बुरशी रोगाचा धोका वाढवतो.\n- 20 किमी/तासापेक्षा जास्त वारा उंच पिकांना नुकसान करू शकतो.\n- शांत, कोरड्या दिवशी फवारणीचे नियोजन करा.\n- बहुतेक पिके 15°C पेक्षा वर चांगल्या प्रकारे अंकुरित होतात.',
  defaultResponse: '🌱 मी तुमचा किसानपायलट AI सहायक आहे. मी पीक काळजी, सिंचाई, कीड, मातीचे आरोग्य आणि शेती निर्णयांमध्ये तुम्हाला मदत करू शकतो. तुमच्या शेताबद्दल काहीही विचारा!',

  cropDoctorTitle: 'पीक डॉक्टर',
  cropDoctorSubtitle: 'AI आधारित आरोग्य विश्लेषणासाठी पिकाचा फोटो अपलोड करा',
  uploadPhoto: 'पिकाचा फोटो अपलोड करा',
  uploadPhotoDesc: 'फोटो काढा किंवा गॅलरीतून निवडा',
  analyzeCrop: 'पिकाचे विश्लेषण करा',
  analyzing: 'AI सह तुमचे पिक विश्लेषित केले जात आहे…',
  cropHealthScore: 'पीक आरोग्य गुण',
  possibleObservation: 'संभाव्य निरीक्षण',
  recommendations: 'शिफारसी',
  rec1: 'मातीतील पोषक तत्व पातळी तपसा',
  rec2: 'पानांच्या रंग बदलावर लक्ष ठेवा',
  rec3: 'योग्य सिंचाई सुनिश्चित करा',
  rec4: 'पुष्टीकरणासाठी स्थानिक कृषी तज्ञांशी भेटा',
  analyzeAnother: 'दुसरा फोटो विश्लेषित करा',
  mildNutrientStress: 'हलके पोषक तत्व ताणाचे चिन्ह आढळले.',

  weatherTitle: 'हवामान आणि शेत अंदाज',
  currentWeather: 'सध्याचे हवामान',
  temperature: 'तापमान',
  condition: 'स्थिती',
  partlyCloudy: 'अंशतः ढगाळ',
  humidity: 'ओलावा',
  wind: 'वारा',
  rainChance: 'पावसाची शक्यता',
  fiveDayForecast: '5 दिवसांचा अंदाज',
  farmingAdvice: 'शेती सल्ला',
  rainAdvice: 'या आठवड्यात पाऊस शक्य आहे. पावसापूर्वी अनावश्यक सिंचाई टाळा.',
  monday: 'सोमवार',
  tuesday: 'मंगळवार',
  wednesday: 'बुधवार',
  thursday: 'गुरुवार',
  friday: 'शुक्रवार',

  myFarmTitle: 'माझे शेत',
  farmDetails: 'शेताची माहिती',
  editProfile: 'प्रोफाइल संपादित करा',
  saveChanges: 'बदल जतन करा',
  cancel: 'रद्द करा',
  cropHealth: 'पीक आरोग्य',
  soilMoisture: 'मातीचा ओलावा',
  irrigationStatus: 'सिंचाई स्थिती',
  moderate: 'मध्यम',
  onTrack: 'योग्य आहे',
  farmStatusSection: 'शेताची स्थिती',

  insightsTitle: 'शेत अंतर्दृष्टी',
  cropHealthScore2: 'पीक आरोग्य',
  soilMoisture2: 'मातीचा ओलावा',
  irrigationEfficiency: 'सिंचाई दक्षता',
  aiInsights: 'AI अंतर्दृष्टी',
  insight1: 'तुमचे पीक आरोग्य सध्या स्थिर आहे. नियमित निरीक्षण सुरू ठेवा.',
  insight2: 'पुढील 2 दिवसांत मातीच्या ओलाव्याचे निरीक्षण करा.',
  insight3: 'या आठवड्यात हवामानाच्या परिस्थिती सिंचाई नियोजनावर परिणाम करू शकतात.',
  insight4: 'या हंगामात पिकाची वाढीचा दर सरासरीपेक्षा जास्त आहे. छान!',
  insight5: 'कोरड्या परिस्थितीमुळे या आठवड्यात कीडीचा धोका कमी आहे.',
  insight6: 'दीर्घकालीन मातीचे आरोग्य सुधारण्यासाठी जैविक कम्पोस्ट टाकण्यावर विचार करा.',
  generateInsight: 'नवीन अंतर्दृष्टी निर्माण करा',

  alertsTitle: 'स्मार्ट अलर्ट',
  rainExpected: 'पुढील 48 तासांत तुमच्या भागात पाऊस येण्याची शक्यता आहे.',
  monitorSoil: 'मातीच्या ओलाव्याच्या पातळीवर लक्ष ठेवा — अलीकडील कोरडा काळ आढळला.',
  checkPestSigns: 'पिकाच्या पानांवर कीड संक्रमणाची सुरुवातीची लक्षणे तपसा.',
  fertilizerReminder: 'खत नियोजन स्मरणपत्र — माती चाचणी शेड्यूल करा.',
  markAsRead: 'वाचले चिन्हांकित करा',
  markAllAsRead: 'सर्व वाचले चिन्हांकित करा',
  noUnreadAlerts: 'कोणतेही न वाचलेले अलर्ट नाही! तुमचे शेत अपडेट आहे.',

  settingsTitle: 'सेटिंग्ज',
  changeLanguageOption: 'भाषा बदला',
  editProfileOption: 'शेतकऱ्याचे प्रोफाइल संपादित करा',
  resetData: 'डेमो डेटा रीसेट करा',
  resetConfirm: 'हे तुमचा सर्व डेटा हटवेल आणि भाषा निवड स्क्रीनवर परत जाईल. तुम्हाला खात्री आहे का?',
  confirmReset: 'रीसेट पुष्टी करा',
  cancelReset: 'रद्द करा',

  // Voice Khata
  voiceKhata: 'व्हॉइस खाता',
  voiceKhataDesc: 'आवाज आधारित शेत लेखापालन',
  addEntry: 'प्रविष्टी जोडा',
  entryType: 'प्रविष्टी प्रकार',
  incomeLabel: 'उत्पन्न',
  expenseLabel: 'खर्च',
  category: 'श्रेणी',
  amount: 'रक्कम',
  description: 'वर्णन',
  date: 'दिनांक',
  totalIncome: 'एकूण उत्पन्न',
  totalExpense: 'एकूण खर्च',
  netProfit: 'एकूण नफा',
  recentEntries: 'अलीकडील प्रविष्ट्या',
  noEntries: 'अद्याप प्रविष्ट्या नाहीत',
  catLabour: 'मजुरी',
  catFertilizer: 'खत',
  catSeeds: 'बियाणे',
  catPesticides: 'कीडनाशक',
  catIrrigation: 'सिंचाई',
  catTransport: 'वाहतूक',
  catCropSale: 'पीक विक्री',
  catOther: 'इतर',
  deleteEntry: 'हटवा',
  saveEntry: 'प्रविष्टी जतन करा',

  // Farm Economics
  farmEconomics: 'शेत अर्थव्यवस्था',
  farmEconomicsDesc: 'उत्पन्न, खर्च व नफा मागोवा',
  seasonEconomics: 'हंगाम अर्थव्यवस्था',
  incomeVsExpense: 'उत्पन्न व खर्च',
  categoryBreakdown: 'श्रेणी विभाजन',
  totalSpend: 'एकूण खर्च',
  totalEarned: 'एकूण मिळवले',
  netReturn: 'एकूण परतावा',

  // Bajar Bhav (Market Prices)
  bajarBhav: 'बाजारभाव',
  bajarBhavDesc: 'थेट मांडी भाव व ट्रेंड',
  commodity: 'वस्तू',
  minPrice: 'किमान भाव',
  maxPrice: 'कमाल भाव',
  modalPrice: 'मॉडल भाव',
  priceSource: 'स्रोत',
  lastUpdated: 'शेवटी अपडेट',
  priceTrend: 'भाव ट्रेंड',
  trendingUp: 'वर चढतोय',
  trendingDown: 'खाली उतरतोय',
  stable: 'स्थिर',
  transportCost: 'वाहतूक खर्च',
  estNetReturn: 'अंदाजे एकूण परतावा',
  calculateReturn: 'एकूण परतावा मोजा',
  marketAdvice: 'बाजार डेटा संदर्भासाठी आहे. स्थानिक मांडीतून सत्यापित करा.',

  // Risk Radar
  riskRadar: 'धोका रडार',
  riskRadarDesc: 'शेत धोक्यांवर नजर ठेवा',
  rainRisk: 'पावसाचा धोका',
  waterStressRisk: 'पाणी तणाव',
  diseaseRisk: 'रोगाचा धोका',
  heatRisk: 'उष्णतेचा धोका',
  costRisk: 'खर्चाचा धोका',
  insuranceReady: 'विमा तयारी',
  low: 'कमी',
  medium: 'मध्यम',
  high: 'जास्त',
  riskAdvice: 'धोका आधारित शेती सल्ला',

  // What-If Simulator
  whatIfSimulator: 'जर-तर-सिम्युलेटर',
  whatIfDesc: 'पीक निर्णयांची तुलना',
  compareCrops: 'पिकांची तुलना',
  estimatedProfit: 'अंदाजे नफा',
  estimatedCost: 'अंदाजे खर्च',
  recommendation: 'शिफारस',
  simulate: 'सिम्युलेट करा',
  cropA: 'पीक अ',
  cropB: 'पीक ब',
  selectCropA: 'पीक अ निवडा',
  selectCropB: 'पीक ब निवडा',
  investmentPerAcre: 'एकरी गुंतवणूक',
  expectedYield: 'अपेक्षित उत्पादन',
  marketPricePer: 'क्विंटल बाजारभाव',
  cropAProfit: 'पीक अ नफा',
  cropBProfit: 'पीक ब नफा',
  betterChoice: 'चांगला पर्याय',

  // PMFBY Schemes
  pmfbySchemes: 'पीएमएफबीवाय आणि योजना',
  pmfbyDesc: 'विमा आणि सरकारी योजना',
  schemeInfo: 'योजना माहिती',
  eligibility: 'पात्रता',
  requiredDocs: 'आवश्यक दस्तावेज',
  deadlines: 'अंतिम तारीख',
  officialPortal: 'अधिकृत पोर्टल',
  pmfbyTitle: 'प्रधानमंत्री फसल बीमा योजना',
  pmfbyDesc2: 'भारत सरकारचे पीक विमा',
  cropInsurance: 'पीक विमा',
  kisanCreditCard: 'शेतकरी क्रेडिट कार्ड',
  subsidySchemes: 'अनुदान योजना',
  applyOnline: 'ऑनलाइन अर्ज',
  viewDetails: 'तपशील पहा',
  pmfbyNote: 'विमा दाव्याची हमी देत नाही. अधिकृत स्रोतांकडून सत्यापित करा.',

  // Farm Goals
  farmGoals: 'शेत लक्ष्ये',
  farmGoalsDesc: 'हंगामी उत्पन्न लक्ष्य मागवा',
  seasonalTarget: 'हंगामी उत्पन्न लक्ष्य',
  currentProgress: 'सध्याची प्रगती',
  remainingAmount: 'शिल्लक रक्कम',
  setGoal: 'लक्ष्य ठेवा',
  editGoal: 'लक्ष्य संपादित करा',
  goalAmount: 'लक्ष्य रक्कम',
  onTrackMsg: 'तुम्ही तुमच्या लक्ष्यावर आहात!',
  behindMsg: 'तुम्ही लक्ष्यापाठी आहात. खर्चाचा आढावा घ्या.',

  // Next Best Action
  nextBestAction: 'पुढील सर्वोत्तम कृती',
  nextBestActionDesc: 'AI-सूचना प्राथमिक कृती',
  priorityAction: 'प्राथमिक कृती',
  reason: 'कारण',
  weatherContext: 'हवामान संदर्भ',
  action1: 'मातीच्या ओलाव्याची पातळी निरीक्षण करा',
  action1Reason: 'गुरुवारी पाऊस अपेक्षित. पावसापूर्वी आणि नंतर माती तपसा.',
  action2: 'खताची दुसरी डोस टाका',
  action2Reason: 'पीक सक्रिय वाढीच्या टप्प्यात आहे. सध्याचे संतुलित NPK उत्पादन वाढवेल.',
  action3: 'पिकाच्या पानांवर कीडीची सुरुवाती लक्षणे तपसा',
  action3Reason: 'उष्ण, ओली परिस्थिती या आठवड्यात कीडीचा धोका वाढवतात.',

  // Enhanced Dashboard
  farmBriefing: 'शेत संक्षिप्त माहिती',
  riskSummary: 'धोका सारांश',
  quickActions: 'द्रुत कृत्या',

  // Voice Khata Mic
  tapToSpeak: 'बोलण्यासाठी टॅप करा',
  listening: 'ऐकत आहे...',
  voiceError: 'आवाज समर्थित नाही',
  couldNotHear: 'ऐकू आले नाही. पुन्हा प्रयत्न करा.',
  recordingStopped: 'रेकॉर्डिंग थांबले',
  voiceDetected: 'आवाज ओळखला!',
  speakNow: 'आता बोला...',

  // Monthly Photo Tracker
  monthlyPhotoTracker: 'मासिक फोटो ट्रॅकर',
  monthlyPhotoTrackerDesc: 'दर महिना 4 फोटोंनी पीकाची वाढ ट्रॅक करा',
  week1: 'आठवडा 1',
  week2: 'आठवडा 2',
  week3: 'आठवडा 3',
  week4: 'आठवडा 4',
  takePhoto: 'फोटो काढा',
  photoTaken: 'फोटो घेतला',
  noPhotoYet: 'अद्याप फोटो नाही',
  scheduledDate: 'निर्धारित दिनांक',
  capturePhoto: 'पिकाचा फोटो काढा',
  photoHistory: 'फोटो इतिहास',
  photosThisMonth: 'या महिन्यातील फोटो',
  monthlyProgress: 'मासिक प्रगती',
  allPhotosDone: 'या महिन्यातील सर्व 4 फोटो घेतले!',
  photosRemaining: 'फोटो शिल्लक',
  viewPhotoTracker: 'फोटो ट्रॅकर पहा',
  cropGrowthTimeline: 'पिकाची वाढ टाइमलाइन',

  // AI Decision Explainer
  aiDecisionExplainer: 'AI निर्णय स्पष्टीकारक',
  aiDecisionDesc: 'AI ने हा शेती निर्णय का शिफारस केला ते समझा',
  yourCrop: 'तुमचे पीक',
  whyThisDecision: 'हा निर्णाय का?',
  aiConfidence: 'AI विश्वास',
  marketAnalysis: 'बाजार विश्लेषण',
  riskFactors: 'धोका घटक',
  seasonContext: 'हंगाम संदर्भ',
  getAiAnalysis: 'AI विश्लेषण मिळवा',
  aiReasonTitle: 'AI तर्क',
  aiReasonDetail: 'या शिफारसींमागचे तपशीलवार तर्क',
  investmentDetails: 'गुंतवणूक तपशील',
  expectedYieldDetails: 'अपेक्षित उत्पादन',
  marketPriceDetails: 'बाजार भाव विश्लेषण',
  waterRequirement: 'पाण्याची गरज',
  soilSuitability: 'मातीची योग्यता',
  bestPractice: 'सर्वोत्तम पद्धत',
  disclaimer: 'हे AI-निर्मित सल्ला आहे. महत्त्वाच्या निर्णयांसाठी स्थानिक तज्ञांशी भेटा.',

  // Expert Consultation
  expertConsultation: 'तज्ञ परामर्श',
  expertConsultationDesc: 'वैयक्तिक सल्ल्यासाठी कृषी तज्ञांशी जोडा',
  consultExpert: 'तज्ञांशी भेटा',
  expertSpecialty: 'विशेषता',
  expertAvailable: 'आता उपलब्ध',
  callExpert: 'तज्ञांना कॉल करा',
  expertNote: 'तज्ञ सोम-शनि, सकाळी 9-संध्या. 6 वाजेपर्यंत उपलब्ध',
  bookConsultation: 'परामर्श बुक करा',

  // Krushi Kendra
  nearbyKrushiKendra: 'जवळचे कृषी केंद्र',
  krushiKendraDesc: 'बियाणे, खते आणि कीडनाशकांसाठी तुमच्या जवळची कृषी इनपुट केंद्रे',
  krushiKendraAddress: 'पत्ता',
  krushiKendraPhone: 'फोन',
  krushiKendraHours: 'वेळ',
  krushiKendraServices: 'सेवा',
  krushiKendraList: 'तुमच्या जवळ कृषी केंद्रे',
  findNearest: 'जवळचे केंद्र शोधा',
  directions: 'दिशा मिळवा',

  // Farm Memory
  farmMemory: 'शेत स्मृती',
  farmMemoryDesc: 'तुमच्या शेताबद्दल तपशीलवार सांगा',
  tellUsAboutFarm: 'तुमच्या शेताबद्दल सांगा',
  soilType: 'मातीचा प्रकार',
  soilTypePlaceholder: 'उदा. दोमट, काळी, वाळू',
  irrigationSource: 'सिंचाई स्रोत',
  irrigationSourcePlaceholder: 'उदा. विहिर, कालवा, ड्रिप',
  farmingExperience: 'शेतीचा अनुभव',
  farmingExperiencePlaceholder: 'उदा. 15 वर्षे',
  ownOrLeased: 'जमीन मालकी',
  ownLand: 'स्वतःची जमीन',
  leasedLand: 'किराय्याची जमीन',
  lastCrop: 'शेवटची कापलेली पीक',
  lastCropPlaceholder: 'उदा. कापूस, गहू',
  expectedHarvestMonth: 'अपेक्षित कापणीचा महिना',
  expectedHarvestPlaceholder: 'उदा. मार्च 2025',
  livestockCount: 'पशुसंख्या',
  livestockCountPlaceholder: 'उदा. 2 गायी, 5 शेळ्या',
  fertilizerBrand: 'पसंदीदा खत ब्रँड',
  fertilizerBrandPlaceholder: 'उदा. इफ्को, टाटा किसान',
  seedSource: 'बियाणे स्रोत',
  seedSourcePlaceholder: 'उदा. स्थानिक बाजार, सरकारी केंद्र',
  saveFarmMemory: 'शेत स्मृती जतन करा',
  farmMemorySaved: 'शेत स्मृती जतन झाली!',
  editFarmMemory: 'शेत स्मृती संपादित करा',
  soilLoamy: 'दोमट',
  soilClay: 'चिकणमाती',
  soilSandy: 'वाळू',
  soilBlack: 'काळी (रेगुर)',
  soilRed: 'लाल माती',
  irrigationWell: 'विहिर/बोअरवेल',
  irrigationCanal: 'कालवा',
  irrigationRain: 'फक्त पावसावर अवलंबून',
  irrigationDrip: 'ड्रिप सिंचाई',
  seedSourceLocal: 'स्थानिक बाजार',
  seedSourceGovt: 'सरकारी केंद्र',
  seedSourcePrivate: 'प्रायव्हेट डीलर',
  seedSourceOwn: 'स्वतःचे जतन केलेले बियाणे',
  farmMemoryComplete: 'तुमचे शेत प्रोफाइल पूर्ण आहे!',
  farmMemorySection: 'शेत तपशील',
  yearOfFarming: 'वर्षांची शेती',

  // Farmer Photo
  changePhoto: 'फोटो बदला',
  uploadPhotoLabel: 'फोटो अपलोड करा किंवा घ्या',
  removePhoto: 'फोटो काढा',
  takeSelfie: 'सेल्फी घ्या',
  profilePhoto: 'प्रोफाइल फोटो',

  // Chatbot Voice
  voiceChat: 'व्हॉइस चॅट',
  voiceChatDesc: 'AI सहाय्यकाशी बोला',
  tapMicToTalk: 'बोलण्यासाठी माइक टॅप करा',
  listeningChat: 'ऐकत आहे... बोला',
  voiceMessageSent: 'व्हॉइस मेसेज पाठवला',
  startVoiceChat: 'व्हॉइस चॅट सुरू करा',
  stopVoiceChat: 'व्हॉइस चॅट बंद करा',

  // Season Score Card
  seasonScoreCard: 'हंगाम स्कोअर कार्ड',
  seasonScoreCardDesc: 'तुमचे हंगामी शेती कामगिरी ट्रॅक करा',
  currentSeason: 'सध्याचा हंगाम',
  seasonPerformance: 'हंगाम कामगिरी',
  overallScore: 'एकूण स्कोअर',
  seasonCropHealth: 'पीक आरोग्य',
  irrigationScore: 'सिंचाई',
  pestManagementScore: 'कीड व्यवस्थापन',
  soilHealthScore: 'माती आरोग्य',
  profitScore: 'नफा',
  timelyActionsScore: 'वेळेवर कृती',
  excellent: 'उत्कृष्ट',
  seasonGood: 'चांगले',
  average: 'सरासरी',
  needsImprovement: 'सुधारा आवश्यक',
  seasonHighlights: 'हंगाम उल्लेखनीय',
  seasonAlerts: 'हंगाम अलर्ट',
  rabiSeason: 'रबी 2025-26',
  kharifSeason: 'खरीफ 2025',
  seasonTip: 'हंगाम सल्ला',
  seasonBreakdown: 'स्कोअर तपशील',
  scoreOutOf: '/100',
  viewSeasonCard: 'हंगाम कार्ड पहा',
  downloadScorecardPdf: 'स्कोअरकार्ड PDF डाउनलोड करा',
  downloadScorecardDesc: 'तुमचा हंगामी कामगिरी अहवाल जतन करा',
  shareScorecard: 'शेअर करा',
  pdfGenerating: 'PDF तयार होत आहे...',
  copiedToClipboard: 'क्लिपबोर्डवर कॉपी झाले!',
  shareNotSupported: 'शेअर समर्थित नाही',
  scorecardGeneratedDate: 'तयार केले',
  poweredBy: 'KisanPilot AI द्वारे संचालित',

  // Last Season Review
  lastSeasonReview: 'मागील हंगाम समीक्षा',
  lastSeasonReviewDesc: 'तुमच्या मागील शेती हंगामाबद्दल सांगा',
  lastSeasonCrop: 'मागील हंगामाचे पीक',
  lastSeasonCropPlaceholder: 'मागील हंगामाचे पीक निवडा',
  lastSeasonCropWheat: 'गहू',
  lastSeasonCropCotton: 'कापूस',
  lastSeasonCropSoybean: 'सोयाबीन',
  lastSeasonCropRice: 'तांदूळ',
  lastSeasonCropSugarcane: 'ऊस',
  lastSeasonCropOnion: 'कांदा',
  lastSeasonCropOther: 'इतर',
  lastSeasonYield: 'एकरी उत्पादन',
  lastSeasonYieldPlaceholder: 'उदा. 15 क्विंटल/एकर',
  lastSeasonIncome: 'एकूण उत्पन्न',
  lastSeasonIncomePlaceholder: 'उदा. ₹50,000',
  lastSeasonExpense: 'एकूण खर्च',
  lastSeasonExpensePlaceholder: 'उदा. ₹25,000',
  lastSeasonMajorProblem: 'मुख्य समस्या',
  lastSeasonMajorProblemPlaceholder: 'मुख्य समस्या निवडा',
  problemPest: 'कीटाचा हल्ला',
  problemWater: 'पाण्याची कमी',
  problemMarket: 'कमी बाजारभाव',
  problemDisease: 'पीक रोग',
  problemWeather: 'हवामान नुकसान',
  problemLabor: 'मजूरांची कमी',
  problemNone: 'मोठी समस्या नाही',
  lastSeasonPestIssue: 'कीड/रोग तपशील',
  lastSeasonPestIssuePlaceholder: 'कोणती कीड किंवा रोग?',
  lastSeasonSatisfaction: 'समाधान पातळी',
  lastSeasonSatisfactionPlaceholder: 'तुम्ही किती समाधानी होता?',
  satisfactionVerySatisfied: 'खूप समाधानी',
  satisfactionSatisfied: 'समाधानी',
  satisfactionNeutral: 'तटस्थ',
  satisfactionDissatisfied: 'असमाधानी',
  satisfactionVeryDissatisfied: 'खूप असमाधानी',
  lastSeasonLesson: 'मुख्य शिक्षा',
  lastSeasonLessonPlaceholder: 'मागील हंगामातून तुम्ही काय शिकलात?',
  lastSeasonCropDamage: 'पीक नुकसान %',
  lastSeasonCropDamagePlaceholder: 'उदा. 10%',

  // Voice Chat in Chatbot
  micButton: 'माइक',
  stopTalking: 'बंद करा',

  // Enhanced Chatbot Responses
  suggestion5: 'या महिन्यातील लेनदेन काय आहे?',
  suggestion6: 'माझ्या शेताबद्दल सर्व सांगा',
  suggestion7: 'माझ्या कुटुंबातील सदस्य कोण आहेत?',
  suggestion8: 'माझ्या शेताचे धोके काय आहेत?',
  chatGreeting: '🌱 नमस्कार! मी तुमचा किसानपायलट AI सहाय्यक आहे. मी पिक काळजी, सिंचाई, कीड व्यवस्थापन, बाजारभाव, विमा आणि बरेच काही मध्ये तुम्हाला मदत करू शकतो.',
  chatThankYou: '🙏 आभार! शुभ शेती! अधिक मदत हवी असल्या, मी नेहमी इथे आहे.',
  chatFarmStatusResponse: '🌾 **शेत स्थिती अहवाल:**\n\n✅ **मागील पीक:** {crop}\n🧪 **मातीचा प्रकार:** {soil}\n😊 **मागील हंगाम समाधान:** {satisfaction}\n\n📊 एकंदरीत, तुमचे शेत स्थिर स्थितीत आहे. नियमित निरीक्षण ठेवा आणि योग्य सिंचाई ठेवा.',
  chatFarmStatusDefault: '🌾 सध्याच्या परिस्थितींनुसार तुमचे शेत ठीक आहे. वैयक्तिक अहवाल मिळवण्यासाठी शेत स्मृती तपशील भरा.',
  chatTransactionResponse: '💰 **मागील महिन्याचा लेनदेन सारांश:**\n\n💵 **एकूण उत्पन्न:** {income} ({incCount} प्रविष्ट्या)\n💸 **एकूण खर्च:** {expense} ({expCount} प्रविष्ट्या)\n📊 **{netLabel}:** {net}\n📝 **एकूण लेनदेन:** {total}\n\n💡 तपशीलवार रेकॉर्डसाठी व्हॉइस खाता फीचर पहा.',
  chatTransactionNoData: '📝 मागील महिन्यात कोणतेही लेनदेन नाही. **व्हॉइस खाता** फीचर वापरून आपल्या उत्पन्न आणि खर्च प्रविष्ट्या जोडा!',
  chatSoilResponse: '🧪 **माती आरोग्य मार्गदर्शक:**\n\n1. जवळच्या कृषी केंद्रावर **माती चाचणी** करा — ₹50-200 खर्च.\n2. **pH पातळी** तपासा — बहुतेक पिकांना 6.0-7.5 pH आवडतो.\n3. **जैविक पदार्थ** टाका — कम्पोस्ट किंवा शेळी खाद.\n4. **पीक रोटेशन** मातीची झीज थांबवतो.\n5. जास्त रासायनिक खतांपासून दूर राहा.',
  chatSeedResponse: '🌱 **बियाणे आणि बुवण मार्गदर्शक:**\n\n1. नेहमी **प्रमाणित बियाणे** विकत घ्या.\n2. बुवणीपूर्वी **बियाणे उपचार** करा.\n3. **बुवणीचा हंगाम** बघा — गहू: ऑक्टोबर-नोव्हेंबर.\n4. योग्य **बियाणे दर** ठेवा.\n5. योग्य **खोल** पर बियाणे टाका.',
  chatHarvestResponse: '🌾 **कापणी तयारी मार्गदर्शक:**\n\n1. **धान्याची ओलावा** 14% पेक्षा कमी असावा.\n2. **रंग बदल** — पाने पिवळी/तपकिरी होतात.\n3. **धान्याची कठीणता** — दात घाऊन तपासा.\n4. **फुलण्यानंतर दिवस** — गहू: ~120 दिवस.\n5. **हवामान** — स्वच्छ, कोरड्या हवामानात कापणी करा.',
  chatInsuranceResponse: '🛡 **पीक विमा आणि योजना:**\n\n**PMFBY:**\n• प्रीमियम: खरीफ 2%, रबी 1.5%\n• संरक्षण: नैसर्गिक आपत्ती, कीड, रोग\n• बुवणीपूर्वी अर्ज करा\n\n**शेतकरी क्रेडिट कार्ड:**\n• ₹3 लाख पर्यंत 4% व्याजावर',
  chatLoanResponse: '🏦 **कर्ज पर्याय:**\n\n**शेतकरी क्रेडिट कार्ड:**\n• ₹3 लाख पर्यंत 4% व्याज\n• ₹1.6 लाख पर्यंत जामीननास्तेव\n\n📞 आधार कार्ड आणि जमीन रेकॉर्ड घेऊन बँकेला जा.',
  chatSubsidyResponse: '🏛 **शेतकऱ्यांसाठी सरकारी योजना:**\n\n1. **PM-KISAN** — वर्षी ₹6,000 सरळ उत्पन्न सहाय्य\n2. **PMFBY** — कम प्रीमियमवर पीक विमा\n3. **माती आरोग्य कार्ड** — मोफत माती चाचणी\n4. **e-NAM** — ऑनलाइन राष्ट्रीय कृषी बाजार\n\n📱 pmkisan.gov.in वर नोंदणी करा.',
  chatOrganicResponse: '🌿 **जैविक शेती मार्गदर्शक:**\n\n1. **कम्पोस्ट** — पिकाचा अवशेष + शेळी खादापासून बनवा\n2. **वर्मीकम्पोस्ट** — एर्थवर्म वापरा\n3. **नीम आधारित कीडनाशक** — नैसर्गिक कीड नियंत्रण\n4. **हिरवी खाद** — धैंचा उगवून मातीत गाळा\n5. **पीक रोटेशन** — डालिंगण आणि अन्न बदला',
  chatDiseaseResponse: '🦠 **रोग व्यवस्थापन:**\n\n**सामान्य पीक रोग:**\n• **ब्लाइट** — तपकिरी डाग\n• **रस्ट** — पिवळसर डाग\n• **पावडरी मिल्ड्यू** — पांढरा पावडर\n\n**प्रतिबंध:**\n1. रोग प्रतिरोधी कापस वापरा\n2. योग्य अंतर ठेवा\n3. पाणी साचणे टाळा\n4. संक्रमित रोपे हटवा',
  chatMarketResponse: '🏪 **बाजारभाव मार्गदर्शक:**\n\n**चांगल्या भावाचे टिप्स:**\n1. वेळेची निवड करा — कापणीनंतर भाव घटतो\n2. कितीही **मांड्यांमध्ये** भाव तुलना करा\n3. **e-NAM पोर्टल** वर ऑनलाइन विका\n4. भाव कम असल्यास **साठवणे** करा\n\n💡 बाजार भाव सुविधेसाठी Market Prices फीचर पहा!',
  chatNextActionResponse: '✨ **आजसाठी शिफारस:**\n\n📋 **प्राधान्य 1:** मातीची ओलावा तपासा.\n📋 **प्राधान्य 2:** पिकाच्या पानांवर कीडीची चिन्हे बघा.\n📋 **प्राधान्य 3:** हवामान अंदाज बघा.\n\n💡 वैयक्तिक शिफारसीसाठी **Next Best Action** फीचर पहा!',
  chatScorecardResponse: '🏆 **हंगाम स्कोअर कार्ड:**\n\n📊 6 मुख्य मेट्रिक्सवर तुमची कामगिरी ट्रॅक केली जाते:\n• पीक आरोग्य, सिंचाई, कीड व्यवस्थापन\n• माती आरोग्य, नफा, वेळेवर कृती\n\n**Season Score Card** फीचर पहा आणि PDF डाउनलोड करा!',
  chatWeedResponse: '🌿 **खरपतवार व्यवस्थापन:**\n\n1. **मॅन्युअल निराई** — बुवणीनंतर पहिले 30 दिवस महत्त्वाचे\n2. **कुदळी** — माती सैल व खरपतवार काढते\n3. **मल्चिंग** — खरपतवार अंकुरण थांबवते\n\n💡 वेळेवर निराईमुळे उत्पादन 15-25% वाढू शकते!',
  chatTechResponse: '🚜 **आधुनिक शेती तंत्रज्ञान:**\n\n1. **ड्रोन** — पीक आरोग्य निरीक्षण\n2. **माती ओलावा सेन्सर** — रिअल-टाइम सिंचाई\n3. **मोबाइल अॅप्स** — हवामान, बाजार, सल्ला\n4. **सोलर पंप** — स्वस्त सिंचाई\n5. **मायक्रो सिंचाई** — ड्रिप/स्प्रिंकलर',
  chatCropRotationResponse: '🔄 **पीक रोटेशन मार्गदर्शक:**\n\n**सुचव:**\n• **वर्ष 1:** अन्न (गहू/तांदूळ)\n• **वर्ष 2:** डालिंगण (चणा/सोयाबीन)\n• **वर्ष 3:** रोपण पीक (कापूस/ऊस)\n• **वर्ष 4:** तेलबीज (मूगफली/सरसो)\n\n✅ 10-20% उत्पादन वाढ, 25% कम खर्चा!',
  chatHelpResponse: '🤖 **मी यामध्ये मदत करू शकतो:**\n\n💧 सिंचाई | 🐛 कीड व्यवस्थापन | 🧪 खत\n🌦 हवामान | 💰 लेनदेन | 🌾 शेत स्थिती\n🌱 बियाणे | 🛡 विमा | 🏪 बाजारभाव\n🌿 जैविक शेती | 📉 कर्ज आणि अनुदान\n\nइंग्रजी, हिंदी किंवा मराठीत विचारा!',
  familyMembers: '👨‍👩‍👧‍👦 कुटुंबातील सदस्य',
  familyMembersDesc: 'तुमच्या कुटुंबातील सदस्यांसह शेत माहिती शेअर करा',
  addMember: '+ सदस्य जोडा',
  memberName: 'नाव',
  memberNamePlaceholder: 'कुटुंबातील सदस्याचे नाव लिहा',
  memberRelation: 'नाते',
  memberPhone: 'फोन',
  memberPhonePlaceholder: 'फोन नंबर लिहा',
  saveMember: 'जतन करा',
  cancelMember: 'रद्द करा',
  removeMember: 'काढा',
  sharedWith: '{count} सदस्यांसह शेअर केले',
  maxMembersReached: 'जास्तीत जास्त 4 सदस्य परवानगी',
  relationWife: 'पत्नी',
  relationSon: 'मुलगा',
  relationDaughter: 'मुलगी',
  relationFather: 'वडील',
  relationMother: 'आई',
  relationBrother: 'भाऊ',
  relationOther: 'इतर',
  selectRelation: 'नाते निवडा',
  memberAdded: 'सदस्य जोडला!',
  memberRemoved: 'सदस्य काढला',
  voiceSmartParsing: 'स्मार्ट व्हॉइस',
  voiceParsed: 'पार्स: ₹{amount} - {type} - {category}',
  currentMonth: 'सध्याचा महिना',
  pastMonth: 'मागील महिना',
  manageFamilyMembers: 'तुमच्या कुटुंबातील सदस्य व्यवस्थापित करा',
};

const translations: Record<Language, Translations> = { en, hi, mr };

export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations.en;
}

export function getLanguageLabel(lang: Language): string {
  switch (lang) {
    case 'mr': return 'मराठी';
    case 'hi': return 'हिंदी';
    case 'en': return 'English';
  }
}
