import * as React from 'react';
import { SideBar } from '../../components/SideBar';
import '../../styles/index.css';

import { fetchRestaurants } from '../../actions/restaurantActions';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Skeleton from '@mui/material/Skeleton';

export const Restaurants = () => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [currentRestaurant, setCurrentRestaurant] = React.useState(null);
  const dispatch = useDispatch();

  const selectHandler = (e) => {
    setCurrentRestaurant(restaurants.find((r) => r._id === e.target.value));
  };

  React.useEffect(() => {
    document.title = 'Рестораны';
    dispatch(fetchRestaurants(setRestaurants));
  }, []);

  return (
    <div className='root'>
      <SideBar />
      <div className='content'>
        <Box sx={{ minWidth: 320 }} onChange={selectHandler}>
          <FormControl fullWidth>
            <InputLabel variant='standard' htmlFor='uncontrolled-native'>
              Ресторан
            </InputLabel>
            <NativeSelect
              defaultValue={null}
              inputProps={{
                name: 'Выберите ресторан',
                id: 'uncontrolled-native',
              }}
            >
              <option></option>
              {restaurants.map((restaurant) => (
                <option key={`${restaurant._id}res`} value={restaurant._id}>
                  {restaurant.title}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
        <div className='restaurant__images'>
          {currentRestaurant?.images.map((image) => (
            <div className='restaurant__img'>
              <img src={image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
