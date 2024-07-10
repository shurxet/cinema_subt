// src/components/user/UserDetails.tsx

import styles from './css/User.module.css';
import React, {useEffect, useState} from "react";
import useUpdateUserProfile from "../../hooks/userHooks/useUpdateUserProfile.tsx";
import {
    validateAge,
    validateEmail,
    validatePhone,
} from "./validation/validationFormUpdateProfile.tsx";
import {Link} from "react-router-dom";


interface UserDetailsProps {
    response?: UserProfileType | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({response}) => {

    const { handleUpdateUserData, errors, setIsError } = useUpdateUserProfile();

    const [username, setUsername] = useState(response?.username);
    const [firstName, setFirstName] = useState(response?.first_name || null);
    const [lastName, setLastName] = useState(response?.last_name || null);
    const [age, setAge] = useState(response?.age?.toString() || null);
    const [email, setEmail] = useState(response?.email || null);
    const [phone, setPhone] = useState(response?.phone || null);
    const [image, setImage] = useState<File | null>(null); // Добавляем состояние для image
    const [isEditing, setIsEditing] = useState(false);
    const [localErrors, setLocalErrors] = useState<ErrorsFomUpdateProfile>({});
    const [isClicked, setIsClicked] = useState(false);


    useEffect(() => {
        if (response) {
            setUsername(response.username);
            setFirstName(response.first_name || '');
            setLastName(response.last_name || '');
            setAge(response.age?.toString() || '');
            setEmail(response.email || '');
            setPhone(response.phone || '');
        }
    }, [response]);


    const toggleEditMode = () => {
        setIsEditing(true);
        handleClickGear()
    };

    const handleClose = () => {
        setIsEditing(false);
        // Дополнительные действия по закрытию формы
    };

    const handleClickGear = () => {
        setIsClicked(true);

        // Убираем класс 'active' через одну секунду
        setTimeout(() => {
          setIsClicked(false);
        }, 350);
    }



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSave = () => {
        if (!response) {
            throw new Error("No response data to update");
        }

        const fields: Array<{
            defaultValue: string | null | undefined;
            key: string;
            value: string | null | undefined
        } | {
            defaultValue: string | null;
            key: string;
            value: string | null
        } | {
            defaultValue: number | null;
            key: string;
            value: null | number
        } | {
            defaultValue: string | null;
            key: string;
            value: File | null
        }> = [
            { key: 'username', value: username, defaultValue: response.username },
            { key: 'first_name', value: firstName, defaultValue: response.first_name },
            { key: 'last_name', value: lastName, defaultValue: response.last_name },
            { key: 'age', value: age ? parseInt(age, 10) : null, defaultValue: response.age },
            { key: 'email', value: email, defaultValue: response.email },
            { key: 'phone', value: phone, defaultValue: response.phone },
            { key: 'image', value: image, defaultValue: response.image }
        ];

        const userData: any = {};

        fields.forEach(field => {
            if (field.value !== null && field.value !== '') {
                userData[field.key] = field.value;
            } else if (field.defaultValue !== null && field.defaultValue && field.defaultValue !== '') {
                userData[field.key] = field.defaultValue;
            }
        });
        return userData as UserProfileType;
    }

    const handleUpdateProfile = async () => {
        if (validateForm()) {
            setIsError(false);
            const userData = handleSave();
            try {
                handleUpdateUserData(userData, image);
                if (!errors) {
                    setIsEditing(false);
                }
            } catch (error) {
                console.error(error);
                console.log('Update User Data Error', errors)
            }
        }
        console.log('errors', errors)
    };
    const validateForm = () => {
         const newErrors: ErrorsFomUpdateProfile = {};

        // const usernameError = validateUsername(username || '');
        // if (usernameError) newErrors.username = usernameError;
        //
        // const firstNameError = validateFirstName(firstName || '');
        // if (firstNameError) newErrors.firstName = firstNameError;
        //
        // const lastNameError = validateLastName(lastName || '');
        // if (lastNameError) newErrors.lastName = lastNameError;

        // Проверка, что age корректно преобразуется в число
        // const ageNumber = age ? Number(age) : NaN;
        // const ageError = validateAge(ageNumber);

        if (age !== null && age !== '' && age !== undefined) {
            const ageNumber = age ? Number(age) : NaN;
            const ageError = validateAge(ageNumber);
            if (ageError) newErrors.age = ageError;
        }

        const emailError = validateEmail(email || '');
        if (emailError) newErrors.email = emailError;

        const phoneError = validatePhone(phone || '');
        if (phoneError) newErrors.phone = phoneError;

        setLocalErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    return (
        <div className={styles.userDetails}>
            <div onClick={toggleEditMode} className={styles.gearWrapper}>
                <div className={styles.trainerButtonContainer}>
                    <Link to={`/trainer/`}>
                        <button className={styles.trainerButton}>самоучитель английского</button>
                    </Link>
                </div>
                <div className={styles.gearWrapperContainer}>
                    <div className={styles.gearContainer}>
                        {/*<div className={`${styles.gear} ${isClicked ? styles.hover : ''} ${isClicked ? styles.active : ''}`}>*/}
                        <div className={`${styles.gear} ${isClicked ? styles.active : ''}`}>
                            <div className={styles.tooth}></div>
                            <div className={styles.tooth}></div>
                            <div className={styles.tooth}></div>
                            <div className={styles.tooth}></div>
                            <div className={styles.tooth}></div>
                            <div className={styles.tooth}></div>
                            <div className={styles.tooth}></div>
                            <div className={styles.tooth}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.profileAvatarWrapper}>
                <div className={styles.profileAvatarContainer}>
                    <div className={styles.profileAvatarImgContainer}>
                        <img src={response?.image || ''} alt={`${response?.username}'s avatar`}
                             className={styles.profileAvatarImg}/>
                    </div>
                </div>
            </div>
            <h2 className={styles.userName}>{response?.username}</h2>
            {isEditing ? (

                <div className={styles.editingForm}>
                    <div className={styles.closeContainer}>
                        <button onClick={handleClose} className={styles.closeButton}>✖</button>
                    </div>
                    <h3>Редактирование профиля</h3>
                    <input
                        type="text"
                        name="username"
                        placeholder='никнейм'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.inputField}
                    />{localErrors.username && <p className={styles.error}>{localErrors.username}</p>}
                    {errors.username && <p className={styles.error}>{errors.username}</p>}
                    <input
                        type="text"
                        placeholder='имя'
                        value={firstName ? firstName : ''}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={styles.inputField}
                    />{localErrors.firstName && <p className={styles.error}>{localErrors.firstName}</p>}
                    {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
                    <input
                        type="text"
                        name="last_name"
                        placeholder='фамилия'
                        value={lastName ? lastName : ''}
                        onChange={(e) => setLastName(e.target.value)}
                        className={styles.inputField}
                    />{localErrors.lastName && <p className={styles.error}>{localErrors.lastName}</p>}
                    {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
                    <input
                        type="number"
                        name="age"
                        placeholder='возраст'
                        value={age ? age : ''}
                        onChange={(e) => setAge(e.target.value)}
                        className={styles.inputField}
                    />{localErrors.age && <p className={styles.error}>{localErrors.age}</p>}
                    {errors.age && <p className={styles.error}>{errors.age}</p>}
                    <input
                        type="email"
                        name="email"
                        placeholder='email'
                        value={email ? email : ''}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.inputField}
                    />{localErrors.email && <p className={styles.error}>{localErrors.email}</p>}
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                    <input
                        type="tel"
                        name="phone"
                        placeholder='телефон'
                        value={phone ? phone : ''}
                        onChange={(e) => setPhone(e.target.value)}
                        className={styles.inputField}
                    />{localErrors.phone && <p className={styles.error}>{localErrors.phone}</p>}
                    {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className={styles.inputField}
                    />
                    <button onClick={handleUpdateProfile} className={styles.saveButton}>Сохранить</button>
                </div>

            ) : (
                <div className={styles.userInfo}>
                    <div className={styles.userInfo}>
                        <p className={styles.userBio}>Имя: {response?.first_name}</p>
                        <p className={styles.userBio}>Фамилия: {response?.last_name}</p>
                        <p className={styles.userBio}>Возраст: {response?.age}</p>
                        <p className={styles.userBio}>Email: {response?.email}</p>
                        <p className={styles.userBio}>Телефон: {response?.phone}</p>
                    </div>
                    <div className={styles.editButtonContainer}>
                        <button onClick={toggleEditMode} className={styles.editButton}>Редактировать</button>
                    </div>
                </div>
            )
            }
        </div>
    )
};

export default UserDetails;
