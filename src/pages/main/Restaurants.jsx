import * as React from 'react';
import { SideBar } from '../../components/SideBar';
import '../../styles/index.css';

import {
  fetchRestaurants,
  addRestaurant,
  fetchFoodItems,
} from '../../actions/restaurantActions';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Fab from '@mui/material/Fab';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { DataGrid } from '@mui/x-data-grid';

export const Restaurants = () => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [currentRestaurant, setCurrentRestaurant] = React.useState(null);
  const [openAddNewRestaurant, setOpenAddNewRestaurant] = React.useState(false);
  const [restaurantFood, setRestaurantFood] = React.useState([]);
  const [foods, setFoods] = React.useState([]);
  const [openAddNewFood, setOpenAddNewFood] = React.useState(false);

  const dispatch = useDispatch();

  // form variables
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [workTime, setWorkTime] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [id, setId] = React.useState('');

  React.useEffect(() => {
    document.title = 'Рестораны';
    dispatch(fetchRestaurants(setRestaurants));
  }, [dispatch]);

  const selectHandler = (e) => {
    setCurrentRestaurant(restaurants.find((r) => r._id === e.target.value));
  };

  const handleClickOpen = () => {
    setOpenAddNewRestaurant(true);
    if (currentRestaurant) {
      setTitle(currentRestaurant.title);
      setDescription(currentRestaurant.description);
      setWorkTime(currentRestaurant.workTime);
      setLocation(currentRestaurant.location);
      setId(currentRestaurant._id);
    }
  };

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const workTime = e.target.workTime.value;
    const location = e.target.location.value;
    const imageFiles = e.target.fileUpload.files;

    const imagesPromise = new Promise((resolve) => {
      let images = [];
      let pending = imageFiles.length;
      for (let i = 0; i < imageFiles.length; i++) {
        const imageFile = imageFiles[i];
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result;
          images.push(base64Image);
          pending--;
          if (pending === 0) {
            resolve(images);
          }
        };
        reader.readAsDataURL(imageFile);
      }
    });

    imagesPromise.then((images) => {
      const restaurant = {
        title,
        description,
        workTime,
        location,
        images,
      };
      console.log(restaurant);
      dispatch(addRestaurant(restaurant));
      setOpenAddNewRestaurant(false);
    });
  };

  React.useEffect(() => {
    if (!currentRestaurant?._id) {
      return;
    }
    dispatch(fetchFoodItems(currentRestaurant._id, setRestaurantFood));
  }, [dispatch, currentRestaurant]);

  React.useEffect(() => {
    setFoods(
      restaurantFood.map((food) => ({
        id: food._id,
        title: food.title,
        description: food.description,
        price: food.price,
        image: food.images[0],
      }))
    );
    console.log(foods);
  }, [restaurantFood]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 170 },
    { field: 'title', headerName: 'Название', width: 230 },
    { field: 'description', headerName: 'Описание', width: 230 },
    { field: 'price', headerName: 'Цена', width: 230 },
    {
      field: 'image',
      headerName: 'Фото',
      width: 320,
      cellRenderer: (params) => {
        return (
          <img src={params.value} alt='Food item' width='50' height='50' />
        );
      },
    },
  ];

  return (
    <div className='root'>
      <SideBar />
      <Dialog
        open={openAddNewRestaurant}
        component='form'
        onSubmit={handleAddRestaurant}
      >
        <DialogTitle>Добавить/Измените ресторан</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите информацию о ресторане</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='id'
            label='ID ресторана'
            type='text'
            fullWidth
            variant='standard'
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='Название ресторана'
            type='text'
            fullWidth
            variant='standard'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            id='description'
            label='Описание ресторана (оно будет отображаться в приложении)'
            type='text'
            fullWidth
            variant='standard'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            id='location'
            label='Адрес ресторана (улица и дом)'
            type='text'
            fullWidth
            variant='standard'
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            id='workTime'
            label='Время работы ресторана (пример - 10:00 - 22:00)'
            type='text'
            fullWidth
            variant='standard'
            value={workTime}
            onChange={(e) => {
              setWorkTime(e.target.value);
            }}
          />
          <label htmlFor='fileUpload'>
            <p className='btn btn-primary'>Фотографии ресторана</p>
          </label>
          <input
            id='fileUpload'
            type='file'
            multiple
            accept='application/pdf, image/png'
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenAddNewRestaurant(false);
            }}
          >
            Отменить
          </Button>
          <Button type='submit'>Добавить</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAddNewFood}>
        <DialogTitle>Добавить еду</DialogTitle>
        <DialogContent>
          <DialogContentText>Добавьте новое блюдо в ресторан</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='foodTitle'
            label='Название блюда'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='foodDescription'
            label='Описание блюда (оно будет отображаться в приложении)'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='price'
            label='Цена блюда'
            type='text'
            fullWidth
            variant='standard'
          />
          <label htmlFor='foodUpload'>
            <p className='btn btn-primary'>Фотография блюда</p>
          </label>
          <input
            id='foodUpload'
            type='file'
            multiple
            accept='application/pdf, image/png'
          />
        </DialogContent>
        <DialogActions>
          <Button>Отмена</Button>
          <Button>Добавить</Button>
        </DialogActions>
      </Dialog>
      <div className='content'>
        <Box
          sx={{
            minWidth: 320,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '30px',
          }}
          onChange={selectHandler}
        >
          <FormControl sx={{ width: '40%' }}>
            <InputLabel variant='standard' htmlFor='uncontrolled-native'>
              {restaurants.length > 0 ? 'Выберите ресторан' : 'Загрузка...'}
            </InputLabel>
            <NativeSelect
              defaultValue={null}
              inputProps={{
                name: 'restaurant',
                id: 'uncontrolled-native',
              }}
              disabled={restaurants.length < 1}
            >
              <option></option>
              {restaurants.map((restaurant) => (
                <option key={`${restaurant._id}res`} value={restaurant._id}>
                  {restaurant.title}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <Box>
            <Fab color='primary' aria-label='add' onClick={handleClickOpen}>
              {currentRestaurant?._id ? <EditIcon /> : <AddIcon />}
            </Fab>
          </Box>
        </Box>
        <div className='restaurant__images'>
          {currentRestaurant?.images.map((image, index) => (
            <div className='restaurant__img'>
              <img
                src={image}
                alt='restaurant'
                key={`${index} ${currentRestaurant.title}`}
              />
            </div>
          ))}
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={foods}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};
