import { goalsActions } from "./goalsSlice";
import { Api } from "../hooks/Api";
import { tasksActions } from "./tasksSlice";

export const fetchTasksData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // mode: "no-cors",
      };
      const response = await fetch(`${Api}/task`, init);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const taskData = await fetchData();
      console.log(taskData);

      dispatch(tasksActions.replaceTask({ taskList: taskData }));
    } catch (error) {
      console.log("error");
    }
  };
};

// export const updateTask = (goal) => {
//   return async () => {
//     const sendRequest = async () => {
//       const response = await fetch(`${Api}/goals/update/${goal.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(goal),
//       });

//       if (!response.ok) {
//         throw new Error("Updating goal data failed.");
//       }
//     };

//     try {
//       await sendRequest();
//     } catch (error) {
//       console.log("error");
//     }
//   };
// };

export const createTask = (task) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(`${Api}/task/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Creating task failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("error");
    }
  };
};

// export const deleteTask = (task) => {
//   return async () => {
//     const sendRequest = async () => {
//       const response = await fetch(`${Api}/goals/delete/${goal.id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Deleting goal failed.");
//       }
//     };

//     try {
//       await sendRequest();
//     } catch (error) {
//       console.log("error");
//     }
//   };
// };
