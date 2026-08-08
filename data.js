/**
 * Portfolio Data Configuration
 * Заполняется строго по данным пользователя.
 */

const PROFILE_DATA = {
  fullName: "Радкевич Дамир Борисович",
  shortName: "Радкевич Д. Б.",
  academicTitle: "Магистр политологии, младший научный сотрудник",
  affiliation: "Центр политологии Института социологии НАН Беларуси",
  degree: "Магистр политологии (БГУ)",
  location: "Минск",
  email: "rd.inskiya@gmail.com",
  phone: "+375257340078",
  
  aboutBio: "Младший научный сотрудник Центра политологии Института социологии НАН Беларуси. Выпускник магистратуры кафедры политологии юридического факультета Белорусского государственного университета (Минск). Лауреат Республиканского конкурса молодежных аналитических проектов (Беларусь).",
  
  researchFocus: [
    "Дипломатические отношения СССР и стран Корейского полуострова",
    "Демографическая и семейная политика",
    "Социальная атомизация",
    "История международных отношений, демографическая политика, политическая теория и философия"
  ],

  analyticalStack: [
    { name: "Методы", tools: "Количественные и качественные методы, ИИ-инструменты для расчётов" }
  ],

  stats: {
    conferencesCount: "10",
    memosCount: "5",
    researchProjectsCount: "1 и 1 в работе",
    yearsExperience: "2+ года"
  },

  academicLinks: {
    orcid: "",
    eLibrary: "",
    researchGate: "https://www.researchgate.net/profile/Damir-Radkevich",
    telegram: "https://t.me/radkoyanka",
    email: "mailto:rd.inskiya@gmail.com"
  }
};

/**
 * Опубликованные работы со ссылками на ResearchGate
 */
const PORTFOLIO_ITEMS = [
  {
    id: "work-01",
    type: "conference",
    typeLabel: "Conference Paper",
    title: "ОНЛАЙН-СООБЩЕСТВА КАК ФАКТОР ФОРМИРОВАНИЯ НЕАУТЕНТИЧНОЙ ИДЕНТИЧНОСТИ",
    year: "2026",
    date: "Май 2026 г.",
    badge: "Conference Paper",
    badgeType: "conference",
    tags: [],
    summary: "Цифровые технологии и искусственный интеллект в обеспечении информационно-политической безопасности государств: дискурсы, концепты и практики. Белорусская политология: многообразие в единстве. К 30-летию Всебелорусского народного собрания (Минск, Том 2).",
    details: {
      eventOrContext: "Цифровые технологии и искусственный интеллект в обеспечении информационно-политической безопасности государств: дискурсы, концепты и практики. Белорусская политология: многообразие в единстве. К 30-летию Всебелорусского народного собрания · At: Минск · Volume: 2",
      url: "https://www.researchgate.net/publication/411958878_ONLAJN-SOOBSESTVA_KAK_FAKTOR_FORMIROVANIA_NEAUTENTICNOJ_IDENTICNOSTI"
    }
  },
  {
    id: "work-02",
    type: "conference",
    typeLabel: "Conference Paper",
    title: "Трансформация идентичности в условиях социальной атомизации",
    year: "2026",
    date: "Апрель 2026 г.",
    badge: "Conference Paper",
    badgeType: "conference",
    tags: [],
    summary: "Международный молодежный научный форум «Ломоносов-2026» (Москва).",
    details: {
      eventOrContext: "Международный молодежный научный форум «Ломоносов-2026» · At: Москва",
      url: "https://www.researchgate.net/publication/411965639_Transformacia_identicnosti_v_usloviah_socialnoj_atomizacii"
    }
  },
  {
    id: "work-03",
    type: "conference",
    typeLabel: "Conference Paper",
    title: "Внешнеполитическая роль сотрудников Академии наук СССР в международных дипломатических процессах эпохи «перестройки»",
    year: "2025",
    date: "Июль 2025 г.",
    badge: "Conference Paper",
    badgeType: "conference",
    tags: [],
    summary: "Всероссийская научная конференция (с международным участием) (Ростов-на-Дону, 4 июля 2025 г., Том III).",
    details: {
      eventOrContext: "Всероссийская научная конференция (с международным участием) (Ростов-на-Дону, 4 июля 2025 г.) · At: Ростов-на-Дону · Volume: III",
      url: "https://www.researchgate.net/publication/398814486_Vnesnepoliticeskaa_rol_sotrudnikov_Akademii_nauk_SSSR_v_mezdunarodnyh_diplomaticeskih_processah_epohi_perestrojki"
    }
  },
  {
    id: "work-04",
    type: "conference",
    typeLabel: "Conference Paper",
    title: "Демографический спад как вызов Союзному государству: международный опыт и научные теории противодействия",
    year: "2024",
    date: "Ноябрь 2024 г.",
    badge: "Conference Paper",
    badgeType: "conference",
    tags: [],
    summary: "Безопасность Союзного государства: вызовы и угрозы : материалы международной научно-практической конференции (Минск, 22 ноября 2024 г.).",
    details: {
      eventOrContext: "Безопасность Союзного государства: вызовы и угрозы : материалы международной научно-практической конференции (Минск, 22 ноября 2024) · At: Минск",
      url: "https://www.researchgate.net/publication/397195334_Demograficeskij_spad_kak_vyzov_Souznomu_gosudarstvu_mezdunarodnyj_opyt_i_naucnye_teorii_protivodejstvia"
    }
  },
  {
    id: "work-05",
    type: "research",
    typeLabel: "Article",
    title: "«Перестройка» на Юг: из истории установления дипломатических отношений СССР и Республики Корея",
    year: "2024",
    date: "Ноябрь 2024 г.",
    badge: "Article",
    badgeType: "grant",
    tags: [],
    summary: "Научная статья, посвященная истории установления дипломатических отношений между СССР и Республикой Корея.",
    details: {
      eventOrContext: "Научная статья (Article)",
      url: "https://www.researchgate.net/publication/387363675_Perestrojka_na_Ug_iz_istorii_ustanovlenia_diplomaticeskih_otnosenij_SSSR_i_Respubliki_Korea"
    }
  }
];
