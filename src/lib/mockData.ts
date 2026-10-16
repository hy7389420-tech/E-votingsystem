export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyColor: string;
  age: number;
  education: string;
  experience: string;
  rating: number;
  votes: number;
  promises: string[];
  achievements: string[];
  bio: string;
  photoEmoji: string;
}

export interface Election {
  id: string;
  name: string;
  type: string;
  status: "ACTIVE" | "UPCOMING" | "COMPLETED";
  startDate: string;
  endDate: string;
  candidatesCount: number;
  votersRegistered: number;
  turnoutPercentage: number;
  totalVotesCast: number;
  description: string;
}

export const MOCK_ELECTIONS: Election[] = [
  {
    id: "ELEC-001",
    name: "National Lok Sabha Elections 2026",
    type: "National",
    status: "ACTIVE",
    startDate: "2026-09-20",
    endDate: "2026-10-05",
    candidatesCount: 12,
    votersRegistered: 847934,
    turnoutPercentage: 78.4,
    totalVotesCast: 664780,
    description: "Parliamentary general election to elect representatives for the National Legislative Assembly."
  },
  {
    id: "ELEC-002",
    name: "Municipal Corporation Elections 2026",
    type: "Municipal",
    status: "ACTIVE",
    startDate: "2026-09-25",
    endDate: "2026-10-02",
    candidatesCount: 8,
    votersRegistered: 215000,
    turnoutPercentage: 64.2,
    totalVotesCast: 138030,
    description: "Civic governance body election for urban infrastructure and public service administration."
  },
  {
    id: "ELEC-003",
    name: "University Student Council Election 2026",
    type: "Institutional",
    status: "UPCOMING",
    startDate: "2026-10-10",
    endDate: "2026-10-12",
    candidatesCount: 6,
    votersRegistered: 14500,
    turnoutPercentage: 0,
    totalVotesCast: 0,
    description: "Student leadership election for academic representation and campus governance."
  }
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "CAND-001",
    name: "Rajesh Kumar Singh",
    party: "Progressive Democratic Alliance",
    partyColor: "#4B4FD8",
    age: 48,
    education: "B.Tech, MBA (IIT Delhi)",
    experience: "15 Years Public Governance",
    rating: 4.8,
    votes: 32450,
    photoEmoji: "👨‍💼",
    promises: [
      "50+ Smart Infrastructure & Highway expansion projects",
      "40% increase in renewable energy & green grid funding",
      "100% digital public service transparency"
    ],
    achievements: [
      "Spearheaded city-wide solar grid installation (2024)",
      "Created 15,000 tech apprenticeship seats"
    ],
    bio: "Senior administrator and technology policy reform advocate dedicated to sustainable urban development."
  },
  {
    id: "CAND-002",
    name: "Priya Sharma",
    party: "National People's Party",
    partyColor: "#7C83FD",
    age: 42,
    education: "M.A. Economics, Ph.D. Public Policy",
    experience: "12 Years Economic Reform",
    rating: 4.6,
    votes: 28910,
    photoEmoji: "👩‍💼",
    promises: [
      "Tax rebates for small scale green manufacturing",
      "Free high-speed broadband in rural educational centers",
      "Women entrepreneurship seed grant fund"
    ],
    achievements: [
      "Authored Micro-Finance Reform Act 2023",
      "Established 120 rural digital literacy centers"
    ],
    bio: "Economist and social welfare strategist pioneering digital economic empowerment."
  },
  {
    id: "CAND-003",
    name: "Amit Patel",
    party: "Swatantra Vikas Party",
    partyColor: "#A5AAD6",
    age: 51,
    education: "LL.B, M.Sc Civil Engineering",
    experience: "18 Years Judicial & Urban Planning",
    rating: 4.4,
    votes: 21540,
    photoEmoji: "👨‍⚖️",
    promises: [
      "Zero-corruption digital municipal clearance system",
      "Modernization of public transit & EV bus fleets",
      "Water recycling & rainwater harvesting mandates"
    ],
    achievements: [
      "Led metro railway phase 2 expansion on schedule",
      "Digitized land records across 5 districts"
    ],
    bio: "Legal expert and infrastructure engineer committed to clean governance."
  },
  {
    id: "CAND-004",
    name: "Vikram Verma",
    party: "Independent Coalition",
    partyColor: "#939BFF",
    age: 39,
    education: "M.Sc Computer Science",
    experience: "10 Years Youth Empowerment",
    rating: 4.5,
    votes: 18230,
    photoEmoji: "👨‍💻",
    promises: [
      "Youth startup incubation centers in every tier-2 city",
      "Blockchain-based public fund expenditure tracking",
      "Healthcare accessibility via telemedicine network"
    ],
    achievements: [
      "Founded open-source civic tech initiative",
      "Trained 50,000 students in coding & robotics"
    ],
    bio: "Tech entrepreneur and grassroots reformer driving transparent governance through innovation."
  }
];

export const MOCK_ACTIVITY_CHART = [
  { time: "08:00 AM", votes: 1200 },
  { time: "10:00 AM", votes: 4500 },
  { time: "12:00 PM", votes: 8900 },
  { time: "02:00 PM", votes: 14200 },
  { time: "04:00 PM", votes: 19800 },
  { time: "06:00 PM", votes: 24500 }
];

export const MOCK_TURNOUT_CHART = [
  { category: "18-25 Yrs", turnout: 82 },
  { category: "26-40 Yrs", turnout: 76 },
  { category: "41-60 Yrs", turnout: 79 },
  { category: "60+ Yrs", turnout: 71 }
];
