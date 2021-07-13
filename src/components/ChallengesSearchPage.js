import React, { useState, useEffect } from 'react';

// STATE
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDifficulties,
  difficultySelector
} from '../features/difficulty/difficultySlice';
import {
  fetchSystems,
  systemSelector
} from '../features/system/systemSlice';
import {
  fetchPublicGames,
  gameSelector
} from '../features/game/gameSlice';

// STYLING
import styled from '@emotion/styled';

// COMPONENTS
import ChallengeList from '../features/challenge/ChallengeList';

// ----------------------------------------------------------------------------------
// ---------------------------- CHALLENGES SEARCH PAGE ------------------------------
// ----------------------------------------------------------------------------------

const ChallengesSearchPage = ({ accepted_challenges, created_challenges, completed_challenges, filteredCreatedChallenges, filteredAcceptedChallenges, filteredCompletedChallenges, setFilteredCreatedChallenges, setFilteredAcceptedChallenges, setFilteredCompletedChallenges, currentGame, setCurrentGame, searchTerm, handleClearSearchBar, ProfileTwo, user }) => {
  const dispatch = useDispatch();
  const { difficulties } = useSelector(difficultySelector);
  const { systems } = useSelector(systemSelector)
  const { public_games } = useSelector(gameSelector)
  const [currentChallengeFilter, setCurrentChallengeFilter] = useState('Created')

  // Grabs filterable data from the server
  useEffect(() => {
    dispatch(fetchDifficulties())
    dispatch(fetchSystems())
    dispatch(fetchPublicGames())
  }, [dispatch])

  // Filter all challenges
  const filterReset = () => {
    var gameBox = document.getElementById("gameBox");

    if (currentGame.game && gameBox.selectedIndex === 0) {
      setFilteredCreatedChallenges(created_challenges.filter(crc => crc.game_title === currentGame.game))
      setFilteredAcceptedChallenges(accepted_challenges.filter(ac => ac.game_title === currentGame.game))
      setFilteredCompletedChallenges(completed_challenges.filter(coc => coc.game_title === currentGame.game))
    } else if (gameBox.selectedIndex > 0) {
      setFilteredCreatedChallenges(created_challenges.filter(crc => crc.game_title === gameBox.options[gameBox.selectedIndex].value))
      setFilteredAcceptedChallenges(accepted_challenges.filter(ac => ac.game_title === gameBox.options[gameBox.selectedIndex].value))
      setFilteredCompletedChallenges(completed_challenges.filter(coc => coc.game_title === gameBox.options[gameBox.selectedIndex].value))
    }
    else {
      setFilteredCreatedChallenges(created_challenges)
      setFilteredAcceptedChallenges(accepted_challenges)
      setFilteredCompletedChallenges(completed_challenges)
    }
    var selectBox = document.getElementById("difficultyBox");
    selectBox.selectedIndex = 0;
    var selectBox = document.getElementById("systemBox");
    selectBox.selectedIndex = 0;
  }

  // Filter master
  const filterMaster = () => {
    var systemBox = document.getElementById("systemBox");
    var difficultyBox = document.getElementById("difficultyBox");
    var gameBox = document.getElementById("gameBox");
    var selectedSystemValue = systemBox.options[systemBox.selectedIndex].value;
    var selectedDifficultyValue = difficultyBox.options[difficultyBox.selectedIndex].value;
    var selectedGameValue = gameBox.options[gameBox.selectedIndex].value;

    if (currentChallengeFilter === 'Created') {
      var filtered = created_challenges.filter(fc => {
        if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select' && selectedGameValue === 'Select') {
          return fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue === 'Select') {
          return fc.system === selectedSystemValue
        } else if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue !== 'Select') {
          return fc.game_title === selectedGameValue
        } else if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select' && selectedGameValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue && fc.game_title === selectedGameValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue !== 'Select') {
          return fc.system === selectedSystemValue && fc.game_title === selectedGameValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select' && selectedGameValue === 'Select') {
          return fc.system === selectedSystemValue && fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select' && selectedGameValue !== 'Select') {
          return fc.system === selectedSystemValue && fc.difficulty === selectedDifficultyValue && fc.game_title === selectedGameValue
        } else if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue === 'Select') {
          return
        }
      })
      if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue === 'Select') {
        setFilteredCreatedChallenges(created_challenges)
      } else {
        setFilteredCreatedChallenges(filtered)
      }
    } else if (currentChallengeFilter === 'Active') {
      var filtered = accepted_challenges.filter(fc => {
        if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select' && selectedGameValue === 'Select') {
          return fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue === 'Select') {
          return fc.system === selectedSystemValue
        } else if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue !== 'Select') {
          return fc.game_title === selectedGameValue
        } else if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select' && selectedGameValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue && fc.game_title === selectedGameValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue !== 'Select') {
          return fc.system === selectedSystemValue && fc.game_title === selectedGameValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select' && selectedGameValue === 'Select') {
          return fc.system === selectedSystemValue && fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select' && selectedGameValue !== 'Select') {
          return fc.system === selectedSystemValue && fc.difficulty === selectedDifficultyValue && fc.game_title === selectedGameValue
        }
      })
      if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue === 'Select') {
        setFilteredAcceptedChallenges(accepted_challenges)
      } else {
        setFilteredAcceptedChallenges(filtered)
      }
    } else if (currentChallengeFilter === 'Completed') {
      var filtered = completed_challenges.filter(fc => {
        if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select' && selectedGameValue === 'Select') {
          return fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue === 'Select') {
          return fc.system === selectedSystemValue
        } else if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue !== 'Select') {
          return fc.game_title === selectedGameValue
        } else if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select' && selectedGameValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue && fc.game_title === selectedGameValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue !== 'Select') {
          return fc.system === selectedSystemValue && fc.game_title === selectedGameValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select' && selectedGameValue === 'Select') {
          return fc.system === selectedSystemValue && fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select' && selectedGameValue !== 'Select') {
          return fc.system === selectedSystemValue && fc.difficulty === selectedDifficultyValue && fc.game_title === selectedGameValue
        }
      })
      if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && selectedGameValue === 'Select') {
        setFilteredCompletedChallenges(completed_challenges)
      } else {
        setFilteredCompletedChallenges(filtered)
      }
    }
  }

  const ProfileOneCreatedButton = styled.button`
    background-color: ${currentChallengeFilter === 'Created' ? user.profile_color_one : null};
  `
  const ProfileOneActiveButton = styled.button`
    background-color: ${currentChallengeFilter === 'Active' ? user.profile_color_one : null};
  `
  const ProfileOneCompletedButton = styled.button`
    background-color: ${currentChallengeFilter === 'Completed' ? user.profile_color_one : null};
  `

  return (
    <div
      className='p-4 rounded-tr-md bg-profileone rounded-b-md'
      style={{ backgroundColor: user.profile_color_one ? user.profile_color_one : null }}
    >
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
        {/* CHALLENGE LIST */}
        <ProfileTwo className="mr-3 w-full lg:w-4/5 h-full pb-4 px-10 bg-profiletwo rounded-lg text-white">
          <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
            {currentChallengeFilter === 'Created' ? 'Created Quests' :
              currentChallengeFilter === 'Active' ? 'Active Quests' :
                currentChallengeFilter === 'Completed' ? 'Completed Quests' :
                  null
            }
          </h1>
          <ChallengeList
            challenges={
              currentChallengeFilter === 'Created' ? filteredCreatedChallenges :
                currentChallengeFilter === 'Active' ? filteredAcceptedChallenges :
                  currentChallengeFilter === 'Completed' ? filteredCompletedChallenges :
                    null
            }
            searchTerm={searchTerm}
            handleClearSearchBar={handleClearSearchBar}
            user={user}
          />
        </ProfileTwo>

        {/* CHOSEN GAME */}
        <div className='w-full lg:w-1/5'>
          <div
            className={`px-10 pb-4 lg:mb-0 bg-profiletwo rounded-lg text-white`}
            style={{ backgroundColor: user.profile_color_two ? user.profile_color_two : null }}
          >
            <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
              Game
            </h1>
            <div className='flex flex-col'>
              <select name='game' id='gameBox' onChange={filterMaster} className='text-black px-1 rounded-md'>
                <option value={'Select'}>All</option>
                {public_games.map(game => (
                  <option key={game.id} value={game.name} selected={game.name === currentGame.game ? true : null}>{game.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* CHALLENGE TYPE */}
          <ProfileTwo className="px-10 mb-3 mt-3 pb-4 bg-profiletwo rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
              Quest Type
            </h1>
            <div className='flex flex-col'>
              <ProfileOneCreatedButton
                className={currentChallengeFilter === 'Created' ?
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profileone focus:outline-none transition duration-150 ease-in-out" :
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:outline-none transition duration-150 ease-in-out"}
                onClick={() => {
                  setCurrentChallengeFilter('Created')
                  filterReset()
                  handleClearSearchBar()
                }}
              >
                Created
              </ProfileOneCreatedButton>
              <ProfileOneActiveButton
                className={currentChallengeFilter === 'Active' ?
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profileone focus:outline-none transition duration-150 ease-in-out" :
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:outline-none transition duration-150 ease-in-out"}
                onClick={() => {
                  setCurrentChallengeFilter('Active')
                  filterReset()
                  handleClearSearchBar()
                }}
              >
                Active
              </ProfileOneActiveButton>
              <ProfileOneCompletedButton
                className={currentChallengeFilter === 'Completed' ?
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profileone focus:outline-none transition duration-150 ease-in-out" :
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:outline-none transition duration-150 ease-in-out"}
                onClick={() => {
                  setCurrentChallengeFilter('Completed')
                  filterReset()
                  handleClearSearchBar()
                }}
              >
                Completed
              </ProfileOneCompletedButton>
            </div>
          </ProfileTwo>

          {/* FILTERS */}
          <div
            className={`px-10 pb-4 mb-3 lg:mb-0 bg-profiletwo rounded-lg text-white`}
            style={{ backgroundColor: user.profile_color_two ? user.profile_color_two : null }}
          >
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Filter By
            </h1>
            <div className='flex flex-col'>
              <button
                onClick={() => {
                  filterReset()
                  handleClearSearchBar()
                }}
                className={`items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:outline-none transition duration-150 ease-in-out`}
              >
                Reset
              </button>
              <select name='difficulty' id='difficultyBox' onChange={filterMaster} className='mb-4 text-black px-1 rounded-md'>
                <option value='Select' disabled selected>Difficulty</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.name}>{difficulty.name}</option>
                ))}
              </select>
              <select name='system' id='systemBox' onChange={filterMaster} className='mb-4 text-black px-1 rounded-md'>
                <option value='Select' disabled selected>System</option>
                {systems.map(system => (
                  <option key={system.id} value={system.name}>{system.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div >
    </div>
  );
}

export default ChallengesSearchPage;