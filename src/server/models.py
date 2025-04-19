from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    fide_id = db.Column(db.String(20), unique=True)
    federation = db.Column(db.String(3))
    rating = db.Column(db.Integer)
    title = db.Column(db.String(3))
    club = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'fide_id': self.fide_id,
            'federation': self.federation,
            'rating': self.rating,
            'title': self.title,
            'club': self.club
        }

class Tournament(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chess_results_id = db.Column(db.String(20), unique=True)
    name = db.Column(db.String(200), nullable=False)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    location = db.Column(db.String(100))
    total_rounds = db.Column(db.Integer)
    results = db.relationship('TournamentResult', backref='tournament', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'chess_results_id': self.chess_results_id,
            'name': self.name,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'location': self.location,
            'total_rounds': self.total_rounds,
            'results': [result.to_dict() for result in self.results]
        }

class TournamentResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournament.id'), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    games_played = db.Column(db.Integer)
    points = db.Column(db.Float)
    tpr = db.Column(db.Integer)
    rank = db.Column(db.Integer)
    has_walkover = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'tournament_id': self.tournament_id,
            'player_id': self.player_id,
            'games_played': self.games_played,
            'points': self.points,
            'tpr': self.tpr,
            'rank': self.rank,
            'has_walkover': self.has_walkover
        }

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    rating_average = db.Column(db.Integer)
    match_points = db.Column(db.Float, default=0)
    board_points = db.Column(db.Float, default=0)
    game_points = db.Column(db.Float, default=0)
    players = db.relationship('TeamPlayer', backref='team', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'rating_average': self.rating_average,
            'match_points': self.match_points,
            'board_points': self.board_points,
            'game_points': self.game_points,
            'players': [player.to_dict() for player in self.players]
        }

class TeamPlayer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    board = db.Column(db.Integer)
    performance = db.Column(db.Integer)
    games_played = db.Column(db.Integer, default=0)
    points = db.Column(db.Float, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'team_id': self.team_id,
            'player_id': self.player_id,
            'board': self.board,
            'performance': self.performance,
            'games_played': self.games_played,
            'points': self.points
        }

class Round(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    round_number = db.Column(db.Integer, nullable=False)
    matches = db.relationship('Match', backref='round', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'round_number': self.round_number,
            'matches': [match.to_dict() for match in self.matches]
        }

class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    round_id = db.Column(db.Integer, db.ForeignKey('round.id'), nullable=False)
    home_team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    away_team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    result = db.Column(db.String(10))
    boards = db.relationship('Board', backref='match', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'round_id': self.round_id,
            'home_team_id': self.home_team_id,
            'away_team_id': self.away_team_id,
            'result': self.result,
            'boards': [board.to_dict() for board in self.boards]
        }

class Board(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    match_id = db.Column(db.Integer, db.ForeignKey('match.id'), nullable=False)
    board_number = db.Column(db.Integer, nullable=False)
    white_player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    black_player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    result = db.Column(db.String(10))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'match_id': self.match_id,
            'board_number': self.board_number,
            'white_player_id': self.white_player_id,
            'black_player_id': self.black_player_id,
            'result': self.result
        }