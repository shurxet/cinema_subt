import styles from './css/User.module.css';
import React from "react";


interface Subscriptions {
  id: number;
  status: string;
  title: string;
  content: string;
}


const UserSubscriptions: React.FC = () => {
  const subscriptions: Subscriptions[] = [
    { id: 1, title: 'Тариф Начальный', content: '200 рублей 1 месяц', status: 'неактивен'},
    { id: 2, title: 'Тариф Средний', content: ' 1000 рублей 6 месяцев', status: 'неактивен'},
    { id: 3, title: 'Тариф ProMax', content: '2000 рублей 12 месяцев', status: 'активен'},
  ];

  return (
      <div className={styles.container_user_posts}>
        <h3>Подписки</h3>
        <div className={styles.user_posts}>
        {subscriptions.map(i => (
            <div key={i.id}>
            <div className={styles.post}>
              <h4>{i.title} {i.status}</h4>
              <p>{i.content}</p>
            </div>
            </div>
        ))}
        </div>
      </div>
  );
};

export default UserSubscriptions;
