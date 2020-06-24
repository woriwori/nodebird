import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';

const Home = () => {
    const { isLoggedIn } = useSelector((state) => state.user); // state 접근하는 방법
    const { mainPosts } = useSelector((state) => state.post);

    return (
        <div>
            {isLoggedIn && <PostForm />}
            {mainPosts.map((c) => {
                return <PostCard key={c} post={c} />;
            })}
        </div>
    );
};

export default Home;
