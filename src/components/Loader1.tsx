import { ColorRing } from 'react-loader-spinner';

const Loader1 = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', // loader ke niche text lane ke liye
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '24px', // yeh font size loader ke niche text ke liye h
    }}>
      <ColorRing
        visible={true}
        height="150"
        width="150"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      <div>Loading...</div>
    </div>
  );
};

export default Loader1;
