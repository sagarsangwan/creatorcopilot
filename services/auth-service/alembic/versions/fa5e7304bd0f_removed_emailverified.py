"""removed emailverified 

Revision ID: fa5e7304bd0f
Revises: 9e389e0fb3be
Create Date: 2026-01-06 15:57:44.971984

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fa5e7304bd0f'
down_revision: Union[str, Sequence[str], None] = '9e389e0fb3be'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
