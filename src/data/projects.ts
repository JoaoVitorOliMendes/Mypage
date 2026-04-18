export interface Project {
  name: string;
  description: string;
  url: string;
  website?: string;
  technologies: string[];
  language: string;
}

export const projects: Project[] = [
  {
    name: "Brasquete",
    description:
    "Mobile application for organizing basketball groups and matches. Built with React Native and TypeScript.",
    url: "https://github.com/JoaoVitorOliMendes/brasquete",
    technologies: ["React Native", "TypeScript", "Mobile"],
    language: "TypeScript",
  },
  {
    name: "Polipluz",
    description:
    "A fully functional MVP of a startup created during my technical course in COTEMIG. Angular front-end with a Spring Boot REST back-end, JWT auth, and MySQL.",
    url: "https://github.com/JoaoVitorOliMendes/Polipluz",
    technologies: ["Angular", "Spring Boot", "Java", "MySQL", "JWT"],
    language: "TypeScript",
  },
  {
    name: "My Page",
    description:
    "This website! A personal portfolio built with Next.js, featuring IIIF deep zoom paintings from the Art Institute of Chicago.",
    url: "https://github.com/JoaoVitorOliMendes/Mypage",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    language: "TypeScript",
  },
  {
    name: "MAXIMO Scripts",
    description:
      "Collection of Maximo scripts, useful links and reference material for IBM Maximo development.",
    url: "https://github.com/JoaoVitorOliMendes/MAXIMOSCRIPTS",
    technologies: ["Maximo", "CSS", "Automation"],
    language: "CSS",
  },
  {
    name: "Auth Server Base",
    description:
      ".NET OAuth server base template with authentication and authorization flows.",
    url: "https://github.com/JoaoVitorOliMendes/authServerBase",
    technologies: [".NET", "OAuth", "C#"],
    language: "C#",
  },
  {
    name: "gRPC Academic",
    description:
      "gRPC exploration project — client/server communication with Protocol Buffers in Python.",
    url: "https://github.com/JoaoVitorOliMendes/gRPC_academic",
    technologies: ["Python", "gRPC", "Protobuf"],
    language: "Python",
  },
];
