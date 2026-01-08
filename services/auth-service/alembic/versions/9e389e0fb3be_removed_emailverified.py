"""removed emailverified 

Revision ID: 9e389e0fb3be
Revises: ae4dde5135c1
Create Date: 2026-01-06 15:56:54.566806

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9e389e0fb3be'
down_revision: Union[str, Sequence[str], None] = 'ae4dde5135c1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
