from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Player, Tournament, Team, Match, Round
from scraper import ChessResultsScraper
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chess.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)

@app.route('/api/tournaments', methods=['GET'])
def get_tournaments():
    try:
        tournaments = Tournament.query.all()
        return jsonify([t.to_dict() for t in tournaments])
    except Exception as e:
        logger.error(f"Error fetching tournaments: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/tournaments/<int:tournament_id>', methods=['GET'])
def get_tournament(tournament_id):
    try:
        tournament = Tournament.query.get_or_404(tournament_id)
        return jsonify(tournament.to_dict())
    except Exception as e:
        logger.error(f"Error fetching tournament {tournament_id}: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/league/teams', methods=['GET'])
def get_teams():
    try:
        teams = Team.query.all()
        return jsonify([t.to_dict() for t in teams])
    except Exception as e:
        logger.error(f"Error fetching teams: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/league/rounds', methods=['GET'])
def get_rounds():
    try:
        rounds = Round.query.all()
        return jsonify([r.to_dict() for r in rounds])
    except Exception as e:
        logger.error(f"Error fetching rounds: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/scrape/tournament', methods=['POST'])
def scrape_tournament():
    try:
        tournament_id = request.json.get('tournament_id')
        if not tournament_id:
            return jsonify({"error": "Tournament ID is required"}), 400

        scraper = ChessResultsScraper()
        tournament_name, results = scraper.get_tournament_data(tournament_id)

        # Save to database
        # Implementation depends on your database schema

        return jsonify({
            "message": "Tournament scraped successfully",
            "tournament_name": tournament_name,
            "results_count": len(results)
        })
    except Exception as e:
        logger.error(f"Error scraping tournament: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)