export interface Node01SubNodeDetail {
  subChapterId: string;
  code: string;
  title: string;
  card1: { title: string; desc: string };
  card2: { title: string; desc: string };
  card3: { title: string; desc: string };
}

export const NODE_01_SUB_NODES_DATA: Record<string, Node01SubNodeDetail> = {
  '01.1': {
    subChapterId: '01.1',
    code: '01.1',
    title: 'მრავალ-პროფილიანი იერარქია (ოჯახები, მშობლები და შვილები)',
    card1: {
      title: '01 // ფუნქციონალური აღწერა',
      desc: 'მშობლების, შვილებისა და ოჯახის წევრების ერთიანი ანგარიშები. ბილინგისა და წვდომების ცენტრალიზებული მართვა ერთიან ციფრულ სივრცეში.'
    },
    card2: {
      title: '02 // უფლებამოსილებები და მართვა',
      desc: 'Parent Guardians: Full CRUD | Dependents: Read-Only | Family Access Control Rules & Shared Subscriptions.'
    },
    card3: {
      title: '03 // ბიზნეს ხედვა',
      desc: 'ზრდის ოჯახური აბონემენტების გაყიდვებს 35%-ით და ამცირებს ადმინისტრაციულ დანახარჯებს 40%-ით.'
    }
  },
  '01.2': {
    subChapterId: '01.2',
    code: '01.2',
    title: 'კორპორატიული ჯგუფები, სტუდენტები და მეგობრების გაერთიანებები',
    card1: {
      title: '01 // ფუნქციონალური აღწერა',
      desc: 'კომპანიების თანამშრომლების, სტუდენტებისა და ჯგუფური გაერთიანებების ავტომატური ბილინგი, ჯგუფური დაჯავშნა და კორპორატიული ფასდაკლებები.'
    },
    card2: {
      title: '02 // უფლებამოსილებები და მართვა',
      desc: 'Corporate HR Admin: Team Manage & Invoicing | Members: Personal Access | Group Discount Rules & Verification.'
    },
    card3: {
      title: '03 // ბიზნეს ხედვა',
      desc: 'B2B კონვერსიების დინამიური ზრდა, ავტომატური ინვოისინგი და კორპორატიული ლოიალობის გრძელვადიანი შენარჩუნება.'
    }
  },
  '01.3': {
    subChapterId: '01.3',
    code: '01.3',
    title: 'პროფესიონალი სპორტსმენები vs მოყვარული მოვარჯიშეები',
    card1: {
      title: '01 // ფუნქციონალური აღწერა',
      desc: 'სპორტული ლიგების, რეიტინგების, სამედიცინო დაშვებებისა და ტელემეტრიის სეგმენტაცია მოყვარულთა და პროფესიონალთა შორის.'
    },
    card2: {
      title: '02 // უფლებამოსილებები და მართვა',
      desc: 'Athletic Admin: Level Override & League Placement | Athlete: Self Metrics Read/Write | Performance Tracking Access.'
    },
    card3: {
      title: '03 // ბიზნეს ხედვა',
      desc: 'პრო-ათლეტების ლოიალობის ზრდა, პერსონალიზებული ტარიფები და ტურნირების ეფექტური ორგანიზაციული მართვა.'
    }
  },
  '01.4': {
    subChapterId: '01.4',
    code: '01.4',
    title: 'VIP წევრები, სტუმრები და საცდელი ვიზიტები',
    card1: {
      title: '01 // ფუნქციონალური აღწერა',
      desc: 'სპეციალური წვდომის ზონები, Fast-Track ტურნიკეტები, დროებითი სტუმრის საშვები და საცდელი ვიზიტების მონიტორინგი.'
    },
    card2: {
      title: '02 // უფლებამოსილებები და მართვა',
      desc: 'VIP Concierge: Guest Pass Creation | Temporary NFC Tokens | Auto Data Purge Protocol.'
    },
    card3: {
      title: '03 // ბიზნეს ხედვა',
      desc: 'მაღალი შემოსავლის კლიენტების პრემიუმ გამოცდილება და საცდელი ვიზიტორების მაღალი კონვერსია მუდმივ წევრებად.'
    }
  },
  '01.5': {
    subChapterId: '01.5',
    code: '01.5',
    title: 'სამედიცინო ვალიდურობა და იურიდიული შესაბამისობა (Compliance & Safety)',
    card1: {
      title: '01 // ფუნქციონალური აღწერა',
      desc: 'ჯანმრთელობის ცნობების, ფორმა 100-ის, პასუხისმგებლობის შეთანხმებებისა და COPPA/GDPR სტანდარტების ავტომატური კონტროლი.'
    },
    card2: {
      title: '02 // უფლებამოსილებები და მართვა',
      desc: 'Medical Staff: Encrypted Read Access | Standard Admin: No Access | AES-256 PII Encryption | 14-Day Purge.'
    },
    card3: {
      title: '03 // ბიზნეს ხედვა',
      desc: '100% იურიდიული უსაფრთხოება, სამართლებრივი რისკების სრული პრევენცია და ავტომატიზებული compliance აუდიტი.'
    }
  }
};
