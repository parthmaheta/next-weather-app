import React, { useState, useEffect } from 'react';

const Toaster = ({ message,callBack }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        callBack()
      }, 3000); // Change the duration as needed
      return () => clearTimeout(timer);
    }
    console.log('worked');
  }, [message]);
  

  return (
    <div className={`fixed bottom-4 left-4 z-50 ${isVisible ? 'block' : 'hidden'}`}>
      <div className="text-primary-light bg-red-500 p-4 rounded-md shadow-md">
        {message}
      </div>
    </div>
  );
};

export default Toaster;