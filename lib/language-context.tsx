"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "ka" | "en" | "ru"

interface Translations {
nav: {
      home: string
      portfolio: string
      cncAi: string
      visualizer: string
      calculator: string
      about: string
      contact: string
      admin: string
    }
  hero: {
    title: string
    subtitle: string
    cta: string
    secondary: string
  }
  portfolio: {
    title: string
    subtitle: string
    categories: {
      all: string
      laminate: string
      solidWood: string
      granite: string
      bedrooms: string
    }
  }
  calculator: {
    title: string
    subtitle: string
    category: string
    dimensions: string
    length: string
    width: string
    height: string
    material: string
    addons: string
    ledLighting: string
    premiumHandles: string
    softClose: string
    total: string
    requestQuote: string
    materials: {
      premiumLaminate: string
      naturalOak: string
      granite: string
    }
  }
  chat: {
    title: string
    placeholder: string
    greeting: string
  }
  footer: {
    rights: string
    address: string
    phone: string
  }
  admin: {
    title: string
    priceRequests: string
    projectManager: string
    pricingTable: string
  }
  visualizer: {
    title: string
    subtitle: string
    step1: string
    step2: string
    step3: string
    dragDrop: string
    orClick: string
    imageUploaded: string
    change: string
    selectProduct: string
    selectStyle: string
    generate: string
    generating: string
    aiWorking: string
    pleaseWait: string
    resultPlaceholder: string
    resultReady: string
    download: string
    howItWorks: string
    howItWorksDesc: string
    notConnected: string
    products: {
      kitchen: string
      bedroom: string
      solidwood: string
      granite: string
    }
    styles: {
      modern: string
      classic: string
      minimalist: string
      rustic: string
    }
  }
  cncAi: {
    badge: string
    title: string
    subtitle: string
    cta: string
    services: {
      parametric: string
      parametricDesc: string
      aiDesign: string
      aiDesignDesc: string
      precision: string
      precisionDesc: string
      custom: string
      customDesc: string
    }
    showcase: {
      coffeeTable: string
      coffeeTableDesc: string
      wallArt: string
      wallArtDesc: string
    }
  }
}

