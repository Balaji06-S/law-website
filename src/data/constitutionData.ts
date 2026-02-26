export interface ConstitutionArticle {
  id: string;
  number: string;
  title: string;
  content: string;
  simplified: string;
  teacher_analogy?: string;
  category: 'Fundamental Rights' | 'Fundamental Duties' | 'Directive Principles' | 'Criminal Law' | 'General';
  keywords: string[];
  translations?: {
    HI: {
      title: string;
      content: string;
      simplified: string;
      teacher_analogy?: string;
    },
    TE: {
      title: string;
      content: string;
      simplified: string;
      teacher_analogy?: string;
    }
  }
}

export const constitutionData: ConstitutionArticle[] = [
  {
    id: '1',
    number: '14',
    title: 'Equality before Law',
    content: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    simplified: 'Everyone is equal in the eyes of the law. The government cannot treat people differently based on their status or background.',
    teacher_analogy: 'Think of a game of football: the rules are exactly the same for every player, regardless of whether they are the captain or a new player.',
    category: 'Fundamental Rights',
    keywords: ['equality', 'law', 'equal', 'justice', 'fairness'],
    translations: {
      HI: {
        title: 'कानून के समक्ष समानता',
        content: 'राज्य भारत के क्षेत्र में किसी भी व्यक्ति को कानून के समक्ष समानता या कानूनों के समान संरक्षण से वंचित नहीं करेगा।',
        simplified: 'कानून की नजर में हर कोई समान है। सरकार लोगों के साथ उनकी स्थिति या पृष्ठभूमि के आधार पर अलग व्यवहार नहीं कर सकती।',
        teacher_analogy: 'फुटबॉल के खेल के बारे में सोचें: नियम हर खिलाड़ी के लिए बिल्कुल समान होते हैं, चाहे वह कप्तान हो या नया खिलाड़ी।'
      },
      TE: {
        title: 'చట్టం ముందు సమానత్వం',
        content: 'భారత భూభాగంలో ఏ వ్యక్తికైనా చట్టం ముందు సమానత్వాన్ని లేదా చట్టాల సమాన రక్షణను ప్రభుత్వం నిరాకరించకూడదు.',
        simplified: 'చట్టం దృష్టిలో ప్రతి ఒక్కరూ సమానమే. ప్రజల హోదా లేదా నేపథ్యం ఆధారంగా ప్రభుత్వం వారిని భిన్నంగా చూడకూడదు.',
        teacher_analogy: 'ఫుట్‌బాల్ ఆట గురించి ఆలోచించండి: నిబంధనలు ప్రతి క్రీడాకారుడికి సరిగ్గా ఒకేలా ఉంటాయి, వారు కెప్టెన్ అయినా లేదా కొత్త ఆటగాడైనా.'
      }
    }
  },
  {
    id: '2',
    number: '19',
    title: 'Protection of certain rights regarding freedom of speech etc.',
    content: 'All citizens shall have the right (a) to freedom of speech and expression; (b) to assemble peaceably and without arms; (c) to form associations or unions; (d) to move freely throughout the territory of India; (e) to reside and settle in any part of the territory of India...',
    simplified: 'You have the right to speak freely, gather peacefully with others, form groups, and travel or live anywhere in the country.',
    teacher_analogy: 'It\'s like having a microphone to share your ideas, a map to go wherever you want in your home, and a club where you can invite your friends.',
    category: 'Fundamental Rights',
    keywords: ['freedom', 'speech', 'expression', 'assembly', 'travel', 'groups']
  },
  {
    id: '3',
    number: '21',
    title: 'Protection of Life and Personal Liberty',
    content: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
    simplified: 'You have the right to live and be free. The government cannot take away your life or your freedom unless it follows a strict legal process.',
    teacher_analogy: 'Imagine a protective shield around you that no one can break without a very important, legal reason proven in court.',
    category: 'Fundamental Rights',
    keywords: ['life', 'liberty', 'freedom', 'arrest', 'safety']
  },
  {
    id: '11',
    number: '25',
    title: 'Freedom of Religion',
    content: 'All persons are equally entitled to freedom of conscience and the right freely to profess, practise and propagate religion.',
    simplified: 'You have the right to choose any religion, follow its rituals, and talk about your faith to others freely.',
    teacher_analogy: 'It\'s like having your own favorite book; you can read it, talk about it, and follow its advice, and no one can force you to read a different one.',
    category: 'Fundamental Rights',
    keywords: ['religion', 'faith', 'god', 'worship', 'freedom', 'temple', 'church', 'mosque']
  },
  {
    id: '12',
    number: '302',
    title: 'Section 302 - Punishment for Murder',
    content: 'Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.',
    simplified: 'This section is for the most serious crime: taking someone\'s life. The punishment is very strict, like life in prison.',
    teacher_analogy: 'In a school, if a student intentionally breaks a very important rule that hurts someone forever, the school removes them permanently to keep others safe.',
    category: 'Criminal Law',
    keywords: ['murder', 'killing', 'death', 'punishment', 'crime', 'jail', 'someone killed', 'death threat']
  },
  {
    id: '13',
    number: '307',
    title: 'Section 307 - Attempt to Murder',
    content: 'Whoever does any act with such intention or knowledge... that if he by that act caused death, he would be guilty of murder.',
    simplified: 'If someone tries to kill another person but fails, they are still punished under this section because their intention was to cause death.',
    teacher_analogy: 'It\'s like trying to break a window with a rock but missing. You are still in trouble for trying to break it, even if the glass didn\'t shatter.',
    category: 'Criminal Law',
    keywords: ['attempt to murder', 'attack', 'violence', 'crime', 'killing', 'weapon', 'tried to kill']
  },
  {
    id: '14',
    number: '323',
    title: 'Section 323 - Voluntarily causing hurt',
    content: 'Whoever... voluntarily causes hurt, shall be punished with imprisonment... for a term which may extend to one year, or with fine.',
    simplified: 'If someone hits or hurts another person intentionally (like in a small fight), they are punished under this section.',
    teacher_analogy: 'It\'s like a "No Hitting" rule in class. If you push or slap someone, you get a timeout or a penalty.',
    category: 'Criminal Law',
    keywords: ['hurt', 'slap', 'fight', 'violence', 'beating', 'hit me', 'punched', 'kicked', 'someone hit me']
  },
  {
    id: '15',
    number: '376',
    title: 'Section 376 - Punishment for Rape',
    content: 'Punishment for the crime of sexual assault and violation of a person\'s body without consent.',
    simplified: 'This is a very serious law that protects people from being touched or forced into sexual acts without their permission.',
    teacher_analogy: 'Think of "Personal Space." No one has the right to touch your body or force you to do something physical if you say "No."',
    category: 'Criminal Law',
    keywords: ['rape', 'sexual assault', 'abuse', 'women safety', 'crime', 'consent', 'forced']
  },
  {
    id: '16',
    number: '354',
    title: 'Section 354 - Outraging Modesty of Woman',
    content: 'Assault or criminal force to woman with intent to outrage her modesty.',
    simplified: 'This law protects women from being harassed, touched inappropriately, or made to feel uncomfortable by someone\'s actions.',
    teacher_analogy: 'It\'s like a rule against "Bullying" specifically to protect the dignity and safety of girls in a playground.',
    category: 'Criminal Law',
    keywords: ['harassment', 'molestation', 'women safety', 'safety', 'touching', 'misbehavior']
  },
  {
    id: '17',
    number: '379',
    title: 'Section 379 - Punishment for Theft',
    content: 'Whoever commits theft shall be punished with imprisonment... for a term which may extend to three years, or with fine.',
    simplified: 'If someone takes your property (like a phone, bike, or money) without your permission, it is theft.',
    teacher_analogy: 'It\'s the basic rule of: "Don\'t take things that don\'t belong to you." If you take a classmate\'s pencil without asking, that\'s a mini-version of this.',
    category: 'Criminal Law',
    keywords: ['theft', 'stealing', 'robbery', 'property', 'stolen', 'someone took my', 'lost my bag', 'pickpocket']
  },
  {
    id: '18',
    number: '420',
    title: 'Section 420 - Cheating and Dishonestly',
    content: 'Cheating and dishonestly inducing delivery of property.',
    simplified: 'This is about "Scams." If someone lies to you to take your money or property by tricking you, they are punished under 420.',
    teacher_analogy: 'It\'s like someone promising to give you a chocolate for your pen, taking your pen, and then running away without giving the chocolate.',
    category: 'Criminal Law',
    keywords: ['cheating', 'scam', 'fraud', 'lying', 'fake', 'dishonesty', 'tricked', 'i was cheated', 'money lost']
  },
  {
    id: '19',
    number: '498A',
    title: 'Section 498A - Cruelty by Husband or Relatives',
    content: 'Husband or relative of husband of a woman subjecting her to cruelty.',
    simplified: 'This law protects married women from being harassed or physically/mentally hurt by their husbands or their husband\'s family (often related to dowry).',
    teacher_analogy: 'It\'s like a special rule to ensure that once someone joins a new family, they are treated with kindness and not bullied or hurt.',
    category: 'Criminal Law',
    keywords: ['cruelty', 'dowry', 'marriage', 'harassment', 'women safety']
  },
  {
    id: '20',
    number: '506',
    title: 'Section 506 - Criminal Intimidation',
    content: 'Whoever commits the offence of criminal intimidation shall be punished with imprisonment.',
    simplified: 'If someone threatens to hurt you, your family, or your property to scare you, they are committing a crime.',
    teacher_analogy: 'It\'s like someone saying "Wait until after school, I will beat you up." Even if they haven\'t hit you yet, the threat itself is against the rules.',
    category: 'Criminal Law',
    keywords: ['threat', 'intimidation', 'scaring', 'blackmail', 'violence']
  },
  {
    id: '4',
    number: '21A',
    title: 'Right to Education',
    content: 'The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.',
    simplified: 'Every child between 6 and 14 years old has the right to go to school for free. The government must provide this education.',
    teacher_analogy: 'It\'s like a "Golden Ticket" given to every child that opens the door to a school, and no one can charge you for it.',
    category: 'Fundamental Rights',
    keywords: ['education', 'school', 'children', 'learning', 'study']
  },
  {
    id: '5',
    number: '51A(a)',
    title: 'Respect the Constitution, Flag & Anthem',
    content: 'To abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem.',
    simplified: 'We must follow the rules of our country and show respect to our National Flag and the National Anthem.',
    teacher_analogy: 'Just like we stand up when a teacher enters the room or respect the school rules, we respect the symbols of our country.',
    category: 'Fundamental Duties',
    keywords: ['duty', 'respect', 'flag', 'anthem', 'constitution', 'patriotism']
  },
  {
    id: '21',
    number: '51A(g)',
    title: 'Protect the Natural Environment',
    content: 'To protect and improve the natural environment including forests, lakes, rivers and wild life, and to have compassion for living creatures.',
    simplified: 'It is our duty to take care of nature, keep our rivers clean, and be kind to animals.',
    teacher_analogy: 'Imagine our country is a big garden. It is everyone\'s job to water the plants and not throw trash on the ground.',
    category: 'Fundamental Duties',
    keywords: ['environment', 'nature', 'animals', 'rivers', 'pollution', 'earth']
  },
  {
    id: '22',
    number: '51A(h)',
    title: 'Develop Scientific Temper',
    content: 'To develop the scientific temper, humanism and the spirit of inquiry and reform.',
    simplified: 'We should always be curious, ask questions, and try to think logically instead of believing everything blindly.',
    teacher_analogy: 'Instead of just following a magic trick, a scientist asks "How did that happen?". We should all be like mini-scientists in our daily lives.',
    category: 'Fundamental Duties',
    keywords: ['science', 'logic', 'questions', 'learning', 'improvement']
  },
  {
    id: '23',
    number: '51A(i)',
    title: 'Safeguard Public Property',
    content: 'To safeguard public property and to abjure violence.',
    simplified: 'Do not damage things that belong to everyone (like buses, parks, or street lights) and stay away from violence.',
    teacher_analogy: 'If you break a bench in a public park, you are breaking your own property because your family\'s taxes paid for it!',
    category: 'Fundamental Duties',
    keywords: ['property', 'public', 'violence', 'peace', 'protection']
  },
  {
    id: '24',
    number: '51A(k)',
    title: 'Duty of Parents to provide Education',
    content: 'Who is a parent or guardian to provide opportunities for education to his child or, as the case may be, ward between the age of six and fourteen years.',
    simplified: 'Every parent or guardian must ensure that their children (aged 6-14) go to school and get an education.',
    teacher_analogy: 'Just like a bird teaches its chicks how to fly so they can find food, parents must send children to school so they can succeed in life.',
    category: 'Fundamental Duties',
    keywords: ['parent', 'child', 'education', 'school', 'learning', 'duty']
  }
];
