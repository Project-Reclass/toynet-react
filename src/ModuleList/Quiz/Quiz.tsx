import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleGrid, Box, Flex } from '@chakra-ui/core';

import { getQuizMeta } from 'src/common/api/curriculum/quiz/requests'

interface Params {
  moduleId: string;
  quizId: string;
}

interface Question {
  question: string;
  options: string[];
  answer: number;
}

interface StringMap {
  [key: string]: boolean;
}

const Quiz = () => {
  const { moduleId, quizId } = useParams<Params>();

  const [questions, setQuestions] = useState<any[]>([]);

  const [inputsAreDisabled, setInputsAreDisabled] = useState<boolean>(false);

  const [questionIndexesAnsweredCorrectly, setQuestionIndexesAnsweredCorrectly] = useState<StringMap>({});

  useEffect(() => {
    const getQuizData = async () => {
      const questions = await getQuizMeta(quizId);
      setQuestions(questions);
    };
    getQuizData();
  }, []);

  const handleAnsweredQuestion = (q: any, qIndex: number, optionIndex: number) => {
    return (e: React.ChangeEvent<any>) => {
      console.log('selected value', e.target.value);
      console.log('qIndex', qIndex);
      console.log('correct', q.answer === optionIndex);
      questionIndexesAnsweredCorrectly[qIndex] = q.answer === optionIndex;
      setQuestionIndexesAnsweredCorrectly(questionIndexesAnsweredCorrectly);
    };
  };

  const checkQuiz = () => {
    console.log('Quiz submitted');
    console.log('questionIndexesAnsweredCorrectly', questionIndexesAnsweredCorrectly);
    // setInputsAreDisabled(true);
  };

  return (
    <div>
      <h1>
        Module: {moduleId}
      </h1>
      <h2>
        Quiz: {quizId}
      </h2>

      <SimpleGrid columns={1} spacing={10}>
        {questions.map((q: Question, qIndex) => (
          <Box p={5} color="white" key={qIndex}>
            <p>{ `${qIndex + 1}. ${q.question}`}</p>
            <SimpleGrid columns={2} spacingX={1}>
              {q.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    disabled={inputsAreDisabled}
                    type="radio" id={option}
                    name={qIndex.toString()}
                    value={option}
                    onChange={handleAnsweredQuestion(q, qIndex, optionIndex)}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </SimpleGrid>
      <button value="Submit Quiz" onClick={checkQuiz}>Submit Quiz</button>
    </div>
  );
};

export default Quiz;