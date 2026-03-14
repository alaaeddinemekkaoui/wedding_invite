/**
 * WEDDING INVITATION — CONTENT CONFIGURATION
 *
 * Edit this file to customize the invitation for any couple.
 * All text, dates, venue, links, and labels live here.
 */

export const config = {
  /* ─────────────── COUPLE ─────────────── */
  couple: {
    name1: 'Ghita',
    name2: 'Walid',
    combined: 'Ghita ♡ Walid',
  },

  /* ─────────────── WEDDING ─────────────── */
  wedding: {
    date: '17 Avril',
    year: '2026',
    dateISO: '2026-04-17T18:00:00', // Used by the countdown timer
    venue: 'Salle Dar Bassidi',
    city: 'Fès',
    fullVenue: 'Salle Dar Bassidi, Fès',
    occasion: 'Mariage',
  },

  /* ─────────────── HERO ─────────────── */
  hero: {
    subtitle: 'Vous êtes chaleureusement invités à célébrer notre mariage',
    cta1: 'Voir les détails',
    cta2: 'Confirmer votre présence',
  },

  /* ─────────────── COUPLE SECTION ─────────────── */
  coupleSection: {
    eyebrow: 'Les Mariés',
    heading: 'Notre Histoire',
    intro: 'Avec joie et émotion, nous vous invitons à partager ce moment unique avec nous.',
    tagline: 'Pour l\'éternité',
    ghita: {
      label: 'La Mariée',
      bio: 'Lumineuse, élégante et passionnée, Ghita illumine chaque instant de sa présence rayonnante.',
    },
    walid: {
      label: 'Le Marié',
      bio: 'Chaleureux, bienveillant et attentionné, Walid est l\'âme qui complète chaque histoire d\'amour.',
    },
  },

  /* ─────────────── DETAILS ─────────────── */
  details: {
    eyebrow: 'L\'Événement',
    heading: 'Détails du Mariage',
  },

  /* ─────────────── COUNTDOWN ─────────────── */
  countdown: {
    eyebrow: 'Compte à rebours',
    heading: 'Le Grand Jour Approche',
    labels: {
      days: 'Jours',
      hours: 'Heures',
      minutes: 'Minutes',
      seconds: 'Secondes',
    },
  },

  /* ─────────────── PROGRAM ─────────────── */
  program: {
    eyebrow: 'Le Programme',
    heading: 'Déroulement de la Soirée',
    items: [
      {
        time: '18:00',
        event: 'Accueil des Invités',
        description: 'Bienvenue dans notre célébration avec cocktail de bienvenue',
      },
      {
        time: '19:00',
        event: 'Début de la Cérémonie',
        description: 'L\'union solennelle et émouvante de deux âmes',
      },
      {
        time: '20:30',
        event: 'Dîner & Célébration',
        description: 'Un festin somptueux dans une ambiance feutrée',
      },
      {
        time: '22:00',
        event: 'Soirée Festive',
        description: 'Musique, danse et joie jusqu\'aux premières heures',
      },
    ],
  },

  /* ─────────────── LOCATION ─────────────── */
  location: {
    eyebrow: 'Le Lieu',
    heading: 'Salle Dar Bassidi',
    venue: 'Salle Dar Bassidi',
    city: 'Fès, Maroc',
    description:
      'Un cadre somptueux au cœur de la magnifique ville de Fès, alliant le charme de l\'architecture traditionnelle marocaine à une élégance moderne et raffinée.',
    mapLink: 'https://www.google.com/maps/search/Salle+Dar+Bassidi+Fes+Maroc',
    mapButtonText: 'Ouvrir dans Google Maps',
  },

  /* ─────────────── GALLERY ─────────────── */
  gallery: {
    eyebrow: 'Galerie',
    heading: 'Moments Précieux',
    subtitle: 'Des instants d\'éternité à partager',
    // To replace placeholder images, add the image src urls here:
    images: [
      { id: 1, alt: 'Moment romantique I', aspect: 'tall' },
      { id: 2, alt: 'Moment romantique II', aspect: 'wide' },
      { id: 3, alt: 'Moment romantique III', aspect: 'wide' },
      { id: 4, alt: 'Moment romantique IV', aspect: 'wide' },
      { id: 5, alt: 'Moment romantique V', aspect: 'tall' },
      { id: 6, alt: 'Moment romantique VI', aspect: 'wide' },
    ],
  },

  /* ─────────────── RSVP ─────────────── */
  rsvp: {
    eyebrow: 'RSVP',
    heading: 'Confirmez Votre Présence',
    subtitle: 'Nous serions honorés de vous accueillir en ce jour de célébration',
    fields: {
      name: 'Nom complet',
      phone: 'Téléphone',
      guests: 'Nombre total de personnes',
      message: 'Message (optionnel)',
    },
    submitLabel: 'Confirmer',
    submittingLabel: 'Envoi en cours…',
    successHeading: 'Merci !',
    successMessage: 'Votre réponse a bien été enregistrée. Nous avons hâte de vous accueillir.',
    // To connect to a backend: replace the handleSubmit logic in RSVPSection.jsx
    // with a fetch() call to your Formspree endpoint, EmailJS, or custom API.
  },

  /* ─────────────── MUSIQUE ─────────────── */
  music: {
    title: 'Ambiance musicale',
    description: 'Ajoutez votre morceau romantique pour accompagner l\'invitation.',
    buttonPlay: 'Lancer la musique',
    buttonPause: 'Mettre en pause',
    missingMessage: 'Ajoutez un fichier audio dans public/music/wedding-theme.mp3 pour activer la lecture.',
    // Place your track at public/music/wedding-theme.mp3
    src: '/music/wedding-theme.mp3',
    volume: 0.45,
    loop: true,
  },

  /* ─────────────── FOOTER ─────────────── */
  footer: {
    closing: 'Votre présence rendra cette journée encore plus spéciale.',
    thankYou: 'Merci de partager ce moment unique avec nous.',
    rsvpCta: 'Confirmer votre présence',
    copyright: '© 2026 Ghita ♡ Walid. Avec amour.',
  },

  /* ─────────────── NAVBAR ─────────────── */
  navbar: {
    links: [
      { label: 'Accueil', href: '#accueil' },
      { label: 'Détails', href: '#details' },
      { label: 'Lieu', href: '#lieu' },
      { label: 'Bienvenue', href: '#bienvenue' },
    ],
  },
}
