import { goalsActions } from "./goalsSlice";

export const fetchGoalsData = () => {
  return async (dispatch) => {
    // const fetchData = async () => {
    const response = [
      { id: 1, title: "Lose weight", color: { backgroundColor: "pink" } },
      {
        id: 2,
        title: "Learn new language",
        color: { backgroundColor: "blue" },
      },
      {
        id: 3,
        title: "Eat healthy",
        color: { backgroundColor: "purple" },
      },
    ];

    dispatch(
      goalsActions.replaceCart({
        goals: response.items || [],
      })
    );

    return response;
    // };
  };
};
