const AddClientButton = ({ onClick }) => {
  return (
    <button className="btn btn-alert" onClick={onClick}>
      New Client
    </button>
  );
}

export default AddClientButton;