import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';

import Article from 'src/Curriculum/Article';
jest.mock('src/common/api/curriculum/article/requests');
import { getArticleText, getArticleMeta } from 'src/common/api/curriculum/article/requests';

const articleId = 42;

const mockArticle = {
  text: 'I have the high ground!',
  meta: {
    source: 'https://obiwan.gov',
    title: 'Return of the Sith',
    author: 'Obi-Wan Kenobi',
    images: [],
  }
}

const RenderWithRouter = ({ children, moduleId, articleId }) => (
  <MemoryRouter initialEntries={[`/module/${moduleId}/article/${articleId}`]}>
    <Route path="/module/:moduleId/article/:articleId">{children}</Route>
  </MemoryRouter>
);

describe('The Article page', () => {
  beforeEach(() => {
    getArticleText.mockClear();
    getArticleMeta.mockClear();

    getArticleMeta.mockResolvedValue(mockArticle.meta);
    getArticleText.mockResolvedValue(mockArticle.text);
  });
  it('should match snapshot', async () => {
    const { getByText, container } = render(
      <RenderWithRouter articleId={articleId}>
        <Article />
      </RenderWithRouter>
    );

    await waitFor(() => expect(getByText(mockArticle.text)).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  })
  it('should get article text and meta for article id specified in the URL', async () => {
    render(
      <RenderWithRouter articleId={articleId}>
        <Article />
      </RenderWithRouter>
    );

    await waitFor(() =>  expect(getArticleMeta.mock.calls[0][0]).toBe(articleId));
    await waitFor(() => expect(getArticleText.mock.calls[0][0]).toBe(articleId));
  });
  it('should render the text of the article', async () => {
    const { getByText } = render(
      <RenderWithRouter articleId={articleId}>
        <Article />
      </RenderWithRouter>
    );

    await waitFor(() => expect(getByText(mockArticle.text)).toBeInTheDocument());
  });
  it('should render the author of the article', async () => {
    const { getByText } = render(
      <RenderWithRouter articleId={articleId}>
        <Article />
      </RenderWithRouter>
    );

    await waitFor(() => expect(getByText(mockArticle.meta.author, { exact: false })).toBeInTheDocument());
  });
  it('should render the title of the article', async () => {
    const { getByText } = render(
      <RenderWithRouter articleId={articleId}>
        <Article />
      </RenderWithRouter>
    );

    await waitFor(() => expect(getByText(mockArticle.meta.title)).toBeInTheDocument());
  });
});