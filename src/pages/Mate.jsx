import '../assets/styles/Mate.css';

const Mate = ({ user }) => {

  // just for today at first - later we can add a date picker
  // for now no filter on wind direction or strength - later we can add this
  // get list of locations of all spots --  filter out the spots what are not in range of the user
  // get the forecast for all spots (max 20) in range of the user
  // calculate scores for all spots 
  // sort the spots by score
  // display the top 5 spots

  return (
    <div className="mate">
      <h3 className="LogoSub">
        Mate
      </h3>
      
    </div>
  );
};

export default Mate;
