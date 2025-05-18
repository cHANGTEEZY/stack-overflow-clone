import { clsx, type ClassValue } from "clsx";
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
