import React from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// COMPONENTS
import ChallengeCard from '../features/challenge/ChallengeCard';

// ----------------------------------------------------------------------------------
// --------------------------------- PROFILE PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const ProfilePage = ({ acceptedChallenges, challenge_game_stats, featured_challenge }) => {
  return (
    <>
      <div className="lg:flex justify-between">

        {/* STATS */}
        <div className="mr-3 w-full lg:w-2/5 h-full pb-4 px-10 bg-profileone rounded-lg text-white">
          <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
            Stats
          </h1>
          <div className='rounded-lg bg-gray-700'>
            <div className='flex justify-between px-4 py-1 font-bold'>
              <p>
                Game
              </p>
              <p>
                Quests Completed
              </p>
            </div>
            {challenge_game_stats.map((gameStat, index) => (
              <Link
                key={gameStat.game}
                to={`/games/${gameStat.game_id}`}
                className={`flex justify-between ${index % 2 ? 'bg-gray-600' : 'bg-gray-500'} px-4 py-1 hover:bg-white hover:text-profiletwo`}
              >
                <p>{gameStat.game}</p>
                <p className='pl-4'>{gameStat.total_challenges_completed}</p>
              </Link>
            ))}
            <p className='invisible'>
              INVISIBLE TEXT TO SHOW ROUNDED BORDER
            </p>
          </div>
        </div>

        <div className='w-full lg:w-3/5'>
          {/* FEATURED CHALLENGE */}
          <div className="px-10 mb-3 pb-4 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Featured Quest
            </h1>
            <img
              className='h-full w-full rounded-md'
              src={featured_challenge.banner_pic_URL}
              alt='banner for a single game'
            />
            <p>
              {featured_challenge.name}
            </p>
            <p>
              {featured_challenge.description}
            </p>
          </div>

          {/* ACTIVE CHALLENGES */}
          <div className="px-10 pb-4 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Active Quests
            </h1>
            <div className='grid gap-6 grig-cols-1'>
              {acceptedChallenges.map(acceptedChallenge => (
                <Link
                  key={acceptedChallenge.challenge_id}
                  to={`/${acceptedChallenge.username}/challenges/${acceptedChallenge.challenge_id}`}
                >
                  <ChallengeCard
                    key={acceptedChallenge.challenge_id}
                    data={acceptedChallenge}
                  />
                </Link>
              ))}
            </div>
            {/* FIXES WEIRD MARGIN ISSUE WHEN IN MOBILE VIEW */}
            {/* <div className='invisible pt-1' /> */}
          </div>
        </div>
      </div >
    </>
  );
}

export default ProfilePage;