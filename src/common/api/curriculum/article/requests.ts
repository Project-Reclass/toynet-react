import axios from 'axios';

export interface ArticleImage {
  file: string;
  credit: string;

  caption?: string;
}

export interface ArticleMeta {
  source: string;
  title: string;
  author: string;
  images: ArticleImage[];
}

export const getArticleText = async (articleId: number): Promise<string> => {
  const { data } = await axios.get(`/data/article/${articleId}/article.md`);
  return data;
};

export const getArticleMeta = async (articleId: number): Promise<ArticleMeta> => {
  const { data } = await axios.get(`/data/article/${articleId}/meta.json`);
  return data;
};