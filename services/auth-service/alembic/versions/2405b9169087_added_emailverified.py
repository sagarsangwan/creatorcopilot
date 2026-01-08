"""added emailverified 

Revision ID: 2405b9169087
Revises: fa5e7304bd0f
Create Date: 2026-01-06 15:58:26.338327

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2405b9169087'
down_revision: Union[str, Sequence[str], None] = 'fa5e7304bd0f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
