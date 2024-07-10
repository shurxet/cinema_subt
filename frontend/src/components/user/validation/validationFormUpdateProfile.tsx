// src/components/user/validation/validationFormUpdateProfile.tsx

export const validateUsername = (username: string): string | null  => {
    if (!username) {
        return 'Введите никнейм';
    }
    return null;
};

export const validateFirstName = (firstName: string): string | null   => {
    if (!firstName) {
        return 'Введите имя';
    }
    return null;
};

export const validateLastName = (lastName: string): string | null   => {
    if (!lastName) {
        return 'Введите фамилию';
    }
    return null;
};

export const validateAge = (age: number): string | null   => {
    // if (!age) {
    //     return 'Введите возраст';
    // } else

        if (age <= 0) {
            return 'Возраст должен быть положительным числом';
        }

    return null;
};

export const validateEmail = (email: string): string | null   => {
    // if (!email) {
    //     return 'Введите email';
    // } else
        if (email && !/\S+@\S+\.\S+/.test(email)) {
        return 'Электоронная почта должа быть формата name@email.ru, name@gmail.com';
    }
    return null;
};

export const validatePhone = (phone: string): string | null   => {
    // if (!phone) {
    //     return 'Введите телефон';
    // } else
        if (phone && !/^\+\d{10,15}$/.test(phone)) {
        return 'Номер телефона должен начинаться с знака "+" и содержать от 10 до 15 цифр';
    }
    return null;
};