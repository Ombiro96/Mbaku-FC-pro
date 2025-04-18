import { premierLeagueTeams } from './teams';
import { boardPerformances } from './boards';
import { rounds } from './rounds';

export const leagueData = {
  premierLeague: {
    teams: premierLeagueTeams,
    boardPerformances,
    rounds,
    metadata: {
      name: "Kenya National Chess League - Premier League",
      year: 2025,
      totalRounds: 17,
      completedRounds: 12,
      lastUpdate: "31.03.2025"
    }
  },
  superLeagueA: {
    teams: [],
    boardPerformances: {},
    rounds: [],
    metadata: {
      name: "Kenya National Chess League - Super League A",
      year: 2025,
      totalRounds: 17,
      completedRounds: 12,
      lastUpdate: "31.03.2025"
    }
  },
  superLeagueB: {
    teams: [],
    boardPerformances: {},
    rounds: [],
    metadata: {
      name: "Kenya National Chess League - Super League B",
      year: 2025,
      totalRounds: 17,
      completedRounds: 12,
      lastUpdate: "31.03.2025"
    }
  }
};

export const getTeamStats = (teamId) => {
  const team = premierLeagueTeams.find(t => t.id === teamId);
  if (!team) return null;

  return {
    ...team,
    matchResults: rounds.map(round =>
      round.matches.find(match =>
        match.homeTeam === team.name || match.awayTeam === team.name
      )
    ).filter(Boolean)
  };
};

export const getBoardStats = (boardNumber) => {
  return boardPerformances[`board${boardNumber}`] || null;
};

export {
  premierLeagueTeams,
  boardPerformances,
  rounds
};

export default leagueData;