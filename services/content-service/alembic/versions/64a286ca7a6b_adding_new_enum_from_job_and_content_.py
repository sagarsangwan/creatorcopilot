"""adding new  enum from job and content status

Revision ID: 64a286ca7a6b
Revises: 3d3b8bbf77da
Create Date: 2026-01-06 04:02:10.194680

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '64a286ca7a6b'
down_revision: Union[str, Sequence[str], None] = '3d3b8bbf77da'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
