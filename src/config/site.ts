/** Site identity, navigation and contact details. Page copy lives in src/content. */
export const siteConfig = {
  url: "https://arsen.dev",
  brand: "arsen.dev",
  locale: "en_US",
  description:
    "Frontend Engineer building React and TypeScript consoles for payment and ticketing platforms.",
  person: {
    firstName: "Arsen",
    lastName: "Melqonyan",
    role: "Frontend Engineer",
    city: "Yerevan",
    country: "Armenia",
    employer: "PandaTech",
  },
  contact: {
    email: "arsen.front@gmail.com",
    phone: "+374 44 18 11 61",
    github: "https://github.com/arsen-react",
    linkedin: "https://www.linkedin.com/in/arsen-melkonyan",
  },
} as const;

export const fullName = `${siteConfig.person.firstName} ${siteConfig.person.lastName}`;
export const location = `${siteConfig.person.city}, ${siteConfig.person.country}`;
