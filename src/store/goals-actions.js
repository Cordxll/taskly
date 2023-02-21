// import { goalsActions } from "./goalsSlice";

// const fetchGoalsData = () => {
//   return (dispatch) => {
//     // const fetchData = async () => {
//     const response = [
//       { id: 1, title: "Lose weight", color: { backgroundColor: "pink" } },
//       {
//         id: 2,
//         title: "Learn new language",
//         color: { backgroundColor: "blue" },
//       },
//       {
//         id: 3,
//         title: "Eat healthy",
//         color: { backgroundColor: "purple" },
//       },
//     ];

//     dispatch(
//       goalsActions.replaceGoal({
//         goals: response || [],
//       })
//     );

//     return response;
//     // };
//   };
// };

// export default fetchGoalsData;

import { goalsActions } from "./goalsSlice";

export const fetchGoalsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // mode: "no-cors",
      };
      const response = await fetch("http://localhost:8080/goals", init);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      console.log(data);

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        goalsActions.replaceGoal({
          items: cartData || [],
        })
      );
    } catch (error) {
      console.log("error");
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    console.log("pending");

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-6b4a6.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("error");
    }
  };
};
