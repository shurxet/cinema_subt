// src/hooks/userHooks/useUpdateUserProfile.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import { useUserProfile } from './useUserProfile';
import {
  updateUserProfileData,
  updateUserProfilePhoto
} from '../../services/user/fetchUserProfile.tsx';


const useUpdateUserProfile = () => {
  const { accessToken } = useAuth();
  const { userProfile, setUserProfile } = useUserProfile();
  const [file, setFile] = useState<File | null>(null);

  const [userData, setUserData] = useState<UserProfileType | null>();
  const [userImage, setUserImage] = useState<File | null>(null);

  const [updateFlag, setUpdateFlag] = useState(false); // Состояние для принудительного обновления компонента

  const [isError, setIsError] = useState(false); // Состояние для отслеживания ошибок
  const [errors, setErrors] = useState<ErrorsFomUpdateProfile>({}); // Add errors state

  useEffect(() => {
    const updateUserPhoto = async (file: File) => {
      try {
        const profileData = await updateUserProfilePhoto(file);
        setUserProfile(profileData);
        setUpdateFlag(prev => !prev); // Изменяем состояние для принудительного обновления компонента
        window.location.reload()
      } catch (err) {
        console.error(err);
      }
    };

    if (accessToken && file) {
      updateUserPhoto(file);
    }
  }, [accessToken, file, setUserProfile]);


  useEffect(() => {
      const updateUserData = async (data: UserProfileType, image: File | null) => {
          try {
              const profileUserData = await updateUserProfileData(data, image);
              setUserProfile(profileUserData);
              setUpdateFlag(prev => !prev); // Изменяем состояние для принудительного обновления компонента
              setIsError(false); // Сбрасываем ошибку при успешном обновлении
              window.location.reload()

          } catch (err) {
              setIsError(true); // Устанавливаем ошибку
              console.error('Update profile error:', err);

              if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                    const errorData = (err as ResponseError).data;
                    const status = (err as ResponseError).status;

                    if (status && errorData) {

                        // Создаем объект для ошибок
                        const formattedErrors: Record<string, string> = {};

                        // Преобразуем ошибки из массива в строку
                        for (const key in errorData) {
                            if (errorData[key] && Array.isArray(errorData[key])) {
                                formattedErrors[key] = errorData[key][0];
                            }
                        }

                        // Устанавливаем ошибки в состояние
                        setErrors(formattedErrors);
                    } else {
                        setErrors({ general: 'An unknown error occurred while updating the profile.' });
                    }

              } else {
                  setErrors({ general: 'An unknown error occurred while updating the profile.' });
              }
          }
      }

      if (accessToken && userData && !isError) {
          updateUserData(userData, userImage);
      }
  
  }, [accessToken, setUserProfile, userData, userImage, userProfile, isError, errors]);   


  const handleUploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

 const handleUpdateUserData = (data: UserProfileType | null, image: File | null) => {
   console.log('data', data)
   console.log('image', image)

  if (data && Object.keys(data).length > 0) { // Проверяем, что данные существуют и не пусты
    setUserData(data);
  }
    if (image) { // Проверяем, что изображение существует
      setUserImage(image);
    }
    console.log('userData', userData)
    console.log('userImage', userImage)

  };

  return {
    userProfile,
    setUserProfile,
    handleUploadPhoto,
    handleUpdateUserData,
    file,
    updateFlag, // Добавляем updateFlag в возвращаемые значения
    errors,
    setErrors,
    setIsError
  };
};

export default useUpdateUserProfile;
