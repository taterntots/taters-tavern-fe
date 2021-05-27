import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchChallengeById,
  acceptChallenge,
  challengeSelector
} from '../challenge/challengeSlice';

// ROUTING
import { useRouteMatch, useHistory } from 'react-router-dom';

// IMAGES
import { ReactComponent as LoadingSpinner } from '../../img/LoadingSpinner.svg';

// ----------------------------------------------------------------------------------
// ------------------------------- CHALLENGE DETAILS --------------------------------
// ----------------------------------------------------------------------------------

const ChallengeDetails = () => {
  // State
  const dispatch = useDispatch();
  const { challenge, loading: challengeLoading } = useSelector(challengeSelector)
  const route = useRouteMatch();
  const history = useHistory();

  console.log(route)

  // Grabs all necessary data from server
  useEffect(() => {
    dispatch(fetchChallengeById(route.params.challengeId))
  }, [dispatch])

  // Function to handle submitting Login form
  const submitChallengeAccepted = async () => {
    dispatch(acceptChallenge(route.params.challengeId))
      .then(res => {
        if (res.payload) {
          history.push(`/${localStorage.getItem('username')}/accepted`)
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <>
      <div className="p-10 bg-taterpurple rounded-lg text-white">
        <h1>
          {challenge.name}
        </h1>
        <br />

        {challenge.is_high_score ? (
          <p>Highscore</p>
        ) : challenge.is_speedrun ? (
          <p>Speedrun</p>
        ) : (
          <p>For Glory</p>
        )}
        <br />

        <p className='whitespace-pre-wrap border-2'>
          {challenge.rules}
        </p>
        <br />

        <button
          onClick={submitChallengeAccepted}
          className={`flex items-center rounded-lg text-lg px-24 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
        >
          {challengeLoading && (
            <LoadingSpinner />
          )}
          Accept
        </button>
      </div >
    </>
  );
}

export default ChallengeDetails;