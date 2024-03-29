import { Box, Pagination, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExercisesCard from './ExercisesCard';
import { exerciseOptions, fetchData } from '../utils/fetchData';

function Exercises({exercises , setExercises , bodyPart}) {
    // console.log(exercises);
    const [currentPage , setCurrentPage] = useState(1);
    const exercisesPerPage = 9;
    const indexOfLastExercises = currentPage * exercisesPerPage;
    const indexOfFirstExercises = indexOfLastExercises - exercisesPerPage;
    const currentExercises = exercises.slice(indexOfFirstExercises,indexOfLastExercises);

    const pageInit = (e , value) => {
        setCurrentPage (value);
        window.scrollTo({top:1800 , behavior:'smooth'})
    }

    useEffect(()=>{
        const fetchExercisesData = async () => { 
            let exercisesData = [];
            if(bodyPart === 'all'){
                exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises' 
                , exerciseOptions);
            } else {
                exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}` 
                , exerciseOptions);
            }
            setExercises(exercisesData);
        }
        fetchExercisesData();
    },[bodyPart])
    return (
        <Box id='exercises' 
        sx={{mt:{lg:'110px'}}}
        mt={'50px'}
        p={'20px'}
        >
            <Typography variant='h4' mb={'46px'}>Showing Results</Typography>
            <Stack direction={'row'} sx={{gap:{lg:'110px' ,xs:'50px'}}} flexWrap={'wrap'} justifyContent={'center'}>
                {currentExercises.map((exercise,index)=>(
                    <ExercisesCard key={index} exercise={exercise}/>
                ))}
            </Stack>
            <Stack mt={'100px'} alignItems={'center'}>
                    {exercises.length > 9 && (
                    <Pagination color='standard' shape='rounded'
                    defaultPage={1} count={Math.ceil(exercises.length/exercisesPerPage)} page={currentPage}
                    onChange={pageInit} size='large'
                    />)}
                    {/* {exercises.map((exercise , index) => (<p>{exercise.name }</p>))} */}
            </Stack>
        </Box>
    );
}

export default Exercises;