import { useQuery } from 'react-query';
import { getArticleMeta, getArticleText } from './requests';

export function useArticleText(articleId: number) {
  return useQuery(['article-text', articleId], () =>
    getArticleText(articleId));
}

export function useArticleMeta(articleId: number) {
  return useQuery(['article-meta', articleId], () =>
    getArticleMeta(articleId));
}