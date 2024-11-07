/** @format */

const Acordian = ({ title, description, isActive, onActive }) => {
  return (
    <div style={{ width: "300px" }}>
      <h3>{title}</h3>
      {isActive ? (
        <p>{description}</p>
      ) : (
        <button onClick={onActive}>Show</button>
      )}
    </div>
  );
};

export default Acordian;
