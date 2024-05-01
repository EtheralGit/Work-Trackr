// import react
import { useParams } from "react-router-dom";
// import code file
import useGetSelectedGoal from "../../hooks/GoalHook/useGetSelectedGoal";
import useDeleteGoal from "../../hooks/GoalHook/useDeleteGoal";

const SelectedGoal = () => {
  const { id } = useParams();

  const { loading, selectedGoal } = useGetSelectedGoal(id);
  const { loadingdel, deleteGoal } = useDeleteGoal();

  const handleDelete = async () => {
    await deleteGoal(id);
  };

  return (
    <div className="bg-secondary min-h-screen flex flex-col items-center p-12">
      <h1 className="text-primary text-4xl mb-2 font-bold">Your Goals</h1>
      <h3 className="text-primary text-xl font-medium mb-12 text-center">
        Transform dreams into reality through focused action
      </h3>
      <div className="relative xl:w-1/3 lg:w-1/2 md:w-[75vh] w-full min-h-[75vh] bg-tertiary shadow-xl p-16 rounded-md">
        {loading ? (
          <span className="loading loading-dots loading-lg flex justify-center items-center"></span>
        ) : (
          <div>
            <div className="flex gap-2 items-center mb-4">
              <h1 className="text-2xl text-primary font-bold">Until : </h1>
              <p className="text-primary text-lg font-semibold">
                {selectedGoal.completedAt}
              </p>
            </div>
            <div>
              <h1 className="text-primary text-2xl font-bold">Title : </h1>
              <p className="text-primary text-lg font-medium">
                {selectedGoal.title}
              </p>
            </div>
            <div className="mb-12">
              <p className="text-primary text-md opacity-90 mt-2 text-ellipsis overflow-hidden">
                {selectedGoal.text}
              </p>
            </div>
            <div className="w-full flex justify-center absolute bottom-8 right-0 left-0">
              <button
                className="bg-primary text-secondary text-lg px-7 py-3 rounded-md mx-auto"
                onClick={handleDelete}
              >
                {loadingdel ? (
                  <span className="loading loading-dots"></span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedGoal;
