export interface ExperienceItem {
  dateStart: string;
  dateEnd: string;
  role: string;
  company: string;
  location: string;
  description: string[];
}

export const experiences: ExperienceItem[] = [
  {
    dateStart: "2022",
    dateEnd: "Present",
    role: "IBM Maximo Consultant & Developer",
    company: "Cohesive",
    location: "Remote · UK-based clients",
    description: [
      "Build and maintain enterprise applications across the full stack: Java backend customization, REST/SOAP API integrations, SQL query optimization and frontend configuration.",
      "Lead integration developer — designed and delivered REST, SOAP and FTP integrations with ERP systems, configuring JMS and Kafka queues for real-time data exchange.",
      "Write and optimize complex SQL across SQL Server, Oracle and DB2, using execution plans to improve report and application performance.",
      "Produce technical documentation, requirements, test plans and training sessions delivered to international client teams in English.",
    ],
  },
  {
    dateStart: "2021",
    dateEnd: "2021",
    role: "Front-End Web Development Intern",
    company: "Headot",
    location: "Belo Horizonte · Angular & TypeScript",
    description: [
      "Developed and maintained web interfaces with Angular and TypeScript, contributing to the team's front-end delivery pipeline.",
      "Collaborated in an Agile/Scrum environment using Git for version control and code review.",
    ],
  },
];

export const education: ExperienceItem[] = [
  {
    dateStart: "2022",
    dateEnd: "2025",
    role: "B.Sc. Computer Science",
    company: "COTEMIG",
    location: "Belo Horizonte",
    description: [
      "Ranked 1st across all semesters, graduating top of class.",
    ],
  },
  {
    dateStart: "2019",
    dateEnd: "2021",
    role: "Technical Degree in IT",
    company: "COTEMIG",
    location: "Belo Horizonte",
    description: [
      "Information Technology technical course with hands-on development projects.",
    ],
  },
];
