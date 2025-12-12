"""Create users table and initial schema

Revision ID: 5b27c488bb1b
Revises: ffd06cd50986
Create Date: 2025-12-12 16:45:41.298505

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5b27c488bb1b'
down_revision: Union[str, Sequence[str], None] = 'ffd06cd50986'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
