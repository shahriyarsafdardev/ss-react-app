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
