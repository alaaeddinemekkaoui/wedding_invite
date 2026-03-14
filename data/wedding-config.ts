export const config = {
  couple: {
    name1: 'Ghita',
    name2: 'Walid',
    combined: 'Ghita ♡ Walid',
  },

  wedding: {
    date: '17 Avril',
    year: '2026',
    dateISO: '2026-04-17T16:30:00',
    time: '16H30',
    venue: 'Salle Dar Bassidi',
    city: 'Fes',
    fullVenue: 'Salle Dar Bassidi, Fes',
    occasion: 'Mariage',
  },

  hero: {
    subtitle: 'Vous etes chaleureusement invites a celebrer notre mariage',
    cta1: 'Voir les details',
    cta2: 'Confirmer votre presence',
  },

  coupleSection: {
    eyebrow: 'Les Maries',
    heading: 'Notre Histoire',
    intro: 'Avec joie et emotion, nous vous invitons a partager ce moment unique avec nous.',
    tagline: "Pour l'eternite",
    ghita: {
      label: 'La Mariee',
      bio: 'Lumineuse, elegante et passionnee, Ghita illumine chaque instant de sa presence rayonnante.',
    },
    walid: {
      label: 'Le Marie',
      bio: "Chaleureux, bienveillant et attentionne, Walid est l'ame qui complete chaque histoire d'amour.",
    },
  },

  details: {
    eyebrow: "L'Evenement",
    heading: 'Details du Mariage',
  },

  countdown: {
    eyebrow: 'Compte a rebours',
    heading: 'Le Grand Jour Approche',
    labels: {
      days: 'Jours',
      hours: 'Heures',
      minutes: 'Minutes',
      seconds: 'Secondes',
    },
  },

  program: {
    eyebrow: 'Le Programme',
    heading: 'Deroulement de la Soiree',
    items: [
      {
        time: '16H30',
        event: 'Debut de la Ceremonie',
        description: "L'union solennelle et emouvante de deux ames.",
      },
    ],
  },

  location: {
    eyebrow: 'Le Lieu',
    heading: 'Salle Dar Bassidi',
    venue: 'Salle Dar Bassidi',
    city: 'Fes, Maroc',
    description:
      "Un cadre somptueux au coeur de la magnifique ville de Fes, alliant le charme de l'architecture traditionnelle marocaine a une elegance moderne et raffinee.",
    mapLink: 'https://www.google.com/maps/search/Salle+Dar+Bassidi+Fes+Maroc',
    mapButtonText: 'Ouvrir dans Google Maps',
  },

  rsvp: {
    eyebrow: 'RSVP',
    heading: 'Confirmez Votre Presence',
    subtitle: 'Nous serions honores de vous accueillir en ce jour de celebration',
    fields: {
      name: 'Votre nom',
      phone: 'Votre numero de telephone',
      guests: 'Nombre de personnes qui vous accompagneront',
      message: 'Message pour les maries (optionnel)',
    },
    message:
      '🌺Prière de nous confirmer votre présence avant le 10 avril, cela nous aidera à bien organiser cette journée.🌺',
    submitLabel: 'Confirmer ma presence',
    submittingLabel: 'Envoi en cours...',
    successHeading: 'Merci !',
    successMessage: 'Votre reponse a bien ete enregistree. Nous avons hate de vous accueillir.',
  },

  footer: {
    closing: 'Votre presence rendra cette journee encore plus speciale.',
    thankYou: 'Merci de partager ce moment unique avec nous.',
    rsvpCta: 'Confirmer votre presence',
    copyright: '© 2026 Ghita ♡ Walid. Avec amour.',
  },

  navbar: {
    links: [
      { label: 'Accueil', href: '#accueil' },
      { label: 'Details', href: '#details' },
      { label: 'Programme', href: '#programme' },
      { label: 'Lieu', href: '#lieu' },
      { label: 'Confirmation', href: '#rsvp' },
    ],
  },
} as const
