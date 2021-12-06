import { Question } from '../@types/cohorts';
import axios from './axios';

export const deleteQuestion = async (
  questionID: string,
  onSuccess: Function,
  onError: Function
) => {
  await axios
    .delete(`/questions_feed/${questionID}.json`)
    .then((response) => {
      onSuccess();
    })
    .catch((err) => {
      onError();
    });
};

export const submitAnswer = (
  questionID: string,
  recording: any,
  list: Question[],
  setList: Function
) => {
  const index = list.findIndex((question) => question.id === questionID);
  const updated: Question = list[index];
  const updatedList: Question[] = [...list];

  const answerData = new FormData();
  recording && answerData.append('video', recording);
  answerData.append('id', questionID);

  axios
    .post(`/questions_feed/submit_answer.json`, answerData)
    .then((res) => {
      updatedList[index] = {
        ...updated,
        ...res.data
      };
      setList(updatedList);
    })
    .catch((error) => {
      console.log(error);
    });
};
