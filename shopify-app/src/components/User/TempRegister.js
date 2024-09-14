import React, { useState } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: 'auto',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333333',
  },
  formGroup: {
    marginBottom: '15px',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '600',
    color: '#555555',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  toggleButton: {
    marginTop: '15px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#6c757d',
    color: '#ffffff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

const TempRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{isLogin ? 'Login Page' : 'Signup Page'}</h2>
      {isLogin ? (
        <form>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="email" name="email" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" name="password" />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
      ) : (
        <form>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input style={styles.input} type="text" name="fullName" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="email" name="email" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" name="password" />
          </div>
          <button type="submit" style={styles.button}>Signup</button>
        </form>
      )}
      <button type="button" onClick={handleToggle} style={styles.toggleButton}>
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default TempRegister;
