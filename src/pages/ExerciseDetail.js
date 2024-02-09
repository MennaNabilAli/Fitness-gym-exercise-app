import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Detail from '../components/Detail';
import ExercisesVideos from '../components/ExercisesVideos';
import SimilarExercise from '../components/SimilarExercise';
import { useParams } from 'react-router';
import {exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';

function ExerciseDetail(props) {
    const [exerciseDetail , setExerciseDetail] = useState({});
    const [exerciseVideos , setExerciseVideos] = useState([]);
    const [targetMuscleExercises , setTargetMuscleExercises] = useState([]);
    const [equipmentExercises , setEquipmentExercises] = useState([]);


    const {id} = useParams(); 
    useEffect(()=>{
        const fetchExercisesData = async () => {
            const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
            const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

            const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}` , exerciseOptions);
            setExerciseDetail(exerciseDetailData);
            const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise` 
            , youtubeOptions);
            setExerciseVideos(exerciseVideosData.contents);

            const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}` , exerciseOptions);
            setTargetMuscleExercises(targetMuscleExercisesData);

            const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}` , exerciseOptions);
            setEquipmentExercises(equipmentExercisesData);
        }

        fetchExercisesData();
    },[id])

    return (
        <Box>
            <Detail exerciseDetail={exerciseDetail}/>
            <ExercisesVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
            <SimilarExercise targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
        </Box>
    );
}

export default ExerciseDetail;