import React, { useState } from 'react'
import styles from '../product_review.module.css';

function CommentBox({ onComment, avatar, username }) {
    const [comment, setComment] = useState('');
    const [userRating, setUserRating] = useState(0);

    const handleCancel = () => {
        setComment('');
        setUserRating(0);
    }

    const handleRatingChange = (e) => {
        setUserRating(parseInt(e.target.value));
    }

    const handleSubmit = (e) => {
        if (!comment || userRating === 0) {
            alert('Please enter a comment and a rating!');
            return;
        }
        onComment({ comment, userRating });
        setComment('');
        setUserRating(0);
    };

    return (
        <div className='flex items-center'>
            <img src={avatar ||  '/guest_avatar.png'} className='rounded-full w-[50px] h-[50px]' />

            <form action={handleSubmit} className='relative w-full'>
                <div className={styles.input_container}>
                    <input placeholder="Enter comment" name='comment' className={styles.input_field} type="text"
                        value={comment} onChange={(e) => setComment(e.target.value)} />
                    <span className={styles.input_highlight}></span>
                </div>

                <div className='flex items-center justify-between gap-2'>
                    <label className='ml-5 flex items-center gap-2'>
                        Your rating:
                        <div className={styles.rating}>
                            <input value="5" name="rate" id="star5" type="radio" checked={userRating === 5} onChange={handleRatingChange} />
                            <label title="text" htmlFor="star5"></label>
                            <input value="4" name="rate" id="star4" type="radio" checked={userRating === 4} onChange={handleRatingChange} />
                            <label title="text" htmlFor="star4"></label>
                            <input value="3" name="rate" id="star3" type="radio" checked={userRating === 3} onChange={handleRatingChange} />
                            <label title="text" htmlFor="star3"></label>
                            <input value="2" name="rate" id="star2" type="radio" checked={userRating === 2} onChange={handleRatingChange} />
                            <label title="text" htmlFor="star2"></label>
                            <input value="1" name="rate" id="star1" type="radio" checked={userRating === 1} onChange={handleRatingChange} />
                            <label title="text" htmlFor="star1"></label>
                        </div>
                    </label>

                    <div className='flex justify-center gap-2'>
                        <button onClick={handleCancel} className=' rounded-3xl py-2 px-5 border border-transparent hover:border-gray-200'>Cancel</button>
                        <button type='submit' className='bg-orange-300 hover:bg-orange-500 text-white rounded-3xl  py-2 px-5 border'>Comment</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default CommentBox