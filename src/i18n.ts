import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Serbian Translations
const resources = {
  sr: {
    translation: {
      nav: {
        about: "O Ani",
        academy: "Akademija",
        services: "Usluge",
        shop: "Shop",
        blog: "Blog",
        book: "Zakaži Termin"
      },
      hero: {
        subtitle: "Zvanični Websajt",
        title: "Tvoj put do",
        beauty: "Glavne uloge",
        description: "Nova definicija modernog glamura kroz stručnu edukaciju i vrhunsku umetnost u Novom Pazaru.",
        cta_primary: "Zakaži Termin",
        cta_secondary: "Akademija"
      },
      social: {
        featured: "Medijsko Prisustvo",
        followers: "Pratilaca",
        students: "Studenata",
        years: "Godina Iskustva"
      },
      about: {
        title: "Umetnik",
        profession: "Makeup & Hijab Artist",
        headline: "Od Novog Pazara",
        subheadline: "Do Sveta.",
        p1: "Ana Muratović – nežna ruka iza snažne lepote. Makeup & Hijab artist koja još od trinaeste godine kroz šminku, kosu i hijab ističe prirodnu ženstvenost. Kreatorka lepote, mentorka budućih umetnica i osnivač škole šminkanja sa individualnim pristupom svakoj učenici. Suptilno, elegantno i sa dušom.",
        p2: "Njen pristup nije samo nanošenje šminke, već razumevanje geometrije lica — filozofija koju prenosi svakom studentu na svojoj akademiji.",
        quote: "Tvoj put do glavne uloge"
      },
      academy: {
        title: "Akademija",
        subtitle: "Sertifikovana Izvrsnost",
        enroll: "Prijavi Se",
        certificate_title: "Vaš Pečat Majstorstva",
        certificate_desc: "Naš sertifikat je više od papira; to je svedočanstvo o rigoroznoj obuci i postignutom savršenstvu. Priznat od strane vrhunskih salona širom regiona.",
        view_student_works: "Pogledajte Radove Studenata",
        gallery_title: "Radovi Naših Studenata",
        gallery_desc: "Ponosni smo na svaki potez četkicom naših polaznika. Ovo su rezultati posvećenosti, učenja i strasti prema umetnosti šminkanja.",
        close_gallery: "Zatvori Galeriju",
        courses: {
          whatsapp_message: "Zdravo Ana, zainteresovana sam za kurs: {{courseName}}",
          self_makeup: {
            title: "Našminkaj se sama",
            duration: "Individualno",
            description: "Kurs je namenjen svima koji žele da nauče kako da se pravilno i profesionalno šminkaju za svakodnevne i posebne prilike. Polaznice savladavaju osnovne tehnike, od pripreme kože do završnog izgleda, uz fokus na isticanje prirodne lepote i pravilnu upotrebu proizvoda."
          },
          basic: {
            title: "Osnovni kurs",
            duration: "5 dana / 5 tehnika",
            description: "Osnovni kurs pruža temeljno znanje iz profesionalnog šminkanja kroz pet pažljivo odabranih tehnika. Namenjen je početnicima koji žele da steknu sigurnost u radu, razumevanje proizvoda i pravilnu primenu šminke na različitim tipovima lica."
          },
          pro: {
            title: "Profesionalni kurs",
            duration: "10 dana / 10 tehnika",
            description: "Profesionalni kurs je sveobuhvatan program namenjen onima koji žele da se ozbiljno bave šminkanjem. Tokom deset dana polaznici usvajaju deset različitih tehnika, od klasičnih do naprednih stilova, uz akcenat na rad sa klijentima, preciznost i profesionalni pristup."
          }
        }
      },
      services: {
        title: "Usluge Salona",
        menu: "Meni",
        price_list: "Vidi Cenovnik",
        makeup_classic: "Klasični Make up",
        makeup_special: "Make up za posebne prilike",
        hijab_styling: "Stilizovanje hidžaba",
        hair_classic: "Klasične frizure",
        hair_special: "Svečane frizure",
        hair_waves: "Talasi",
        custom: "Po dogovoru",
        gallery_label: "Galerija",
        book_btn: "Zakaži"
      },
      shop: {
        title: "Moji omiljeni proizvodi",
        link: "Cela Kolekcija",
        visit: "Poseti Shop",
        subtitle: "Kryolan Selection",
        inquire_btn: "Pošalji Upit",
        on_request: "Na upit",
        view_all: "Svi Proizvodi",
        gallery_title: "Kompletna Kolekcija",
        gallery_desc: "Istražite kompletnu kolekciju proizvoda koji su neizostavni deo mog profesionalnog rada. Svi proizvodi su dostupni na upit.",
        close: "Zatvori"
      },
      blog: {
        title: "Dnevnik",
        subtitle: "Trendovi, saveti i priče iz bekstejdža",
        read_more: "Pročitaj Više",
        latest: "Najnovije",
        posts: {
          1: {
            title: "5 Trendova koji Dominiraju 2024",
            category: "Trendovi",
            content: "Ove godine fokus je na prirodnom sjaju i 'clean girl' estetici. Manje je više, ali tehnika je presudna..."
          },
          2: {
            title: "Tajne iz Bekstejdža: Nedelja Mode",
            category: "Iza Scene",
            content: "Brzina, preciznost i pritisak. Kako izgleda pripremiti 20 modela za manje od sat vremena..."
          },
          3: {
            title: "Priprema Kože je Ključna",
            category: "Saveti",
            content: "Bez dobre pripreme nema dobre šminke. Otkrivamo korake koje nikada ne smete preskočiti pre pudera..."
          },
          4: {
            title: "Mladačka Šminka: Šta Raditi a Šta Ne",
            category: "Venčanje",
            content: "Vaš poseban dan zahteva šminku koja traje. Izbegavajte ove česte greške kako biste izgledali savršeno na fotografijama..."
          }
        }
      },
      instagram: {
        follow_link: "Zapratite na Instagramu",
        title: "Više od slika – ovo je naš zajednički dnevnik",
        p1: "Instagram je moj prozor u svet lepote, ali i mesto gde smo najbliži. Tu nije reč samo o šminkanju i frizurama – tu s vama delim pravi \"backstage\" svog života: od malih tajni velikih majstora i saveta za negu, do onih iskrenih, nefiltriranih trenutaka iza kamere.",
        p2: "Zapratite me da ne propustite inspiraciju, najave edukacija i druženje. Budite deo moje online porodice gde svakog dana zajedno slavimo lepotu u svim njenim oblicima.",
        follow_btn: "Zapratite me",
        likes: "sviđanja",
        view_comments: "Pogledaj komentare",
        comments: {
          c1: "Najbolja edukacija ikad! Hvala ti Ana na svemu ❤️",
          c3: "Jedva čekam sledeći termin! 🙌"
        }
      },
      contact: {
        title: "Kontakt",
        subtitle: "Pišite Nam",
        form: {
          subject: "Pitam O",
          subjects: {
            general: "Opšte",
            booking: "Zakazivanje",
            academy: "Akademija",
            shop: "Prodavnica",
            collaboration: "Saradnja"
          },
          first_name: "Ime",
          first_name_ph: "Vaše ime",
          last_name: "Prezime",
          last_name_ph: "Vaše prezime",
          email: "Mail",
          message: "Poruka",
          message_ph: "Vaša poruka...",
          send: "Pošalji",
          whatsapp: "Pitaj na WhatsApp",
          alert_fill_name: "Molimo unesite vaše ime prvo.",
          success_msg: "Hvala {{name}}! Vaša poruka u vezi \"{{subject}}\" je poslata."
        },
        map: {
          open: "Otvori Mapu"
        }
      },
      legal: {
        privacy: {
          title: "Politika Privatnosti",
          updated: "Poslednji put ažurirano: 26. Januar 2026.",
          section1: {
            title: "1. Prikupljanje podataka",
            content: "Ana Make Up Backstage poštuje vašu privatnost. Na ovom sajtu ne prikupljamo direktno vaše lične podatke putem formi, osim u slučaju kada se odlučite da nas kontaktirate putem WhatsApp-a ili Email-a."
          },
          section2: {
            title: "2. WhatsApp komunikacija",
            content: "Kada kliknete na dugme za zakazivanje, bićete preusmereni na WhatsApp platformu. Vaši podaci (broj telefona i sadržaj poruke) tada podležu politici privatnosti kompanije WhatsApp (Meta)."
          },
          section3: {
            title: "3. Kolačići (Cookies)",
            content: "Koristimo osnovne kolačiće neophodne za funkcionisanje sajta i vašeg iskustva pri navigaciji."
          }
        },
        impresum: {
          title: "Impresum",
          owner_title: "Vlasnik sajta",
          contact_title: "Kontakt",
          design_title: "Dizajn i Razvoj",
          liability_title: "Odgovornost za sadržaj",
          liability_content: "Svi tekstovi i fotografije na ovom sajtu su vlasništvo brenda Ana Make Up Backstage i ne smeju se koristiti bez prethodne dozvole."
        }
      },
      footer: {
        tagline: "Tvoj put do glavne uloge",
        email_placeholder: "EMAIL ADRESA",
        privacy: "Privatnost",
        impresum: "Impresum",
        desc: "Postavljanje standarda za profesionalnu šminku i edukaciju na Balkanu.",
        menu: "Meni",
        contact: "Kontakt",
        newsletter: "Novosti",
        newsletter_desc: "Prijavite se za savete i ekskluzivne ponude.",
        address: "Adresa",
        rights: "Sva prava zadržana.",
        get_directions: "Prikaži na mapi"
      }
    }
  },
  en: {
    translation: {
      nav: {
        about: "About",
        academy: "Academy",
        services: "Services",
        shop: "Shop",
        blog: "Blog",
        book: "Book Now"
      },
      hero: {
        subtitle: "Official Website",
        title: "Your journey to",
        beauty: "The Leading Role",
        description: "Redefining modern glamour through expert education and high-end artistry in Novi Pazar.",
        cta_primary: "Book Session",
        cta_secondary: "The Academy"
      },
      social: {
        featured: "Media Presence",
        followers: "Followers",
        students: "Students",
        years: "Years Experience"
      },
      about: {
        title: "The Artist",
        profession: "Makeup & Hijab Artist",
        headline: "From Novi Pazar",
        subheadline: "To the World.",
        p1: "Ana Muratović – a gentle hand behind strong beauty. A Makeup & Hijab artist who, since the age of thirteen, has been highlighting natural femininity through makeup, hair, and hijab. A creator of beauty, mentor to future artists, and founder of a makeup school with an individual approach to every student. Subtle, elegant, and with soul.",
        p2: "Her approach is not just about application, but about understanding the geometry of the face—a philosophy she imparts to every student at her academy.",
        quote: "Your journey to the leading role"
      },
      academy: {
        title: "The Academy",
        subtitle: "Certified Excellence",
        enroll: "Enroll Now",
        certificate_title: "Your Mark of Mastery",
        certificate_desc: "Our certificate is more than paper; it is a testament to rigorous training and achieved perfection. Recognized by top salons across the region.",
        view_student_works: "View Student Works",
        gallery_title: "Our Students' Work",
        gallery_desc: "We are proud of every brushstroke of our students. These are the results of dedication, learning, and passion for the art of makeup.",
        close_gallery: "Close Gallery",
        courses: {
          whatsapp_message: "Hello Ana, I am interested in the course: {{courseName}}",
          self_makeup: {
            title: "Self-Makeup Course",
            duration: "Individual",
            description: "This course is intended for everyone who wants to learn how to apply makeup correctly and professionally for everyday and special occasions. Participants master basic techniques, from skin preparation to the final look."
          },
          basic: {
            title: "Basic Course",
            duration: "5 days / 5 techniques",
            description: "The basic course provides fundamental knowledge of professional makeup through five carefully selected techniques. It is intended for beginners who want to gain confidence in their work."
          },
          pro: {
            title: "Professional Course",
            duration: "10 days / 10 techniques",
            description: "The professional course is a comprehensive program for those who want to seriously pursue makeup. During ten days, participants adopt ten different techniques, from classic to advanced styles."
          }
        }
      },
      services: {
        title: "Salon Services",
        menu: "Menu",
        price_list: "View Price List",
        makeup_classic: "Classic Make up",
        makeup_special: "Special Occasion Make up",
        hijab_styling: "Hijab Styling",
        hair_classic: "Classic Hairstyles",
        hair_special: "Occasion Hairstyles",
        hair_waves: "Waves",
        custom: "Custom",
        gallery_label: "Gallery",
        book_btn: "Book"
      },
      shop: {
        title: "My Favorite Products",
        link: "Full Collection",
        visit: "Visit Shop",
        subtitle: "Kryolan Selection",
        inquire_btn: "Inquire",
        on_request: "On request",
        view_all: "All Products",
        gallery_title: "Complete Collection",
        gallery_desc: "Explore the complete collection of products that are an essential part of my professional work. All products are available on request.",
        close: "Close"
      },
      blog: {
        title: "The Journal",
        subtitle: "Trends, Tips & Backstage Stories",
        read_more: "Read More",
        latest: "Latest",
        posts: {
          1: {
            title: "5 Trends Dominating 2024",
            category: "Trends",
            content: "This year the focus is on natural glow and 'clean girl' aesthetic. Less is more, but technique is crucial..."
          },
          2: {
            title: "Backstage Secrets: Fashion Week",
            category: "Behind the Scenes",
            content: "Speed, precision, and pressure. What it's like to prep 20 models in under an hour..."
          },
          3: {
            title: "Skincare Prep is Key",
            category: "Tips",
            content: "No good makeup without good prep. We reveal the steps you must never skip before foundation..."
          },
          4: {
            title: "Bridal Makeup Dos and Don'ts",
            category: "Wedding",
            content: "Your special day requires long-lasting makeup. Avoid these common mistakes to look perfect in photos..."
          }
        }
      },
      instagram: {
        follow_link: "Follow on Instagram",
        title: "More than pictures – this is our shared diary",
        p1: "Instagram is my window into the world of beauty, but also the place where we are closest. It's not just about makeup and hairstyles – here I share with you the real \"backstage\" of my life: from little secrets of great masters and care tips, to those honest, unfiltered moments behind the camera.",
        p2: "Follow me so you don't miss inspiration, education announcements, and socializing. Be part of my online family where we celebrate beauty in all its forms every day.",
        follow_btn: "Follow Me",
        likes: "likes",
        view_comments: "View comments",
        comments: {
          c1: "Best education ever! Thank you Ana for everything ❤️",
          c3: "Can't wait for the next appointment! 🙌"
        }
      },
      contact: {
        title: "Contact",
        subtitle: "Get in Touch",
        form: {
          subject: "Asking About",
          subjects: {
            general: "General",
            booking: "Booking",
            academy: "Academy",
            shop: "Shop",
            collaboration: "Collaboration"
          },
          first_name: "First Name",
          first_name_ph: "Your name",
          last_name: "Last Name",
          last_name_ph: "Your surname",
          email: "Email Address",
          message: "Message",
          message_ph: "Your message...",
          send: "Send Message",
          whatsapp: "Ask on WhatsApp",
          alert_fill_name: "Please fill in your name first.",
          success_msg: "Thank you {{name}}! Your message regarding \"{{subject}}\" has been sent."
        },
        map: {
          open: "Get Directions"
        }
      },
      legal: {
        privacy: {
          title: "Privacy Policy",
          updated: "Last updated: January 26, 2026.",
          section1: {
            title: "1. Data Collection",
            content: "Ana Make Up Backstage respects your privacy. We do not directly collect your personal data through forms on this site, unless you choose to contact us via WhatsApp or Email."
          },
          section2: {
            title: "2. WhatsApp Communication",
            content: "When you click the booking button, you will be redirected to the WhatsApp platform. Your data (phone number and message content) are then subject to WhatsApp's (Meta) privacy policy."
          },
          section3: {
            title: "3. Cookies",
            content: "We use basic cookies necessary for the functioning of the site and your navigation experience."
          }
        },
        impresum: {
          title: "Imprint",
          owner_title: "Site Owner",
          contact_title: "Contact",
          design_title: "Design and Development",
          liability_title: "Content Liability",
          liability_content: "All texts and photos on this site are property of the Ana Make Up Backstage brand and may not be used without prior permission."
        }
      },
      footer: {
        tagline: "Your path to the leading role",
        email_placeholder: "EMAIL ADDRESS",
        privacy: "Privacy",
        impresum: "Imprint",
        desc: "Setting the standard for professional makeup artistry and education in the Balkans.",
        menu: "Menu",
        contact: "Contact",
        newsletter: "Newsletter",
        newsletter_desc: "Join the Backstage List for tips and exclusive offers.",
        address: "Address",
        rights: "All rights reserved.",
        get_directions: "Get Directions"
      }
    }
  },
  de: {
    translation: {
      nav: {
        about: "Über Uns",
        academy: "Akademie",
        services: "Dienstleistungen",
        shop: "Shop",
        blog: "Blog",
        book: "Jetzt Buchen"
      },
      hero: {
        subtitle: "Offizielle Website",
        title: "Dein Weg zur",
        beauty: "Hauptrolle",
        description: "Neudefinition des modernen Glamours durch fachkundige Ausbildung und High-End-Kunstfertigkeit in Novi Pazar.",
        cta_primary: "Sitzung Buchen",
        cta_secondary: "Die Akademie"
      },
      social: {
        featured: "Media Presence",
        followers: "Follower",
        students: "Studenten",
        years: "Jahre Erfahrung"
      },
      about: {
        title: "Die Künstlerin",
        profession: "Makeup & Hidschab Künstlerin",
        headline: "Von Novi Pazar",
        subheadline: "In die Welt.",
        p1: "Ana Muratović – eine sanfte Hand hinter starker Schönheit. Eine Make-up- & Hidschab-Künstlerin, die seit ihrem dreizehnten Lebensjahr durch Make-up, Haare und Hidschab die natürliche Weiblichkeit hervorhebt. Eine Schöpferin der Schönheit, Mentorin zukünftiger Künstlerinnen und Gründerin einer Make-up-Schule mit individuellem Ansatz für jede Schülerin. Subtil, elegant und mit Seele.",
        p2: "Ihr Ansatz besteht nicht nur im Auftragen, sondern im Verständnis der Geometrie des Gesichts – eine Philosophie, die sie jedem Studenten an ihrer Akademie vermittelt.",
        quote: "Dein Weg zur Hauptrolle"
      },
      academy: {
        title: "Die Akademie",
        subtitle: "Zertifizierte Exzellenz",
        enroll: "Jetzt Einschreiben",
        certificate_title: "Ihr Zeichen der Meisterschaft",
        certificate_desc: "Unser Zertifikat ist mehr als nur Papier; es ist ein Zeugnis strenger Ausbildung und erreichter Perfektion. Anerkannt von Top-Salons in der gesamten Region.",
        view_student_works: "Studentenarbeiten ansehen",
        gallery_title: "Arbeiten unserer Studenten",
        gallery_desc: "Wir sind stolz auf jeden Pinselstrich unserer Studenten. Dies sind die Ergebnisse von Hingabe, Lernen und Leidenschaft für die Kunst des Make-ups.",
        close_gallery: "Galerie schließen",
        courses: {
          whatsapp_message: "Hallo Ana, ich interessiere mich für den Kurs: {{courseName}}",
          self_makeup: {
            title: "Selbst-Make-up Kurs",
            duration: "Individuell",
            description: "Dieser Kurs richtet sich an alle, die lernen möchten, wie man Make-up für den Alltag und besondere Anlässe richtig und professionell aufträgt. Die Teilnehmerinnen erlernen grundlegende Techniken."
          },
          basic: {
            title: "Basiskurs",
            duration: "5 Tage / 5 Techniken",
            description: "Der Basiskurs vermittelt fundierte Kenntnisse im professionellen Make-up durch fünf sorgfältig ausgewählte Techniken. Er richtet sich an Anfänger, die Sicherheit in ihrer Arbeit gewinnen möchten."
          },
          pro: {
            title: "Profi-Kurs",
            duration: "10 Tage / 10 Techniken",
            description: "Der Profi-Kurs ist ein umfassendes Programm für diejenigen, die Make-up ernsthaft betreiben möchten. In zehn Tagen erlernen die Teilnehmer zehn verschiedene Techniken."
          }
        }
      },
      services: {
        title: "Salon Services",
        menu: "Menu",
        price_list: "Preisliste ansehen",
        makeup_classic: "Klassisches Make-up",
        makeup_special: "Make-up für besondere Anlässe",
        hijab_styling: "Hidschab-Styling",
        hair_classic: "Klassische Frisuren",
        hair_special: "Abendfrisuren",
        hair_waves: "Wellen",
        custom: "Nach Vereinbarung",
        gallery_label: "Galerie",
        book_btn: "Buchen"
      },
      shop: {
        title: "Meine Lieblingsprodukte",
        link: "Kollektion",
        visit: "Shop Besuchen",
        subtitle: "Kryolan Auswahl",
        inquire_btn: "Anfragen",
        on_request: "Auf Anfrage",
        view_all: "Alle Produkte",
        gallery_title: "Komplette Kollektion",
        gallery_desc: "Entdecken Sie die komplette Kollektion von Produkten, die ein wesentlicher Bestandteil meiner professionellen Arbeit sind. Alle Produkte sind auf Anfrage erhältlich.",
        close: "Schließen"
      },
      blog: {
        title: "Das Journal",
        subtitle: "Trends, Tipps & Backstage-Geschichten",
        read_more: "Mehr Lesen",
        latest: "Neueste",
        posts: {
          1: {
            title: "5 Trends, die 2024 dominieren",
            category: "Trends",
            content: "Dieses Jahr liegt der Fokus auf natürlichem Glanz und der 'Clean Girl'-Ästhetik. Weniger ist mehr, aber Technik ist entscheidend..."
          },
          2: {
            title: "Backstage-Geheimnisse: Fashion Week",
            category: "Hinter den Kulissen",
            content: "Geschwindigkeit, Präzision und Druck. Wie es ist, 20 Models in weniger als einer Stunde vorzubereiten..."
          },
          3: {
            title: "Hautvorbereitung ist der Schlüssel",
            category: "Tipps",
            content: "Kein gutes Make-up ohne gute Vorbereitung. Wir enthüllen die Schritte, die Sie vor der Grundierung niemals überspringen dürfen..."
          },
          4: {
            title: "Braut Make-up Dos and Don'ts",
            category: "Hochzeit",
            content: "Ihr besonderer Tag erfordert langanhaltendes Make-up. Vermeiden Sie diese häufigen Fehler, um auf Fotos perfekt auszusehen..."
          }
        }
      },
      instagram: {
        follow_link: "Auf Instagram folgen",
        title: "Mehr als Bilder – das ist unser gemeinsames Tagebuch",
        p1: "Instagram ist mein Fenster in die Welt der Schönheit, aber auch der Ort, an dem wir uns am nächsten sind. Es geht nicht nur um Make-up und Frisuren – hier teile ich mit Ihnen das echte \"Backstage\" meines Lebens: von kleinen Geheimnissen großer Meister und Pflegetipps bis hin zu jenen ehrlichen, ungefilterten Momenten hinter der Kamera.",
        p2: "Folgen Sie mir, um Inspiration, Bildungsankündigungen und Geselligkeit nicht zu verpassen. Werden Sie Teil meiner Online-Familie, in der wir jeden Tag gemeinsam Schönheit in all ihren Formen feiern.",
        follow_btn: "Folge mir",
        likes: "Gefällt mir",
        view_comments: "Kommentare ansehen",
        comments: {
          c1: "Beste Ausbildung aller Zeiten! Danke Ana für alles ❤️",
          c3: "Ich kann den nächsten Termin kaum erwarten! 🙌"
        }
      },
      contact: {
        title: "Kontakt",
        subtitle: "Schreiben Sie uns",
        form: {
          subject: "Anfrage zu",
          subjects: {
            general: "Allgemein",
            booking: "Buchung",
            academy: "Akademie",
            shop: "Shop",
            collaboration: "Zusammenarbeit"
          },
          first_name: "Vorname",
          first_name_ph: "Ihr Name",
          last_name: "Nachname",
          last_name_ph: "Ihr Nachname",
          email: "E-Mail-Adresse",
          message: "Nachricht",
          message_ph: "Ihre Nachricht...",
          send: "Nachricht Senden",
          whatsapp: "Auf WhatsApp fragen",
          alert_fill_name: "Bitte füllen Sie zuerst Ihren Namen aus.",
          success_msg: "Danke {{name}}! Ihre Nachricht bezüglich \"{{subject}}\" wurde gesendet."
        },
        map: {
          open: "Wegbeschreibung"
        }
      },
      legal: {
        privacy: {
          title: "Datenschutzerklärung",
          updated: "Zuletzt aktualisiert: 26. Januar 2026.",
          section1: {
            title: "1. Datenerfassung",
            content: "Ana Make Up Backstage respektiert Ihre Privatsphäre. Wir erfassen Ihre persönlichen Daten auf dieser Website nicht direkt über Formulare, es sei denn, Sie entscheiden sich, uns per WhatsApp oder E-Mail zu kontaktieren."
          },
          section2: {
            title: "2. WhatsApp-Kommunikation",
            content: "Wenn Sie auf die Buchungsschaltfläche klicken, werden Sie zur WhatsApp-Plattform weitergeleitet. Ihre Daten (Telefonnummer und Nachrichteninhalt) unterliegen dann der Datenschutzrichtlinie von WhatsApp (Meta)."
          },
          section3: {
            title: "3. Cookies",
            content: "Wir verwenden grundlegende Cookies, die für das Funktionieren der Website und Ihr Navigationserlebnis erforderlich sind."
          }
        },
        impresum: {
          title: "Impressum",
          owner_title: "Seiteninhaber",
          contact_title: "Kontakt",
          design_title: "Design und Entwicklung",
          liability_title: "Haftung für Inhalte",
          liability_content: "Alle Texte und Fotos auf dieser Website sind Eigentum der Marke Ana Make Up Backstage und dürfen ohne vorherige Genehmigung nicht verwendet werden."
        }
      },
      footer: {
        tagline: "Dein Weg zur Hauptrolle",
        email_placeholder: "E-MAIL-ADRESSE",
        privacy: "Datenschutz",
        impresum: "Impressum",
        desc: "Setzt den Standard für professionelle Make-up-Kunst und Ausbildung auf dem Balkan.",
        menu: "Menü",
        contact: "Kontakt",
        newsletter: "Newsletter",
        newsletter_desc: "Treten Sie der Backstage-Liste bei für Tipps und exklusive Angebote.",
        address: "Adresse",
        rights: "Alle Rechte vorbehalten.",
        get_directions: "Wegbeschreibung"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "sr", // Serbian default
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
