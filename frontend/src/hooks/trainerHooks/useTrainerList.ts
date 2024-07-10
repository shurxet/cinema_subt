// src/hooks/trainerHooks/useTrainerList.ts
import {useEffect, useState} from "react";
import {getTrainerList} from "../../services/trainer/trainerApi.ts";


const useTrainerList = () => {
    const [trainers, setLessons] = useState<TrainerListType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTrainerList()
            .then(data => {
                setLessons(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Ошибка при загрузке данных');
                setLoading(false);
            });
        }, []
    );

    return { trainers, loading, error };
}

export default useTrainerList;
