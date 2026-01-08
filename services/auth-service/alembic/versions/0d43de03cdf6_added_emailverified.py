"""added emailverified 

Revision ID: 0d43de03cdf6
Revises: 5b27c488bb1b
Create Date: 2026-01-06 15:39:00.738159

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0d43de03cdf6'
down_revision: Union[str, Sequence[str], None] = '5b27c488bb1b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