const translations: Record<Language, Translations> = {
  ka: {
    nav: {
      home: "მთავარი",
      portfolio: "პორტფოლიო",
      cncAi: "CNC+AI",
      visualizer: "AI ვიზუალიზატორი",
      calculator: "კალკულატორი",
      about: "ჩვენს შესახებ",
      contact: "კონტაქტი",
      admin: "ადმინი",
    },
    hero: {
      title: "ხელოვნება შეხვდება ფუნქციურობას",
      subtitle: "პრემიუმ ავეჯი და გრანიტის ნიჟარები, შექმნილი თქვენი ხედვით",
      cta: "ნამუშევრების ნახვა",
      secondary: "ფასის გაანგარიშება",
    },
    portfolio: {
      title: "ჩვენი ნამუშევრები",
      subtitle: "აღმოაჩინეთ ჩვენი ხელნაკეთი კოლექციები",
      categories: {
        all: "ყველა",
        laminate: "ლამინატის სამზარეულო",
        solidWood: "მასიური ხე",
        granite: "გრანიტის ნიჟარები",
        bedrooms: "საძინებლები",
      },
    },
    calculator: {
      title: "ფასის კალკულატორი",
      subtitle: "გაიგეთ თქვენი პროექტის სავარაუდო ღირებულება",
      category: "კატეგორია",
      dimensions: "ზომები",
      length: "სიგრძე (სმ)",
      width: "სიგანე (სმ)",
      height: "სიმაღლე (სმ)",
      material: "მასალა",
      addons: "დამატებითი ოფციები",
      ledLighting: "LED განათება",
      premiumHandles: "პრემიუმ სახელურები",
      softClose: "რბილი დახურვის მექანიზმი",
      total: "ჯამი",
      requestQuote: "შეკვეთის გაგზავნა",
      materials: {
        premiumLaminate: "პრემიუმ ლამინატი",
        naturalOak: "ნატურალური მუხა",
        granite: "გრანიტი",
      },
    },
    chat: {
      title: "დიზაინ კონსულტანტი",
      placeholder: "დაწერეთ შეკითხვა...",
      greeting: "გამარჯობა! როგორ შემიძლია დაგეხმაროთ თქვენი პროექტის დაგეგმვაში?",
    },
    footer: {
      rights: "ყველა უფლება დაცულია",
      address: "თბილისი, საქართველო",
      phone: "+995 555 123 456",
    },
    admin: {
      title: "ადმინ პანელი",
      priceRequests: "ფასის მოთხოვნები",
      projectManager: "პროექტების მართვა",
      pricingTable: "ფასების ცხრილი",
    },
    visualizer: {
      title: "ოთახის ვიზუალიზატორი",
      subtitle: "ატვირთეთ თქვენი ოთახის ფოტო და ნახეთ როგორი იქნება ახალი ავეჯი",
      step1: "ატვირთეთ ფოტო",
      step2: "აირჩიეთ პროდუქტი",
      step3: "შედეგი",
      dragDrop: "ჩააგდეთ ფოტო აქ",
      orClick: "ან დააჭირეთ ასარჩევად",
      imageUploaded: "ფოტო ატვირთულია",
      change: "შეცვლა",
      selectProduct: "აირჩიეთ პროდუქტი",
      selectStyle: "აირჩიეთ სტილი",
      generate: "გენერირება",
      generating: "გენერირება...",
      aiWorking: "AI მუშაობს...",
      pleaseWait: "გთხოვთ დაელოდოთ",
      resultPlaceholder: "აქ გამოჩნდება გენერირებული სურათი",
      resultReady: "შედეგი მზადაა",
      download: "ჩამოტვირთვა",
      howItWorks: "როგორ მუშაობს?",
      howItWorksDesc: "AI ანალიზებს თქვენს ოთახს და ქმნის რეალისტურ ვიზუალიზაციას არჩეული პროდუქტით და სტილით.",
      notConnected: "AI სერვისი ჯერ არ არის დაკავშირებული. გთხოვთ დააკავშიროთ Fal AI.",
      products: {
        kitchen: "სამზარეულო",
        bedroom: "საძინებელი",
        solidwood: "მასიური ხის ავეჯი",
        granite: "გრანიტის ნიჟარა",
      },
      styles: {
        modern: "თანამედროვე",
        classic: "კლასიკური",
        minimalist: "მინიმალისტური",
        rustic: "რუსტიკული",
      },
    },
    cncAi: {
      badge: "ინოვაცია და ტექნოლოგია",
      title: "CNC + AI",
      subtitle: "პარამეტრული დიზაინი ხვდება ხელოვნურ ინტელექტს. შექმენით უნიკალური ავეჯი თანამედროვე ტექნოლოგიით.",
      cta: "შექმენი შენი დიზაინი",
      services: {
        parametric: "პარამეტრული დიზაინი",
        parametricDesc: "ალგორითმული ფორმები და ორგანული სტრუქტურები მათემატიკური სიზუსტით.",
        aiDesign: "AI დიზაინი",
        aiDesignDesc: "ხელოვნური ინტელექტი ქმნის უნიკალურ ვიზუალურ გადაწყვეტილებებს.",
        precision: "CNC სიზუსტე",
        precisionDesc: "კომპიუტერული დამუშავება 0.1მმ სიზუსტით.",
        custom: "ინდივიდუალური",
        customDesc: "თითოეული პროექტი უნიკალურია და შექმნილია თქვენთვის.",
      },
      showcase: {
        coffeeTable: "პარამეტრული ჟურნალის მაგიდა",
        coffeeTableDesc: "ორგანული ფორმების ხის სტრუქტურა მინის ზედაპირით. თითოეული ელემენტი CNC-ზე დამზადებული.",
        wallArt: "3D კედლის პანელი",
        wallArtDesc: "სკულპტურული კედლის ხელოვნება პარამეტრული ტალღებით. AI-გენერირებული დიზაინი.",
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      cncAi: "CNC+AI",
      visualizer: "AI Visualizer",
      calculator: "Calculator",
      about: "About",
      contact: "Contact",
      admin: "Admin",
    },
    hero: {
      title: "Where Art Meets Function",
      subtitle: "Premium furniture and granite sinks, crafted to your vision",
      cta: "View Portfolio",
      secondary: "Calculate Price",
    },
    portfolio: {
      title: "Our Work",
      subtitle: "Discover our handcrafted collections",
      categories: {
        all: "All",
        laminate: "Laminate Kitchens",
        solidWood: "Solid Wood",
        granite: "Granite Sinks",
        bedrooms: "Bedrooms",
      },
    },
    calculator: {
      title: "Price Calculator",
      subtitle: "Get an estimate for your project",
      category: "Category",
      dimensions: "Dimensions",
      length: "Length (cm)",
      width: "Width (cm)",
      height: "Height (cm)",
      material: "Material",
      addons: "Add-ons",
      ledLighting: "LED Lighting",
      premiumHandles: "Premium Handles",
      softClose: "Soft-close Mechanisms",
      total: "Total",
      requestQuote: "Request Quote",
      materials: {
        premiumLaminate: "Premium Laminate",
        naturalOak: "Natural Oak",
        granite: "Granite",
      },
    },
    chat: {
      title: "Design Consultant",
      placeholder: "Type your question...",
      greeting: "Hello! How can I help you plan your project?",
    },
    footer: {
      rights: "All rights reserved",
      address: "Tbilisi, Georgia",
      phone: "+995 555 123 456",
    },
    admin: {
      title: "Admin Panel",
      priceRequests: "Price Requests",
      projectManager: "Project Manager",
      pricingTable: "Pricing Table",
    },
    visualizer: {
      title: "Room Visualizer",
      subtitle: "Upload your room photo and see how your new furniture will look",
      step1: "Upload Photo",
      step2: "Choose Product",
      step3: "Result",
      dragDrop: "Drop photo here",
      orClick: "or click to select",
      imageUploaded: "Photo uploaded",
      change: "Change",
      selectProduct: "Select Product",
      selectStyle: "Select Style",
      generate: "Generate",
      generating: "Generating...",
      aiWorking: "AI is working...",
      pleaseWait: "Please wait",
      resultPlaceholder: "Generated image will appear here",
      resultReady: "Result is ready",
      download: "Download",
      howItWorks: "How it works?",
      howItWorksDesc: "AI analyzes your room and creates a realistic visualization with your chosen product and style.",
      notConnected: "AI service is not connected yet. Please connect Fal AI.",
      products: {
        kitchen: "Kitchen",
        bedroom: "Bedroom",
        solidwood: "Solid Wood Furniture",
        granite: "Granite Sink",
      },
      styles: {
        modern: "Modern",
        classic: "Classic",
        minimalist: "Minimalist",
        rustic: "Rustic",
      },
    },
    cncAi: {
      badge: "Innovation & Technology",
      title: "CNC + AI",
      subtitle: "Parametric design meets artificial intelligence. Create unique, one-of-a-kind furniture pieces with cutting-edge technology.",
      cta: "Design Your Piece",
      services: {
        parametric: "Parametric Design",
        parametricDesc: "Algorithmic forms and organic structures with mathematical precision.",
        aiDesign: "AI Design",
        aiDesignDesc: "Artificial intelligence creates unique visual solutions.",
        precision: "CNC Precision",
        precisionDesc: "Computer-controlled machining with 0.1mm accuracy.",
        custom: "Custom Made",
        customDesc: "Each project is unique and created just for you.",
      },
      showcase: {
        coffeeTable: "Parametric Coffee Table",
        coffeeTableDesc: "Organic wood structure with glass surface. Each element CNC-machined.",
        wallArt: "3D Wall Panel",
        wallArtDesc: "Sculptural wall art with parametric waves. AI-generated design.",
      },
    },
  },
  ru: {
    nav: {
      home: "Главная",
      portfolio: "Портфолио",
      cncAi: "CNC+AI",
      visualizer: "AI Визуализатор",
      calculator: "Калькулятор",
      about: "О нас",
      contact: "Контакты",
      admin: "Админ",
    },
    hero: {
      title: "Искусство встречает функциональность",
      subtitle: "Премиальная мебель и гранитные мойки, созданные по вашему видению",
      cta: "Смотреть работы",
      secondary: "Рассчитать цену",
    },
    portfolio: {
      title: "Наши работы",
      subtitle: "Откройте наши коллекции ручной работы",
      categories: {
        all: "Все",
        laminate: "Ламинатные кухни",
        solidWood: "Массив дерева",
        granite: "Гранитные мойки",
        bedrooms: "Спальни",
      },
    },
    calculator: {
      title: "Калькулятор цен",
      subtitle: "Узнайте примерную стоимость вашего проекта",
      category: "Категория",
      dimensions: "Размеры",
      length: "Длина (см)",
      width: "Ширина (см)",
      height: "Высота (см)",
      material: "Материал",
      addons: "Дополнительно",
      ledLighting: "LED освещение",
      premiumHandles: "Премиум ручки",
      softClose: "Механизм плавного закрытия",
      total: "Итого",
      requestQuote: "Отправить запрос",
      materials: {
        premiumLaminate: "Премиум ламинат",
        naturalOak: "Натуральный дуб",
        granite: "Гранит",
      },
    },
    chat: {
      title: "Дизайн консультант",
      placeholder: "Напишите вопрос...",
      greeting: "Здравствуйте! Как я могу помочь вам спланировать проект?",
    },
    footer: {
      rights: "Все права защищены",
      address: "Тбилиси, Грузия",
      phone: "+995 555 123 456",
    },
    admin: {
      title: "Админ панель",
      priceRequests: "Запросы цен",
      projectManager: "Менеджер проектов",
      pricingTable: "Таблица цен",
    },
    visualizer: {
      title: "Визуализатор комнаты",
      subtitle: "Загрузите фото комнаты и увидите, как будет выглядеть новая мебель",
      step1: "Загрузите фото",
      step2: "Выберите продукт",
      step3: "Результат",
      dragDrop: "Перетащите фото сюда",
      orClick: "или нажмите для выбора",
      imageUploaded: "Фото загружено",
      change: "Изменить",
      selectProduct: "Выберите продукт",
      selectStyle: "Выберите стиль",
      generate: "Сгенерировать",
      generating: "Генерация...",
      aiWorking: "AI работает...",
      pleaseWait: "Пожалуйста, подождите",
      resultPlaceholder: "Здесь появится сгенерированное изображение",
      resultReady: "Результат готов",
      download: "Скачать",
      howItWorks: "Как это работает?",
      howItWorksDesc: "AI анализирует вашу комнату и создает реалистичную визуализацию с выбранным продуктом и стилем.",
      notConnected: "AI сервис еще не подключен. Пожалуйста, подключите Fal AI.",
      products: {
        kitchen: "Кухня",
        bedroom: "Спальня",
        solidwood: "Мебель из массива",
        granite: "Гранитная мойка",
      },
      styles: {
        modern: "Современный",
        classic: "Классический",
        minimalist: "Минималистичный",
        rustic: "Рустикальный",
      },
    },
    cncAi: {
      badge: "Инновации и Технологии",
      title: "CNC + AI",
      subtitle: "Параметрический дизайн встречает искусственный интеллект. Создайте уникальную мебель с передовыми технологиями.",
      cta: "Создай свой дизайн",
      services: {
        parametric: "Параметрический дизайн",
        parametricDesc: "Алгоритмические формы и органические структуры с математической точностью.",
        aiDesign: "AI дизайн",
        aiDesignDesc: "Искусственный интеллект создает уникальные визуальные решения.",
        precision: "CNC точность",
        precisionDesc: "Компьютерная обработка с точностью 0.1мм.",
        custom: "Индивидуально",
        customDesc: "Каждый проект уникален и создан специально для вас.",
      },
      showcase: {
        coffeeTable: "Параметрический журнальный столик",
        coffeeTableDesc: "Органическая деревянная структура со стеклянной поверхностью. Каждый элемент обработан на CNC.",
        wallArt: "3D панель для стены",
        wallArtDesc: "Скульптурное настенное искусство с параметрическими волнами. AI-генерированный дизайн.",
      },
    },
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ka")

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
