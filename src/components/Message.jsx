const Message = ({ message }) => {
    return message ? (
      <p className="text-green-800 font-thin text-center text-xs">{message}</p>
    ) : null;
  };
  
  export default Message;