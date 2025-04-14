// import "server-only"

interface Dictionary {
  hero: {
    subtitle: string
  }
  projects: {
    title: string
  }
  about: {
    title: string
    content: string
  }
  contact: {
    title: string
    message: string
    email: string
    buttonText: string
  }
}

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  sl: () => import("./dictionaries/sl.json").then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  // Default to Slovenian if the locale isn't found
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.sl()
}
