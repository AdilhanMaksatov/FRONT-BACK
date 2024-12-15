import { useEffect, useState } from 'react';

const HomePage = () => {
    const [homeData, setHomeData] = useState(null);

    useEffect(() => {
        fetch('/api/home')
            .then((response) => response.json())
            .then((data) => setHomeData(data));
    }, []);

    if (!homeData) return <div>Loading...</div>;

    return (
        <div>
            <h1>{homeData.welcome_message}</h1>
            <div>
                <h2>Статистика</h2>
                <p>Пользователи: {homeData.stats.users}</p>
                <p>Посты: {homeData.stats.posts}</p>
            </div>
            <div>
                <h2>Новости</h2>
                {homeData.news.map((item, index) => (
                    <div key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;