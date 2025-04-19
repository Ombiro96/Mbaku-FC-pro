"""
Scraper for chess-results.com to collect tournament data and TPRs for Kenyan players.
"""
import re
import logging
import requests
from bs4 import BeautifulSoup
from typing import List, Optional, Tuple
from dataclasses import dataclass

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class Player:
    name: str
    fide_id: Optional[str]
    federation: str
    rating: Optional[int]
    title: Optional[str] = None
    club: Optional[str] = None

@dataclass
class TournamentResult:
    player: Player
    games_played: int
    total_rounds: int
    points: float
    tpr: Optional[float]
    has_walkover: bool
    rank: int
    start_rank: int

class ChessResultsScraper:
    BASE_URL = "https://chess-results.com"

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })

    def get_tournament_data(self, tournament_id: str) -> Tuple[str, List[TournamentResult]]:
        """Get tournament data for a given tournament ID."""
        try:
            # Fetch tournament info
            tournament_url = f"{self.BASE_URL}/tnr{tournament_id}.aspx?lan=1"
            response = self.session.get(tournament_url)
            soup = BeautifulSoup(response.text, 'html.parser')

            # Get tournament name
            title_text = soup.find('title').text
            title_parts = title_text.split('-')
            tournament_name = ' '.join(part.strip() for part in title_parts[3:]).strip() if len(title_parts) > 3 else title_parts[-1].strip()

            # Remove common redundant suffixes
            suffix_to_remove = "Open Section"
            if tournament_name.lower().endswith(suffix_to_remove.lower()):
                tournament_name = tournament_name[:-len(suffix_to_remove)].strip()

            # Get round count
            round_count = self._get_round_count(tournament_id)

            # Fetch standings
            standings_url = f"{self.BASE_URL}/tnr{tournament_id}.aspx?lan=1&art=1&rd={round_count}"
            response = self.session.get(standings_url)
            soup = BeautifulSoup(response.text, 'html.parser')

            # Parse standings
            results = self._parse_standings(soup, round_count, tournament_id)

            return tournament_name, results

        except Exception as e:
            logger.error(f"Error getting tournament data: {e}")
            return None, []

    def _get_round_count(self, tournament_id: str) -> int:
        """Get total number of rounds."""
        try:
            details_url = f"{self.BASE_URL}/tnr{tournament_id}.aspx?lan=1&art=1"
            response = self.session.get(details_url)
            soup = BeautifulSoup(response.text, 'html.parser')

            # Try to find round count in the page
            round_text = soup.find(string=re.compile(r'Round\s+\d+'))
            if round_text:
                round_match = re.search(r'Round\s+(\d+)', round_text)
                if round_match:
                    return int(round_match.group(1))

            # Default to 9 rounds if not found
            return 9

        except Exception as e:
            logger.error(f"Error getting round count: {e}")
            return 9

    def _parse_standings(self, soup: BeautifulSoup, total_rounds: int, tournament_id: str = None) -> List[TournamentResult]:
        """Parse standings table."""
        results = []
        try:
            table = soup.find('table', {'class': 'CRs1'})
            if not table:
                return results

            headers = self._get_table_headers(table)
            if not headers:
                return results

            rows = table.find_all('tr')[1:]  # Skip header row
            for row in rows:
                cells = row.find_all('td')
                if len(cells) < len(headers):
                    continue

                # Only process Kenyan players
                if 'KEN' not in cells[headers.index('fed')].text:
                    continue

                # Extract player data
                name = cells[headers.index('name')].text.strip()
                rating = self._extract_rating(cells[headers.index('rtg')].text)
                points = float(cells[headers.index('pts.')].text.replace(',', '.'))
                rank = int(cells[headers.index('rk.')].text)
                start_rank = int(cells[headers.index('sno')].text)

                # Create player and result objects
                player = Player(
                    name=name,
                    fide_id=None,  # We'll get this later if needed
                    federation="KEN",
                    rating=rating
                )

                result = TournamentResult(
                    player=player,
                    games_played=total_rounds,
                    total_rounds=total_rounds,
                    points=points,
                    tpr=None,  # Calculate TPR later if needed
                    has_walkover=False,
                    rank=rank,
                    start_rank=start_rank
                )

                results.append(result)

            return results

        except Exception as e:
            logger.error(f"Error parsing standings: {e}")
            return results

    def _get_table_headers(self, table):
        """Extract table headers."""
        headers = []
        header_row = table.find('tr')
        for cell in header_row.find_all(['td', 'th']):
            header = cell.text.strip().lower()
            headers.append(header)
        return headers

    def _extract_rating(self, rating_text: str) -> Optional[int]:
        """Extract numerical rating from text."""
        try:
            clean_text = ''.join(c for c in rating_text if c.isdigit() or c == '-')
            return int(clean_text) if clean_text else None
        except ValueError:
            return None

if __name__ == '__main__':
    scraper = ChessResultsScraper()
    tournament_id = "1126042"  # Example tournament ID
    name, results = scraper.get_tournament_data(tournament_id)
    print(f"Tournament: {name}")
    print(f"Found {len(results)} results")