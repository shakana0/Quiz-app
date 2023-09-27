export interface QuestionType {
  id: number,
  term: string;
  definition: string;
  image: string | imageType
}

export interface QuizType {
  id: string,
  titel: string;
  description: string;
  questions: Array<QuestionType>;
}

export interface imageType {
  lastModified: number
  lastModifiedDate: object
  name: string
  size: number
  type: string
  webkitRelativePath: string
}