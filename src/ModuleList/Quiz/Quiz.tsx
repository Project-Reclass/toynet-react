import React from 'react';
import { useParams } from 'react-router-dom';

interface Params {
  moduleId: string;
  quizId: string;
}

const questions = [
    {
        "question": "Which type of fiber is best suited for long distance transmission?",
        "options": [
            "Multi-Mode Fiber",
            "Single-mode Fiber",
            "Small Form Factor Pluggable",
            "Fast Fiber"
        ],
        "answer": 1
    },
    {
        "question": "What level of the 7 Layer OSI model are Routers in?",
        "options": [
            "Physical",
            "Data Link",
            "Network",
            "Transport"
        ],
        "answer": 2
    },
    {
        "question": "What part of IP packet determines destination?",
        "options": [
            "MAC Address",
            "Ethernet",
            "IP Address",
            "Payload"
        ],
        "answer": 2
    },
    {
        "question": "What part of IP packet determines what we seek?",
        "options": [
            "MAC Address",
            "Ethernet",
            "IP Address",
            "Payload"
        ],
        "answer": 0
    },
    {
        "question": "What is the name of a network spanning a small area?",
        "options": [
            "Local Area Network (LAN)",
            "Limited Area Network (LAN)",
            "Line Area Network (LAN)",
            "Wide Area Network (WAN)"
        ],
        "answer": 0
    },
    {
        "question": "In order to send an IP Packet, what is the first step before it can get sent?",
        "options": [
            "Deencapsulation",
            "Routing",
            "Gateway",
            "Encapsulation"
        ],
        "answer": 3
    },
    {
        "question": "Which Small Factor Pluggable is capable of speeds over 40 Gbps?",
        "options": [
            "Small Factor Pluggable (SFP)",
            "Quad Small Factor Pluggable (QSFP)",
            "Small Factor Pluggable Plus (SFP+)",
            "Multi Small Factor Pluggable (MSFP)"
        ],
        "answer": 1
    },
    {
        "question": "Which Cable type is divided into categories abbreviated CAT?",
        "options": [
            "Multi-mode Fiber",
            "Bus topography",
            "Twisted Pair Cable",
            "Coaxial Cable"
        ],
        "answer": 2
    }
];

const Quiz = () => {
  const { moduleId, quizId } = useParams<Params>();

  return (
    <div>
      <h1>
        Module: {moduleId}
      </h1>
      <h2>
        Quiz: {quizId}
      </h2>

      {questions.map((q, qIndex) => (
        <div>
          <p>{ q.question }</p>
          <div>
            {q.options.map(option => (
              <div>
                <input type="radio" id={option} name={qIndex.toString()} value={option} />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <input type="submit" value="Submit Quiz" />
    </div>
  );
};

export default Quiz;