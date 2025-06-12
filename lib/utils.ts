import { clsx, type ClassValue } from "clsx";
import { create } from "domain";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDevIconClassName = (techName: string) => {
  const normalizedTechName: string = techName
    .replace(/[ .]/g, "")
    .toLowerCase();

  const techMap = {
    javascript: "devicon-javascript-plain",
    js: "devicon-javascript-plain",
    typescript: "devicon-typescript-plain",
    ts: "devicon-typescript-plain",
    react: "devicon-react-original",
    nextjs: "devicon-nextjs-plain",
    next: "devicon-nextjs-plain",
    nodejs: "devicon-nodejs-plain",
    node: "devicon-nodejs-plain",
    express: "devicon-express-original",
    expressjs: "devicon-express-original",
    mongodb: "devicon-mongodb-plain",
    mongo: "devicon-mongodb-plain",
    mysql: "devicon-mysql-plain",
    mysqljs: "devicon-mysql-plain",
    postgresql: "devicon-postgresql-plain",
    postgres: "devicon-postgresql-plain",
    python: "devicon-python-plain",
    django: "devicon-django-plain",
    flask: "devicon-flask-plain",
    ruby: "devicon-ruby-plain",
    rails: "devicon-rails-plain",
    php: "devicon-php-plain",
    java: "devicon-java-plain",
    csharp: "devicon-csharp-plain",
    c: "devicon-c-plain",
    cpp: "devicon-cplusplus-plain",
    go: "devicon-go-plain",
    rust: "devicon-rust-plain",
    html: "devicon-html5-plain",
    css: "devicon-css3-plain",
    sass: "devicon-sass-original",
    scss: "devicon-sass-original",
    tailwind: "devicon-tailwindcss-plain",
    bootstrap: "devicon-bootstrap-plain",
    vue: "devicon-vuejs-plain",
    angular: "devicon-angularjs-plain",
    flutter: "devicon-flutter-plain",
    kotlin: "devicon-kotlin-plain",
    swift: "devicon-swift-plain",
    docker: "devicon-docker-plain",
    kubernetes: "devicon-kubernetes-plain",
    aws: "devicon-amazonwebservices-original",
    azure: "devicon-microsoftazure-plain",
    googlecloud: "devicon-googlecloud-plain",
  };

  return `${techMap[normalizedTechName as keyof typeof techMap] || "devicon-plain"}`;
};

export function getTechDescription(techName: string): string {
  const normalizedTech = techName.replace(/[ .]/g, "").toLowerCase();

  // Mapping technology names to descriptions
  const techDescriptionMap: { [key: string]: string } = {
    javascript:
      "JavaScript is a powerful language for building dynamic, interactive, and modern web applications.",
    typescript:
      "TypeScript adds strong typing to JavaScript, making it great for scalable and maintainable applications.",
    react:
      "React is a popular library for building fast, component-based user interfaces and web applications.",
    nextjs:
      "Next.js is a React framework for building fast, SEO-friendly, and production-grade web applications.",
    nodejs:
      "Node.js is a runtime for building fast and scalable server-side applications using JavaScript.",
    python:
      "Python is a beginner-friendly language known for its versatility and simplicity in various fields.",
    java: "Java is a versatile, cross-platform language widely used in enterprise and Android development.",
    "c++":
      "C++ is a high-performance language ideal for system programming, games, and large-scale applications.",
    git: "Git is a version control system that helps developers track changes and collaborate on code efficiently.",
    docker:
      "Docker simplifies app deployment by containerizing environments, ensuring consistency across platforms.",
    mongodb:
      "MongoDB is a flexible NoSQL database ideal for handling unstructured data and scalable applications.",
    mysql:
      "MySQL is a popular open-source relational database management system known for its stability and performance.",
    postgresql:
      "PostgreSQL is a powerful open-source SQL database known for its scalability and robustness.",
    aws: "Amazon Web Services (AWS) is a cloud computing platform that offers a wide range of services for building, deploying, and managing web and mobile applications.",
  };

  return (
    techDescriptionMap[normalizedTech] ||
    `${techName} is a technology or tool widely used in software development, providing valuable features and capabilities.`
  );
}

export const getTimeStamp = (createdAt: Date) => {
  const date = new Date(createdAt);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (secondsAgo < 60) return `${secondsAgo} seconds ago`;

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo} minutes ago`;

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} hours ago`;

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 30) return `${daysAgo} days ago`;

  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12) return `${monthsAgo} months ago`;

  const yearsAgo = Math.floor(monthsAgo / 12);
  return `${yearsAgo} years ago`;
};
