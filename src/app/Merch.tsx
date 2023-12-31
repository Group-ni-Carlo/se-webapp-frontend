import React, { Fragment, useState, useEffect } from 'react';
import { MerchDataProps } from '../props/announcements';

import { headers } from '../utils/headers';
import MerchCard from '../components/admin/merch/MerchCard';
import MerchCardUser from '../components/admin/merch/MerchCardUser';

const Merch = () => {
  const [merchData, setMerchData] = useState<MerchDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_CONNECTION}/merch/`,
          {
            headers
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setMerchData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col items-center gap-4 justify-center m-4 lg:flex-row">
        {merchData.map((merch) => (
          <MerchCardUser
            key={merch.id}
            id={merch.id}
            title={merch.title}
            price={merch.price}
            caption={merch.caption}
            imageSrc={merch.imageSrc}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Merch;
