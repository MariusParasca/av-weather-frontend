import React from 'react';

const Login = () => {
  // const authData = useSelector(state => state.authData);

  // const [value, setValue] = useState('');
  // const [error, setError] = useState(false);
  // const [helperText, setHelperText] = useState('');

  // const dispatch = useDispatch();

  // const resetError = () => {
  //   setError(false);
  //   setHelperText('');
  // };

  // const setErrorMessage = message => {
  //   setError(true);
  //   setHelperText(message);
  // };

  // const onBlur = () => {
  //   if (!isEmailValid(value)) {
  //     setErrorMessage('Invalid email! Please provide a valid one');
  //   }
  // };

  // const onClickRegister = () => {
  //   if (isEmailValid(value)) {
  //     dispatch({ type: LOGIN, email: value });
  //   } else if (!value) {
  //     setErrorMessage('Invalid email! Please provide a valid one');
  //   }
  // };

  // useEffect(() => {
  //   if (authData.error) {
  //     setErrorMessage(authData.error.message);
  //   }
  // }, [authData]);

  return (
    <>
      {/* <Typography variant="h3" gutterBottom align="center">
        Login/Register
      </Typography>
      <div className={styles.textField}>
        <TextField
          variant="outlined"
          label="Email"
          value={value}
          onChange={updateTextField(setValue, resetError, error)}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
        />
      </div>
      <div className={styles.button}>
        <Button variant="contained" onClick={onClickRegister}>
          Login
        </Button>
      </div>
      {authData.pending ? <Spinner /> : null} */}
    </>
  );
};

export default Login;
