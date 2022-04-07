import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: '28px',
    marginBottom: '18px',
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '20px',
    color: '#09bd12',
    '& span': {
      color: '#faebd7',
    },
  },
}));

const ShelterInfo = ({ room }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.label}>Shelter Info</div>
      {room.shelter && (
        <div className={classes.infoBlock}>
          <div>
            Name: <span>{room.shelter.name}</span>
          </div>
          <div>
            Square: <span>{room.shelter.square}²</span>
          </div>
          <div>
            Capacity: <span>{room.shelter.capacity}</span>
          </div>
          <div>
            Description: <span>{room.shelter.description}</span>
          </div>
          <div>
            Location: <span>{room.shelter.location}</span>
          </div>
          <div>
            Rooms: <span>{room.shelter.rooms}</span>
          </div>
          <div>
            Resources: <span>{room.shelter.resources}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterInfo;
