export type Difficulty = "easy" | "medium" | "hard" | "any";

export type ProgrammingLanguages = "javascript" | "python" | "java" | "c++";

export type Question = {
  title: string;
  difficulty: string;
  topics: string[];
  description: string;
  solution: string;
  defaultCode: {
    javascript?: string;
    python?: string;
    java?: string;
    "c++"?: string;
  };
};
