import React from 'react';
import { useParams } from 'react-router-dom';

// import { Carousel } from 'react-bootstrap';

interface ExpectedParams {
  moduleId?: string;
  articleId?: string;
}

const Article = () => {
  const { moduleId, articleId } = useParams<ExpectedParams>();

  return (
    <div>
      <h1>Module: {moduleId}</h1>
      <h2>Article: {articleId}</h2>
      {/* <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.idgesg.net/images/article/2017/08/networking-100733179-large.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.idgesg.net/images/article/2017/08/networking-100733179-large.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.idgesg.net/images/article/2017/08/networking-100733179-large.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
    </div>
  );
};

export default Article;