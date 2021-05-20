const tasks = [
  {
    id: 1,
    text: "Doctors Appontment",
    day: "Feb 5th at 2:30pm",
    reminder: true,
  },
  {
    id: 2,
    text: "Meeting at School",
    day: "Feb 6th at 2:30pm",
    reminder: true,
  },
  {
    id: 3,
    text: "Food shopping",
    day: "Feb 5th at 2:30pm",
    reminder: false,
  },
];

const Tasks = (props) => {
  return (
    <>
      {tasks.map((task) => (
        <h3 key={task.id}>{task.text}</h3>
      ))}
    </>
  );
};

Tasks.propTypes = {};

export default Tasks;
