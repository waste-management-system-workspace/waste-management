import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to EcoScan!",
      tagline: "Scan, Recycle, Earn Rewards - Making recycling easy and rewarding",
      scan_now: "Start Scanning",
      feature1_title: "Smart Scanning",
      feature1_desc: "Use AI to identify recyclable materials instantly",
      feature2_title: "Earn Rewards",
      feature2_desc: "Get points for every item you recycle correctly",
      total_recycled: "Total Recycled",
      municipal_portal: "Municipal Portal",
      login: "Login",
      signup: "Create Account",
      email: "Email",
      password: "Password",
      confirm_password: "Confirm Password",
      email_placeholder: "Enter your email",
      password_placeholder: "Enter your password",
      confirm_password_placeholder: "Confirm your password",
      login_button: "Log In",
      signup_button: "Sign Up",
      no_account: "Don't have an account?",
      have_account: "Already have an account?",
      login_link: "Log in",
      signup_link: "Sign up",
      first_name: "First Name",
      last_name: "Last Name",
      first_name_placeholder: "Enter your first name",
      last_name_placeholder: "Enter your last name",
      
      // Scan page translations
      scan_title: "Scan Waste Item",
      start_camera: "Start Camera",
      classify_waste: "Classify Waste",
      classifying: "Classifying...",
      dispose_in: "Dispose in",
      earn_points: "You earned {{points}} points!",
      log_disposal: "Log Disposal",
      model_load_error: "Error loading AI model",
      camera_error: "Could not access camera",
      classification_error: "Error classifying waste",
      
      // Rewards page translations
      rewards_title: "Your Rewards",
      your_points: "Your Points",
      points_description: "Earn points by recycling correctly!",
      available_offers: "Available Offers",
      points_required: "Points required",
      redeem_offer: "Redeem Offer",
      
      // Municipal page translations
      municipal_dashboard: "Municipal Dashboard",
      last_day: "Last Day",
      last_week: "Last Week",
      last_month: "Last Month",
      recycling_heatmap: "Recycling Activity Heatmap",
      recycling_rate: "recycling rate",
      bins_serviced: "bins serviced",
      route_optimization: "Route Optimization",
      optimization_suggestion: "Based on current data, we suggest optimizing collection routes in high-activity areas.",
      generate_routes: "Generate Optimized Routes",
      loading: "Loading..."
    }
  },
  zu: {
    translation: {
      welcome: "Siyakwamukela ku-EcoScan!",
      tagline: "Skena, Phinda Usebenzise, Zuza Imiklomelo - Kwenza ukuphinda kusetshenziswe kube lula futhi kube nomklomelo",
      scan_now: "Qala Ukuskena",
      feature1_title: "Ukuskena Okuhlakaniphile",
      feature1_desc: "Sebenzisa i-AI ukuze uthole izinto ezingaphinda zisetshenziswe ngokushesha",
      feature2_title: "Zuza Imiklomelo",
      feature2_desc: "Thola amaphuzu ngento ngayinye oyiphinda uyisebenzise ngendlela efanele",
      total_recycled: "Okuphelele Okuphinda Kwasetshenziswa",
      municipal_portal: "Isango Likahulumeni Wendawo",
      login: "Ngena ngemvume",
      signup: "Dala i-akhawunti",
      email: "I-imeyili",
      password: "Iphasiwedi",
      confirm_password: "Qinisekisa iphasiwedi",
      email_placeholder: "Faka i-imeyili yakho",
      password_placeholder: "Faka iphasiwedi yakho",
      confirm_password_placeholder: "Qinisekisa iphasiwedi yakho",
      login_button: "Ngena ngemvume",
      signup_button: "Bhalisa",
      no_account: "Awunawo i-akhawunti?",
      have_account: "Sewunayo i-akhawunti?",
      login_link: "Ngena ngemvume",
      signup_link: "Bhalisa",
      first_name: "Igama",
      last_name: "Isibongo",
      first_name_placeholder: "Faka igama lakho",
      last_name_placeholder: "Faka isibongo sakho",
    }
  },
  af: {
    translation: {
      welcome: "Welkom by EcoScan!",
      tagline: "Skandeer, Herwin, Verdien Belonings - Maak herwinning maklik en lonend",
      scan_now: "Begin Skandeer",
      feature1_title: "Slim Skandering",
      feature1_desc: "Gebruik KI om herwinbare materiale onmiddellik te identifiseer",
      feature2_title: "Verdien Belonings",
      feature2_desc: "Kry punte vir elke item wat jy korrek herwin",
      total_recycled: "Totaal Herwin",
      municipal_portal: "Munisipale Portaal",
      login: "Teken aan",
      signup: "Skep rekening",
      email: "E-pos",
      password: "Wagwoord",
      confirm_password: "Bevestig wagwoord",
      email_placeholder: "Voer jou e-pos in",
      password_placeholder: "Voer jou wagwoord in",
      confirm_password_placeholder: "Bevestig jou wagwoord",
      login_button: "Teken aan",
      signup_button: "Registreer",
      no_account: "Het jy nie 'n rekening nie?",
      have_account: "Het jy reeds 'n rekening?",
      login_link: "Teken aan",
      signup_link: "Registreer",
      first_name: "Voornaam",
      last_name: "Van",
      first_name_placeholder: "Voer jou voornaam in",
      last_name_placeholder: "Voer jou van in",
    
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;