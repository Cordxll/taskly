import { goalsActions } from "./goalsSlice";

export const fetchGoalsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = { id: 1, title: "Lose weight", color: "grey" };

      const data = response;

      return data;
    };
  };
};
