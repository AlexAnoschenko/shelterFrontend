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
  apocalypseName: {
    color: '#09bd12',
    fontSize: '24px',
    marginBottom: '18px',
  },
  apocalypseDescription: {
    color: '#faebd7',
    fontSize: '18px',
  },
}));

const ApocalypseInfo = ({ room }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.label}>Apocalypse Info</div>
      {room.apocalypse && (
        <>
          <div className={classes.apocalypseName}>{room.apocalypse.name}</div>
          <div className={classes.apocalypseDescription}>
            {room.apocalypse.description}
          </div>
        </>
      )}
    </div>
  );
};

export default ApocalypseInfo;
