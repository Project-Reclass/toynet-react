import { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';

import { Action } from '../../common/types';
import { Meta } from '../../common/api/curriculum/lesson/requests'
import { useLessonMeta } from '../../common/api/curriculum/lesson';

export interface LessonState {
  numSlides: number;
}

export enum LessonActions {
  SET_LESSON
}

type ReducerAction = Action<LessonActions, Meta | undefined>;

function reducer(state: LessonState, action: ReducerAction) {
  switch (action.type) {
    case LessonActions.SET_LESSON:
      state.numSlides = action.payload ? action.payload.numSlides : 0;
      return;
  }
};


const initialState: LessonState = {
    numSlides: 0
};

export function useLesson() {
    const { data, isLoading } = useLessonMeta(1001)
    const [state, dispatch] = useImmerReducer(reducer, initialState);
    useEffect(() => {
        if (data && !isLoading) {
            dispatch({type: LessonActions.SET_LESSON, payload: data});
        }
    }, [dispatch, isLoading, data]);
    
    return { state, isLoading };
}