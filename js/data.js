/* ============================================================
   data.js — Central Bilingual Data Store
   All portfolio content in Arabic & English
   Persisted via LocalStorage with default fallback
   ============================================================ */

const DEFAULT_DATA = {
  "personal": {
    "name": {
      "ar": "محمد حمدي",
      "en": "Mohamed Hamdy"
    },
    "title": {
      "ar": "مطور واجهات أمامية & طالب هندسة ذكاء اصطناعي",
      "en": "Front-End Developer & AI Engineering Student"
    },
    "phone": "+20 1229719494",
    "email": "mohamdahmedhamdi@gmail.com",
    "website": "https://mohamad-hamdi.github.io",
    "location": {
      "ar": "طنطا، مصر",
      "en": "Tanta, Egypt"
    },
    "profileImage": "assets/images/home.png",
    "aboutImage": "assets/images/about.png",
    "cvFile": "assets/docs/Mohamed_Hamdy_CV.pdf",
    "social": {
      "facebook": "https://www.facebook.com/mohamdahmedhhamdi/",
      "linkedin": "https://www.linkedin.com/in/mohamdahmedhamdi/",
      "github": "https://github.com/Mohamad-Hamdi",
      "whatsapp": "https://wa.me/qr/72KZ2AZBBNCOI1"
    }
  },
  "about": {
    "text": {
      "ar": "مطور واجهات أمامية ومهندس برمجيات، لديّ خبرة في إطلاق تطبيقات ويب تركز على المستخدم وتوسيع نطاق المنصات لأكثر من 700 مستخدم. أمتلك أساسًا قويًا في أنظمة JavaScript والقيادة التقنية، وأسعى لتوظيف مهاراتي في تدريب عملي مؤثر في تطوير البرمجيات.",
      "en": "An agile Front-End Developer & Software Engineering student experienced in launching user-centric web applications and scaling platforms to 700+ users. Strong foundation in JavaScript ecosystems and technical leadership, eager to leverage skills in an impactful software development internship."
    },
    "stats": [
      {
        "value": "700+",
        "label": {
          "ar": "مستخدم نشط",
          "en": "Active Users"
        },
        "icon": "bx-group"
      },
      {
        "value": "120+",
        "label": {
          "ar": "طالب تم تدريبه",
          "en": "Students Trained"
        },
        "icon": "bx-book-reader"
      },
      {
        "value": "10+",
        "label": {
          "ar": "مشروع مكتمل",
          "en": "Projects Completed"
        },
        "icon": "bx-code-block"
      },
      {
        "value": "4+",
        "label": {
          "ar": "سنوات خبرة",
          "en": "Years Experience"
        },
        "icon": "bx-time-five"
      }
    ]
  },
  "education": [
    {
      "id": "edu-2",
      "degree": {
        "ar": "الثانوية العامة",
        "en": "High School Diploma"
      },
      "institution": {
        "ar": "مدرسة طنطا الثانوية",
        "en": "Tanta Secondary School"
      },
      "period": {
        "ar": "2021 — 2024",
        "en": "2021 — 2024"
      },
      "description": {
        "ar": "تخرجت بمجموع 91.2%",
        "en": "Graduated with 91.2% overall score"
      },
      "image": "assets/images/education-1.png"
    },
    {
      "id": "edu-1",
      "degree": {
        "ar": "هندسة الذكاء الاصطناعي والبرمجيات",
        "en": "AI & Software Engineering"
      },
      "institution": {
        "ar": "كلية الهندسة — جامعة طنطا",
        "en": "Faculty of Engineering — Tanta University"
      },
      "period": {
        "ar": "2024 — الوقت الحاضر",
        "en": "2024 — Present"
      },
      "description": {
        "ar": "دراسة متخصصة في هندسة البرمجيات والذكاء الاصطناعي",
        "en": "Specialized study in Software Engineering and Artificial Intelligence"
      },
      "image": "assets/images/education-2.png"
    }
  ],
  "experience": [
    {
      "id": "exp-1",
      "title": {
        "ar": "مدرّب برمجة محترف — عمل حر",
        "en": "Professional Programming Instructor — Self-Employed"
      },
      "period": {
        "ar": "2022 — الوقت الحاضر",
        "en": "2022 — Present"
      },
      "description": {
        "ar": "تقديم دورات برمجة للشباب والأطفال تغطي تقنيات الويب ولغات البرمجة المتعددة.",
        "en": "Delivered programming courses for youth and children covering web technologies and multiple programming languages."
      },
      "details": {
        "ar": [
          "تدريس HTML, CSS, Sass, Bootstrap, JavaScript, C++, Python, Vue.js & React.js",
          "تدريب الطلاب حضوريًا وأونلاين مع التركيز على التطبيق العملي",
          "تأسيس منصة لِتعلم لإثراء المحتوى العربي في مجال البرمجة"
        ],
        "en": [
          "Delivered courses covering HTML, CSS, Sass, Bootstrap, JavaScript, C++, Python, Vue.js & React.js",
          "Trained students in-person and online with a focus on real-world application",
          "Founded LETA3LAM platform to enrich Arabic content in programming education"
        ]
      },
      "image": "assets/images/experience-1.png"
    },
    {
      "id": "exp-2",
      "title": {
        "ar": "مدرّب برمجة | iSchool",
        "en": "Coding Instructor | iSchool"
      },
      "period": {
        "ar": "يونيو 2026",
        "en": "June 2026"
      },
      "description": {
        "ar": "تقديم جلسات برمجة حضورية لأكثر من 120 متعلمًا صغيرًا ضمن مبادرة تكنولوجية.",
        "en": "Delivered in-person coding sessions for over 120 young learners within a tech initiative."
      },
      "details": {
        "ar": [
          "تبسيط أساسيات البرمجة والمنطق إلى دروس تفاعلية مناسبة للأعمار المختلفة",
          "إدارة ديناميكيات الفصل الدراسي بفعالية للحفاظ على مستوى عالٍ من المشاركة والتركيز",
          "توجيه الأطفال من خلال أنشطة عملية لبناء مهارات حل المشكلات الأساسية"
        ],
        "en": [
          "Simplified programming fundamentals and logic into engaging, age-appropriate lessons",
          "Managed physical classroom dynamics effectively to maintain high engagement and focus",
          "Guided children through hands-on activities to build basic problem-solving skills"
        ]
      },
      "image": "assets/images/experience-2.png"
    },
    {
      "id": "exp-3",
      "title": {
        "ar": "مدرّب ذكاء اصطناعي وبرمجة — Genial Math",
        "en": "AI & Programming Instructor — Genial Math"
      },
      "period": {
        "ar": "يناير 2026",
        "en": "Jan 2026"
      },
      "description": {
        "ar": "تبسيط مفاهيم الذكاء الاصطناعي وتعلم الآلة ومسارات البرمجة الأساسية من خلال مشاريع عملية.",
        "en": "Simplified AI/ML concepts and core programming tracks through hands-on projects."
      },
      "details": {
        "ar": [
          "تبسيط مفاهيم الذكاء الاصطناعي وتعلم الآلة للطلاب",
          "تصميم مشاريع عملية تطبيقية لتعزيز الفهم"
        ],
        "en": [
          "Simplified Artificial Intelligence/Machine Learning concepts for students",
          "Designed hands-on practical projects to reinforce understanding"
        ]
      },
      "image": "assets/images/experience-3.png"
    },
    {
      "id": "exp-4",
      "title": {
        "ar": "مدرّب دورات — وزارة التربية والتعليم",
        "en": "Course Instructor — Ministry of Education"
      },
      "period": {
        "ar": "أغسطس 2023 — 2024",
        "en": "Aug 2023 — 2024"
      },
      "description": {
        "ar": "تقديم مسارات تدريب تقنية مكثفة حضورية ضمن مبادرة تعليمية حكومية.",
        "en": "Delivered intensive offline technical training tracks under a governmental educational initiative."
      },
      "details": {
        "ar": [
          "تدريس HTML5, CSS3, أساسيات C++ ضمن مبادرة تعليمية حكومية",
          "تصميم مناهج تدريبية تتناسب مع مستويات الطلاب المختلفة"
        ],
        "en": [
          "Delivered intensive offline technical training tracks (HTML5, CSS3, C++ Basics)",
          "Designed training curricula adapted to various student levels"
        ]
      },
      "image": "assets/images/experience-4.png"
    }
  ],
  "skills": {
    "languages": [
      {
        "name": "Python",
        "icon": "bxl-python",
        "color": "#3776AB"
      },
      {
        "name": "JavaScript",
        "icon": "bxl-javascript",
        "color": "#F7DF1E"
      },
      {
        "name": "React.js",
        "icon": "bxl-react",
        "color": "#61DAFB"
      },
      {
        "name": "HTML5",
        "icon": "bxl-html5",
        "color": "#E34F26"
      },
      {
        "name": "CSS3",
        "icon": "bxl-css3",
        "color": "#1572B6"
      },
      {
        "name": "Sass",
        "icon": "bxl-sass",
        "color": "#CC6699"
      },
      {
        "name": "Bootstrap",
        "icon": "bxl-bootstrap",
        "color": "#7952B3"
      },
      {
        "name": "PHP",
        "icon": "bxl-php",
        "color": "#777BB4"
      },
      {
        "name": "C++",
        "icon": "bx-code-curly",
        "color": "#00599C"
      },
      {
        "name": "Vue.js",
        "icon": "bxl-vuejs",
        "color": "#4FC08D"
      }
    ],
    "backend": [
      {
        "name": "Firebase",
        "icon": "bx-data",
        "color": "#FFCA28"
      },
      {
        "name": "Cloud Firestore",
        "icon": "bx-cloud",
        "color": "#FFCA28"
      },
      {
        "name": "MySQL",
        "icon": "bx-server",
        "color": "#4479A1"
      },
      {
        "name": "LocalStorage",
        "icon": "bx-hdd",
        "color": "#a1a1aa"
      }
    ],
    "tools": [
      {
        "name": "Git",
        "icon": "bxl-git",
        "color": "#F05032"
      },
      {
        "name": "GitHub",
        "icon": "bxl-github",
        "color": "#ffffff"
      },
      {
        "name": "Notion",
        "icon": "bx-notepad",
        "color": "#ffffff"
      },
      {
        "name": "UI/UX Design",
        "icon": "bx-palette",
        "color": "#8b5cf6"
      },
      {
        "name": "Responsive Design",
        "icon": "bx-devices",
        "color": "#3b82f6"
      }
    ]
  },
  "projects": [
    {
      "id": "proj-1",
      "title": {
        "ar": "محاسبة النفس — متتبع العادات الإسلامية",
        "en": "Mohasabat Al-Nafs — Islamic Habit Tracker"
      },
      "subtitle": {
        "ar": "تطبيق ويب متكامل",
        "en": "Full-Stack Web App"
      },
      "description": {
        "ar": "تطبيق ويب عالي الأداء لتتبع العادات اليومية الإسلامية، مع مزامنة بيانات فورية وخوارزميات تقييم ديناميكية.",
        "en": "A high-performance daily Islamic habit tracker with real-time data sync and dynamic scoring algorithms."
      },
      "details": {
        "ar": [
          "بناء متتبع عادات يومي عالي الأداء باستخدام Vanilla JS و CSS3 لسرعة تحميل قصوى",
          "دمج Google Auth و Cloud Firestore لمزامنة البيانات في الوقت الفعلي عبر الأجهزة",
          "إطلاق النسخة الثانية مع خوارزميات تقييم ديناميكية وواجهات API للصلاة وإشعارات المتصفح",
          "توسيع نطاق المنصة لأكثر من 700 مستخدم نشط خلال أيام من الإطلاق"
        ],
        "en": [
          "Engineered a high-performance daily habit tracker using Vanilla JS and CSS3 for maximum loading speed",
          "Integrated secure Google Auth and Cloud Firestore for seamless real-time data sync across devices",
          "Launched V2 with dynamic scoring algorithms, Geolocation-based prayer APIs, and browser notifications",
          "Successfully scaled the platform to 700+ active users within days of launch"
        ]
      },
      "techStack": [
        "Vanilla JS",
        "CSS3",
        "Firebase",
        "Cloud Firestore"
      ],
      "image": "assets/images/default-project.png",
      "liveLink": "https://mohasabat-alnafs.vercel.app",
      "githubLink": "https://github.com/Mohamad-Hamdi",
      "featured": true
    },
    {
      "id": "proj-2",
      "title": {
        "ar": "لِتعلَم — منصة تعليم البرمجة",
        "en": "LETA3LAM — Programming Education Platform"
      },
      "subtitle": {
        "ar": "نظام إدارة تعلم (LMS)",
        "en": "Learning Management System (LMS)"
      },
      "description": {
        "ar": "منصة تعليمية متكاملة لتعليم البرمجة للشباب العربي، تحتوي على كورسات ومسارات متكاملة ونظام إدارة للمحاضرين والطلاب.",
        "en": "A comprehensive online LMS tailored for youth education with course tracking, video lectures, and interactive blog ecosystem."
      },
      "details": {
        "ar": [
          "تصميم هيكل الواجهة الأمامية وقاعدة البيانات لنظام LMS مخصص لتعليم الشباب",
          "بناء نظام وصول قائم على الأدوار مع لوحات تحكم مخصصة للطلاب والمحاضرين",
          "تطبيق تتبع ديناميكي للدورات ومحاضرات فيديو مدمجة ونظام مدونة تفاعلي"
        ],
        "en": [
          "Architected the frontend and database structure of an online LMS tailored for youth education",
          "Built a secure role-based access system enabling personalized dashboards for students and instructors",
          "Implemented dynamic course tracking, embedded video lectures, and an interactive blog ecosystem"
        ]
      },
      "techStack": [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Bootstrap",
        "PHP",
        "MySQL"
      ],
      "image": "assets/images/leta3lam.png",
      "liveLink": "https://leta3lam.vercel.app",
      "githubLink": "https://github.com/Mohamad-Hamdi",
      "featured": true
    },
    {
      "id": "proj-3",
      "title": {
        "ar": "موقعي الشخصي — Portfolio",
        "en": "Personal Portfolio Website"
      },
      "subtitle": {
        "ar": "موقع شخصي",
        "en": "Portfolio Website"
      },
      "description": {
        "ar": "موقع شخصي متجاوب بالكامل لعرض المشاريع التقنية والعروض الحية مع تبديل ثيمات فعّال.",
        "en": "A lightweight, fully responsive portfolio web app to showcase technical projects and live demos."
      },
      "details": {
        "ar": [
          "نشر تطبيق ويب خفيف ومتجاوب بالكامل لعرض المشاريع التقنية",
          "تحسين سرعات العرض عبر جميع أحجام الشاشات باستخدام CSS Variables"
        ],
        "en": [
          "Deployed a lightweight, fully responsive portfolio web app to showcase technical projects and live demos",
          "Optimized rendering speeds across all viewports using CSS variables for efficient theme switching"
        ]
      },
      "techStack": [
        "HTML5",
        "CSS3",
        "JavaScript"
      ],
      "image": "assets/images/portfolio.png",
      "liveLink": "https://mohamad-hamdi.github.io",
      "githubLink": "https://github.com/Mohamad-Hamdi/Mohamad-Hamdi.github.io",
      "featured": false
    },
    {
      "id": "proj-4",
      "title": {
        "ar": "معًا — قوانين الأسرة",
        "en": "Ma3an Family Rules"
      },
      "subtitle": {
        "ar": "تطبيق ويب",
        "en": "Frontend Web App"
      },
      "description": {
        "ar": "منصة ويب متجاوبة لرقمنة اللوائح الداخلية للمنظمة بتصميم عصري وسهل الاستخدام.",
        "en": "A responsive web platform to digitize the organization's internal regulations."
      },
      "details": {
        "ar": [
          "تصميم ونشر منصة ويب متجاوبة لرقمنة اللوائح الداخلية للمنظمة بشكل تطوعي"
        ],
        "en": [
          "Voluntarily designed and deployed the responsive web platform to digitize the organization's internal regulations"
        ]
      },
      "techStack": [
        "HTML5",
        "CSS3",
        "JavaScript"
      ],
      "image": "assets/images/default-project.png",
      "liveLink": "https://ma3an-rules.vercel.app/",
      "githubLink": "https://github.com/Mohamad-Hamdi",
      "featured": false
    },
    {
      "id": "proj-5",
      "title": {
        "ar": "موقع لتعلُّم التداول",
        "en": "Learn Trading Website"
      },
      "subtitle": {
        "ar": "موقع تعليمي",
        "en": "Educational Website"
      },
      "description": {
        "ar": "موقع غير ربحي لدكتور في كلية التجارة ليساعد الطلاب على تعلم التداول بالطرق المشروعة.",
        "en": "A non-profit educational website helping students learn legitimate trading methods."
      },
      "details": {
        "ar": [
          "تصميم وتطوير موقع تعليمي غير ربحي لتعليم التداول المشروع",
          "العمل مع أستاذ جامعي لتقديم محتوى تعليمي موثوق"
        ],
        "en": [
          "Designed and developed a non-profit educational website for legitimate trading education",
          "Collaborated with a university professor to deliver reliable educational content"
        ]
      },
      "techStack": [
        "HTML5",
        "CSS3",
        "JavaScript"
      ],
      "image": "assets/images/trading.png",
      "liveLink": "https://mohamed-hamdy.me/learnTrading/",
      "githubLink": "https://github.com/Mohamad-Hamdi/learnTrading",
      "featured": false
    }
  ],
  "customSections": [],
  "ui": {
    "heroTexts": {
      "ar": [
        "مطور واجهات أمامية",
        "مؤسس منصة \"لِتعلَم\"",
        "طالب هندسة ذكاء اصطناعي",
        "مسلم معتز بدينه"
      ],
      "en": [
        "Front-End Developer",
        "Founder of LETA3LAM",
        "AI Engineering Student",
        "Proud Muslim"
      ]
    },
    "navItems": [
      {
        "id": "home",
        "label": {
          "ar": "الرئيسية",
          "en": "Home"
        }
      },
      {
        "id": "about",
        "label": {
          "ar": "عنّي",
          "en": "About"
        }
      },
      {
        "id": "education",
        "label": {
          "ar": "التعليم",
          "en": "Education"
        }
      },
      {
        "id": "experience",
        "label": {
          "ar": "الخبرات",
          "en": "Experience"
        }
      },
      {
        "id": "skills",
        "label": {
          "ar": "المهارات",
          "en": "Skills"
        }
      },
      {
        "id": "projects",
        "label": {
          "ar": "المشاريع",
          "en": "Projects"
        }
      },
      {
        "id": "contact",
        "label": {
          "ar": "تواصل معي",
          "en": "Contact"
        }
      }
    ],
    "contactForm": {
      "nameLabel": {
        "ar": "الاسم",
        "en": "Full Name"
      },
      "emailLabel": {
        "ar": "البريد الإلكتروني",
        "en": "Email Address"
      },
      "messageLabel": {
        "ar": "رسالتك",
        "en": "Your Message"
      },
      "sendBtn": {
        "ar": "إرسال",
        "en": "Send Message"
      }
    },
    "footer": {
      "text": {
        "ar": "جميع الحقوق محفوظة",
        "en": "All Rights Reserved"
      }
    },
    "heroCTA": {
      "contact": {
        "ar": "دعنا نتواصل!",
        "en": "Let's Connect!"
      },
      "cv": {
        "ar": "تحميل السيرة الذاتية",
        "en": "Download CV"
      }
    },
    "sectionTitles": {
      "about": {
        "ar": "نبذة <span>عنّي</span>",
        "en": "About <span>Me</span>"
      },
      "education": {
        "ar": "التعليم <span>الأكاديمي</span>",
        "en": "My <span>Education</span>"
      },
      "experience": {
        "ar": "الخبرات <span>المهنية</span>",
        "en": "Professional <span>Experience</span>"
      },
      "skills": {
        "ar": "المهارات <span>التقنية</span>",
        "en": "Technical <span>Skills</span>"
      },
      "projects": {
        "ar": "المشاريع <span>الخاصة بي</span>",
        "en": "My <span>Projects</span>"
      },
      "contact": {
        "ar": "تواصل <span>معي</span>",
        "en": "Get In <span>Touch</span>"
      }
    },
    "skillCategoryTitles": {
      "languages": {
        "ar": "اللغات والأطر",
        "en": "Languages & Frameworks"
      },
      "backend": {
        "ar": "الخدمات الخلفية وقواعد البيانات",
        "en": "Backend & Databases"
      },
      "tools": {
        "ar": "الأدوات والمنهجيات",
        "en": "Tools & Methodologies"
      }
    }
  }
};

/* ============================================================
   LocalStorage API
   ============================================================ */

const STORAGE_KEY = "portfolio_data_v1";

function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Deep merge: keep default structure, override with stored values
      return deepMerge(structuredClone(DEFAULT_DATA), parsed);
    }
  } catch (e) {
    console.warn("Failed to load data from LocalStorage:", e);
  }
  return structuredClone(DEFAULT_DATA);
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Failed to save data to LocalStorage:", e);
    return false;
  }
}

function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  return structuredClone(DEFAULT_DATA);
}

function exportData() {
  const data = loadData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `portfolio_data_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        saveData(data);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

/* ============================================================
   Utility: Deep Merge
   ============================================================ */
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

/* ============================================================
   Language helper
   ============================================================ */
function getText(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj["en"] || obj["ar"] || "";
}
